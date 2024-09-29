import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      const res = await fetch('/api/publishers');
      const { data } = await res.json();
      setPublishers(data);
    };
    fetchPublishers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this publisher?')) {
      try {
        const res = await fetch(`/api/publishers/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          // Remove the deleted publisher from the state
          setPublishers((prevPublishers) => prevPublishers.filter((publisher) => publisher._id !== id));
        } else {
          console.error('Failed to delete the publisher.');
        }
      } catch (error) {
        console.error('Error deleting the publisher:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Publishers</h1>
      <Link href="/publishers/new" className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">
        Add New Publisher
      </Link>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publishers.map((publisher) => (
          <li key={publisher._id} className="border p-4 rounded-md">
            <Link href={`/publishers/${publisher._id}`} className="text-xl font-semibold">
              {publisher.name}
            </Link>
            <p className="text-gray-600">{publisher.headquarters}</p>
            <button
              onClick={() => handleDelete(publisher._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Delete Publisher
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
