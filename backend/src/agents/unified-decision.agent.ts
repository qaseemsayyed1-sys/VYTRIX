import axios from 'axios';
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
    const prompt = `
      You are the AEGIS SENTINEL. Analyze this data and provide a unified assessment.
      Financial: ${JSON.stringify(financialData)}
      Seller: ${JSON.stringify(sellerData)}
      Purchase: ${JSON.stringify(purchaseData)}
      
      Return a strict JSON object with keys: overall_recommendation, confidence, financial_assessment, seller_assessment, purchase_assessment, warnings (array), missing_information (array), suggested_actions (array).
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a strict financial AI. Return only JSON.' }, 
            { role: 'user', content: prompt }
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2
        },
        { headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` } }
      );

      const result = JSON.parse(response.data.choices[0].message.content);
      return UnifiedAssessmentSchema.parse(result);
    } catch (error: any) {
       console.error("OpenAI Error:", error.response?.data || error.message);
       throw new Error("AI Engine failed to analyze data. Please try again.");
    }
  }
}