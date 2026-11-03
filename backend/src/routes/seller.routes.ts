import { Router } from 'express';
import { SellerController } from '../controllers/seller.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/analyze', asyncHandler(SellerController.analyze));

export default router;