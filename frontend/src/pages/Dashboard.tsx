import { Link } from 'react-router-dom';
import { 
  TrendingUp, ShieldCheck, CreditCard, ShieldAlert, Sparkles, Plus
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
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            Good morning, Student <span className="text-yellow-500">👋</span>
          </h2>
          <p className="text-gray-400 text-sm">Here is your financial and purchase intelligence summary.</p>
        </div>
        <Link to="/purchase" className="bg-[#FF6B35] hover:bg-[#e65a2a] text-white px-5 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF6B35]/20 w-full md:w-auto">
          <Plus size={18} /> New Analysis
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Card */}
        <div className="lg:col-span-2 bg-[#151B23] p-4 md:p-6 rounded-2xl border border-gray-800/60 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white">₹85,000.00</h3>
              <p className="text-xs text-[#20C997] flex items-center gap-1 mt-2 font-medium bg-[#20C997]/10 w-fit px-2 py-1 rounded-md">
                <TrendingUp size={14} /> +12.5% from last month
              </p>
            </div>
            <div className="flex gap-2 bg-[#0B0F14] p-1 rounded-lg border border-gray-800">
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">1M</button>
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white rounded">6M</button>
              <button className="px-3 py-1 text-xs bg-[#1a222c] text-white rounded shadow">1Y</button>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151B23', borderColor: '#262626', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#FF6B35' }}
                  cursor={{ stroke: '#262626', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#FF6B35" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Virtual Card */}
          <div className="bg-gradient-to-br from-[#1a222c] to-[#0B0F14] border border-gray-800/60 p-6 rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer hover:border-[#FF6B35]/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B35]/10 rounded-full blur-2xl group-hover:bg-[#FF6B35]/20 transition-all"></div>
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="bg-[#FF6B35]/20 backdrop-blur-md p-2 rounded-lg">
                <CreditCard size={24} className="text-[#FF6B35]" />
              </div>
              <span className="text-gray-400 font-bold italic text-lg tracking-wider">VISA</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">Available Balance</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">₹60,000.00</h3>
            <div className="flex justify-between items-center text-gray-500 text-sm font-mono">
              <span>**** **** **** 4289</span>
              <span>12/28</span>
            </div>
          </div>

          {/* AI Alerts */}
          <div className="bg-[#151B23] p-5 rounded-2xl border border-gray-800/60 shadow-lg cursor-pointer hover:border-[#FF6B35]/30 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#FF6B35]" />
              <h3 className="font-bold text-white">SENTINEL Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0B0F14] p-3 rounded-xl border border-[#FF5B65]/30 flex items-start gap-3">
                <ShieldAlert size={18} className="text-[#FF5B65] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Checkout Discrepancy</p>
                  <p className="text-xs text-gray-400 mt-1">₹2,500 hidden fee detected on Apple Store checkout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-[#151B23] rounded-2xl border border-gray-800/60 shadow-lg overflow-hidden">
          <div className="p-4 md:p-5 border-b border-gray-800/60 flex justify-between items-center bg-[#1a222c]">
            <h3 className="font-bold text-white">Recent Transactions</h3>
            <button className="text-xs text-[#FF6B35] font-medium hover:text-[#e65a2a]">View All</button>
          </div>
          <div className="p-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-[#1a222c] rounded-xl transition-colors cursor-pointer gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0B0F14] border border-gray-800 flex items-center justify-center text-lg shadow-inner shrink-0">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{tx.name}</p>
                    <p className="text-xs text-gray-500">{tx.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    tx.status === 'Completed' ? 'bg-[#20C997]/10 text-[#20C997]' :
                    tx.status === 'Pending' ? 'bg-[#F5B942]/10 text-[#F5B942]' :
                    'bg-[#FF5B65]/10 text-[#FF5B65]'
                  }`}>
                    {tx.status}
                  </span>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-[#20C997]' : 'text-white'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-[#151B23] p-5 rounded-2xl border border-gray-800/60 shadow-lg flex flex-col">
          <h3 className="font-bold text-white mb-4">Spending Categories</h3>
          <div className="flex-1 flex items-center justify-center relative mb-4">
            <div className="w-32 h-32 rounded-full border-[12px] border-[#0B0F14] border-t-[#FF6B35] border-r-[#20C997] border-b-[#F5B942] flex items-center justify-center flex-col shadow-[0_0_15px_rgba(255,107,53,0.1)]">
              <span className="text-xl font-bold text-white">₹65k</span>
              <span className="text-[10px] text-gray-500 uppercase">Total</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#FF6B35]"></div> Shopping
              </div>
              <span className="font-bold text-white">45%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#20C997]"></div> Bills
              </div>
              <span className="font-bold text-white">30%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 rounded-full bg-[#F5B942]"></div> Food
              </div>
              <span className="font-bold text-white">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
