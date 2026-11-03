import axios from 'axios';
import { env } from '../config/env';
import { z } from 'zod';

const UnifiedAssessmentSchema = z.object({
  overall_recommendation: z.enum(['PROCEED_WITH_CAUTION', 'REVIEW_BEFORE_PURCHASING', 'HIGH_RISK', 'INSUFFICIENT_EVIDENCE']),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  financial_assessment: z.string(),
  seller_assessment: z.string(),
  purchase_assessment: z.string(),
  warnings: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
  evidence: z.array(z.object({
    description: z.string(),
    source: z.string(),
    timestamp: z.string(),
    severity: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    verification_status: z.enum(['VERIFIED', 'SUSPICIOUS', 'INFERRED', 'UNKNOWN']),
  })).optional(),
});

export class UnifiedDecisionAgent {
  static async generateDecision(financialData: any, sellerData: any, purchaseData: any) {
    const prompt = `
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
    `;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a strict, professional financial and risk assessment AI. Return only valid JSON.' }, 
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
