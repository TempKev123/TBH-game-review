// File: pages/games/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditGame() {
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    genre: '',
    description: '',
    publisher: '',
    developer: '',
  });
  const [publishers, setPublishers] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchGame = async () => {
        const res = await fetch(`/api/games/${id}`);
        const { data } = await res.json();
        setFormData({
          title: data.title,
          releaseDate: new Date(data.releaseDate).toISOString().split('T')[0],
          genre: data.genre,
          description: data.description,
          publisher: data.publisher._id,
          developer: data.developer._id,
        });
      };
      fetchGame();
    }
    
    const fetchPublishersAndDevelopers = async () => {
      const publishersRes = await fetch('/api/publishers');
      const { data: publishersData } = await publishersRes.json();
      setPublishers(publishersData);

      const developersRes = await fetch('/api/developers');
      const { data: developersData } = await developersRes.json();
      setDevelopers(developersData);
    };
    fetchPublishersAndDevelopers();
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
    const res = await fetch(`/api/games/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push(`/games/${id}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Edit Game</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block mb-2">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block mb-2">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
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
        <div className="mb-4">
          <label htmlFor="publisher" className="block mb-2">Publisher</label>
          <select
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher._id} value={publisher._id}>{publisher.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="developer" className="block mb-2">Developer</label>
          <select
            id="developer"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a developer</option>
            {developers.map((developer) => (
              <option key={developer._id} value={developer._id}>{developer.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Game
        </button>
      </form>
    </div>
  );
}