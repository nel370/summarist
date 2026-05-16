import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthModal } from '@/lib/AuthModal';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { User, LogIn } from 'lucide-react';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInAnonymously(auth);
      closeAuthModal();
    } catch (err) {
      setError('Guest login failed. Please try again.');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      closeAuthModal();
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      closeAuthModal();
    } catch (err) {
      const msg = err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
        ? 'Invalid email or password.'
        : err.code === 'auth/email-already-in-use'
        ? 'Email already in use.'
        : 'Something went wrong. Please try again.';
      setError(msg);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeAuthModal(); }}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 border-none overflow-hidden">
        <div className="bg-[#032b41] p-6 text-white text-center">
          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Log in to Summarist' : 'Sign up for Summarist'}
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</div>
          )}

          <Button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-[#3a4649] hover:bg-[#2a3639] text-white h-10 rounded"
          >
            <User className="w-4 h-4 mr-2" />
            Login as Guest
          </Button>

          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            variant="outline"
            className="w-full h-10 rounded"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 mr-2" />
            Sign in with Google
          </Button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-sm text-gray-400 absolute">or</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] h-10 font-medium rounded"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <button
            className="text-[#032b41] text-sm w-full text-center hover:underline font-medium"
            onClick={() => { resetForm(); setMode(mode === 'login' ? 'register' : 'login'); }}
          >
            {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}