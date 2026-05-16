import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '@/lib/AuthModal';
export default function HomeNav() {
  const { openAuthModal } = useAuthModal();

  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-[1070px] w-full h-full mx-auto px-6">
        <Link to="/" className="flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 30 L20 24 L34 30 L20 36 Z" fill="#032b41"/>
            <path d="M6 22 L20 16 L34 22 L20 28 Z" fill="#032b41"/>
            <path d="M6 14 L20 8 L34 14 L20 20 Z" fill="#2bd97c"/>
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