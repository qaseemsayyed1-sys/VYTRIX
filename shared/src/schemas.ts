import { z } from 'zod';

export const FinancialProfileSchema = z.object({
  monthly_income: z.number().min(0),
  monthly_expenses: z.number().min(0),
  current_savings: z.number().min(0),
  currency: z.string().default('INR'),
});

export const TransactionSchema = z.object({
  amount: z.number(),
  category: z.string(),
  type: z.enum(['income', 'expense']),
  description: z.string().optional(),
  transaction_date: z.string(),
});

export const SellerAnalysisSchema = z.object({
  url: z.string().url(),
});

export const PurchaseAnalysisSchema = z.object({
  product_url: z.string().url(),
  listed_price: z.number(),
  claimed_discount: z.number().default(0),
  shipping_charges: z.number().default(0),
  taxes: z.number().default(0),
  other_charges: z.number().default(0),
});

export const EvidenceItemSchema = z.object({
  description: z.string(),
  source: z.string(),
  timestamp: z.string(),
  severity: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  verification_status: z.enum(['VERIFIED', 'SUSPICIOUS', 'INFERRED', 'UNKNOWN']),
});

export const UnifiedAssessmentSchema = z.object({
  overall_recommendation: z.enum([
    'PROCEED_WITH_CAUTION',
    'REVIEW_BEFORE_PURCHASING',
    'HIGH_RISK',
    'INSUFFICIENT_EVIDENCE',
  ]),
  confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  financial_assessment: z.string(),
  seller_assessment: z.string(),
  purchase_assessment: z.string(),
  warnings: z.array(z.string()),
  missing_information: z.array(z.string()),
  suggested_actions: z.array(z.string()),
  evidence: z.array(EvidenceItemSchema),
});

export const PayPalOrderSchema = z.object({
  passport_id: z.string().uuid(),
  amount: z.number(),
  currency: z.string(),
});