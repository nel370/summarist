import React, { useState } from 'react';
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

  if (!isOpen) return null;

  const isLogin = tab === 'login';
  const isRegister = tab === 'register';
  const isForgot = tab === 'forgot';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="relative bg-white rounded-lg w-full max-w-[400px] mx-4">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#032b41] hover:text-gray-600 transition-colors z-10"
        >
          <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"/>
          </svg>
        </button>

        <div className="p-8">
          {/* Title */}
          <div className="text-[#032b41] text-2xl font-bold text-center mb-6">
            {isLogin && 'Log in to Summarist'}
            {isRegister && 'Sign up to Summarist'}
            {isForgot && 'Reset your password'}
          </div>

          {!isForgot && (
            <>
              {/* Guest button */}
              <button
                onClick={redirectToLogin}
                className="w-full flex items-center gap-4 border border-gray-300 rounded py-3 px-4 text-sm text-[#032b41] hover:bg-gray-50 transition-colors mb-4"
              >
                <figure className="w-8 h-8 rounded-full bg-[#032b41] flex items-center justify-center shrink-0 m-0">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="16" width="16" className="text-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
                  </svg>
                </figure>
                <span>Login as a Guest</span>
              </button>

              {/* Separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google button */}
              <button
                onClick={redirectToLogin}
                className="w-full flex items-center gap-4 border border-gray-300 rounded py-3 px-4 text-sm text-[#032b41] hover:bg-gray-50 transition-colors mb-4"
              >
                <figure className="w-8 h-8 flex items-center justify-center shrink-0 m-0">
                  <img
                    alt="google"
                    src="https://summarist.vercel.app/_next/static/media/google.864494ce.png"
                    width="32"
                    height="32"
                  />
                </figure>
                <span>Login with Google</span>
              </button>

              {/* Separator */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
            </>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); redirectToLogin(); }}
            className="flex flex-col gap-3"
          >
            {isForgot ? (
              <>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2bd97c] w-full"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2.5 rounded text-sm transition-colors"
                >
                  Send Reset Email
                </button>
              </>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2bd97c] w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-[#2bd97c] w-full"
                />
                <button
                  type="submit"
                  className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2.5 rounded text-sm transition-colors"
                >
                  <span>{isLogin ? 'Login' : 'Sign Up'}</span>
                </button>
              </>
            )}
          </form>

          {/* Forgot password */}
          {isLogin && (
            <p className="text-center text-sm text-[#0365f2] hover:underline cursor-pointer mt-4"
              onClick={() => setTab('forgot')}>
              Forgot your password?
            </p>
          )}
          {isForgot && (
            <p className="text-center text-sm text-[#0365f2] hover:underline cursor-pointer mt-4"
              onClick={() => setTab('login')}>
              Back to login
            </p>
          )}

          {/* Switch tab */}
          {!isForgot && (
            <button
              onClick={() => setTab(isLogin ? 'register' : 'login')}
              className="w-full text-center text-sm text-[#032b41] mt-3 hover:underline"
            >
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}