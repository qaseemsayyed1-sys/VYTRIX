import { Link } from 'react-router-dom';
import { 
  Wallet, TrendingUp, ShieldCheck, 
  CreditCard, ArrowRight, ShieldAlert, Sparkles, Plus
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
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            Good morning, Student <span className="text-yellow-500">👋</span>
          </h2>
          <p className="text-gray-400 text-sm">Here is your financial and purchase intelligence summary.</p>
        </div>
        <Link to="/purchase" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40">
          <Plus size={18} /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-4xl font-bold text-white">₹85,000.00</h3>
              <p className="text-xs text-green-400 flex items-center gap-1 mt-2 font-medium bg-green-400/10 w-fit px-2 py-1 rounded-md">
                <TrendingUp size={14} /> +12.5% from last month
              </p>
            </div>
            <div className="flex gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-gray-800">
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">1M</button>
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">6M</button>
              <button className="px-3 py-1 text-xs bg-gray-800 text-white rounded shadow">1Y</button>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                  cursor={{ stroke: '#262626', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-6 rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                <CreditCard size={24} className="text-white" />
              </div>
              <span className="text-white/80 font-bold italic text-lg tracking-wider">VISA</span>
            </div>
            <p className="text-blue-100 text-sm mb-1">Available Balance</p>
            <h3 className="text-3xl font-bold text-white mb-6">₹60,000.00</h3>
            <div className="flex justify-between items-center text-blue-200 text-sm font-mono">
              <span>**** **** **** 4289</span>
              <span>12/28</span>
            </div>
          </div>

          <div className="bg-[#121212] p-5 rounded-2xl border border-gray-800/60 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-orange-500" />
              <h3 className="font-bold text-white">SENTINEL Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-800 flex items-start gap-3">
                <ShieldAlert size={18} className="text-red-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Checkout Discrepancy</p>
                  <p className="text-xs text-gray-400 mt-1">₹2,500 hidden fee detected on Apple Store checkout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121212] rounded-2xl border border-gray-800/60 shadow-lg overflow-hidden">
          <div className="p-5 border-b border-gray-800/60 flex justify-between items-center bg-[#151515]">
            <h3 className="font-bold text-white">Recent Transactions</h3>
            <button className="text-xs text-orange-500 font-medium hover:text-orange-400">View All</button>
          </div>
          <div className="p-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-[#1a1a1a] rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center text-lg shadow-inner">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.name}</p>
                    <p className="text-xs text-gray-500">{tx.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    tx.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                    tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {tx.status}
                  </span>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#121212] p-5 rounded-2xl border border-gray-800/60 shadow-lg flex flex-col">
          <h3 className="font-bold text-white mb-4">Spending Categories</h3>
          <div className="flex-1 flex items-center justify-center relative mb-4">
            <div className="w-32 h-32 rounded-full border-[12px] border-[#1a1a1a] border-t-orange-500 border-r-blue-500 border-b-green-500 flex items-center justify-center flex-col">
              <span className="text-xl font-bold text-white">₹65k</span>
              <span className="text-[10px] text-gray-500 uppercase">Total</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div> Shopping
              </div>
              <span className="font-bold text-white">45%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Bills
              </div>
              <span className="font-bold text-white">30%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Food
              </div>
              <span className="font-bold text-white">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}