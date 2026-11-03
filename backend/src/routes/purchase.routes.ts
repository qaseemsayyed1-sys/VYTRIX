import { Router } from 'express';
import { PurchaseController } from '../controllers/purchase.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

// router.use(requireAuth);  <-- Bypassed for demo testing

router.post('/analyze', asyncHandler(PurchaseController.analyze));

export default router;