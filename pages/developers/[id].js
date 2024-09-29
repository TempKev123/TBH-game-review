import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DeveloperDetails() {
  const [developer, setDeveloper] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchDeveloper = async () => {
        const res = await fetch(`/api/developers/${id}`);
        const { data } = await res.json();
        setDeveloper(data);
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

  if (!developer) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">{developer.name}</h1>
      <p><strong>Founded:</strong> {new Date(developer.foundedDate).toLocaleDateString()}</p>
      <p><strong>Headquarters:</strong> {developer.headquarters}</p>
      <p><strong>Description:</strong> {developer.description}</p>
      <div className="mt-4">
        <Link href={`/developers/edit/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  );
}
