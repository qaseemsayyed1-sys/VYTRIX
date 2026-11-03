import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { api } from './services/api';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { Seller } from './pages/Seller';
import { Purchase } from './pages/Purchase';
import { 
  FileText, ArrowRightLeft, Bot, Bell, TrendingUp, Settings as SettingsIcon, 
  ShieldCheck, Sparkles, Loader2 
} from 'lucide-react';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/sentinel" element={<SentinelChat />} />
        <Route path="/passports" element={<PassportsPage />} />
        
        <Route path="/transactions" element={
          <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
                <ArrowRightLeft className="text-[#6B46C1]" /> Transactions
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Verified PayPal payment history.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#6B46C1] rounded-full flex items-center justify-center font-bold text-white shrink-0">P</div>
                  <div>
                    <p className="font-bold text-[#1A202C]">PayPal Sandbox</p>
                    <p className="text-xs text-gray-500">TXN-9302849204</p>
                  </div>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto pl-14 sm:pl-0">
                  <p className="font-bold text-[#1A202C]">₹70,000.00</p>
                  <p className="text-xs text-green-500 font-bold">Completed</p>
                </div>
              </div>
            </div>
          </div>
        } />

        <Route path="/alerts" element={
          <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
                <Bell className="text-[#6B46C1]" /> Security & Alerts Center
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Important account alerts and checkout discrepancies.</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-xl mb-4">
                <ShieldCheck className="text-red-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-[#1A202C] font-bold text-sm md:text-base">Checkout Discrepancy Detected</h4>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">A purchase at Apple Store attempted to charge ₹2,500 more than the listed price.</p>
                </div>
              </div>
            </div>
          </div>
        } />

        <Route path="/insights" element={
          <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
                <TrendingUp className="text-[#6B46C1]" /> Financial Insights
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Monthly spending trends and AI observations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-[#1A202C] font-bold mb-4">Monthly Spending Trend</h3>
                <div className="h-40 flex items-end gap-2 justify-between">
                  {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-gray-100 rounded-t-md relative group">
                      <div className="absolute bottom-0 w-full bg-[#6B46C1]/50 rounded-t-md group-hover:bg-[#6B46C1] transition-all" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Jan</span><span>Jul</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-[#1A202C] font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="text-[#6B46C1]" size={18} /> AI Observations
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="text-[#6B46C1]">•</span> Your spending on shopping increased by 15% this month.</li>
                  <li className="flex gap-2"><span className="text-[#6B46C1]">•</span> You are saving 20% more compared to last month.</li>
                  <li className="flex gap-2"><span className="text-[#6B46C1]">•</span> Consider setting a budget for subscriptions to save ₹500/month.</li>
                </ul>
              </div>
            </div>
          </div>
        } />
        
        <Route path="/settings" element={
          <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
                <SettingsIcon className="text-[#6B46C1]" /> Settings
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Profile, currency preferences, and security.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400">
              User settings will go here
            </div>
          </div>
        } />
      </Routes>
    </Layout>
  );
}

function SentinelChat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am SENTINEL. I can analyze your financial health, seller risks, and checkout integrity. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let botReply = "Based on your current profile, you can afford this purchase, but keep an eye on hidden checkout fees.";
      if (input.toLowerCase().includes('laptop') || input.toLowerCase().includes('afford')) {
        botReply = "Your disposable income is ₹60,000. The laptop costs ₹65,000. Buying it will drop your savings to -₹15,000. I recommend proceeding with caution.";
      } else if (input.toLowerCase().includes('seller') || input.toLowerCase().includes('risk')) {
        botReply = "The seller's domain is secure (HTTPS verified), but their contact information is missing. This is a medium risk indicator.";
      }
      
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col pt-16 lg:pt-0 pb-10 animate-fade-in-up">
      <div className="mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
          <Bot className="text-[#6B46C1]" /> SENTINEL AI
        </h2>
        <p className="text-gray-500 text-sm">Chat with your unified purchase intelligence engine.</p>
      </div>
      
      <div className="bg-white flex-1 rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 flex flex-col justify-end overflow-hidden">
        <div className="space-y-4 mb-4 overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 md:p-4 rounded-xl max-w-[85%] text-sm md:text-base animate-fade-in-up ${
              msg.isBot ? 'bg-gray-50 text-[#1A202C] border border-gray-100' : 'bg-[#6B46C1]/10 border border-[#6B46C1]/30 text-[#1A202C] ml-auto shadow-sm'
            }`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask SENTINEL anything..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1] text-sm md:text-base transition-colors" />
          <button type="submit" className="bg-[#6B46C1] px-4 md:px-6 rounded-lg font-bold text-white hover:bg-[#5a3a9e] shrink-0 transition-all shadow-lg shadow-[#6B46C1]/20">Send</button>
        </form>
      </div>
    </div>
  );
}

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
    if (status === 'success') return 'bg-green-500';
    if (status === 'warning') return 'bg-yellow-500';
    if (status === 'danger') return 'bg-red-500';
    return 'bg-gray-300';
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
          <FileText className="text-[#6B46C1]" /> Purchase Passports
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Your immutable, versioned purchase audit trail.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-500 text-sm">
              <th className="p-4 font-medium">Passport ID</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  <Loader2 className="animate-spin mx-auto mb-2 text-[#6B46C1]" size={24} />
                  Loading your secure passports...
                </td>
              </tr>
            ) : passports.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No passports generated yet. Run a purchase analysis!
                </td>
              </tr>
            ) : (
              passports.map((p: any) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedPassport(p)}>
                  <td className="p-4 font-mono text-sm text-[#1A202C]">{p.id.slice(0, 8)}...</td>
                  <td className="p-4 text-[#1A202C] font-medium">{p.unified_assessment?.overall_recommendation || 'Analyzed'}</td>
                  <td className="p-4 text-gray-500">₹{p.approved_amount || '0'}</td>
                  <td className="p-4">
                    <button className="text-[#6B46C1] text-sm font-medium hover:underline">View Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPassport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-2xl my-8">
            <button onClick={() => setSelectedPassport(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#6B46C1]" size={28} />
              <div>
                <h3 className="text-xl font-bold text-[#1A202C]">Passport Details</h3>
                <p className="text-[#6B46C1] font-mono text-sm">{selectedPassport.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Recommendation</p>
                <p className="text-[#1A202C] text-sm">{selectedPassport.unified_assessment?.overall_recommendation?.replace(/_/g, ' ')}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Approved Amount</p>
                <p className="text-green-600 text-sm font-bold">₹{selectedPassport.approved_amount}</p>
              </div>
            </div>

            <div className="bg-[#6B46C1]/5 p-4 rounded-xl border border-[#6B46C1]/20 mb-6">
              <p className="text-xs text-[#6B46C1] uppercase font-bold mb-2">AI Analysis Note</p>
              <p className="text-sm text-gray-600">
                {selectedPassport.unified_assessment?.warnings?.[0] || "The purchase appears financially sound and the checkout matches."}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#1A202C] font-bold mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#6B46C1]" /> SENTINEL Activity Timeline
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
                        <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-[#1A202C]">{item.step}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-mono">{item.time}</p>
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

export default App;
