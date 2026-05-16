import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';
import HomeNav from '@/components/home/HomeNav';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import NumbersSection from '@/components/home/NumbersSection';
import HomeFooter from '@/components/home/HomeFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-roboto">
      <HomeNav />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <ReviewsSection />
      <NumbersSection />
      <HomeFooter />
    </div>
  );
}