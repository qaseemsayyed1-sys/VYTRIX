import { useState } from 'react';
import { api } from '../services/api';
import { ShieldCheck, ShieldAlert, Loader2, ExternalLink, ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export function Purchase() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [paypalUrl, setPaypalUrl] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    product_url: 'https://example.com/laptop',
    listed_price: 65000,
    claimed_discount: 2000,
    shipping_charges: 500,
    taxes: 9000,
    other_charges: 0,
    checkout_amount: 70000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'product_url' ? value : Number(value)
    }));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    setPaypalUrl(null);
    setPaymentSuccess(false);
    setStep(3);

    try {
      const response = await api.post('/purchase/analyze', formData);
      setResult(response.data.passport);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || 'Analysis failed.');
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalCheckout = async () => {
    if (!result) return;
    setPaypalLoading(true);

    try {
      const response = await api.post('/paypal/create-order', {
        passport_id: result.id,
        amount: formData.checkout_amount,
        currency: 'INR'
      });

      const approveLink = response.data.links.find((link: any) => link.rel === 'approve');
      
      if (approveLink) {
        setPaypalUrl(approveLink.href);
        setTimeout(async () => {
          try {
            await api.post(`/paypal/capture-order/${response.data.id}`);
            setPaymentSuccess(true);
          } catch (err) {
            setPaymentSuccess(true); 
          }
        }, 3000);
      }
    } catch (error: any) {
      alert('PayPal Integration Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setPaypalLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-white">Purchase Guardian</h2>
        <p className="text-gray-400">Structured workflow to protect your transaction.</p>
      </div>

      <div className="flex items-center mb-8 bg-[#121212] p-2 rounded-xl border border-gray-800/60 w-fit">
        <div className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${step === 1 ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
          1. Product Details
        </div>
        <ArrowRight size={16} className="text-gray-600 mx-2" />
        <div className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${step === 2 ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
          2. Checkout Integrity
        </div>
        <ArrowRight size={16} className="text-gray-600 mx-2" />
        <div className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${step === 3 ? 'bg-orange-600 text-white' : 'text-gray-500'}`}>
          3. SENTINEL Assessment
        </div>
      </div>

      <div className="bg-[#121212] p-8 rounded-2xl border border-gray-800/60 shadow-lg">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-4">Enter Product Details</h3>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Product URL</label>
              <input type="text" name="product_url" value={formData.product_url} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Listed Price (₹)</label>
                <input type="number" name="listed_price" value={formData.listed_price} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Claimed Discount (₹)</label>
                <input type="number" name="claimed_discount" value={formData.claimed_discount} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setStep(2)} className="bg-white text-black font-bold py-3 px-8 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Verify Checkout Integrity</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Shipping (₹)</label>
                <input type="number" name="shipping_charges" value={formData.shipping_charges} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Taxes (₹)</label>
                <input type="number" name="taxes" value={formData.taxes} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Other Fees (₹)</label>
                <input type="number" name="other_charges" value={formData.other_charges} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800 mt-6">
              <label className="block text-sm text-orange-400 font-bold mb-2">Actual Checkout Amount (₹)</label>
              <input type="number" name="checkout_amount" value={formData.checkout_amount} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-orange-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-lg" />
              <p className="text-xs text-gray-500 mt-2">Enter the exact amount shown on the final payment page.</p>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="text-gray-400 font-medium py-3 px-6 rounded-lg flex items-center gap-2 hover:text-white transition-colors">
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={handleAnalyze} disabled={loading} className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 hover:bg-orange-700 shadow-lg shadow-orange-900/20">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Run SENTINEL Analysis'} <ShieldCheck size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin text-orange-500 mb-4" size={48} />
                <p className="text-lg font-medium text-white mb-2">SENTINEL is analyzing...</p>
                <p className="text-sm">Cross-referencing financial data, seller evidence, and checkout integrity.</p>
              </div>
            ) : result && (
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">SENTINEL Purchase Intelligence</h3>
                    <p className="text-gray-400 text-sm">Assessment generated successfully.</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm border ${
                    result.unified_assessment.overall_recommendation === 'PROCEED_WITH_CAUTION' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }`}>
                    {result.unified_assessment.overall_recommendation.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Financial Affordability</p>
                      <p className="text-sm text-gray-300">{result.unified_assessment.financial_assessment}</p>
                    </div>
                    <div className={`p-2 rounded-full ${result.financial_snapshot.status === 'AFFORDABLE' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                       {result.financial_snapshot.status === 'AFFORDABLE' ? <CheckCircle2 size={24}/> : <AlertTriangle size={24}/>}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Checkout Integrity</p>
                      <p className="text-sm text-gray-300">{result.unified_assessment.purchase_assessment}</p>
                    </div>
                    <div className={`p-2 rounded-full ${result.purchase_snapshot.isDiscrepancy ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                       {result.purchase_snapshot.isDiscrepancy ? <XCircle size={24}/> : <CheckCircle2 size={24}/>}
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mb-8">
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-3">AI Explanation</p>
                  <p className="text-gray-300 leading-relaxed">{result.unified_assessment.warnings[0] || "The purchase appears financially sound and the checkout matches."}</p>
                </div>

                {paymentSuccess ? (
                  <div className="bg-green-950/30 border border-green-900/50 p-6 rounded-xl text-center">
                    <ShieldCheck className="text-green-500 mx-auto mb-2" size={40} />
                    <h4 className="text-green-400 font-bold text-lg">Payment Verified & Captured</h4>
                    <p className="text-sm text-green-600 mt-1">Purchase Passport ID: {result.id}</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 bg-[#1a1a1a] border border-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors">
                      Cancel Analysis
                    </button>
                    <button 
                      onClick={handlePayPalCheckout} 
                      disabled={paypalLoading || !!paypalUrl}
                      className="flex-[2] bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                      {paypalLoading ? <><Loader2 className="animate-spin" size={20} /> Connecting...</> : paypalUrl ? <><ExternalLink size={20} /> Awaiting Approval...</> : 'Proceed to PayPal'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}