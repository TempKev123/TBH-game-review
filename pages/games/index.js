// File: pages/games/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';



export default function Games() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const { data } = await res.json();
        console.log(data); // Log the response to check if rating is present

        setGames(data);
      } catch (e) {
        console.error("Failed to fetch games:", e);
        setError("Failed to load games. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this game?')) {
      try {
        const res = await fetch(`/api/games/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          // Filter out the deleted game from the state
          setGames((prevGames) => prevGames.filter((game) => game._id !== id));
        } else {
          console.error("Failed to delete the game.");
        }
      } catch (error) {
        console.error("Error deleting the game:", error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Games</h1>
      <Link href="/games/new" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">
        Add New Game
      </Link>
      {games.length === 0 ? (
        <p>No games found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={game._id} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-gray-600">{game.genre}</p>
              <p className="text-gray-600">{game.publisher?.name || 'Unknown Publisher'}</p>
              <p className="text-gray-600">{game.developer?.name || 'Unknown Developer'}</p>
              <p className="text-gray-600">Rating: {game.rating}/5</p> 
              <button
                onClick={() => handleDelete(game._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Delete Game
              </button>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}