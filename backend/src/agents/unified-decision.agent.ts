import axios from 'axios';
import { env } from '../config/env';
import { z } from 'zod'; // Import zod directly here

// Local schema to avoid shared folder import issues on Render
const UnifiedAssessmentSchema = z.object({
  overall_recommendation: z.enum([
    'PROCEED_WITH_CAUTION',
    'REVIEW_BEFORE_PURCHASING',
    'HIGH_RISK',
    'INSUFFICIENT_EVIDENCE',
  ]),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  financial_assessment: z.string(),
  seller_assessment: z.string(),
  purchase_assessment: z.string(),
  warnings: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
  evidence: z.array(z.any()).optional(),
});

export class UnifiedDecisionAgent {
  static async generateDecision(financialData: any, sellerData: any, purchaseData: any) {
    const prompt = `
      Analyze the following data and provide a unified assessment:
      Financial: ${JSON.stringify(financialData)}
      Seller: ${JSON.stringify(sellerData)}
      Purchase: ${JSON.stringify(purchaseData)}
      
      Return strict JSON with keys: overall_recommendation, confidence, financial_assessment, seller_assessment, purchase_assessment, warnings, missing_information, suggested_actions, evidence.
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [{ role: 'system', content: 'You are a strict financial and risk assessment AI.' }, { role: 'user', content: prompt }],
          response_format: { type: 'json_object' }
        },
        { headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` } }
      );

      const result = JSON.parse(response.data.choices[0].message.content);
      return UnifiedAssessmentSchema.parse(result);
    } catch (error) {
       // Fallback if OpenAI fails
       return {
        overall_recommendation: 'PROCEED_WITH_CAUTION',
        confidence: 'MEDIUM',
        financial_assessment: 'Manual review required.',
        seller_assessment: 'Seller data unavailable.',
        purchase_assessment: 'Purchase data unavailable.',
        warnings: [],
        missing_information: [],
        suggested_actions: [],
        evidence: []
       };
    }
  }
}