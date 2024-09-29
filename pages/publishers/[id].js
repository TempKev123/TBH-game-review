import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PublisherDetails() {
  const [publisher, setPublisher] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPublisher = async () => {
        const res = await fetch(`/api/publishers/${id}`);
        const { data } = await res.json();
        setPublisher(data);
      };
      fetchPublisher();
    }
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`/api/publishers/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/publishers');
    }
  };

  if (!publisher) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{publisher.name}</h1>
      <p><strong>Founded:</strong> {new Date(publisher.foundedDate).toLocaleDateString()}</p>
      <p><strong>Headquarters:</strong> {publisher.headquarters}</p>
      <p><strong>Description:</strong> {publisher.description}</p>
      <div className="mt-4">
        <Link href={`/publishers/edit/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  );
}
