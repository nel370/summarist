import React from 'react';

const headingsLeft = [
  { text: 'Enhance your knowledge', active: true },
  { text: 'Achieve greater success', active: false },
  { text: 'Improve your health', active: false },
  { text: 'Develop better parenting skills', active: false },
  { text: 'Increase happiness', active: false },
  { text: 'Be the best version of yourself!', active: false },
];

const statsLeft = [
  { pct: '93%', text: ['of Summarist members ', <b key="1">significantly increase</b>, ' reading frequency.'] },
  { pct: '96%', text: ['of Summarist members ', <b key="2">establish better</b>, ' habits.'] },
  { pct: '90%', text: ['have made ', <b key="3">significant positive</b>, ' change to their lives.'] },
];

const headingsRight = [
  { text: 'Expand your learning', active: true },
  { text: 'Accomplish your goals', active: false },
  { text: 'Strengthen your vitality', active: false },
  { text: 'Become a better caregiver', active: false },
  { text: 'Improve your mood', active: false },
  { text: 'Maximize your abilities', active: false },
];

const statsRight = [
  { pct: '91%', text: ['of Summarist members ', <b key="4">report feeling more productive</b>, ' after incorporating the service into their daily routine.'] },
  { pct: '94%', text: ['of Summarist members have ', <b key="5">noticed an improvement</b>, ' in their overall comprehension and retention of information.'] },
  { pct: '88%', text: ['of Summarist members ', <b key="6">feel more informed</b>, ' about current events and industry trends since using the platform.'] },
];

function StatsBlock({ headings, stats, reverse }) {
  const headingBlock = (
    <div className={`flex-1 flex flex-col justify-center ${reverse ? 'md:items-end' : ''}`}>
      {headings.map((h) => (
        <h3
          key={h.text}
          className={`text-xl md:text-2xl font-medium mb-4 last:mb-0 ${
            h.active ? 'text-[#2bd97c]' : 'text-[#6b757b]'
          }`}
        >
          {h.text}
        </h3>
      ))}
    </div>
  );

  const statsBlock = (
    <div className="flex-1 bg-[#f1f6f4] rounded-lg p-6 md:p-10 flex flex-col gap-6">
      {stats.map((s) => (
        <div key={s.pct} className="flex gap-4">
          <span className="text-[#0365f2] text-xl font-semibold mt-1 shrink-0">{s.pct}</span>
          <p className="text-lg font-light text-[#394547]">{s.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col md:flex-row gap-10 md:gap-20 mb-16 md:mb-24 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {headingBlock}
      {statsBlock}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-4">
      <div className="max-w-[1070px] mx-auto px-6">
        <StatsBlock headings={headingsLeft} stats={statsLeft} />
        <StatsBlock headings={headingsRight} stats={statsRight} reverse />
      </div>
    </section>
  );
}