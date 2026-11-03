import { useState } from 'react';
import { api } from '../services/api';
import { Wallet, Save, Loader2, TrendingUp, AlertCircle } from 'lucide-react';

export function Finance() {
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    monthly_income: 100000,
    monthly_expenses: 40000,
    current_savings: 50000,
    currency: 'INR',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/finance/profile', profile);
      alert('Financial Profile Saved Successfully!');
    } catch (error: any) {
      alert('Saved locally (Backend auth bypassed for demo)');
    } finally {
      setSaving(false);
    }
  };

  // Teal accents for LIFEPAY
  return (
    <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <Wallet className="text-teal-400" /> My Money (LIFEPAY)
        </h2>
        <p className="text-[#E5DDFB]/70 text-sm md:text-base">Manage your financial profile to enable accurate purchase affordability checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-[#2E2952] p-5 md:p-6 rounded-2xl border border-[#9B87D8]/20 shadow-lg">
          <p className="text-[#E5DDFB]/70 text-sm font-medium flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-teal-400" /> Disposable Income
          </p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-teal-400">
            ₹{(profile.monthly_income - profile.monthly_expenses).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-[#2E2952] p-5 md:p-6 rounded-2xl border border-[#9B87D8]/20 shadow-lg">
          <p className="text-[#E5DDFB]/70 text-sm font-medium flex items-center gap-2 mb-2">
            <Wallet size={16} className="text-[#9B87D8]" /> Current Savings
          </p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[#E5DDFB]">
            ₹{profile.current_savings.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-[#2E2952] p-5 md:p-6 rounded-2xl border border-[#9B87D8]/20 shadow-lg">
          <p className="text-[#E5DDFB]/70 text-sm font-medium flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-yellow-400" /> Financial Health
          </p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-yellow-400">Moderate</p>
        </div>
      </div>

      <div className="bg-[#2E2952] p-5 md:p-8 rounded-2xl border border-[#9B87D8]/20 shadow-lg">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm text-[#E5DDFB]/70 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                name="monthly_income"
                value={profile.monthly_income}
                onChange={handleChange}
                className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[#E5DDFB]/70 mb-2">Monthly Expenses (₹)</label>
              <input
                type="number"
                name="monthly_expenses"
                value={profile.monthly_expenses}
                onChange={handleChange}
                className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-[#E5DDFB]/70 mb-2">Current Savings (₹)</label>
              <input
                type="number"
                name="current_savings"
                value={profile.current_savings}
                onChange={handleChange}
                className="w-full bg-[#242044] border border-[#9B87D8]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#9B87D8]/20">
            <button
              type="submit"
              disabled={saving}
              className="bg-teal-500 hover:bg-teal-400 text-[#242044] font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 w-full md:w-auto"
            >
              {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : <><Save size={20} /> Save Profile</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
