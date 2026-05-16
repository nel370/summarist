import React from 'react';
import { Star } from 'lucide-react';
import { useAuthModal } from '@/lib/AuthModal';

const reviews = [
  {
    name: 'Hanna M.',
    text: 'This app has been a game-changer for me! It\'s saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.',
  },
  {
    name: 'David B.',
    text: 'I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It\'s also very user-friendly and intuitive.',
  },
  {
    name: 'Nathan S.',
    text: 'This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading.',
  },
  {
    name: 'Ryan R.',
    text: 'If you\'re a busy person who loves reading but doesn\'t have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book\'s content.',
  },
];

export default function ReviewsSection() {
  const { openAuthModal } = useAuthModal();

  return (
    <section className="py-10">
      <div className="max-w-[1070px] mx-auto px-6">
        <h2 className="text-[32px] text-[#032b41] text-center font-bold mb-8">
          What our members say
        </h2>
        <div className="max-w-[600px] mx-auto">
          {reviews.map((r) => (
            <div key={r.name} className="bg-[#fff3d7] p-4 mb-6 rounded">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#032b41] font-medium text-sm">{r.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#0365f2] text-[#0365f2]" />
                  ))}
                </div>
              </div>
              <p className="text-[#394547] font-light text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={openAuthModal}
              className="bg-[#2bd97c] hover:bg-[#20ba68] text-[#032b41] w-full max-w-[300px] h-10 rounded font-medium transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}