import React, { useState, useEffect } from 'react';
import SelectedBook from '@/components/books/SelectedBook';
import BookCard from '@/components/books/BookCard';

export default function ForYou() {
  const [selected, setSelected] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState({ selected: true, recommended: true, suggested: true });

  useEffect(() => {
    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected')
      .then(r => r.json())
      .then(data => {
        setSelected(Array.isArray(data) ? data[0] : data);
        setLoading(p => ({ ...p, selected: false }));
      });
    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended')
      .then(r => r.json())
      .then(data => {
        setRecommended(Array.isArray(data) ? data : []);
        setLoading(p => ({ ...p, recommended: false }));
      });
    fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested')
      .then(r => r.json())
      .then(data => {
        setSuggested(Array.isArray(data) ? data : []);
        setLoading(p => ({ ...p, suggested: false }));
      });
  }, []);

  return (
    <div className="space-y-10">
      {/* Selected */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-1">Selected just for you</h2>
        <SelectedBook book={selected} isLoading={loading.selected} />
      </section>

      {/* Recommended */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-1">Recommended For You</h2>
        <p className="text-sm text-gray-500 mb-4">We think you'll like these</p>
        <div className="flex gap-4 overflow-x-auto books-row pb-2">
          {loading.recommended
            ? Array(5).fill(0).map((_, i) => <BookCard key={i} isLoading />)
            : recommended.map(b => <BookCard key={b.id} book={b} />)
          }
        </div>
      </section>

      {/* Suggested */}
      <section>
        <h2 className="text-xl font-bold text-[#032b41] mb-1">Suggested Books</h2>
        <p className="text-sm text-gray-500 mb-4">Browse those books</p>
        <div className="flex gap-4 overflow-x-auto books-row pb-2">
          {loading.suggested
            ? Array(5).fill(0).map((_, i) => <BookCard key={i} isLoading />)
            : suggested.map(b => <BookCard key={b.id} book={b} />)
          }
        </div>
      </section>
    </div>
  );
}