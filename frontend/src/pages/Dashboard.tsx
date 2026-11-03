import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, ShieldAlert, Sparkles, Plus, X, ShieldCheck, ShoppingBag, Wallet, Search, Bell
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', amount: 40000 }, { name: 'Feb', amount: 30000 }, { name: 'Mar', amount: 55000 },
  { name: 'Apr', amount: 45000 }, { name: 'May', amount: 60000 }, { name: 'Jun', amount: 50000 }, { name: 'Jul', amount: 75000 },
];

const transactions = [
  { id: 1, name: 'Apple Store', type: 'Shopping', amount: -65000, status: 'Pending', icon: '🍎' },
  { id: 2, name: 'Salary Deposit', type: 'Income', amount: 100000, status: 'Completed', icon: '🏦' },
  { id: 3, name: 'Amazon', type: 'Shopping', amount: -2500, status: 'Flagged', icon: '📦' },
  { id: 4, name: 'Netflix', type: 'Subscription', amount: -649, status: 'Completed', icon: '🎬' },
];

export function Dashboard() {
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 pt-16 lg:pt-0">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 animate-fade-in-up">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input type="text" placeholder="Search..." className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none shadow-sm text-sm" />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <button className="p-2.5 bg-white rounded-full border border-gray-200 shadow-sm relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:border-[#6B46C1] transition-colors">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-8 h-8 rounded-full" />
            <div className="hidden md:block">
              <p className="text-sm font-bold text-gray-800">Rahul Sharma</p>
              <p className="text-[10px] text-[#6B46C1] font-bold">Premium Member</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in-up delay-100">
        <div>
          <h2 className="text-3xl font-bold text-[#1A202C] mb-1 flex items-center gap-2">
            {getGreeting()}, Rahul! <span className="text-yellow-500">👋</span>
          </h2>
          <p className="text-gray-500 text-sm">Here's your financial intelligence at a glance.</p>
        </div>
        <Link to="/purchase" className="bg-[#6B46C1] hover:bg-[#5a3a9e] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#6B46C1]/30 w-full md:w-auto">
          <Plus size={18} /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-200">
        <div onClick={() => setShowBalanceModal(true)} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#EBE5FA] p-3 rounded-xl text-[#6B46C1]"><Wallet size={24} /></div>
            <span className="text-xs font-bold text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md"><TrendingUp size={12} /> +12.5%</span>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold text-[#1A202C]">₹85,000.00</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#E6F4EA] p-3 rounded-xl text-green-600"><TrendingUp size={24} /></div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Monthly Income</p>
          <h3 className="text-3xl font-bold text-[#1A202C]">₹60,000</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#F3E8FF] p-3 rounded-xl text-purple-600"><ShoppingBag size={24} /></div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">Purchase Affordability</p>
          <h3 className="text-3xl font-bold text-[#1A202C]">₹42,000</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#1A202C]">Financial Overview</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm text-gray-600 rounded-lg px-3 py-1.5 focus:outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B46C1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6B46C1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderColor: '#E2E8F0', borderRadius: '8px' }} itemStyle={{ color: '#6B46C1' }} cursor={{ stroke: '#6B46C1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area type="monotone" dataKey="amount" stroke="#6B46C1" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#1C1445] to-[#2D2162] p-6 rounded-2xl shadow-xl relative overflow-hidden text-white">
            <div className="absolute -right-4 -bottom-4 opacity-20"><ShieldCheck size={120} /></div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-[#9B87D8]" /><h3 className="font-bold">SENTINEL Intelligence</h3>
            </div>
            <h2 className="text-2xl font-bold mb-1">All Clear!</h2>
            <p className="text-gray-300 text-sm mb-6">No suspicious activity detected.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#1A202C]">Recent Alerts</h3>
              <Link to="/alerts" className="text-xs text-[#6B46C1] font-bold">View All</Link>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
              <ShieldAlert size={18} className="text-red-500 mt-0.5 shrink-0" />
              <div><p className="text-sm font-bold text-gray-800">Checkout mismatch</p><p className="text-xs text-gray-500">Amazon • 2h ago</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-[#1A202C]">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs text-[#6B46C1] font-bold">View All</Link>
          </div>
          <div className="p-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">{tx.icon}</div>
                  <div><p className="text-sm font-bold text-[#1A202C]">{tx.name}</p><p className="text-xs text-gray-500">{tx.type}</p></div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                  <span className={`text-xs px-2 py-1 rounded-md font-bold ${tx.status === 'Completed' ? 'bg-green-50 text-green-600' : tx.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'}`}>{tx.status}</span>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-[#1A202C]'}`}>{tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-[#1A202C] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
             <Link to="/seller" className="p-4 bg-gray-50 rounded-xl hover:bg-[#EBE5FA] hover:text-[#6B46C1] transition-colors flex flex-col items-center gap-2">
                <Search size={20} /><span className="text-xs font-bold">Scan Seller</span>
             </Link>
             <Link to="/purchase" className="p-4 bg-gray-50 rounded-xl hover:bg-[#E6F4EA] hover:text-green-600 transition-colors flex flex-col items-center gap-2">
                <ShieldCheck size={20} /><span className="text-xs font-bold">Check Purchase</span>
             </Link>
          </div>
        </div>
      </div>

      {showBalanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setShowBalanceModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"><X size={20} /></button>
            <h3 className="text-xl font-bold text-[#1A202C] mb-4">Income & Expense Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-500">Total Income</span><span className="text-green-500 font-bold">+₹1,00,000</span></div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"><span className="text-gray-500">Total Expenses</span><span className="text-red-500 font-bold">-₹40,000</span></div>
              <div className="flex justify-between items-center p-3 bg-[#EBE5FA] rounded-lg border border-[#6B46C1]/20 mt-2"><span className="text-[#6B46C1] font-bold">Net Savings</span><span className="text-[#6B46C1] font-bold text-lg">₹60,000</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
