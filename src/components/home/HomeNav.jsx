import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '@/lib/AuthModal';
import { BookOpen } from 'lucide-react';

export default function HomeNav() {
  const { openAuthModal } = useAuthModal();

  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-[1070px] w-full h-full mx-auto px-6">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-[#032b41]" />
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