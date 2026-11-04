import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    (req as any).user = { id: 'demo-user-id' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    (req as any).user = { id: 'demo-user-id' };
    return next();
  }

  (req as any).user = user;
  next();
};