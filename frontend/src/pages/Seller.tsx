import { useState } from 'react';
import { api } from '../services/api';
import { ShieldAlert, Search, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';

export function Seller() {
  const [url, setUrl] = useState('https://example-store.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await api.post('/seller/analyze', { url });
      setResult(response.data);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Seller analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED': return 'text-green-600 bg-green-50 border-green-200';
      case 'SUSPICIOUS': return 'text-red-600 bg-red-50 border-red-200';
      case 'INFERRED': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 pt-16 lg:pt-0">
      <div className="mb-6 md:mb-8 animate-fade-in-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
          <ShieldAlert className="text-[#6B46C1]" /> Seller Scanner (TRUSTPAY)
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Investigate seller domains and gather evidence before trusting them.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm h-fit animate-fade-in-up delay-100">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Seller Website URL</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" placeholder="https://..." required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#6B46C1] hover:bg-[#5a3a9e] text-white font-bold py-3 rounded-lg mt-4 transition-colors flex justify-center items-center gap-2 shadow-lg">
              {loading ? <><Loader2 className="animate-spin" size={20} /> Investigating...</> : <><Search size={20} /> Scan Seller</>}
            </button>
          </form>
        </div>

        <div className="animate-fade-in-up delay-200">
          {result ? (
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-6">
                {result.overall_status === 'RISKY' ? <AlertTriangle className="text-red-500 shrink-0" size={32} /> : <ShieldCheck className="text-green-500 shrink-0" size={32} />}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1A202C]">Evidence Report</h3>
                  <p className="text-sm text-gray-500 truncate max-w-[200px] md:max-w-full">Domain: {result.domain}</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Evidence Collected</p>
                {result.evidence.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-2 gap-2">
                      <p className="text-sm font-medium text-gray-800 pr-4">{item.description}</p>
                      <span className={`text-[10px] md:text-xs px-2 py-1 rounded border font-bold shrink-0 ${getStatusColor(item.verification_status)}`}>{item.verification_status}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
                      <span className="truncate pr-2">Source: {item.source}</span>
                      <span className="shrink-0">Severity: {item.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/50 p-6 rounded-2xl border border-gray-200 border-dashed h-full flex flex-col items-center justify-center text-gray-400 min-h-[250px] md:min-h-[300px]">
              <ShieldAlert size={48} className="mb-4 opacity-50 text-[#6B46C1]" />
              <p className="text-center text-sm md:text-base">Enter a seller URL to collect evidence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
