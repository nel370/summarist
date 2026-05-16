import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
        setShowResults(true);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[340px]">
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowResults(true)}
          className="flex-1 px-4 py-2 text-sm outline-none bg-transparent text-[#032b41]"
        />
        {query ? (
          <button onClick={() => { setQuery(''); setResults([]); setShowResults(false); }} className="px-3">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        ) : (
          <div className="px-3">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {showResults && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-400">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-400">No books found</div>
          ) : (
            results.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                onClick={() => { setShowResults(false); setQuery(''); }}
                className="flex items-center gap-3 p-3 hover:bg-[#f1f6f4] transition-colors border-b border-gray-50 last:border-0"
              >
                {book.imageLink ? (
                  <img src={book.imageLink} alt={book.title} className="w-10 h-14 object-cover rounded" />
                ) : (
                  <div className="w-10 h-14 bg-gray-100 rounded" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#032b41] truncate">{book.title}</p>
                  <p className="text-xs text-gray-500 truncate">{book.author}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{book.subTitle}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}