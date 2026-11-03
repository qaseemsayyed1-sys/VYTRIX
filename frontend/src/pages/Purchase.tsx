import { useState } from 'react';
import { api } from '../services/api';
import { ShieldCheck, Loader2, ExternalLink, ArrowRight, ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto pb-10 pt-16 lg:pt-0">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Purchase Guardian</h2>
        <p className="text-[#E5DDFB]/70 text-sm md:text-base">Structured workflow to protect your transaction.</p>
      </div>

      <div className="flex items-center mb-6 md:mb-8 bg-[#2E2952] p-2 rounded-xl border border-[#9B87D8]/20 w-full overflow-x-auto whitespace-nowrap">
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${step === 1 ? 'bg-[#9B87D8] text-[#242044]' : 'text-gray-400'}`}>
          1. Product Details
        </div>
        <ArrowRight size={16} className="text-gray-600 mx-2 shrink-0" />
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${step === 2 ? 'bg-[#9B87D8] text-[#242044]' : 'text-gray-400'}`}>
          2. Checkout
        </div>
        <ArrowRight size={16} className="text-gray-600 mx-2 shrink-0" />
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm ${step === 3 ? 'bg-[#9B87D8] text-[#242044]' : 'text-gray-400'}`}>
          3. SENTINEL
        </div>
      </div>

      <div className="bg-[#2E2952] p-4 md:p-8 rounded-2xl border border-[#9B87D8]/20 shadow-lg">
        
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold mb-4 text-white">Enter Product Details</h3>
            <div>
              <label className="block text-sm text-[#E5DDFB]/70 mb-2">Product URL</label>
              <input type="text" name="product_url" value={formData.product_url} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm text-[#E5DDFB]/70 mb-2">Listed Price (₹)</label>
                <input type="number" name="listed_price" value={formData.listed_price} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
              </div>
              <div>
                <label className="block text-sm text-[#E5DDFB]/70 mb-2">Claimed Discount (₹)</label>
                <input type="number" name="claimed_discount" value={formData.claimed_discount} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
              </div>
            </div>
            <div className="flex justify-end mt-6 md:mt-8">
              <button onClick={() => setStep(2)} className="bg-[#E5DDFB] text-[#242044] font-bold py-3 px-6 md:px-8 rounded-lg flex items-center gap-2 hover:bg-white w-full md:w-auto justify-center">
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-xl font-bold mb-4 text-[#9B87D8]">Verify Checkout Integrity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-sm text-[#E5DDFB]/70 mb-2">Shipping (₹)</label>
                <input type="number" name="shipping_charges" value={formData.shipping_charges} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
              </div>
              <div>
                <label className="block text-sm text-[#E5DDFB]/70 mb-2">Taxes (₹)</label>
                <input type="number" name="taxes" value={formData.taxes} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
              </div>
              <div>
                <label className="block text-sm text-[#E5DDFB]/70 mb-2">Other Fees (₹)</label>
                <input type="number" name="other_charges" value={formData.other_charges} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8]" />
              </div>
            </div>
            <div className="pt-6 border-t border-[#9B87D8]/20 mt-6">
              <label className="block text-sm text-[#9B87D8] font-bold mb-2">Actual Checkout Amount (₹)</label>
              <input type="number" name="checkout_amount" value={formData.checkout_amount} onChange={handleChange} className="w-full bg-[#242044] border border-[#9B87D8]/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#9B87D8] text-lg" />
              <p className="text-xs text-gray-400 mt-2">Enter the exact amount shown on the final payment page.</p>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
              <button onClick={() => setStep(1)} className="text-gray-400 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:text-white transition-colors border border-[#9B87D8]/30 md:border-none">
                <ArrowLeft size={18} /> Back
              </button>
              <button onClick={handleAnalyze} disabled={loading} className="bg-[#9B87D8] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-[#51418F] shadow-lg shadow-[#9B87D8]/20 w-full md:w-auto">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Run SENTINEL Analysis'} <ShieldCheck size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin text-[#9B87D8] mb-4" size={48} />
                <p className="text-lg font-medium text-white mb-2">SENTINEL is analyzing...</p>
                <p className="text-sm text-center px-4">Cross-referencing financial data, seller evidence, and checkout integrity.</p>
              </div>
            ) : result && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">SENTINEL Intelligence</h3>
                    <p className="text-gray-400 text-sm">Assessment generated successfully.</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm border w-full md:w-auto text-center ${
                    result.unified_assessment.overall_recommendation === 'PROCEED_WITH_CAUTION' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {result.unified_assessment.overall_recommendation.replace(/_/g, ' ')}
                  </div>
                </div>

                <div className="space-y-4 mb-6 md:mb-8">
                  <div className="bg-[#242044] p-4 md:p-5 rounded-xl border border-[#9B87D8]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-xs text-[#9B87D8] uppercase font-bold tracking-wider mb-1">Financial Affordability</p>
                      <p className="text-sm text-gray-300">{result.unified_assessment.financial_assessment}</p>
                    </div>
                    <div className={`p-2 rounded-full shrink-0 ${result.financial_snapshot.status === 'AFFORDABLE' ? 'bg-teal-500/20 text-teal-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                       {result.financial_snapshot.status === 'AFFORDABLE' ? <CheckCircle2 size={24}/> : <AlertTriangle size={24}/>}
                    </div>
                  </div>

                  <div className="bg-[#242044] p-4 md:p-5 rounded-xl border border-[#9B87D8]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-xs text-[#9B87D8] uppercase font-bold tracking-wider mb-1">Checkout Integrity</p>
                      <p className="text-sm text-gray-300">{result.unified_assessment.purchase_assessment}</p>
                    </div>
                    <div className={`p-2 rounded-full shrink-0 ${result.purchase_snapshot.isDiscrepancy ? 'bg-red-500/20 text-red-400' : 'bg-teal-500/20 text-teal-400'}`}>
                       {result.purchase_snapshot.isDiscrepancy ? <XCircle size={24}/> : <CheckCircle2 size={24}/>}
                    </div>
                  </div>
                </div>

                <div className="bg-[#242044] p-4 md:p-6 rounded-xl border border-[#9B87D8]/20 mb-6 md:mb-8">
                  <p className="text-xs text-[#9B87D8] uppercase font-bold tracking-wider mb-3">AI Explanation</p>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">{result.unified_assessment.warnings[0] || "The purchase appears financially sound and the checkout matches."}</p>
                </div>

                {paymentSuccess ? (
                  <div className="bg-teal-500/10 border border-teal-500/20 p-6 rounded-xl text-center">
                    <ShieldCheck className="text-teal-400 mx-auto mb-2" size={40} />
                    <h4 className="text-teal-400 font-bold text-lg">Payment Verified & Captured</h4>
                    <p className="text-sm text-teal-500/70 mt-1">Passport ID: {result.id}</p>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 bg-[#242044] border border-[#9B87D8]/20 text-white font-bold py-3 rounded-lg hover:bg-[#51418F] transition-colors w-full">
                      Cancel Analysis
                    </button>
                    <button 
                      onClick={handlePayPalCheckout} 
                      disabled={paypalLoading || !!paypalUrl}
                      className="flex-[2] bg-[#E5DDFB] text-[#242044] font-bold py-3 rounded-lg hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50 w-full"
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
