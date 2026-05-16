import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

function formatDuration(seconds) {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function BookCard({ book, isLoading }) {
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
      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [book?.audioLink]);

  if (isLoading) {
    return (
      <div className="min-w-[170px] w-[170px]">
        <Skeleton className="w-[170px] h-[170px] rounded mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-3 w-3/4 mb-1" />
        <Skeleton className="h-3 w-full mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <Link to={`/book/${book.id}`} className="min-w-[170px] w-[170px] group">
      <div className="relative mb-2">
        {book.subscriptionRequired && (
          <div className="absolute top-0 right-0 bg-[#032b41] text-white text-[10px] px-2 py-0.5 rounded-bl font-medium z-10">
            Premium
          </div>
        )}
        {book.imageLink ? (
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-[170px] h-[170px] object-cover rounded"
          />
        ) : (
          <div className="w-[170px] h-[170px] bg-gray-100 rounded" />
        )}
      </div>
      <h3 className="text-sm font-bold text-[#032b41] leading-tight line-clamp-2 group-hover:underline">
        {book.title}
      </h3>
      <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{book.subTitle}</p>
      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration ? formatDuration(duration) : '00:00'}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {book.averageRating}
        </span>
      </div>
    </Link>
  );
}