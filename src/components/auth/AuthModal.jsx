import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';
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
      base44.auth.redirectToLogin();
      closeAuthModal();
    } catch {
      setError('Failed to login as guest');
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
    if (mode === 'register' && password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setLoading(true);
    try {
      base44.auth.redirectToLogin();
      closeAuthModal();
    } catch (err) {
      setError(mode === 'login' ? 'User not found or invalid credentials' : 'Registration failed');
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
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-[#3a4649] hover:bg-[#2a3639] text-white h-10 rounded"
          >
            <User className="w-4 h-4 mr-2" />
            Login as Guest
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
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          {mode === 'login' && (
            <button
              className="text-[#0365f2] text-sm w-full text-center hover:underline"
              onClick={() => {/* forgot password */}}
            >
              Forgot your password?
            </button>
          )}

          <button
            className="text-[#032b41] text-sm w-full text-center hover:underline font-medium"
            onClick={() => {
              resetForm();
              setMode(mode === 'login' ? 'register' : 'login');
            }}
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}