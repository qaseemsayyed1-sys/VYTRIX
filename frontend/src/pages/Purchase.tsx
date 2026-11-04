{paymentSuccess ? (
  <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
    <ShieldCheck className="text-green-500 mx-auto mb-2" size={40} />
    <h4 className="text-green-600 font-bold text-lg">Payment Verified & Captured</h4>
    <p className="text-sm text-green-600/70 mt-1">Passport ID: {result.id}</p>
  </div>
) : result.unified_assessment.overall_recommendation === 'HIGH_RISK' ? (
  <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
    <AlertTriangle className="text-red-500 mx-auto mb-2" size={40} />
    <h4 className="text-red-600 font-bold text-lg">Payment Locked by SENTINEL</h4>
    <p className="text-sm text-red-500 mt-1">This transaction is blocked due to high risk. Please review the seller and checkout details.</p>
  </div>
) : (
  <div className="flex flex-col md:flex-row gap-4">
    <button onClick={() => setStep(1)} className="flex-1 bg-gray-50 border border-gray-200 text-[#1A202C] font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors w-full">Cancel Analysis</button>
    <button onClick={handlePayPalCheckout} disabled={paypalLoading || !!paypalUrl} className="flex-[2] bg-[#6B46C1] text-white font-bold py-3 rounded-lg hover:bg-[#5a3a9e] transition-colors flex justify-center items-center gap-2 disabled:opacity-50 w-full shadow-lg">
      {paypalLoading ? <><Loader2 className="animate-spin" size={20} /> Connecting...</> : paypalUrl ? <><ExternalLink size={20} /> Awaiting Approval...</> : 'Proceed to PayPal'}
    </button>
  </div>
)}