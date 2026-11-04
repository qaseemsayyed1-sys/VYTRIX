import { Router, Request, Response } from 'express';
import { PurchaseController } from '../controllers/purchase.controller';
import { asyncHandler } from '../utils/async-handler';
import { supabase } from '../config/supabase';

const router = Router();

router.post('/analyze', asyncHandler(PurchaseController.analyze));

router.get('/history', asyncHandler(async (req: Request, res: Response) => {
    const userId = 'demo-user-id';
    const { data, error } = await supabase.from('purchase_passports').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if(error) return res.status(500).json({error: error.message});
    res.json(data);
}));

export default router;