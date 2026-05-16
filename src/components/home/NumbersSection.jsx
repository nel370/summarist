import React from 'react';
import { Star } from 'lucide-react';

export default function NumbersSection() {
  return (
    <section className="py-10">
      <div className="max-w-[1070px] mx-auto px-6">
        <h2 className="text-[32px] text-[#032b41] text-center font-bold mb-8">
          Start growing with Summarist now
        </h2>
        <div className="bg-[#d7e9ff] rounded-xl p-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-semibold text-[#032b41] mb-4">3 Million</span>
              <p className="text-[#394547] font-light">Downloads on all platforms</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 mb-4">
                <span className="text-[40px] font-semibold text-[#032b41]">4.5</span>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#0365f2] text-[#0365f2]" />
                  ))}
                </div>
              </div>
              <p className="text-[#394547] font-light">Average ratings on iOS and Google Play</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[40px] font-semibold text-[#032b41] mb-4">97%</span>
              <p className="text-[#394547] font-light">Of Summarist members create a better reading habit</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}