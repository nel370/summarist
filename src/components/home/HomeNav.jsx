import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '@/lib/AuthModal';
export default function HomeNav() {
  const { openAuthModal } = useAuthModal();

  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-[1070px] w-full h-full mx-auto px-6">
        <Link to="/" className="flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="18" width="32" height="6" rx="2" fill="#032b41"/>
            <rect x="4" y="10" width="28" height="6" rx="2" fill="#032b41"/>
            <rect x="6" y="2" width="24" height="6" rx="2" fill="#2bd97c"/>
            <rect x="2" y="26" width="32" height="6" rx="2" fill="#032b41"/>
          </svg>
          <span className="text-2xl font-bold text-[#032b41]">Summarist</span>
        </Link>
        <div className="flex gap-6">
          <button onClick={openAuthModal} className="text-[#032b41] hover:text-[#2bd97c] transition-colors text-sm cursor-pointer">
            Login
          </button>
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">About</span>
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">Contact</span>
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">Help</span>
        </div>
      </div>
    </nav>
  );
}