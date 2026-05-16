import React from 'react';
import { Bookmark } from 'lucide-react';

export default function Library() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#032b41] mb-1">My Library</h1>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#032b41] mb-4">Saved Books</h2>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-[#032b41] mb-2">Save your favorite books!</h3>
          <p className="text-sm text-gray-400 max-w-[300px]">
            When you save a book, it will appear here. Click the bookmark icon on any book to save it.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#032b41] mb-4">Finished Books</h2>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-[#032b41] mb-2">Done with a book? It shows here!</h3>
          <p className="text-sm text-gray-400 max-w-[300px]">
            When you finish listening to a book, it will appear in this section.
          </p>
        </div>
      </div>
    </div>
  );
}