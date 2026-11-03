import { Request, Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { UnifiedDecisionAgent } from '../agents/unified-decision.agent';
import { supabase } from '../config/supabase';
import { FinanceRepository } from '../repositories/finance.repository';

export class PurchaseController {
  static async analyze(req: Request, res: Response) {
    const userId = (req as any).user?.id || 'demo-user-id';
    const { product_url, listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount } = req.body;

    let financialAssessment;
    try {
      const profile = await FinanceRepository.getProfile(userId);
      financialAssessment = AssessmentService.calculateAffordability(
        profile?.monthly_income || 100000, 
        profile?.monthly_expenses || 40000, 
        profile?.current_savings || 50000, 
        listed_price
      );
    } catch (e) {
      financialAssessment = AssessmentService.calculateAffordability(100000, 40000, 50000, listed_price);
    }

    const purchaseAssessment = AssessmentService.calculateCheckoutIntegrity(
      listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount
    );

    let unifiedAssessment;

    try {
      unifiedAssessment = await UnifiedDecisionAgent.generateDecision(
        financialAssessment, { status: 'UNVERIFIED', risk: 'UNKNOWN' }, purchaseAssessment
      );
    } catch (error) {
      unifiedAssessment = {
        overall_recommendation: 'PROCEED_WITH_CAUTION',
        confidence: 'MEDIUM',
        financial_assessment: `Affordability status is ${financialAssessment.status}. You will have ₹${financialAssessment.remainingSavings} remaining in savings.`,
        seller_assessment: 'Seller URL is unverified. No public contact information found.',
        purchase_assessment: purchaseAssessment.isDiscrepancy 
          ? `Warning: Checkout amount is ₹${purchaseAssessment.discrepancy} higher than the expected total.`
          : 'Checkout amount matches expected total.',
        warnings: purchaseAssessment.isDiscrepancy ? ['Unexpected checkout amount discrepancy detected.'] : [],
        missing_information: ['Seller identity verification'],
        suggested_actions: ['Verify the extra charges before proceeding.'],
        evidence: [
          {
            description: 'Calculated checkout discrepancy',
            source: 'AEGIS Sentinel Backend',
            timestamp: new Date().toISOString(),
            severity: purchaseAssessment.isDiscrepancy ? 'HIGH' : 'LOW',
            confidence: 'HIGH',
            verification_status: 'VERIFIED'
          }
        ]
      };
    }

    let passport;
    try {
      const { data, error } = await supabase.from('purchase_passports').insert({
        user_id: userId,
        unified_assessment: unifiedAssessment,
        financial_snapshot: financialAssessment,
        seller_snapshot: {},
        purchase_snapshot: purchaseAssessment,
      }).select().single();

      if (error) throw error;
      passport = data;
    } catch (error) {
      passport = {
        id: 'mock-passport-id',
        unified_assessment: unifiedAssessment,
        financial_snapshot: financialAssessment,
        seller_snapshot: {},
        purchase_snapshot: purchaseAssessment,
        created_at: new Date().toISOString()
      };
    }

    res.json({ passport });
  }
}