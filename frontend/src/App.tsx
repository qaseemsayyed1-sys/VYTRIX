import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { Seller } from './pages/Seller';
import { Purchase } from './pages/Purchase';
import { FileText, ArrowRightLeft, Bot, Bell, TrendingUp, Settings as SettingsIcon, ShieldCheck, Sparkles } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/sentinel" element={<SentinelChat />} />
          <Route path="/passports" element={<PassportsPage />} />
          
          <Route path="/transactions" element={
            <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                  <ArrowRightLeft className="text-[#FF6B35]" /> Transactions
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Verified PayPal payment history.</p>
              </div>
              <div className="bg-[#151B23] rounded-2xl border border-gray-800/60 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#1a222c] rounded-xl border border-gray-800 mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white shrink-0">P</div>
                    <div>
                      <p className="font-bold text-white">PayPal Sandbox</p>
                      <p className="text-xs text-gray-400">TXN-9302849204</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto pl-14 sm:pl-0">
                    <p className="font-bold text-white">₹70,000.00</p>
                    <p className="text-xs text-[#20C997]">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          } />

          <Route path="/alerts" element={
            <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                  <Bell className="text-[#FF6B35]" /> Security & Alerts Center
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Important account alerts and checkout discrepancies.</p>
              </div>
              <div className="bg-[#151B23] p-4 md:p-6 rounded-2xl border border-gray-800/60">
                <div className="flex items-start gap-4 p-4 bg-[#FF5B65]/10 border border-[#FF5B65]/20 rounded-xl mb-4">
                  <ShieldCheck className="text-[#FF5B65] mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base">Checkout Discrepancy Detected</h4>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">A purchase at Apple Store attempted to charge ₹2,500 more than the listed price.</p>
                  </div>
                </div>
              </div>
            </div>
          } />

          <Route path="/insights" element={
            <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                  <TrendingUp className="text-[#FF6B35]" /> Financial Insights
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Monthly spending trends and AI observations.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60">
                  <h3 className="text-white font-bold mb-4">Monthly Spending Trend</h3>
                  <div className="h-40 flex items-end gap-2 justify-between">
                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-[#0B0F14] rounded-t-md relative group">
                        <div className="absolute bottom-0 w-full bg-[#FF6B35]/50 rounded-t-md group-hover:bg-[#FF6B35] transition-all" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Jan</span><span>Jul</span>
                  </div>
                </div>

                <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-[#FF6B35]" size={18} /> AI Observations
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><span className="text-[#FF6B35]">•</span> Your spending on shopping increased by 15% this month.</li>
                    <li className="flex gap-2"><span className="text-[#FF6B35]">•</span> You are saving 20% more compared to last month.</li>
                    <li className="flex gap-2"><span className="text-[#FF6B35]">•</span> Consider setting a budget for subscriptions to save ₹500/month.</li>
                  </ul>
                </div>
              </div>
            </div>
          } />
          
          <Route path="/settings" element={
            <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
                  <SettingsIcon className="text-[#FF6B35]" /> Settings
                </h2>
                <p className="text-gray-400 text-sm md:text-base">Profile, currency preferences, and security.</p>
              </div>
              <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60 h-64 flex items-center justify-center text-gray-500">
                User settings will go here
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </AuthProvider>
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
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col pt-16 lg:pt-0 pb-10">
      <div className="mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <Bot className="text-[#FF6B35]" /> SENTINEL AI
        </h2>
        <p className="text-gray-400 text-sm">Chat with your unified purchase intelligence engine.</p>
      </div>
      
      <div className="bg-[#151B23] flex-1 rounded-2xl border border-gray-800/60 p-4 md:p-6 flex flex-col justify-end overflow-hidden">
        <div className="space-y-4 mb-4 overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-3 md:p-4 rounded-xl max-w-[85%] text-sm md:text-base ${msg.isBot ? 'bg-[#1a222c] text-gray-300' : 'bg-[#FF6B35]/10 border border-[#FF6B35]/20 text-white ml-auto'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SENTINEL anything..." 
            className="flex-1 bg-[#0B0F14] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] text-sm md:text-base" 
          />
          <button type="submit" className="bg-[#FF6B35] px-4 md:px-6 rounded-lg font-bold text-white hover:bg-[#e65a2a] shrink-0">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function PassportsPage() {
  const [selectedPassport, setSelectedPassport] = useState<any>(null);

  const mockPassports = [
    { id: 'PASS-8492', product: 'MacBook Air M2', date: 'Oct 28, 2026', risk: 'Proceed with Caution', status: 'PAID', aiNote: 'Checkout amount was ₹2,500 higher than expected. Financial health is moderate.' },
    { id: 'PASS-8481', product: 'iPhone 15 Pro', date: 'Oct 25, 2026', risk: 'High Risk Detected', status: 'REJECTED', aiNote: 'Seller domain lacked contact info. Purchase exceeds disposable income.' },
  ];

  return (
    <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <FileText className="text-[#FF6B35]" /> Purchase Passports
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Your immutable, versioned purchase audit trail.</p>
      </div>
      
      <div className="bg-[#151B23] rounded-2xl border border-gray-800/60 overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-[#0B0F14] border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="p-4 font-medium">Passport ID</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Risk</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {mockPassports.map((p) => (
              <tr key={p.id} className="hover:bg-[#1a222c] transition-colors cursor-pointer" onClick={() => setSelectedPassport(p)}>
                <td className="p-4 font-mono text-sm text-gray-300">{p.id}</td>
                <td className="p-4 text-white font-medium">{p.product}</td>
                <td className="p-4">
                  <span className={`font-medium text-xs md:text-sm ${p.risk.includes('High') ? 'text-[#FF5B65]' : 'text-[#F5B942]'}`}>
                    {p.risk}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-[#FF6B35] text-sm font-medium hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPassport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#151B23] border border-gray-800 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setSelectedPassport(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-1">Passport Details</h3>
            <p className="text-[#FF6B35] font-mono text-sm mb-6">{selectedPassport.id}</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Product</p>
                <p className="text-white">{selectedPassport.product}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                <p className={selectedPassport.status === 'PAID' ? 'text-[#20C997]' : 'text-[#FF5B65]'}>{selectedPassport.status}</p>
              </div>
              <div className="bg-[#0B0F14] p-4 rounded-xl border border-gray-800 mt-4">
                <p className="text-xs text-[#FF6B35] uppercase font-bold mb-2">AI Analysis Note</p>
                <p className="text-sm text-gray-300">{selectedPassport.aiNote}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
