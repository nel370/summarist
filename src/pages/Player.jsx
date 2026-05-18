import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { base44 } from '@/api/base44Client';
import { useFirebaseAuth } from '@/lib/FirebaseAuthContext';

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
}

export default function Player() {
  const { id } = useParams();
  const { user, isGuest } = useFirebaseAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const audioRef = useRef(null);
  const finishedMarked = useRef(false);

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then(r => r.text())
      .then(text => {
        if (!text) { setLoading(false); return; }
        setBook(JSON.parse(text));
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnded = async () => {
      setPlaying(false);
      // Mark book as finished
      if (user && !isGuest && !finishedMarked.current) {
        finishedMarked.current = true;
        const existing = await base44.entities.SavedBook.filter({ book_id: id, created_by: user.email });
        if (existing.length > 0) {
          await base44.entities.SavedBook.update(existing[0].id, { finished: true });
        } else if (book) {
          await base44.entities.SavedBook.create({
            book_id: id,
            title: book.title,
            author: book.author,
            image_link: book.imageLink,
            audio_link: book.audioLink,
            subscription_required: book.subscriptionRequired,
            average_rating: book.averageRating,
            sub_title: book.subTitle,
            finished: true,
          });
        }
      }
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, [book, user, id]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play(); }
    setPlaying(!playing);
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  const fontSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];

  if (loading) {
    return (
      <div className="space-y-4 max-w-[800px]">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="pb-24">
      {/* Font size controls */}
      <div className="flex items-center gap-2 mb-6">
        {fontSizes.map((_, i) => (
          <button
            key={i}
            onClick={() => setFontSize(i)}
            className={`font-medium transition-colors ${fontSize === i ? 'text-[#032b41] border-b-2 border-[#2bd97c]' : 'text-gray-400 hover:text-gray-600'}`}
            style={{ fontSize: `${12 + i * 4}px` }}
          >
            Aa
          </button>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-[#032b41] mb-4">{book.title}</h1>
      <p className={`${fontSizes[fontSize]} text-[#394547] font-light leading-relaxed whitespace-pre-line`}>
        {book.summary}
      </p>

      {book.audioLink && <audio ref={audioRef} src={book.audioLink} preload="metadata" />}

      {/* Audio player bar */}
      <div className="fixed bottom-0 left-0 md:left-[200px] right-0 bg-[#042330] text-white z-40">
        <div className="flex items-center gap-4 px-4 md:px-8 py-3">
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            {book.imageLink ? (
              <img src={book.imageLink} alt="" className="w-12 h-12 object-cover rounded hidden sm:block" />
            ) : (
              <div className="w-12 h-12 bg-gray-600 rounded hidden sm:block" />
            )}
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium truncate max-w-[150px]">{book.title}</p>
              <p className="text-xs text-gray-400 truncate max-w-[150px]">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mx-auto">
            <button onClick={() => skip(-10)} className="hover:opacity-70 transition-opacity">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {playing ? (
                <Pause className="w-5 h-5 text-[#042330] fill-[#042330]" />
              ) : (
                <Play className="w-5 h-5 text-[#042330] fill-[#042330] ml-0.5" />
              )}
            </button>
            <button onClick={() => skip(10)} className="hover:opacity-70 transition-opacity">
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-[400px]">
            <span className="text-xs text-gray-400 w-10 text-right shrink-0">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={seek}
              className="audio-progress w-full"
            />
            <span className="text-xs text-gray-400 w-10 shrink-0">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}