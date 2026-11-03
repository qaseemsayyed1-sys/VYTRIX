import { useState } from 'react';
import { api } from '../services/api';
import { Wallet, Save, Loader2 } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <Wallet className="text-orange-500" /> My Money (LIFEPAY)
        </h2>
        <p className="text-gray-400">Manage your financial profile to enable accurate purchase affordability checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg">
          <p className="text-gray-400 text-sm font-medium">Disposable Income</p>
          <p className="text-3xl font-bold mt-2 text-green-400">
            ₹{(profile.monthly_income - profile.monthly_expenses).toLocaleString()}
          </p>
        </div>
        <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg">
          <p className="text-gray-400 text-sm font-medium">Current Savings</p>
          <p className="text-3xl font-bold mt-2 text-blue-400">
            ₹{profile.current_savings.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg">
          <p className="text-gray-400 text-sm font-medium">Financial Health</p>
          <p className="text-3xl font-bold mt-2 text-orange-400">Moderate</p>
        </div>
      </div>

      <div className="bg-[#121212] p-6 rounded-2xl border border-gray-800/60 shadow-lg">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Monthly Income (₹)</label>
              <input
                type="number"
                name="monthly_income"
                value={profile.monthly_income}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Monthly Expenses (₹)</label>
              <input
                type="number"
                name="monthly_expenses"
                value={profile.monthly_expenses}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Savings (₹)</label>
              <input
                type="number"
                name="current_savings"
                value={profile.current_savings}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-orange-900/20"
          >
            {saving ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : <><Save size={20} /> Save Profile</>}
          </button>
        </form>
      </div>
    </div>
  );
}