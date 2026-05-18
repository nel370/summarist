import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useFirebaseAuth } from '@/lib/FirebaseAuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, Star } from 'lucide-react';

function BookItem({ book }) {
  return (
    <Link to={`/book/${book.book_id}`} className="min-w-[170px] w-[170px] group">
      <div className="relative mb-2">
        {book.subscription_required && (
          <div className="absolute top-0 right-0 bg-[#032b41] text-white text-[10px] px-2 py-0.5 rounded-bl font-medium z-10">
            Premium
          </div>
        )}
        {book.image_link ? (
          <img src={book.image_link} alt={book.title} className="w-[170px] h-[170px] object-cover rounded" />
        ) : (
          <div className="w-[170px] h-[170px] bg-gray-100 rounded" />
        )}
      </div>
      <h3 className="text-sm font-bold text-[#032b41] leading-tight line-clamp-2 group-hover:underline">{book.title}</h3>
      <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" />
          {book.average_rating}
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Bookmark className="w-16 h-16 text-gray-300 mb-4" />
      <p className="text-sm text-gray-400 max-w-[300px]">{message}</p>
    </div>
  );
}

export default function Library() {
  const { user } = useFirebaseAuth();
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    base44.entities.SavedBook.filter({ created_by: user.email })
      .then(data => {
        setSavedBooks(data.filter(b => !b.finished));
        setFinishedBooks(data.filter(b => b.finished));
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#032b41] mb-1">My Library</h1>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#032b41] mb-4">Saved Books</h2>
        {loading ? (
          <div className="flex gap-4">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="w-[170px] h-[170px] rounded" />)}
          </div>
        ) : savedBooks.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {savedBooks.map(b => <BookItem key={b.id} book={b} />)}
          </div>
        ) : (
          <EmptyState message="Save a book and it will appear here. Click the bookmark icon on any book." />
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-[#032b41] mb-4">Finished Books</h2>
        {loading ? (
          <div className="flex gap-4">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="w-[170px] h-[170px] rounded" />)}
          </div>
        ) : finishedBooks.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {finishedBooks.map(b => <BookItem key={b.id} book={b} />)}
          </div>
        ) : (
          <EmptyState message="When you finish listening to a book, it will appear here." />
        )}
      </div>
    </div>
  );
}