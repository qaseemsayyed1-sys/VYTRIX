import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { Seller } from './pages/Seller';
import { Purchase } from './pages/Purchase';
import { FileText, ArrowRightLeft, Sparkles, ShieldCheck } from 'lucide-react';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/purchase" element={<Purchase />} />
          
          <Route path="/sentinel" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><Sparkles className="text-orange-500" /> SENTINEL Intelligence</h2>
                <p className="text-gray-400">Unified AI orchestration layer monitoring your ecosystem.</p>
              </div>
              <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60">
                <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-green-900/50 mb-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-green-500" size={24} />
                    <div>
                      <p className="font-bold text-white">System Health: Optimal</p>
                      <p className="text-xs text-gray-400">All agents (LIFEPAY, TRUSTPAY, AEGIS) are online and active.</p>
                    </div>
                  </div>
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
                </div>
              </div>
            </div>
          } />

          <Route path="/passports" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><FileText className="text-orange-500" /> Purchase Passports</h2>
                <p className="text-gray-400">Your immutable, versioned purchase audit trail.</p>
              </div>
              <div className="bg-[#121212] rounded-2xl border border-gray-800/60 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#1a1a1a] border-b border-gray-800">
                    <tr className="text-gray-400 text-sm">
                      <th className="p-4 font-medium">Passport ID</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium">Risk Assessment</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    <tr className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="p-4 font-mono text-sm text-gray-300">#PASS-8492</td>
                      <td className="p-4 text-gray-400">Oct 28, 2026</td>
                      <td className="p-4"><span className="text-yellow-400 font-medium">Proceed with Caution</span></td>
                      <td className="p-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold">PAID</span></td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="p-4 font-mono text-sm text-gray-300">#PASS-8481</td>
                      <td className="p-4 text-gray-400">Oct 25, 2026</td>
                      <td className="p-4"><span className="text-red-400 font-medium">High Risk Detected</span></td>
                      <td className="p-4"><span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-bold">REJECTED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />
          
          <Route path="/transactions" element={
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white"><ArrowRightLeft className="text-orange-500" /> Transactions</h2>
                <p className="text-gray-400">Verified PayPal payment history.</p>
              </div>
              <div className="bg-[#121212] rounded-2xl border border-gray-800/60 p-6">
                <div className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-xl border border-gray-800 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">P</div>
                    <div>
                      <p className="font-bold text-white">PayPal Sandbox</p>
                      <p className="text-xs text-gray-400">TXN-9302849204</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">₹70,000.00</p>
                    <p className="text-xs text-green-400">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;