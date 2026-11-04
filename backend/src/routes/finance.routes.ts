import { Router } from 'express';
import { FinanceController } from '../controllers/finance.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

<<<<<<< HEAD
=======
router.use(requireAuth);

>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
router.get('/summary', asyncHandler(FinanceController.getSummary));
router.post('/profile', asyncHandler(FinanceController.upsertProfile));
router.post('/transactions', asyncHandler(FinanceController.addTransaction));

export default router;
