import axios from 'axios';
import { env } from '../config/env';
import { z } from 'zod';

const UnifiedAssessmentSchema = z.object({
<<<<<<< HEAD
  overall_recommendation: z.string(),
  confidence: z.string(),
=======
  overall_recommendation: z.enum(['PROCEED_WITH_CAUTION', 'REVIEW_BEFORE_PURCHASING', 'HIGH_RISK', 'INSUFFICIENT_EVIDENCE']),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
  financial_assessment: z.string(),
  seller_assessment: z.string(),
  purchase_assessment: z.string(),
  warnings: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
<<<<<<< HEAD
=======
  evidence: z.array(z.object({
    description: z.string(),
    source: z.string(),
    timestamp: z.string(),
    severity: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    verification_status: z.enum(['VERIFIED', 'SUSPICIOUS', 'INFERRED', 'UNKNOWN']),
  })).optional(),
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
});

export class UnifiedDecisionAgent {
  static async generateDecision(financialData: any, sellerData: any, purchaseData: any) {
    const prompt = `
<<<<<<< HEAD
      You are the AEGIS SENTINEL. Analyze this data and provide a unified assessment.
      Financial: ${JSON.stringify(financialData)}
      Seller: ${JSON.stringify(sellerData)}
      Purchase: ${JSON.stringify(purchaseData)}
      
      Return a strict JSON object with keys: overall_recommendation, confidence, financial_assessment, seller_assessment, purchase_assessment, warnings (array), missing_information (array), suggested_actions (array).
=======
      You are the AEGIS SENTINEL, an elite AI purchase intelligence engine. 
      Analyze the following three data points and provide a unified assessment.
      
      1. Financial Data: ${JSON.stringify(financialData)}
      2. Seller Data: ${JSON.stringify(sellerData)}
      3. Purchase/Checkout Data: ${JSON.stringify(purchaseData)}
      
      You MUST return a strict JSON object with the following keys:
      - overall_recommendation (must be exactly one of: 'PROCEED_WITH_CAUTION', 'REVIEW_BEFORE_PURCHASING', 'HIGH_RISK', 'INSUFFICIENT_EVIDENCE')
      - confidence ('HIGH', 'MEDIUM', 'LOW')
      - financial_assessment (string)
      - seller_assessment (string)
      - purchase_assessment (string)
      - warnings (array of strings)
      - missing_information (array of strings)
      - suggested_actions (array of strings)
      - evidence (array of objects with keys: description, source, timestamp, severity, confidence, verification_status)
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
<<<<<<< HEAD
            { role: 'system', content: 'You are a strict financial AI. Return only JSON.' }, 
=======
            { role: 'system', content: 'You are a strict, professional financial and risk assessment AI. Return only valid JSON.' }, 
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
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
