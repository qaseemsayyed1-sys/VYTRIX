import { Request, Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { UnifiedDecisionAgent } from '../agents/unified-decision.agent';
import { supabase } from '../config/supabase';
import { FinanceRepository } from '../repositories/finance.repository';

export class PurchaseController {
  static async analyze(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'demo-user-id';
      const { product_url, listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount } = req.body;

      const profile = await FinanceRepository.getProfile(userId);
      
      const financialAssessment = AssessmentService.calculateAffordability(
        profile?.monthly_income || 100000, 
        profile?.monthly_expenses || 40000, 
        profile?.current_savings || 50000, 
        listed_price
      );

      const purchaseAssessment = AssessmentService.calculateCheckoutIntegrity(
        listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount
      );

      const unifiedAssessment = await UnifiedDecisionAgent.generateDecision(
        financialAssessment, { status: 'UNVERIFIED', risk: 'UNKNOWN' }, purchaseAssessment
      );

      const { data: passport, error } = await supabase.from('purchase_passports').insert({
        user_id: userId,
        unified_assessment: unifiedAssessment,
        financial_snapshot: financialAssessment,
        seller_snapshot: {},
        purchase_snapshot: purchaseAssessment,
        approved_amount: checkout_amount
      }).select().single();

      if (error) throw new Error(error.message);

      res.json({ passport });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
