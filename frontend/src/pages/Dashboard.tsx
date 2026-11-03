import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, CreditCard, ShieldAlert, Sparkles, Plus, X,
  ShieldCheck, ShoppingBag, Wallet, Target
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    if (hour >= 17 && hour < 21) return 'Good evening';
    return 'Good night';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 pt-16 lg:pt-0">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-[#F3EFE6] mb-1 flex items-center gap-2">
            {getGreeting()}, Student <span className="text-[#C4A484]">👋</span>
          </h2>
          <p className="text-[#A69F96] text-sm">Here is your financial and purchase intelligence summary.</p>
        </div>
        <Link to="/purchase" className="bg-[#C4A484] hover:bg-[#D4B494] text-[#1C1816] px-5 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#C4A484]/20 w-full md:w-auto">
          <Plus size={18} /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-100">
        <Link to="/purchase" className="bg-[#26211E] p-4 rounded-xl border border-[#3B332F] hover:border-[#C4A484] transition-all group flex items-center gap-3">
          <div className="bg-[#C4A484]/20 p-2 rounded-lg text-[#C4A484] group-hover:scale-110 transition-transform">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#F3EFE6]">New Purchase</p>
            <p className="text-[10px] text-[#A69F96]">Analyze a checkout</p>
          </div>
        </Link>
        <Link to="/seller" className="bg-[#26211E] p-4 rounded-xl border border-[#3B332F] hover:border-[#C4A484] transition-all group flex items-center gap-3">
          <div className="bg-[#8FBC8F]/20 p-2 rounded-lg text-[#8FBC8F] group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#F3EFE6]">Scan Seller</p>
            <p className="text-[10px] text-[#A69F96]">Verify a domain</p>
          </div>
        </Link>
        <Link to="/finance" className="bg-[#26211E] p-4 rounded-xl border border-[#3B332F] hover:border-[#C4A484] transition-all group flex items-center gap-3">
          <div className="bg-[#9B87D8]/20 p-2 rounded-lg text-[#9B87D8] group-hover:scale-110 transition-transform">
            <Wallet size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#F3EFE6]">My Money</p>
            <p className="text-[10px] text-[#A69F96]">Update finances</p>
          </div>
        </Link>
        <Link to="/passports" className="bg-[#26211E] p-4 rounded-xl border border-[#3B332F] hover:border-[#C4A484] transition-all group flex items-center gap-3">
          <div className="bg-[#D4B494]/20 p-2 rounded-lg text-[#D4B494] group-hover:scale-110 transition-transform">
            <Target size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#F3EFE6]">Passports</p>
            <p className="text-[10px] text-[#A69F96]">View audit trail</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => setShowBalanceModal(true)}
          className="lg:col-span-2 bg-[#26211E] p-4 md:p-6 rounded-2xl border border-[#3B332F] shadow-xl relative overflow-hidden cursor-pointer hover:border-[#C4A484]/50 transition-colors animate-fade-in-up delay-200"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4A484]/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
            <div>
              <p className="text-[#A69F96] text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl md:text-4xl font-bold text-[#F3EFE6]">₹85,000.00</h3>
              <p className="text-xs text-[#8FBC8F] flex items-center gap-1 mt-2 font-medium bg-[#8FBC8F]/10 w-fit px-2 py-1 rounded-md">
                <TrendingUp size={14} /> +12.5% from last month
              </p>
            </div>
            <div className="flex gap-2 bg-[#1C1816] p-1 rounded-lg border border-[#3B332F] w-full md:w-auto justify-between md:justify-start mt-2 md:mt-0">
              <button className="px-3 py-1 text-xs text-[#A69F96] hover:text-[#F3EFE6] rounded flex-1 md:flex-none">1M</button>
              <button className="px-3 py-1 text-xs text-[#A69F96] hover:text-[#F3EFE6] rounded flex-1 md:flex-none">6M</button>
              <button className="px-3 py-1 text-xs bg-[#3B332F] text-[#F3EFE6] rounded shadow flex-1 md:flex-none">1Y</button>
            </div>
          </div>
          
          <div className="h-[200px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4A484" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C4A484" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#A69F96" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#26211E', borderColor: '#3B332F', borderRadius: '8px', color: '#F3EFE6' }}
                  itemStyle={{ color: '#C4A484' }}
                  cursor={{ stroke: '#C4A484', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#C4A484" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in-up delay-300">
          <div className="bg-gradient-to-br from-[#3B332F] to-[#1C1816] border border-[#3B332F] p-6 rounded-2xl shadow-xl relative overflow-hidden group cursor-pointer hover:border-[#C4A484]/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A484]/10 rounded-full blur-2xl group-hover:bg-[#C4A484]/20 transition-all"></div>
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="bg-[#C4A484]/20 backdrop-blur-md p-2 rounded-lg">
                <CreditCard size={24} className="text-[#F3EFE6]" />
              </div>
              <span className="text-[#F3EFE6]/80 font-bold italic text-lg tracking-wider">VISA</span>
            </div>
            <p className="text-[#A69F96] text-sm mb-1">Available Balance</p>
            <h3 className="text-2xl md:text-3xl font-bold text-[#F3EFE6] mb-4 md:mb-6">₹60,000.00</h3>
            <div className="flex justify-between items-center text-[#A69F96] text-sm font-mono">
              <span>**** **** **** 4289</span>
              <span>12/28</span>
            </div>
          </div>

          <Link to="/alerts" className="block bg-[#26211E] p-5 rounded-2xl border border-[#3B332F] shadow-lg cursor-pointer hover:border-[#C4A484]/50 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#C4A484]" />
              <h3 className="font-bold text-[#F3EFE6]">SENTINEL Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-[#1C1816] p-3 rounded-xl border border-[#CD5C5C]/30 flex items-start gap-3">
                <ShieldAlert size={18} className="text-[#CD5C5C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#F3EFE6]">Checkout Discrepancy</p>
                  <p className="text-xs text-[#A69F96] mt-1">₹2,500 hidden fee detected on Apple Store checkout.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
        <div className="lg:col-span-2 bg-[#26211E] rounded-2xl border border-[#3B332F] shadow-lg overflow-hidden">
          <div className="p-4 md:p-5 border-b border-[#3B332F] flex justify-between items-center bg-[#1C1816]/50">
            <h3 className="font-bold text-[#F3EFE6]">Recent Transactions</h3>
            <Link to="/transactions" className="text-xs text-[#C4A484] font-medium hover:text-[#F3EFE6]">View All</Link>
          </div>
          <div className="p-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-[#3B332F]/50 rounded-xl transition-colors cursor-pointer gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#1C1816] border border-[#3B332F] flex items-center justify-center text-lg shadow-inner shrink-0">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#F3EFE6]">{tx.name}</p>
                    <p className="text-xs text-[#A69F96]">{tx.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    tx.status === 'Completed' ? 'bg-[#8FBC8F]/10 text-[#8FBC8F]' :
                    tx.status === 'Pending' ? 'bg-[#D4B494]/10 text-[#D4B494]' :
                    'bg-[#CD5C5C]/10 text-[#CD5C5C]'
                  }`}>
                    {tx.status}
                  </span>
                  <p className={`text-sm font-bold ${tx.amount > 0 ? 'text-[#8FBC8F]' : 'text-[#F3EFE6]'}`}>
                    {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#26211E] p-5 rounded-2xl border border-[#3B332F] shadow-lg flex flex-col">
          <h3 className="font-bold text-[#F3EFE6] mb-4">Monthly Budget</h3>
          
          <div className="space-y-5 flex-1 flex flex-col justify-center">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A69F96]">Shopping</span>
                <span className="text-[#F3EFE6] font-bold">₹25,000 / ₹30,000</span>
              </div>
              <div className="h-2 w-full bg-[#1C1816] rounded-full overflow-hidden">
                <div className="h-full bg-[#C4A484] rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A69F96]">Bills</span>
                <span className="text-[#F3EFE6] font-bold">₹15,000 / ₹20,000</span>
              </div>
              <div className="h-2 w-full bg-[#1C1816] rounded-full overflow-hidden">
                <div className="h-full bg-[#8FBC8F] rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A69F96]">Food & Dining</span>
                <span className="text-[#CD5C5C] font-bold">₹9,500 / ₹10,000</span>
              </div>
              <div className="h-2 w-full bg-[#1C1816] rounded-full overflow-hidden">
                <div className="h-full bg-[#CD5C5C] rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBalanceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in-up">
          <div className="bg-[#26211E] border border-[#3B332F] rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            <button onClick={() => setShowBalanceModal(false)} className="absolute top-4 right-4 text-[#A69F96] hover:text-[#F3EFE6]">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-[#F3EFE6] mb-4">Income & Expense Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-[#1C1816] rounded-lg border border-[#3B332F]">
                <span className="text-[#A69F96]">Total Income</span>
                <span className="text-[#8FBC8F] font-bold">+₹1,00,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#1C1816] rounded-lg border border-[#3B332F]">
                <span className="text-[#A69F96]">Total Expenses</span>
                <span className="text-[#CD5C5C] font-bold">-₹40,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#1C1816] rounded-lg border border-[#C4A484]/30 mt-2">
                <span className="text-[#F3EFE6] font-bold">Net Savings</span>
                <span className="text-[#C4A484] font-bold text-lg">₹60,000</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
                  }
