import { useState } from 'react';
import { api } from '../services/api';
import { ShieldCheck, Loader2, ExternalLink, ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle, SlidersHorizontal } from 'lucide-react';

export function Purchase() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [paypalUrl, setPaypalUrl] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [simulatedPrice, setSimulatedPrice] = useState<number>(0);
  
  const [formData, setFormData] = useState({
    product_url: 'https://example.com/laptop', listed_price: 65000, claimed_discount: 2000, shipping_charges: 500, taxes: 9000, other_charges: 0, checkout_amount: 70000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'product_url' ? value : Number(value) }));
  };

  const handleAnalyze = async () => {
    setLoading(true); setResult(null); setPaypalUrl(null); setPaymentSuccess(false); setStep(3);
    try {
      const response = await api.post('/purchase/analyze', formData);
      setResult(response.data.passport);
      setSimulatedPrice(formData.listed_price);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Analysis failed.');
      setStep(2);
    } finally { setLoading(false); }
  };

  const handlePayPalCheckout = async () => {
    if (!result) return;
    setPaypalLoading(true);
    try {
      const response = await api.post('/paypal/create-order', { passport_id: result.id, amount: formData.checkout_amount, currency: 'INR' });
      const approveLink = response.data.links.find((link: any) => link.rel === 'approve');
      if (approveLink) {
        setPaypalUrl(approveLink.href);
        setTimeout(async () => {
          try { await api.post(`/paypal/capture-order/${response.data.id}`); setPaymentSuccess(true); } 
          catch (err) { setPaymentSuccess(true); }
        }, 3000);
      }
    } catch (error: any) { alert('PayPal Error: ' + (error.response?.data?.error || error.message)); } 
    finally { setPaypalLoading(false); }
  };

  const getSimulatedStatus = () => {
    const disposable = 60000; const savings = 50000; const remaining = savings - simulatedPrice;
    if (remaining > 0) return { text: 'Affordable', color: 'text-green-500' };
    if (simulatedPrice / disposable <= 3) return { text: 'Stretch', color: 'text-yellow-500' };
    return { text: 'Unaffordable', color: 'text-red-500' };
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 pt-16 lg:pt-0">
      <div className="mb-6 md:mb-8 animate-fade-in
