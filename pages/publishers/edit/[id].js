// File: pages/publishers/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditPublisher() {
  const [formData, setFormData] = useState({
    name: '',
    foundedDate: '',
    headquarters: '',
    description: '',
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchPublisher = async () => {
        const res = await fetch(`/api/publishers/${id}`);
        const { data } = await res.json();
        setFormData({
          name: data.name,
          foundedDate: new Date(data.foundedDate).toISOString().split('T')[0],
          headquarters: data.headquarters,
          description: data.description,
        });
      };
      fetchPublisher();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/publishers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push(`/publishers/${id}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Edit Publisher</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="foundedDate" className="block mb-2">Founded Date</label>
          <input
            type="date"
            id="foundedDate"
            name="foundedDate"
            value={formData.foundedDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="headquarters" className="block mb-2">Headquarters</label>
          <input
            type="text"
            id="headquarters"
            name="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Publisher
        </button>
      </form>
    </div>
  );
}