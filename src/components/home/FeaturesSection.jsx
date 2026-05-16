import React from 'react';

const features = [
  {
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="56" width="56" xmlns="http://www.w3.org/2000/svg">
        <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"/>
      </svg>
    ),
    title: 'Read or listen',
    desc: 'Save time by getting the core ideas from the best books.',
  },
  {
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="56" width="56" xmlns="http://www.w3.org/2000/svg">
        <path d="M348 676.1C250 619.4 184 513.4 184 392c0-181.1 146.9-328 328-328s328 146.9 328 328c0 121.4-66 227.4-164 284.1V792c0 17.7-14.3 32-32 32H380c-17.7 0-32-14.3-32-32V676.1zM392 888h240c4.4 0 8 3.6 8 8v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32v-32c0-4.4 3.6-8 8-8z"/>
      </svg>
    ),
    title: 'Find your next read',
    desc: 'Explore book lists and personalized recommendations.',
  },
  {
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="56" width="56" xmlns="http://www.w3.org/2000/svg">
        <path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168zm330-170c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z"/>
      </svg>
    ),
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
            <div key={f.title} className="flex flex-col items-center text-center text-[#032b41]">
              {f.icon}
              <h3 className="text-xl font-medium text-[#032b41] mb-3 mt-2">{f.title}</h3>
              <p className="text-base text-[#394547] font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}