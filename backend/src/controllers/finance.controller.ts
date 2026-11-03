import { Request, Response } from 'express';
import { FinanceRepository } from '../repositories/finance.repository';

export class FinanceController {
  static async getSummary(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const profile = await FinanceRepository.getProfile(userId);
    const transactions = await FinanceRepository.getTransactions(userId);
    res.json({ profile, transactions });
  }

  static async upsertProfile(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const data = await FinanceRepository.upsertProfile(userId, req.body);
    res.json(data);
  }

  static async addTransaction(req: Request, res: Response) {
    const userId = (req as any).user.id;
    const data = await FinanceRepository.addTransaction(userId, req.body);
    res.status(201).json(data);
  }
}