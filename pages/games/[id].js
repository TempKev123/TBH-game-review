import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function GameDetails() {
  const [game, setGame] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchGame = async () => {
        const res = await fetch(`/api/games/${id}`);
        const { data } = await res.json();
        setGame(data);
      };
      fetchGame();
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this game?');
    if (!confirmed) return;

    const res = await fetch(`/api/games/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/games');
    }
  };

  if (!game) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{game.title}</h1>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Release Date:</strong> {new Date(game.releaseDate).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {game.description}</p>
      <p><strong>Average Rating:</strong> {game.averageRating}</p>
      <p><strong>Publisher:</strong> {game.publisher.name}</p>
      <p><strong>Developer:</strong> {game.developer.name}</p>
      <Link href="/games/new" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">
        Add New Game
      </Link>
      <div className="mt-4">
        <Link href={`/games/edit/${id}`}>
          <a className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</a>
        </Link>
        <div>
      </div>
    </div></div>)}

