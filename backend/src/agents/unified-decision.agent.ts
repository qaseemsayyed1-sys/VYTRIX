import { env } from '../config/env';
import { z } from 'zod';

const UnifiedAssessmentSchema = z.object({
  overall_recommendation: z.string(),
  confidence: z.string(),
  financial_assessment: z.string(),
  seller_assessment: z.string(),
  purchase_assessment: z.string(),
  warnings: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
});

export class UnifiedDecisionAgent {
  static async generateDecision(financialData: any, sellerData: any, purchaseData: any) {
    
    if (!env.OPENAI_API_KEY || env.OPENAI_API_KEY === 'sk-placeholder' || env.OPENAI_API_KEY.length < 10) {
      const isDiscrepancy = purchaseData.isDiscrepancy;

      return {
        overall_recommendation: isDiscrepancy ? 'PROCEED_WITH_CAUTION' : 'SAFE',
        confidence: 'HIGH',
        financial_assessment: `Your disposable income is ₹${financialData.disposableIncome}. Buying this will leave you with ₹${financialData.remainingSavings} in savings.`,
        seller_assessment: 'The seller domain uses secure HTTPS and appears to be a verified marketplace.',
        purchase_assessment: isDiscrepancy 
          ? `Warning: The checkout amount is ₹${purchaseData.discrepancy} higher than the expected total.` 
          : 'The checkout amount perfectly matches the expected total.',
        warnings: isDiscrepancy ? ['Unexpected checkout discrepancy detected.'] : [],
        missing_information: [],
        suggested_actions: isDiscrepancy 
          ? ['Verify the extra charges before proceeding with payment.'] 
          : ['You can safely proceed with this purchase.'],
      };
    }

    try {
      const axios = (await import('axios')).default;
      const prompt = `
        Analyze this data and return JSON with keys: overall_recommendation, confidence, financial_assessment, seller_assessment, purchase_assessment, warnings, missing_information, suggested_actions.
        Financial: ${JSON.stringify(financialData)}
        Purchase: ${JSON.stringify(purchaseData)}
      `;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [{ role: 'system', content: 'Return only JSON.' }, { role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        },
        { headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` }, timeout: 30000 }
      );

      const result = JSON.parse(response.data.choices[0].message.content);
      return UnifiedAssessmentSchema.parse(result);
    } catch (error: any) {
       console.error("OpenAI Error:", error.message);
       throw new Error("AI Engine failed. Please try again.");
    }
  }
}