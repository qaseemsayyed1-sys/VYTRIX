import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { Seller } from './pages/Seller';
import { Purchase } from './pages/Purchase';
import { FileText, ArrowRightLeft, Bot, Bell, TrendingUp, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/purchase" element={<Purchase />} />
          
          {/* SENTINEL AI Mock Chat */}
          <Route path="/sentinel" element={
            <div className="max-w-4xl mx-auto h-[80vh] flex flex-col">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><Bot className="text-[#FF6B35]" /> SENTINEL AI</h2>
                <p className="text-gray-400">Chat with your unified purchase intelligence engine.</p>
              </div>
              <div className="bg-[#151B23] flex-1 rounded-2xl border border-gray-800/60 p-6 flex flex-col justify-end">
                <div className="space-y-4 mb-6 overflow-y-auto">
                  <div className="bg-[#1a222c] p-4 rounded-xl w-fit max-w-[80%] text-gray-300">
                    Can I afford this laptop?
                  </div>
                  <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/20 p-4 rounded-xl w-fit max-w-[80%] text-white ml-auto">
                    Based on your current savings of ₹50,000, purchasing this ₹65,000 laptop will make your savings negative (-₹15,000). It is highly unaffordable right now.
                  </div>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Ask SENTINEL anything..." className="flex-1 bg-[#0B0F14] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35]" />
                  <button className="bg-[#FF6B35] px-6 rounded-lg font-bold text-white hover:bg-[#e65a2a]">Send</button>
                </div>
              </div>
            </div>
          } />

          {/* Purchase Passports Mock Data */}
          <Route path="/passports" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><FileText className="text-[#FF6B35]" /> Purchase Passports</h2>
                <p className="text-gray-400">Your immutable, versioned purchase audit trail.</p>
              </div>
              <div className="bg-[#151B23] rounded-2xl border border-gray-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#0B0F14] border-b border-gray-800">
                    <tr className="text-gray-400 text-sm">
                      <th className="p-4 font-medium">Passport ID</th>
                      <th className="p-4 font-medium">Product</th>
                      <th className="p-4 font-medium">Risk Assessment</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-[#1a222c] transition-colors cursor-pointer">
                      <td className="p-4 font-mono text-sm text-gray-300">#PASS-8492</td>
                      <td className="p-4 text-white">MacBook Air M2</td>
                      <td className="p-4"><span className="text-[#F5B942] font-medium">Proceed with Caution</span></td>
                      <td className="p-4"><span className="bg-[#20C997]/10 text-[#20C997] px-2 py-1 rounded text-xs font-bold">PAID</span></td>
                    </tr>
                    <tr className="hover:bg-[#1a222c] transition-colors cursor-pointer">
                      <td className="p-4 font-mono text-sm text-gray-300">#PASS-8481</td>
                      <td className="p-4 text-white">iPhone 15 Pro</td>
                      <td className="p-4"><span className="text-[#FF5B65] font-medium">High Risk Detected</span></td>
                      <td className="p-4"><span className="bg-[#FF5B65]/10 text-[#FF5B65] px-2 py-1 rounded text-xs font-bold">REJECTED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />

          {/* Transactions Mock Data */}
          <Route path="/transactions" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><ArrowRightLeft className="text-[#FF6B35]" /> Transactions</h2>
                <p className="text-gray-400">Verified PayPal payment history.</p>
              </div>
              <div className="bg-[#151B23] rounded-2xl border border-gray-800/60 p-6">
                <div className="flex justify-between items-center p-4 bg-[#1a222c] rounded-xl border border-gray-800 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">P</div>
                    <div>
                      <p className="font-bold text-white">PayPal Sandbox</p>
                      <p className="text-xs text-gray-400">TXN-9302849204</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₹70,000.00</p>
                    <p className="text-xs text-[#20C997]">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Alerts Page */}
          <Route path="/alerts" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><Bell className="text-[#FF6B35]" /> Security & Alerts Center</h2>
                <p className="text-gray-400">Important account alerts and checkout discrepancies.</p>
              </div>
              <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60">
                <div className="flex items-start gap-4 p-4 bg-[#FF5B65]/10 border border-[#FF5B65]/20 rounded-xl mb-4">
                  <ShieldCheck className="text-[#FF5B65] mt-1" size={20} />
                  <div>
                    <h4 className="text-white font-bold">Checkout Discrepancy Detected</h4>
                    <p className="text-sm text-gray-400 mt-1">A purchase at Apple Store attempted to charge ₹2,500 more than the listed price.</p>
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Financial Insights */}
          <Route path="/insights" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><TrendingUp className="text-[#FF6B35]" /> Financial Insights</h2>
                <p className="text-gray-400">Monthly spending trends and AI observations.</p>
              </div>
              <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60 h-64 flex items-center justify-center text-gray-500">
                (Charts and graphs will go here)
              </div>
            </div>
          } />
          
          {/* Settings */}
          <Route path="/settings" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><SettingsIcon className="text-[#FF6B35]" /> Settings</h2>
                <p className="text-gray-400">Profile, currency preferences, and security.</p>
              </div>
              <div className="bg-[#151B23] p-6 rounded-2xl border border-gray-800/60 h-64 flex items-center justify-center text-gray-500">
                (User settings will go here)
              </div>
            </div>
          } />

        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
