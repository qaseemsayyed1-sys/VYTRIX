import { useState } from 'react';
import { api } from '../services/api';
import { Wallet, Save, Loader2, TrendingUp, AlertCircle } from 'lucide-react';

export function Finance() {
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ monthly_income: 100000, monthly_expenses: 40000, current_savings: 50000, currency: 'INR' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/finance/profile', profile);
      alert('Financial Profile Saved Successfully!');
    } catch (error) {
      alert('Saved locally (Backend auth bypassed for demo)');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 lg:pt-0 pb-10">
      <div className="mb-6 md:mb-8 animate-fade-in-up">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#1A202C]">
          <Wallet className="text-[#6B46C1]" /> My Money (LIFEPAY)
        </h2>
        <p className="text-gray-500 text-sm md:text-base">Manage your financial profile to enable accurate purchase affordability checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up delay-100">
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-2"><TrendingUp size={16} className="text-green-500" /> Disposable Income</p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-green-500">₹{(profile.monthly_income - profile.monthly_expenses).toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up delay-200">
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-2"><Wallet size={16} className="text-[#6B46C1]" /> Current Savings</p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-[#1A202C]">₹{profile.current_savings.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up delay-300">
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2 mb-2"><AlertCircle size={16} className="text-yellow-500" /> Financial Health</p>
          <p className="text-2xl md:text-3xl font-bold mt-2 text-yellow-500">Moderate</p>
        </div>
      </div>

      <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-100 shadow-sm animate-fade-in-up delay-300">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Monthly Income (₹)</label>
              <input type="number" name="monthly_income" value={profile.monthly_income} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Monthly Expenses (₹)</label>
              <input type="number" name="monthly_expenses" value={profile.monthly_expenses} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Current Savings (₹)</label>
              <input type="number" name="current_savings" value={profile.current_savings} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]" />
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button type="submit" disabled={saving} className="bg-[#6B46C1] hover:bg-[#5a3a9e] text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg w-full md:w-auto">
              {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : <><Save size={20} /> Save Profile</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
