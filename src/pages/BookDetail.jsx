import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebaseAuth } from '@/lib/FirebaseAuthContext';
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';
import { Star, Clock, Mic, Lightbulb, BookOpen, Bookmark } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

function formatDuration(seconds) {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isGuest } = useFirebaseAuth();
  const { openAuthModal } = useAuthModal();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(null);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [savingLoading, setSavingLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then(r => {
        if (!r.ok || r.status === 204) { setLoading(false); return null; }
        return r.text().then(text => {
          if (!text) { setLoading(false); return null; }
          const data = JSON.parse(text);
          setBook(data);
          setLoading(false);
        });
      });
  }, [id]);

  useEffect(() => {
    if (book?.audioLink) {
      const audio = new Audio();
      audioRef.current = audio;
      audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.src = book.audioLink;
      return () => { audio.pause(); audio.src = ''; };
    }
  }, [book?.audioLink]);

  // Check if already saved
  useEffect(() => {
    if (!user || !id || isGuest) return;
    base44.entities.SavedBook.filter({ book_id: id, created_by: user.email })
      .then(data => {
        if (data.length > 0) {
          setSaved(true);
          setSavedId(data[0].id);
        }
      });
  }, [user, id]);

  const handleReadListen = () => {
    if (!user && !isGuest) { openAuthModal(); return; }
    if (!isGuest && book.subscriptionRequired) { navigate('/choose-plan'); return; }
    navigate(`/player/${id}`);
  };

  const handleSave = async () => {
    if (!user && !isGuest) { openAuthModal(); return; }
    if (isGuest) return; // guests can't save (no account)
    setSavingLoading(true);
    if (saved && savedId) {
      await base44.entities.SavedBook.delete(savedId);
      setSaved(false);
      setSavedId(null);
    } else {
      const record = await base44.entities.SavedBook.create({
        book_id: id,
        title: book.title,
        author: book.author,
        image_link: book.imageLink,
        audio_link: book.audioLink,
        subscription_required: book.subscriptionRequired,
        average_rating: book.averageRating,
        sub_title: book.subTitle,
        finished: false,
      });
      setSaved(true);
      setSavedId(record.id);
    }
    setSavingLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <div className="flex gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-32 mt-6" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-6 w-32 mt-4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <Skeleton className="w-[300px] h-[300px] rounded" />
      </div>
    );
  }

  if (!book) return <p>Book not found.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-[#032b41] mb-1">{book.title}</h1>
        {book.subTitle && <p className="text-base text-[#032b41] font-medium mb-2">{book.subTitle}</p>}
        <p className="text-sm text-[#394547] mb-4">{book.author}</p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#032b41] mb-4 border-y border-gray-100 py-3">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" /> {book.averageRating} ({book.totalRating} ratings)
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {duration ? formatDuration(duration) : '00:00'}
          </span>
          <span className="flex items-center gap-1">
            <Mic className="w-4 h-4" /> {book.type}
          </span>
          <span className="flex items-center gap-1">
            <Lightbulb className="w-4 h-4" /> {book.keyIdeas} Key ideas
          </span>
        </div>

        <button
          onClick={handleReadListen}
          className="bg-[#032b41] hover:bg-[#032b41]/90 text-white px-8 h-12 rounded flex items-center gap-2 text-sm font-medium transition-colors mb-3"
        >
          <BookOpen className="w-4 h-4" /> Read
        </button>

        <button
          onClick={handleSave}
          disabled={savingLoading}
          className="flex items-center gap-2 text-[#0365f2] hover:underline text-sm mb-8 disabled:opacity-50"
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#0365f2]' : ''}`} />
          {saved ? 'Saved to My Library' : 'Add title to My Library'}
        </button>

        <h3 className="text-lg font-bold text-[#032b41] mb-3">What's it about?</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {book.tags?.map(tag => (
            <span key={tag} className="bg-[#f1f6f4] text-[#032b41] text-xs px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-sm text-[#394547] font-light leading-relaxed mb-8">{book.bookDescription}</p>

        <h3 className="text-lg font-bold text-[#032b41] mb-3">About the author</h3>
        <p className="text-sm text-[#394547] font-light leading-relaxed">{book.authorDescription}</p>
      </div>

      <div className="shrink-0">
        {book.imageLink ? (
          <img src={book.imageLink} alt={book.title} className="w-[300px] h-[300px] object-cover rounded" />
        ) : (
          <div className="w-[300px] h-[300px] bg-gray-100 rounded" />
        )}
      </div>
    </div>
  );
}