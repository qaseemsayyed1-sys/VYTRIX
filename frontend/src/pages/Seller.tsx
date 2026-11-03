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
      case 'VERIFIED': return 'text-[#2DD4BF] bg-[#2DD4BF]/10 border-[#2DD4BF]/20';
      case 'SUSPICIOUS': return 'text-[#FF5B65] bg-[#FF5B65]/10 border-[#FF5B65]/20';
      case 'INFERRED': return 'text-[#A78BFA] bg-[#A78BFA]/10 border-[#A78BFA]/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 pt-16 lg:pt-0">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <ShieldAlert className="text-[#A78BFA]" /> Seller Scanner
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Investigate seller domains and gather evidence before trusting them with your money.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-[#161925] p-4 md:p-6 rounded-2xl border border-[#2A2F45] shadow-lg h-fit">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Seller Website URL</label>
              <input 
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                className="w-full bg-[#0F111A] border border-[#2A2F45] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A78BFA]" 
                placeholder="https://..."
                required 
              />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#A78BFA] hover:bg-[#8b6cf0] text-[#0F111A] font-bold py-3 rounded-lg mt-4 transition-colors flex justify-center items-center gap-2 shadow-lg shadow-[#A78BFA]/20">
              {loading ? <><Loader2 className="animate-spin" size={20} /> Investigating...</> : <><Search size={20} /> Scan Seller</>}
            </button>
          </form>
        </div>

        <div>
          {result ? (
            <div className="bg-[#161925] p-4 md:p-6 rounded-2xl border border-[#2A2F45] shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                {result.overall_status === 'RISKY' ? (
                  <AlertTriangle className="text-[#FF5B65] shrink-0" size={32} />
                ) : (
                  <ShieldCheck className="text-[#2DD4BF] shrink-0" size={32} />
                )}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">Evidence Report</h3>
                  <p className="text-sm text-gray-400 truncate max-w-[200px] md:max-w-full">Domain: {result.domain}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">Evidence Collected</p>
                {result.evidence.map((item: any, index: number) => (
                  <div key={index} className="bg-[#1E2233] p-4 rounded-xl border border-[#2A2F45]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-2 gap-2">
                      <p className="text-sm font-medium text-gray-200 pr-4">{item.description}</p>
                      <span className={`text-[10px] md:text-xs px-2 py-1 rounded border font-bold shrink-0 ${getStatusColor(item.verification_status)}`}>
                        {item.verification_status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-[#2A2F45]/50">
                      <span className="truncate pr-2">Source: {item.source}</span>
                      <span className="shrink-0">Severity: {item.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#161925]/50 p-6 rounded-2xl border border-[#2A2F45] border-dashed h-full flex flex-col items-center justify-center text-gray-500 min-h-[250px] md:min-h-[300px]">
              <ShieldAlert size={48} className="mb-4 opacity-50" />
              <p className="text-center text-sm md:text-base">Enter a seller URL to collect evidence and assess trustworthiness.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
