import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const genres = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Puzzle', 'Other'];

export default function NewGame() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    publisher: '',
    developer: '', // Add developer field
    rating: '',
  });
  const [publishers, setPublishers] = useState([]);
  const [developers, setDevelopers] = useState([]); // Store developers
  const router = useRouter();

  // Fetch publishers
  useEffect(() => {
    const fetchPublishers = async () => {
      const res = await fetch('/api/publishers');
      const { data } = await res.json();
      setPublishers(data);
    };
    fetchPublishers();
  }, []);

  // Fetch developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      const res = await fetch('/api/developers');
      const { data } = await res.json();
      setDevelopers(data);
    };
    fetchDevelopers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('publisher', formData.publisher);
    formDataToSend.append('developer', formData.developer); // Add developer field
    formDataToSend.append('rating', formData.rating);  // Ensure this is set correctly
    console.log('FormData Rating:', formData.rating); // Log the rating field here

    const res = await fetch('/api/games', {
      method: 'POST',
      body: formDataToSend,
    });

    if (res.ok) {
      router.push('/games');
    } else {
      console.error('Failed to add game');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Add New Gaaaaaaaaaaaaaaaame</h1>
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
          <label htmlFor="genre" className="block mb-2">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Publisher selection */}
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

        {/* Developer selection */}
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

        <div className="mb-4">
          <label htmlFor="rating" className="block mb-2">Rating (1-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Game
        </button>
      </form>
    </div>
  );
}
