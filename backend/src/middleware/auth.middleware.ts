import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { CustomError } from '../utils/custom-error';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError('Missing authorization header', 401));
  }

  const token = authHeader.split(' ')[1];
  
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return next(new CustomError('Invalid or expired token', 401));
  }

  (req as any).user = user;
  next();
};