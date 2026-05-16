import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useAuthModal } from '@/lib/AuthModal';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#032b41] mb-6 border-b border-gray-100 pb-4">Settings</h1>

      {!user ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src="https://summarist.vercel.app/_next/static/media/login.e313e580.png"
            alt="Login required"
            className="max-w-[340px] w-full mb-6"
          />
          <h2 className="text-xl font-bold text-[#032b41] mb-4">Log in to your account to see your details.</h2>
          <button
            onClick={openAuthModal}
            className="bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] w-full max-w-[180px] h-10 rounded font-medium transition-colors"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-[600px]">
          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm text-gray-500 mb-1">Your Subscription plan</p>
            <p className="text-base font-medium text-[#032b41]">Basic</p>
            <Link
              to="/choose-plan"
              className="text-sm text-[#0365f2] hover:underline mt-1 inline-block"
            >
              Upgrade to Premium
            </Link>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-base font-medium text-[#032b41]">{user.email || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}