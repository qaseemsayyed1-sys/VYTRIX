import { Router } from 'express';
import { PayPalController } from '../controllers/paypal.controller';
import { asyncHandler } from '../utils/async-handler';

const router = Router();

router.post('/webhook', asyncHandler(PayPalController.webhook));
router.post('/create-order', asyncHandler(PayPalController.createOrder));
router.post('/capture-order/:orderId', asyncHandler(PayPalController.captureOrder));

export default router;