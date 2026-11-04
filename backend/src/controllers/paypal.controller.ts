import { Request, Response } from 'express';
import { PayPalService } from '../services/paypal.service';
import { supabase } from '../config/supabase';

export class PayPalController {
  static async createOrder(req: Request, res: Response) {
    const { passport_id, amount, currency } = req.body;

    try {
      const { data: passport, error } = await supabase
        .from('purchase_passports')
        .select('approved_amount')
        .eq('id', passport_id)
        .single();

      if (error || !passport) {
        return res.status(404).json({ error: 'Purchase Passport not found.' });
      }

      if (Number(passport.approved_amount) !== Number(amount)) {
        return res.status(400).json({ 
          error: `Integrity Violation: Requested amount (₹${amount}) does not match approved quote (₹${passport.approved_amount}). Transaction Rejected.` 
        });
      }

      const usdAmount = Number((amount / 83).toFixed(2));

      const order = await PayPalService.createOrder(usdAmount, 'USD');
      
      await supabase.from('paypal_orders').insert({
        passport_id,
        paypal_order_id: order.id,
        status: order.status,
        amount,
        currency: 'USD'
      });

      res.json(order);
    } catch (error: any) {
      console.error("PayPal API Error:", error.message);
      res.status(500).json({ error: `PayPal Integration Error: ${error.message}` });
    }
  }

  static async captureOrder(req: Request, res: Response) {
    const orderId = req.params.orderId as string;
    
    try {
      const captureData = await PayPalService.captureOrder(orderId);
      
      if (captureData.status === 'COMPLETED') {
        await supabase.from('paypal_orders').update({ status: 'COMPLETED' }).eq('paypal_order_id', orderId);
        return res.json({ success: true, data: captureData });
      } else {
        return res.status(400).json({ error: 'Payment capture failed or is pending.' });
      }
    } catch (error: any) {
      console.error("PayPal Capture Error:", error.message);
      res.status(500).json({ error: 'Failed to capture payment.' });
    }
  }

  static async webhook(req: Request, res: Response) {
    res.status(200).send('OK');
  }
}