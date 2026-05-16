import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectToLogin = () => {
    closeAuthModal();
    base44.auth.redirectToLogin(window.location.href);
  };

  const handleClose = () => {
    closeAuthModal();
    setTab('login');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 border-none overflow-hidden rounded-lg">
        {/* Header */}
        <div className="bg-[#032b41] p-6 text-white text-center">
          <h2 className="text-xl font-bold">
            {tab === 'login' && 'Log in to Summarist'}
            {tab === 'register' && 'Sign up to Summarist'}
            {tab === 'forgot' && 'Reset your password'}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {tab !== 'forgot' && (
            <>
              {/* Guest */}
              <button
                onClick={redirectToLogin}
                className="w-full flex items-center gap-3 border border-gray-300 rounded py-2 px-4 text-sm text-[#032b41] hover:bg-gray-50 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-[#032b41] flex items-center justify-center shrink-0">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="16" width="16" className="text-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                  </svg>
                </span>
                <span>Login as a Guest</span>
              </button>

              {/* Separator */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google */}
              <button
                onClick={redirectToLogin}
                className="w-full flex items-center gap-3 border border-gray-300 rounded py-2 px-4 text-sm text-[#032b41] hover:bg-gray-50 transition-colors"
              >
                <span className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src="https://summarist.vercel.app/_next/static/media/google.864494ce.png"
                    alt="google"
                    width="32"
                    height="32"
                  />
                </span>
                <span>Login with Google</span>
              </button>

              {/* Separator */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {/* Email/Password form */}
          {tab === 'login' && (
            <form onSubmit={(e) => { e.preventDefault(); redirectToLogin(); }} className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
              />
              <button
                type="submit"
                className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors"
              >
                Login
              </button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={(e) => { e.preventDefault(); redirectToLogin(); }} className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
              />
              <button
                type="submit"
                className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}

          {tab === 'forgot' && (
            <form onSubmit={(e) => { e.preventDefault(); redirectToLogin(); }} className="space-y-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2bd97c]"
              />
              <button
                type="submit"
                className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors"
              >
                Send Reset Email
              </button>
              <p className="text-center text-xs text-[#394547]">
                <button type="button" onClick={() => setTab('login')} className="text-[#0365f2] hover:underline">
                  Back to login
                </button>
              </p>
            </form>
          )}

          {tab === 'login' && (
            <p className="text-center text-xs text-[#394547]">
              <button onClick={() => setTab('forgot')} className="text-[#0365f2] hover:underline">
                Forgot your password?
              </button>
            </p>
          )}

          {(tab === 'login' || tab === 'register') && (
            <p className="text-center text-xs text-[#394547]">
              {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
                className="text-[#0365f2] hover:underline"
              >
                {tab === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}