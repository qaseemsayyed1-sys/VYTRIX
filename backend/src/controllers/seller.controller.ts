import { Request, Response } from 'express';
import { SellerInvestigationAgent } from '../agents/seller-investigation.agent';
import { supabase } from '../config/supabase';

export class SellerController {
  static async analyze(req: Request, res: Response) {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const analysis = await SellerInvestigationAgent.investigate(url);
    
    try {
      await supabase.from('seller_reports').insert({
        user_id: 'demo-user-id',
        url: url,
        ssl_valid: url.startsWith('https'),
        evidence_data: analysis.evidence,
        risk_score: analysis.overall_status === 'RISKY' ? 80 : 20
      });
    } catch (e) {
      console.log('DB skipped, using mock response');
    }

    res.json(analysis);
  }
}