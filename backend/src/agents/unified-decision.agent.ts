import axios from 'axios';
import { env } from '../config/env';
import { UnifiedAssessmentSchema } from '../../../shared/dist/schemas';

export class UnifiedDecisionAgent {
  static async generateDecision(financialData: any, sellerData: any, purchaseData: any) {
    const prompt = `
      Analyze the following data and provide a unified assessment:
      Financial: ${JSON.stringify(financialData)}
      Seller: ${JSON.stringify(sellerData)}
      Purchase: ${JSON.stringify(purchaseData)}
      
      Return strict JSON with keys: overall_recommendation, confidence, financial_assessment, seller_assessment, purchase_assessment, warnings, missing_information, suggested_actions, evidence.
      Evidence array must contain objects with keys: description, source, timestamp, severity, confidence, verification_status.
    `;

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
  }
}