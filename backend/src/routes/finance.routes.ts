import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.use(requireAuth);

router.get('/summary', asyncHandler(FinanceController.getSummary));
router.post('/profile', asyncHandler(FinanceController.upsertProfile));
router.post('/transactions', asyncHandler(FinanceController.addTransaction));

export default router;
