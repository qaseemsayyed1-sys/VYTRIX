function PassportsPage() {
  const [passports, setPassports] = useState<any[]>([]);
  const [selectedPassport, setSelectedPassport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const response = await api.get('/purchase/history');
        setPassports(response.data);
      } catch (error) {
        console.error("Failed to fetch passports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPassports();
  }, []);

  const getTimelineColor = (status: string) => {
    if (status === 'success') return 'bg-[#8FBC8F]';
    if (status === 'warning') return 'bg-[#D4B494]';
    if (status === 'danger') return 'bg-[#CD5C5C]';
    return 'bg-[#3B332F]';
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#F3EFE6]">
          <FileText className="text-[#C4A484]" /> Purchase Passports
        </h2>
        <p className="text-[#A69F96] text-sm md:text-base">Your immutable, versioned purchase audit trail.</p>
      </div>
      
      <div className="bg-[#26211E] rounded-2xl border border-[#3B332F] overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-[#1C1816] border-b border-[#3B332F]">
            <tr className="text-[#A69F96] text-sm">
              <th className="p-4 font-medium">Passport ID</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3B332F]">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#A69F96]">
                  <Loader2 className="animate-spin mx-auto mb-2 text-[#C4A484]" size={24} />
                  Loading your secure passports...
                </td>
              </tr>
            ) : passports.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#A69F96]">
                  No passports generated yet. Run a purchase analysis!
                </td>
              </tr>
            ) : (
              passports.map((p) => (
                <tr key={p.id} className="hover:bg-[#3B332F]/30 transition-colors cursor-pointer" onClick={() => setSelectedPassport(p)}>
                  <td className="p-4 font-mono text-sm text-[#F3EFE6]">{p.id.slice(0, 8)}...</td>
                  <td className="p-4 text-[#F3EFE6] font-medium">{p.unified_assessment?.overall_recommendation || 'Analyzed'}</td>
                  <td className="p-4 text-[#A69F96]">₹{p.approved_amount || '0'}</td>
                  <td className="p-4">
                    <button className="text-[#C4A484] text-sm font-medium hover:underline">View Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPassport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#26211E] border border-[#3B332F] rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl my-8">
            <button onClick={() => setSelectedPassport(null)} className="absolute top-4 right-4 text-[#A69F96] hover:text-[#F3EFE6]">
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#C4A484]" size={28} />
              <div>
                <h3 className="text-xl font-bold text-[#F3EFE6]">Passport Details</h3>
                <p className="text-[#C4A484] font-mono text-sm">{selectedPassport.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1C1816] p-3 rounded-lg border border-[#3B332F]">
                <p className="text-xs text-[#A69F96] uppercase font-bold mb-1">Recommendation</p>
                <p className="text-[#F3EFE6] text-sm">{selectedPassport.unified_assessment?.overall_recommendation?.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-[#1C1816] p-3 rounded-lg border border-[#3B332F]">
                <p className="text-xs text-[#A69F96] uppercase font-bold mb-1">Approved Amount</p>
                <p className="text-[#8FBC8F] text-sm font-bold">₹{selectedPassport.approved_amount}</p>
              </div>
            </div>

            <div className="bg-[#1C1816] p-4 rounded-xl border border-[#C4A484]/30 mb-6">
              <p className="text-xs text-[#C4A484] uppercase font-bold mb-2">AI Analysis Note</p>
              <p className="text-sm text-[#A69F96]">
                {selectedPassport.unified_assessment?.warnings?.[0] || "The purchase appears financially sound and the checkout matches."}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#F3EFE6] font-bold mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#C4A484]" /> SENTINEL Activity Timeline
              </p>
              <div className="space-y-0">
                {[
                  { step: 'Financial Engine', desc: 'Income and savings verified.', status: 'warning', time: new Date(selectedPassport.created_at).toLocaleTimeString() },
                  { step: 'Checkout Analysis', desc: `Approved quote: ₹${selectedPassport.approved_amount}`, status: 'success', time: new Date(selectedPassport.created_at).toLocaleTimeString() },
                  { step: 'Unified AI Engine', desc: 'Generated assessment successfully.', status: 'success', time: new Date(selectedPassport.created_at).toLocaleTimeString() }
                ].map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${getTimelineColor(item.status)}`}></div>
                      {idx !== 2 && (
                        <div className="w-0.5 h-full bg-[#3B332F] my-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-[#F3EFE6]">{item.step}</p>
                      <p className="text-xs text-[#A69F96] mt-0.5">{item.desc}</p>
                      <p className="text-[10px] text-[#A69F96]/50 mt-1 font-mono">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                  }
