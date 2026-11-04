import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { api } from './services/api';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { Seller } from './pages/Seller';
import { Purchase } from './pages/Purchase';
import { Login } from './pages/Login';
import { 
  FileText, ArrowRightLeft, Bot, Bell, TrendingUp, Settings as SettingsIcon, 
  ShieldCheck, Sparkles, Loader2 
} from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#6B46C1]" size={48} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
      
      <Route path="/*" element={
        session ? (
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
                    <p className="text-gray-500 text-sm md:text-base">Manage your profile, currency preferences, and security.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-[#1A202C] font-bold mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                          <input type="text" defaultValue="Rahul Sharma" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                          <input type="email" defaultValue="rahul@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-[#1A202C] font-bold mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-500 mb-1">Default Currency</label>
                          <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]">
                            <option>INR (₹)</option>
                            <option>USD ($)</option>
                            <option>EUR (€)</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-gray-700 font-medium">Email Notifications</span>
                          <div className="w-10 h-5 bg-[#6B46C1] rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="bg-[#6B46C1] hover:bg-[#5a3a9e] text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg">
                      Save Changes
                    </button>
                  </div>
                </div>
              } />
            </Routes>
          </Layout>
        ) : (
          <Navigate to="/login" />
        )
      } />
    </Routes>
  );
}

function SentinelChat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am SENTINEL. I can analyze your financial health, seller risks, and checkout integrity. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { text, isBot: false }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let botReply = "Based on your current profile, you can afford this purchase, but keep an eye on hidden checkout fees.";
      if (text.toLowerCase().includes('laptop') || text.toLowerCase().includes('afford')) {
        botReply = "Your disposable income is ₹60,000. The laptop costs ₹65,000. Buying it will drop your savings to -₹15,000. I recommend proceeding with caution.";
      } else if (text.toLowerCase().includes('seller') || text.toLowerCase().includes('risk')) {
        botReply = "The seller's domain is secure (HTTPS verified), but their contact information is missing. This is a medium risk indicator.";
      }
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const suggestions = ["Can I afford a ₹65,000 laptop?", "Why is this seller risky?", "Show my checkout discrepancies"];

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
            <div key={idx} className={`p-3 md:p-4 rounded-xl max-w-[85%] text-sm md:text-base animate-fade-in-up ${msg.isBot ? 'bg-gray-50 text-[#1A202C] border border-gray-100' : 'bg-[#6B46C1]/10 border border-[#6B46C1]/30 text-[#1A202C] ml-auto shadow-sm'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} className="bg-[#EBE5FA] text-[#6B46C1] text-xs md:text-sm px-3 py-2 rounded-lg font-medium hover:bg-[#6B46C1] hover:text-white transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex gap-2 relative">
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

  const columnDefs = [
    { field: 'id', headerName: 'Passport ID', flex: 1, valueFormatter: (p: any) => p.value.slice(0, 8) + '...' },
    { field: 'approved_amount', headerName: 'Amount', flex: 1, valueFormatter: (p: any) => `₹${p.value || 0}` },
    { 
      field: 'unified_assessment.overall_recommendation', 
      headerName: 'Risk Assessment', 
      flex: 1,
      cellRenderer: (p: any) => (
        <span className={`px-2 py-1 rounded-md text-xs font-bold ${p.value === 'HIGH_RISK' ? 'bg-red-100 text-red-600' : p.value === 'PROCEED_WITH_CAUTION' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
          {p.value?.replace(/_/g, ' ') || 'Analyzed'}
        </span>
      )
    },
    {
      headerName: 'Action',
      flex: 1,
      cellRenderer: (p: any) => (
        <button onClick={() => setSelectedPassport(p.data)} className="text-[#6B46C1] font-medium text-sm hover:underline">
          View Details
        </button>
      )
    }
  ];

  const defaultColDef = { sortable: true, filter: true, resizable: true };

  return (
    <div className="max-w-5xl mx-auto pt-16 lg:pt-0 pb-10 animate-fade-in-up">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
          <FileText className="text-[#6B46C1]" /> Purchase Passports
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Your immutable, versioned purchase audit trail.</p>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex flex-col items-center">
            <Loader2 className="animate-spin mb-2 text-[#6B46C1]" size={24} />
            Loading your secure passports...
          </div>
        ) : passports.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No passports generated yet. Run a purchase analysis!
          </div>
        ) : (
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={passports}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={5}
              domLayout='autoHeight'
            />
          </div>
        )}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default App;