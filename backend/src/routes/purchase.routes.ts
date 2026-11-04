import { Router, Request, Response } from 'express';
import { PurchaseController } from '../controllers/purchase.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { supabase } from '../config/supabase';

const router = Router();

<<<<<<< HEAD
router.post('/analyze', asyncHandler(PurchaseController.analyze));

router.get('/history', asyncHandler(async (req: Request, res: Response) => {
    const userId = 'demo-user-id';
=======
router.use(requireAuth);

router.post('/analyze', asyncHandler(PurchaseController.analyze));

router.get('/history', asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
    const { data, error } = await supabase.from('purchase_passports').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if(error) return res.status(500).json({error: error.message});
    res.json(data);
}));

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 4b8a038290469ec85c1b43ec6d800797d934c839
