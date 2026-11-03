import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

// router.use(requireAuth);  <-- Bypassed for demo

router.get('/summary', asyncHandler(FinanceController.getSummary));
router.post('/profile', asyncHandler(FinanceController.upsertProfile));
router.post('/transactions', asyncHandler(FinanceController.addTransaction));

export default router;