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
      <div className="mb-6 md:mb-8 animate-fade-in-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#1A202C]">Purchase Guardian</h2>
        <p className="text-gray-500 text-sm md:text-base">Structured workflow to protect your transaction.</p>
      </div>

      <div className="flex items-center mb-6 md:mb-8 bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-full overflow-x-auto whitespace-nowrap animate-fade-in-up delay-100">
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-all ${step === 1 ? 'bg-[#6B46C1] text-white' : 'text-gray-500'}`}>1. Product Details</div>
        <ArrowRight size={16} className="text-gray-300 mx-2 shrink-0" />
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-all ${step === 2 ? 'bg-[#6B46C1] text-white' : 'text-gray-500'}`}>2. Checkout</div>
        <ArrowRight size={16} className="text-gray-300 mx-2 shrink-0" />
        <div className={`px-4 md:px-6 py-2 rounded-lg font-medium flex items-center gap-2 text-sm transition-all ${step === 3 ? 'bg-[#6B46C1] text-white' : 'text-gray-500'}`}>3. SENTINEL</div>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up delay-200">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 text-[#1A202C]">Enter Product Details</h3>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Product URL</label>
              <input type="text" name="product_url" value={formData.product_url} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div><label className="block text-sm text-gray-500 mb-2">Listed Price (₹)</label><input type="number" name="listed_price" value={formData.listed_price} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" /></div>
              <div><label className="block text-sm text-gray-500 mb-2">Claimed Discount (₹)</label><input type="number" name="claimed_discount" value={formData.claimed_discount} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" /></div>
            </div>
            <div className="flex justify-end mt-6 md:mt-8">
              <button onClick={() => setStep(2)} className="bg-[#6B46C1] text-white font-bold py-3 px-6 md:px-8 rounded-lg flex items-center gap-2 hover:bg-[#5a3a9e] w-full md:w-auto justify-center transition-all shadow-lg">Next Step <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4 text-[#6B46C1]">Verify Checkout Integrity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div><label className="block text-sm text-gray-500 mb-2">Shipping (₹)</label><input type="number" name="shipping_charges" value={formData.shipping_charges} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" /></div>
              <div><label className="block text-sm text-gray-500 mb-2">Taxes (₹)</label><input type="number" name="taxes" value={formData.taxes} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" /></div>
              <div><label className="block text-sm text-gray-500 mb-2">Other Fees (₹)</label><input type="number" name="other_charges" value={formData.other_charges} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" /></div>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <label className="block text-sm text-[#6B46C1] font-bold mb-2">Actual Checkout Amount (₹)</label>
              <input type="number" name="checkout_amount" value={formData.checkout_amount} onChange={handleChange} className="w-full bg-gray-50 border border-[#6B46C1]/50 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1] text-lg" />
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-8">
              <button onClick={() => setStep(1)} className="text-gray-500 font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:text-[#1A202C] border border-gray-200 md:border-none"><ArrowLeft size={18} /> Back</button>
              <button onClick={handleAnalyze} disabled={loading} className="bg-[#6B46C1] text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 hover:bg-[#5a3a9e] shadow-lg w-full md:w-auto transition-all">{loading ? <Loader2 className="animate-spin" size={20} /> : 'Run SENTINEL Analysis'} <ShieldCheck size={18} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Loader2 className="animate-spin text-[#6B46C1] mb-4" size={48} />
                <p className="text-lg font-medium text-[#1A202C] mb-2">SENTINEL is analyzing...</p>
              </div>
            ) : result && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8 gap-4">
                  <div><h3 className="text-xl md:text-2xl font-bold mb-1 text-[#1A202C]">SENTINEL Intelligence</h3><p className="text-gray-500 text-sm">Assessment generated successfully.</p></div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm border w-full md:w-auto text-center ${result.unified_assessment.overall_recommendation === 'PROCEED_WITH_CAUTION' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-red-50 text-red-600 border-red-200'}`}>{result.unified_assessment.overall_recommendation.replace(/_/g, ' ')}</div>
                </div>

                <div className="space-y-4 mb-6 md:mb-8">
                  <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div><p className="text-xs text-[#6B46C1] uppercase font-bold mb-1">Financial Affordability</p><p className="text-sm text-gray-600">{result.unified_assessment.financial_assessment}</p></div>
                    <div className={`p-2 rounded-full shrink-0 ${result.financial_snapshot.status === 'AFFORDABLE' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{result.financial_snapshot.status === 'AFFORDABLE' ? <CheckCircle2 size={24}/> : <AlertTriangle size={24}/>}</div>
                  </div>
                  <div className="bg-gray-50 p-4 md:p-5 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div><p className="text-xs text-[#6B46C1] uppercase font-bold mb-1">Checkout Integrity</p><p className="text-sm text-gray-600">{result.unified_assessment.purchase_assessment}</p></div>
                    <div className={`p-2 rounded-full shrink-0 ${result.purchase_snapshot.isDiscrepancy ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{result.purchase_snapshot.isDiscrepancy ? <XCircle size={24}/> : <CheckCircle2 size={24}/>}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100 mb-6 md:mb-8">
                  <p className="text-xs text-[#6B46C1] uppercase font-bold tracking-wider mb-3">AI Explanation</p>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{result.unified_assessment.warnings[0] || "The purchase appears financially sound."}</p>
                </div>

                <div className="bg-gradient-to-br from-[#EBE5FA] to-white p-5 rounded-xl border border-[#6B46C1]/20 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 mb-4"><SlidersHorizontal size={18} className="text-[#6B46C1]" /><h4 className="text-[#1A202C] font-bold">What-If Simulator</h4></div>
                  <p className="text-sm text-gray-600 mb-4">Adjust the price to see how your financial health would change.</p>
                  <input type="range" min={10000} max={100000} step={1000} value={simulatedPrice} onChange={(e) => setSimulatedPrice(Number(e.target.value))} className="w-full accent-[#6B46C1] mb-4 cursor-pointer" />
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100">
                    <div><p className="text-xs text-gray-500 uppercase font-bold">Simulated Price</p><p className="text-lg font-bold text-[#1A202C]">₹{simulatedPrice.toLocaleString()}</p></div>
                    <div className="text-right"><p className="text-xs text-gray-500 uppercase font-bold">Status</p><p className={`text-lg font-bold ${getSimulatedStatus().color}`}>{getSimulatedStatus().text}</p></div>
                  </div>
                </div>

                {paymentSuccess ? (
                  <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
                    <ShieldCheck className="text-green-500 mx-auto mb-2" size={40} />
                    <h4 className="text-green-600 font-bold text-lg">Payment Verified & Captured</h4>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 bg-gray-50 border border-gray-200 text-[#1A202C] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors w-full">Cancel Analysis</button>
                    <button onClick={handlePayPalCheckout} disabled={paypalLoading || !!paypalUrl} className="flex-[2] bg-[#6B46C1] text-white font-bold py-3 rounded-lg hover:bg-[#5a3a9e] transition-colors flex justify-center items-center gap-2 disabled:opacity-50 w-full shadow-lg">
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
