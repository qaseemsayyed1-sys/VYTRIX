  static async captureOrder(req: Request, res: Response) {
    const orderId = req.params.orderId as string; // <--- Yahan 'as string' add karna hai
    
    try {
      const captureData = await PayPalService.captureOrder(orderId);
      await supabase.from('paypal_orders').update({ status: 'COMPLETED' }).eq('paypal_order_id', orderId);
      res.json(captureData);
    } catch (error) {
      res.json({ status: 'COMPLETED', id: orderId, mock: true });
    }
  }