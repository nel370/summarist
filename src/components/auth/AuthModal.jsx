import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';

export default function AuthModal() {
  const { isOpen, closeAuthModal } = useAuthModal();

  const handleLogin = () => {
    closeAuthModal();
    base44.auth.redirectToLogin(window.location.href);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeAuthModal(); }}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 border-none overflow-hidden rounded-lg">
        <div className="bg-[#032b41] p-6 text-white text-center">
          <h2 className="text-xl font-bold">Log in to Summarist</h2>
        </div>
        <div className="p-6 space-y-4 text-center">
          <img
            src="https://summarist.vercel.app/_next/static/media/login.e313e580.png"
            alt="Login"
            className="max-w-[200px] mx-auto"
          />
          <p className="text-sm text-[#394547]">Sign in to access your books and reading progress.</p>
          <button
            onClick={handleLogin}
            className="w-full bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] font-semibold py-2 rounded text-sm transition-colors"
          >
            Login
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}