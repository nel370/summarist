import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModal } from '@/lib/AuthModal';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInAnonymously,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

const GUEST_EMAIL = 'guest@summarist.com';
const GUEST_PASSWORD = 'guest123456';

const googleProvider = new GoogleAuthProvider();

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const navigate = useNavigate();

  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setResetSent(false);
  };

  const switchTab = (t) => {
    setTab(t);
    resetForm();
  };

  const handleClose = () => {
    closeAuthModal();
    resetForm();
    setTab('login');
  };

  const onSuccess = () => {
    handleClose();
    navigate('/for-you');
  };

  const getFirebaseError = (code) => {
    switch (code) {
      case 'auth/invalid-email': return 'Invalid email address.';
      case 'auth/user-not-found': return 'No account found with this email.';
      case 'auth/wrong-password': return 'Incorrect password.';
      case 'auth/email-already-in-use': return 'An account with this email already exists.';
      case 'auth/weak-password': return 'Password must be at least 6 characters.';
      case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
      case 'auth/popup-closed-by-user': return '';
      default: return 'Something went wrong. Please try again.';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onSuccess();
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setError('');
    setLoading(true);
    try {
      // Try to sign in; if user doesn't exist yet, create it
      try {
        await signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
      } catch (loginErr) {
        if (loginErr.code === 'auth/user-not-found' || loginErr.code === 'auth/invalid-credential') {
          await createUserWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
        } else {
          throw loginErr;
        }
      }
      onSuccess();
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 border-none overflow-hidden rounded-lg">
        {/* Header */}
        <div className="bg-[#032b41] p-6 text-white text-center">
          <h2 className="text-xl font-bold">
            {tab === 'login' && 'Log in to Summarist'}
            {tab === 'register' && 'Create your account'}
            {tab === 'forgot' && 'Reset your password'}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {/* FORGOT PASSWORD */}
          {tab === 'forgot' && (
            <div>
              {resetSent ? (
                <div className="text-center text-sm text-[#394547] py-4">
                  <p className="text-[#2bd97c] font-medium text-base mb-2">Email sent!</p>
                  <p>Check your inbox for a password reset link.</p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Reset Email'}
                  </button>
                </form>
              )}
              <p className="text-center text-xs text-[#394547] mt-4">
                <button onClick={() => switchTab('login')} className="text-[#0365f2] hover:underline">
                  Back to login
                </button>
              </p>
            </div>
          )}

          {/* LOGIN / REGISTER */}
          {(tab === 'login' || tab === 'register') && (
            <>
              {/* Google */}
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded py-2 text-sm text-[#032b41] hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.8 13.3l7.8 6C12.5 13 17.8 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.3-9.4 6.3-16.2z"/>
                  <path fill="#FBBC05" d="M10.6 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.6 2.5 10.9l8.1-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7-5.4c-2 1.4-4.6 2.2-8.2 2.2-6.2 0-11.5-4.2-13.4-9.8l-8.1 6.2C6.6 42.5 14.7 48 24 48z"/>
                </svg>
                Continue with Google
              </button>

              {/* Guest */}
              <button
                onClick={handleGuest}
                disabled={loading}
                className="w-full border border-gray-300 rounded py-2 text-sm text-[#032b41] hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Continue as Guest
              </button>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={tab === 'login' ? handleLogin : handleRegister} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors disabled:opacity-60"
                >
                  {loading ? 'Please wait...' : tab === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>

              {tab === 'login' && (
                <p className="text-center text-xs text-[#394547]">
                  <button onClick={() => switchTab('forgot')} className="text-[#0365f2] hover:underline">
                    Forgot your password?
                  </button>
                </p>
              )}

              <p className="text-center text-xs text-[#394547]">
                {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
                  className="text-[#0365f2] hover:underline"
                >
                  {tab === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}