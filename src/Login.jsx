import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanEmail = email.toLowerCase().trim();
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Failed to login. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setResetMessage({ type: 'error', text: 'Please enter your email address.' });
      return;
    }
    setLoading(true);
    setResetMessage({ type: '', text: '' });
    const cleanEmail = email.toLowerCase().trim();
    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setResetMessage({ type: 'success', text: 'Password reset link sent! Check your inbox.' });
    } catch (err) {
      setResetMessage({ type: 'error', text: err.message || 'Failed to send reset email. Ensure the email is correct.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-[#2d4e41] mb-6 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Website
        </Link>
        <div className="flex justify-center mb-6 text-[#2d4e41]">
          <Lock size={48} />
        </div>
        <h2 className="text-2xl font-bold text-center text-[#2d4e41] mb-8">
          {isForgotPassword ? 'Reset Password' : 'Admin Login'}
        </h2>
        
        {isForgotPassword ? (
          <form onSubmit={handleResetPassword} className="space-y-6">
            {resetMessage.text && (
              <div className={`p-3 rounded-lg text-sm text-center font-medium ${resetMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                {resetMessage.text}
              </div>
            )}
            <p className="text-sm text-gray-600 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#448c6c] outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#448c6c] text-white font-bold py-3 rounded-lg hover:bg-[#366d54] transition-colors disabled:opacity-70"
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : 'Send Reset Link'}
            </button>
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => { setIsForgotPassword(false); setResetMessage({ type: '', text: '' }); }} 
                className="text-sm text-gray-500 hover:text-[#2d4e41] font-medium transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="p-3 rounded-lg text-sm text-center font-medium bg-red-50 text-red-600 border border-red-200">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#448c6c] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#448c6c] outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)} 
                  className="text-sm text-[#448c6c] hover:text-[#2d4e41] font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#2d4e41] text-white font-bold py-3 rounded-lg hover:bg-[#1f362d] transition-colors disabled:opacity-70"
            >
              {loading ? <><Loader2 className="animate-spin" size={20} /> Signing In...</> : 'Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
