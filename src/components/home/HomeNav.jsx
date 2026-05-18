import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '@/lib/AuthModal';
import { useFirebaseAuth } from '@/lib/FirebaseAuthContext';
import { base44 } from '@/api/base44Client';

export default function HomeNav() {
  const { openAuthModal } = useAuthModal();
  const { user, isGuest, logout } = useFirebaseAuth();

  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-[1070px] w-full h-full mx-auto px-6">
        <Link to="/" className="flex items-center">
          <img
            src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
            alt="Summarist"
            className="h-8 w-auto object-contain"
          />
        </Link>
        <div className="flex gap-6 items-center">
          {isGuest ? (
            <>
              <span className="text-[#032b41] text-sm">Guest</span>
              <button
                onClick={logout}
                className="text-[#032b41] hover:text-[#2bd97c] transition-colors text-sm cursor-pointer"
              >
                Exit Guest
              </button>
            </>
          ) : user ? (
            <>
              <Link to="/for-you" className="text-[#032b41] hover:text-[#2bd97c] transition-colors text-sm">
                {user.full_name || user.email}
              </Link>
              <button
                onClick={logout}
                className="text-[#032b41] hover:text-[#2bd97c] transition-colors text-sm cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={openAuthModal} className="text-[#032b41] hover:text-[#2bd97c] transition-colors text-sm cursor-pointer">
              Login
            </button>
          )}
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">About</span>
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">Contact</span>
          <span className="text-[#032b41] cursor-not-allowed text-sm hidden sm:block">Help</span>
        </div>
      </div>
    </nav>
  );
}