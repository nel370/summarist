import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

function formatDuration(seconds) {
  if (!seconds) return '0 mins 0 secs';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m} mins ${s} secs`;
}

export default function SelectedBook({ book, isLoading }) {
  const [duration, setDuration] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (book?.audioLink) {
      const audio = new Audio();
      audioRef.current = audio;
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
      audio.src = book.audioLink;
      return () => { audio.pause(); audio.src = ''; };
    }
  }, [book?.audioLink]);

  if (isLoading) {
    return (
      <div className="bg-[#fbefd6] rounded-lg p-6 flex gap-6 items-center">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="w-[140px] h-[140px] rounded" />
      </div>
    );
  }

  if (!book) return null;

  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="bg-[#fbefd6] rounded-lg p-5 flex gap-6 items-center hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-600 mb-1">{book.subTitle}</p>
          <h3 className="text-base font-bold text-[#032b41] leading-snug line-clamp-2">{book.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{book.author}</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-10 h-10 bg-[#032b41] rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
            <span className="text-sm text-[#032b41] font-light">
              {duration ? formatDuration(duration) : '0 mins 0 secs'}
            </span>
          </div>
        </div>
        {book.imageLink ? (
          <img src={book.imageLink} alt={book.title} className="w-[140px] h-[140px] object-cover rounded" />
        ) : (
          <div className="w-[140px] h-[140px] bg-gray-200 rounded" />
        )}
      </div>
    </Link>
  );
}