import { Request, Response } from 'express';
import { AssessmentService } from '../services/assessment.service';
import { UnifiedDecisionAgent } from '../agents/unified-decision.agent';
import { supabase } from '../config/supabase';

export class PurchaseController {
  static async analyze(req: Request, res: Response) {
    try {
      const userId = 'demo-user-id';
      const { product_url, listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount } = req.body;

      const financialAssessment = AssessmentService.calculateAffordability(
        100000, 40000, 50000, listed_price
      );

      const purchaseAssessment = AssessmentService.calculateCheckoutIntegrity(
        listed_price, claimed_discount, shipping_charges, taxes, other_charges, checkout_amount
      );

      const unifiedAssessment = await UnifiedDecisionAgent.generateDecision(
        financialAssessment, { status: 'UNVERIFIED', risk: 'UNKNOWN' }, purchaseAssessment
      );

      let passportData;

      try {
        const { data: passport, error } = await supabase.from('purchase_passports').insert({
          user_id: userId,
          unified_assessment: unifiedAssessment,
          financial_snapshot: financialAssessment,
          seller_snapshot: {},
          purchase_snapshot: purchaseAssessment,
          approved_amount: checkout_amount
        }).select().single();

        if (error) throw error;
        passportData = passport;
      } catch (dbError: any) {
        console.log("Database missing or failed. Returning mock passport for demo.");
        passportData = {
          id: 'MOCK-' + Date.now(),
          unified_assessment: unifiedAssessment,
          financial_snapshot: financialAssessment,
          seller_snapshot: {},
          purchase_snapshot: purchaseAssessment,
          approved_amount: checkout_amount,
          created_at: new Date().toISOString()
        };
      }

      res.json({ passport: passportData });
    } catch (error: any) {
      console.error("Critical Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}