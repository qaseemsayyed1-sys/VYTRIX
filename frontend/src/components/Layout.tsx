import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Wallet, ShieldAlert, ShoppingBag, 
  Bot, FileText, ArrowRightLeft, TrendingUp, Bell, Settings 
} from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

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
    <div className="flex h-screen bg-[#0B0F14] text-white font-sans">
      <aside className="w-64 bg-[#151B23] border-r border-gray-800/60 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black text-[#FF6B35] tracking-tighter">VYTRIX</h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">AI Purchase Intelligence</p>
        </div>
        <nav className="flex-1 px-3 space-y-1 mt-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FF6B35]/10 text-[#FF6B35] font-medium translate-x-1' 
                    : 'text-gray-400 hover:bg-[#1a222c] hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800/60">
          <div className="bg-[#1a222c] p-4 rounded-xl border border-gray-800">
            <h4 className="text-sm font-bold text-white mb-1">Upgrade Pro</h4>
            <p className="text-xs text-gray-400 mb-3">Unlock advanced AI insights.</p>
            <button className="w-full bg-[#FF6B35] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#e65a2a] transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 bg-[#0B0F14]">
        {children}
      </main>
    </div>
  );
}
