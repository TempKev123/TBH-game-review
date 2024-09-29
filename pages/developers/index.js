// File: pages/developers/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await fetch('/api/developers');
        if (!res.ok) {
          throw new Error('Failed to fetch developers');
        }
        const { data } = await res.json();
        setDevelopers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchDevelopers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this developer?')) {
      try {
        const res = await fetch(`/api/developers/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          // Remove the deleted developer from the state
          setDevelopers((prevDevelopers) => prevDevelopers.filter((developer) => developer._id !== id));
        } else {
          console.error('Failed to delete the developer.');
        }
      } catch (error) {
        console.error('Error deleting the developer:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Developers</h1>

      <Link href="/developers/new" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">
        Add New Developer
      </Link>

      {loading && <p className="text-gray-500">Loading developers...</p>} {/* Loading state message */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {developers.length === 0 && !loading && <p className="text-gray-500">No developers found.</p>} {/* Empty state message */}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((developer) => (
          <li key={developer._id} className="border p-4 rounded-md">
            <Link href={`/developers/${developer._id}`} className="text-xl font-semibold">
              {developer.name}
            </Link>
            <p className="text-gray-600">{developer.headquarters}</p>
            <button
              onClick={() => handleDelete(developer._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Delete Developer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}