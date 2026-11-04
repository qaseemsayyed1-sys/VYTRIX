import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShieldCheck } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Signup successful! Please sign in.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl animate-fade-in-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#EBE5FA] rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck className="text-[#6B46C1]" size={32} />
          </div>
          <h1 className="text-3xl font-black text-[#1A202C] tracking-tighter">VYTRIX</h1>
          <p className="text-gray-500 text-sm mt-2">
            {isSignUp ? 'Create your secure account' : 'Welcome back to AEGIS Sentinel'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]"
              placeholder="rahul@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[#1A202C] focus:outline-none focus:border-[#6B46C1]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6B46C1] hover:bg-[#5a3a9e] text-white font-bold py-3 rounded-xl transition-colors flex justify-center items-center mt-4 shadow-lg shadow-[#6B46C1]/30"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-[#6B46C1] font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}