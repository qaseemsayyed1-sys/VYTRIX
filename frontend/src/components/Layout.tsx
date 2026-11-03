import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Wallet, ShieldAlert, ShoppingBag, 
  Bot, FileText, ArrowRightLeft, TrendingUp, Bell, Settings, Menu, X, Crown, ShieldCheck
} from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', path: '/', icon: LayoutDashboard },
    { name: 'My Money', path: '/finance', icon: Wallet },
    { name: 'Seller Scanner', path: '/seller', icon: ShieldAlert },
    { name: 'Purchase Guardian', path: '/purchase', icon: ShoppingBag },
    { name: 'SENTINEL AI', path: '/sentinel', icon: Bot },
    { name: 'Purchase Passports', path: '/passports', icon: FileText },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Financial Insights', path: '/insights', icon: TrendingUp },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FC] text-[#1A202C] font-sans overflow-hidden">
      
      <div className="lg:hidden fixed top-0 w-full bg-[#1C1445] border-b border-white/10 z-50 flex justify-between items-center p-4">
        <h1 className="text-xl font-black text-white tracking-tighter">VYTRIX</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#1C1445] to-[#2D2162] flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 hidden lg:flex items-center gap-3">
          <ShieldCheck className="text-[#9B87D8]" size={28} />
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter">VYTRIX</h1>
            <p className="text-[10px] text-[#9B87D8] uppercase tracking-widest font-bold">AI Purchase Intelligence</p>
          </div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 mt-16 lg:mt-4 overflow-y-auto pb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-[#6B46C1] font-bold shadow-lg' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <Crown size={16} className="text-yellow-400" />
              <h4 className="text-sm font-bold text-white">Upgrade to Premium</h4>
            </div>
            <p className="text-xs text-gray-300 mb-3">Unlock advanced insights.</p>
            <button className="w-full bg-[#6B46C1] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#5a3a9e] transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <main className="flex-1 overflow-y-auto p-4 pt-20 lg:p-8 lg:pt-8 bg-[#F8F9FC]">
        {children}
      </main>
    </div>
  );
}
