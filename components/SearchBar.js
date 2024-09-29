// File: components/SearchBar.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="px-2 py-1 rounded-l-md"
      />
      <button type="submit" className="bg-blue-500 px-4 py-1 rounded-r-md">
        Search
      </button>
    </form>
  );
}