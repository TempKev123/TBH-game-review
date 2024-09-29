import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState({ games: [], publishers: [], developers: [] });

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const { data } = await res.json();
        setResults(data);
      };
      fetchResults();
    }
  }, [q]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Search Results for "{q}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Games</h2>
          <ul className="space-y-2">
            {results.games.map((game) => (
              <li key={game._id}>
                <Link href={`/games/${game._id}`} className="text-blue-500 hover:underline">
                  {game.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Publishers</h2>
          <ul className="space-y-2">
            {results.publishers.map((publisher) => (
              <li key={publisher._id}>
                <Link href={`/publishers/${publisher._id}`} className="text-blue-500 hover:underline">
                  {publisher.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Developers</h2>
          <ul className="space-y-2">
            {results.developers.map((developer) => (
              <li key={developer._id}>
                <Link href={`/developers/${developer._id}`} className="text-blue-500 hover:underline">
                  {developer.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
