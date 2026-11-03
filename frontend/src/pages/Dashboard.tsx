import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, CreditCard, ShieldAlert, Sparkles, Plus, X
} from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', amount: 40000 },
  { name: 'Feb', amount: 30000 },
  { name: 'Mar', amount: 55000 },
  { name: 'Apr', amount: 45000 },
  { name: 'May', amount: 60000 },
  { name: 'Jun', amount: 50000 },
  { name: 'Jul', amount: 75000 },
];

const transactions = [
  { id: 1, name: 'Apple Store', type: 'Shopping', amount: -65000, status: 'Pending', icon: '🍎' },
  { id: 2, name: 'Salary Deposit', type: 'Income', amount: 100000, status: 'Completed', icon: '🏦' },
  { id: 3, name: 'Amazon', type: 'Shopping', amount: -2500, status: 'Flagged', icon: '📦' },
  { id: 4, name: 'Netflix', type: 'Subscription', amount: -649, status: 'Completed', icon: '🎬' },
];

export function Dashboard() {
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 pt-16 lg:pt-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            Good morning, Student <span className="text-yellow-500">👋</span>
          </h2>
          <p className="text-[#E5DDFB]/70 text-sm">Here is your financial and purchase intelligence summary.</p>
        </div>
        <Link to="/purchase" className="bg-[#9B87D8] hover:bg-[#51418F] text-white px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#9B87D8]/20 w-full md:w-auto">
          <Plus size={18} /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => setShowBalanceModal(true)}
          className="lg:col-span-2 bg-[#2E2952] p-4 md:p-6 rounded-2xl border border-[#9B87D8]/20 shadow-xl relative overflow-hidden cursor-pointer hover:border-[#9B87D8]/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9B87D8]/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <p className="text-[#E5DDFB]/70 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white">₹85,000.00</h3>
              <p className="text-xs text-teal-400 flex items-center gap-1 mt-2 font-medium bg-teal-400/10 w-fit px-2 py-1 rounded-md">
                <TrendingUp size={14} /> +12.5% from last month
              </p>
            </div>
            <div className="flex gap-2 bg-[#242044] p-1 rounded-lg border border-[#9B87D8]/20">
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">1M</button>
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">6M</button>
              <button className="px-3 py-1 text-xs bg-[#51418F] text-white rounded shadow">1Y</button>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9B87D8" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#9B87D8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9B87D8" fontSize={12} tickLine={false} axisLine={false} dy={10} opacity={0.5} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#2E2952', borderColor: '#9B87D8', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#E5DDFB' }}
                  cursor={{ stroke: '#9B87D8', strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.5 }}
                />
                <Area type="monotone" dataKey="amount" stroke="#9B87D8" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#51418F] to-[#242044] border border-[#9B87D8]/30 p-6 rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer hover:border-[#9B87D8]/60 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B87D8]/20 rounded-full blur-2xl group-hover:bg-[#9B87D8]/30 transition-all"></div>
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="bg-[#9B87D8]/30 backdrop-blur-md p-2 rounded-lg">
                <CreditCard size={24} className="text-[#E5DDFB]" />
              </div>
              <span className="text-white/80 font-bold italic text-lg tracking-wider">VISA</span>
            </div>
            <p className="text-[#E5DDFB]/70 text-sm mb-1">Available Balance</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">₹60,000.00</h3>
            <div className="flex justify-between items-center text-[#E5DDFB]/50 text-sm font-mono">
              <span>**** **** **** 4289</span>
              <span>12/28</span>
            </div>
          </div>

          <Link to="/alerts" className="block bg-[#2E2952] p-5 rounded-2xl border border-[#9B87D8]/20 shadow-lg cursor-pointer hover:border-[#9B87D8]/50 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#9B87D8]" />
              <h3 className="font-bold text-white">SENTINEL Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#242044] p-3 rounded-xl border border-red-500/30 flex items-start gap-3">
                <ShieldAlert size={18} className="text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Checkout Discrepancy</p>
                  <p className="text-xs text-gray-400 mt-1">₹2,500 hidden fee detected on Apple Store checkout.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#2E2952] rounded-2xl border border-[#9B87D8]/20 shadow-lg overflow-hidden">
          <div className="p-4 md:p-5 border-b border-[#9B87D8]/20 flex justify-between items-center bg-[#51418F]/30">
            <h3 className="font-bold text-white">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs text-[#9B87D8] font-medium hover:text-[#E5DDFB]">View All</Link>
          </div>
          <div className="p-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-[#51418F]/20 rounded-xl transition-colors cursor-pointer gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#242044] border border-[#9B87D8]/20 flex items-center justify-center text-lg shadow-inner shrink-0">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.name}</p>
                    <p className="text-xs text-gray-400">{tx.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    tx.status === 'Completed' ? 'bg-teal-500/10 text-teal-400' :
                    tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-teal-400' : 'text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#2E2952] p-5 rounded-2xl border border-[#9B87D8]/20 shadow-lg flex flex-col">
          <h3 className="font-bold text-white mb-4">Spending Categories</h3>
          <div className="flex-1 flex items-center justify-center relative mb-4">
            <div className="w-32 h-32 rounded-full border-[12px] border-[#242044] border-t-teal-400 border-r-[#9B87D8] border-b-yellow-400 flex items-center justify-center flex-col shadow-[0_0_15px_rgba(155,135,216,0.15)]">
              <span className="text-xl font-bold text-white">₹65k</span>
              <span className="text-[10px] text-gray-400 uppercase">Total</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-teal-400"></div> Shopping
              </div>
              <span className="font-bold text-white">45%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#9B87D8]"></div> Bills
              </div>
              <span className="font-bold text-white">30%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div> Food
              </div>
              <span className="font-bold text-white">25%</span>
            </div>
          </div>
        </div>
      </div>

      {showBalanceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#2E2952] border border-[#9B87D8]/30 rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setShowBalanceModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Income & Expense Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#242044] rounded-lg border border-[#9B87D8]/20">
                <span className="text-gray-400">Total Income</span>
                <span className="text-teal-400 font-bold">+₹1,00,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#242044] rounded-lg border border-[#9B87D8]/20">
                <span className="text-gray-400">Total Expenses</span>
                <span className="text-red-400 font-bold">-₹40,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#242044] rounded-lg border border-[#9B87D8]/50 mt-2">
                <span className="text-white font-bold">Net Savings</span>
                <span className="text-[#9B87D8] font-bold text-lg">₹60,000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
