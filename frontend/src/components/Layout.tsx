import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Wallet, ShieldAlert, ShoppingBag, 
  Bot, FileText, ArrowRightLeft, TrendingUp, Bell, Settings, Menu, X
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
    <div className="flex h-screen bg-[#0B0F14] text-white font-sans overflow-hidden">
      
      {/* Mobile Header & Hamburger Menu */}
      <div className="lg:hidden fixed top-0 w-full bg-[#151B23] border-b border-gray-800/60 z-50 flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-[#FF6B35] tracking-tighter">VYTRIX</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Desktop + Mobile Slide-in) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#151B23] border-r border-gray-800/60 flex flex-col transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-black text-[#FF6B35] tracking-tighter">VYTRIX</h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">AI Purchase Intelligence</p>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 mt-16 lg:mt-2 overflow-y-auto pb-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click (mobile)
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

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pt-20 lg:p-8 lg:pt-8 bg-[#0B0F14]">
        {children}
      </main>
    </div>
  );
}
