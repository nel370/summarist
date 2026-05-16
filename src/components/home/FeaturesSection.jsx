import React from 'react';
import { FileText, Lightbulb, Mic } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Read or listen',
    desc: 'Save time by getting the core ideas from the best books.',
  },
  {
    icon: Lightbulb,
    title: 'Find your next read',
    desc: 'Explore book lists and personalized recommendations.',
  },
  {
    icon: Mic,
    title: 'Briefcasts',
    desc: 'Gain valuable insights from briefcasts.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10">
      <div className="max-w-[1070px] mx-auto px-6">
        <h2 className="text-[32px] text-[#032b41] text-center font-bold mb-8">
          Understand books in few minutes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <f.icon className="w-14 h-14 text-[#032b41] mb-2" strokeWidth={1} />
              <h3 className="text-xl font-medium text-[#032b41] mb-3">{f.title}</h3>
              <p className="text-base text-[#394547] font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}