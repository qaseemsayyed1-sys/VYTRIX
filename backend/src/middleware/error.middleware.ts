import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/custom-error';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', details: err.errors });
  }

  return res.status(500).json({ error: 'Internal server error' });
};