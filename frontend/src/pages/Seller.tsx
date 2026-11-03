
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
      case 'VERIFIED': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'SUSPICIOUS': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'INFERRED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <ShieldAlert className="text-orange-500" /> Seller Scanner (TRUSTPAY)
        </h2>
        <p className="text-gray-400">Investigate seller domains and gather evidence before trusting them with your money.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg h-fit">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Seller Website URL</label>
              <input 
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500" 
                placeholder="https://..."
                required 
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg mt-4 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-orange-900/20">
              {loading ? <><Loader2 className="animate-spin" size={20} /> Investigating...</> : <><Search size={20} /> Scan Seller</>}
            </button>
          </form>
        </div>

        <div>
          {result ? (
            <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                {result.overall_status === 'RISKY' ? (
                  <AlertTriangle className="text-red-500" size={32} />
                ) : (
                  <ShieldCheck className="text-green-500" size={32} />
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">Seller Evidence Report</h3>
                  <p className="text-sm text-gray-400">Domain: {result.domain}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">Evidence Collected</p>
                {result.evidence.map((item: any, index: number) => (
                  <div key={index} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-gray-200 pr-4">{item.description}</p>
                      <span className={`text-xs px-2 py-1 rounded border font-bold ${getStatusColor(item.verification_status)}`}>
                        {item.verification_status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-800/50">
                      <span>Source: {item.source}</span>
                      <span>Severity: {item.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#121212]/50 p-6 rounded-2xl border border-gray-800 border-dashed h-full flex flex-col items-center justify-center text-gray-500 min-h-[300px]">
              <ShieldAlert size={48} className="mb-4 opacity-50" />
              <p className="text-center">Enter a seller URL to collect evidence and assess trustworthiness.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}