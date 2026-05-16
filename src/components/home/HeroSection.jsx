import React from 'react';
import { useAuthModal } from '@/lib/AuthModal';

export default function HeroSection() {
  const { openAuthModal } = useAuthModal();

  return (
    <section className="py-10">
      <div className="max-w-[1070px] mx-auto px-6 flex items-center gap-10">
        <div className="flex-1">
          <h1 className="text-[#032b41] text-3xl md:text-[40px] font-bold leading-tight mb-6">
            Gain more knowledge <br />in less time
          </h1>
          <p className="text-[#394547] text-lg md:text-xl font-light leading-relaxed mb-6">
            Great summaries for busy people,
            individuals who barely have time to read,
            and even people who don't like to read.
          </p>
          <button
            onClick={openAuthModal}
            className="bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] w-full max-w-[300px] h-10 rounded font-medium text-base transition-colors flex items-center justify-center"
          >
            Login
          </button>
        </div>
        <div className="hidden md:flex flex-1 justify-end">
          <img
            src="https://summarist.vercel.app/_next/static/media/landing.e4787571.png"
            alt="Summarist illustration"
            className="max-w-[400px] w-full"
          />
        </div>
      </div>
    </section>
  );
}