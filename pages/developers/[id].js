// File: pages/developers/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DeveloperDetails() {
  const [developer, setDeveloper] = useState(null);
  const [error, setError] = useState(null); // Added error state
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchDeveloper = async () => {
        try {
          const res = await fetch(`/api/developers/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch developer details');
          }
          const { data } = await res.json();
          setDeveloper(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      };
      fetchDeveloper();
    }
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`/api/developers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/developers');
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state message
  if (error) return <div>Error: {error}</div>; // Error message
  if (!developer) return <div>No developer found.</div>; // Empty state message

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{developer.name}</h1>
      <p><strong>Founded:</strong> {new Date(developer.foundedDate).toLocaleDateString()}</p>
      <p><strong>Headquarters:</strong> {developer.headquarters}</p>
      <p><strong>Description:</strong> {developer.description}</p>
      <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 mt-4">
        Delete
      </button>
      <div className="mt-4">
        <Link href={`/developers/edit/${id}`}>
          <a className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">Edit</a>
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  );
}
