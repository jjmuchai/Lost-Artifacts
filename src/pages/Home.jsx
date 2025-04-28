import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ArtifactCard from '../components/ArtifactCard';
import SearchBar from '../components/SearchBar';
import ArtifactForm from '../components/ArtifactForm';
import Loader from '../components/Loader';

const Home = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const formRef = useRef();

  // Fetch artifacts from backend
  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setArtifacts(res.data);
    } catch (error) {
      console.error('Failed to fetch artifacts', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add new artifact
  const addArtifact = async (newArtifact) => {
    try {
      const res = await axios.post('http://localhost:5000/posts', newArtifact);
      setArtifacts(prev => [...prev, res.data]);
    } catch (error) {
      console.error('Failed to add artifact', error);
    }
  };

  const allTags = [...new Set(artifacts.flatMap(artifact => artifact.tags || []))];

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch =
      artifact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artifact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      artifact.posted_by.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? artifact.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Discover Legendary Artifacts
      </h1>

      {/* Navbar Buttons */}
      <div className="flex justify-center gap-8 mb-8">
        <button
          onClick={() => { setSelectedTag(null); setSearchTerm(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Home
        </button>

        <button
          onClick={handleScrollToForm}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition">
          Add Artifact
        </button>

        <button
          onClick={() => {
            window.scrollTo({ top: document.getElementById('tagsSection')?.offsetTop - 80, behavior: 'smooth' });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
          Explore Tags
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div id="tagsSection" className="my-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">Explore by Tags</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {allTags.length > 0 ? (
            allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full border ${selectedTag === tag ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
                {tag}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No tags available yet!</p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center my-12">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6 my-8">
            {filteredArtifacts.length > 0 ? (
              filteredArtifacts.map((artifact, index) => (
                <div
                  key={artifact.id}
                  className="transform hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: index % 2 === 0 ? '#f0f9ff' : '#fef9f5', borderRadius: '1rem', padding: '1rem' }}
                >
                  <ArtifactCard artifact={artifact} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg mt-10">
                No artifacts found for your search. 🕵️‍♂️
              </p>
            )}
          </div>

          {/* Add Artifact Form */}
          <div ref={formRef} className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
              Add a New Artifact
            </h2>
            <ArtifactForm addArtifact={addArtifact} />
          </div>
        </>
      )}

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <p className="text-lg mb-4">
              In the world of legends, some artifacts hold secrets that defy time. From ancient scrolls and hidden relics to mystical symbols and divine relics, these artifacts shape history and carry untold power.
            </p>
            <p className="text-lg">
              Whether you're an explorer, historian, or adventurer, the search for the legendary artifacts continues. Join us as we uncover the lost treasures of the past and share their tales with the world.
            </p>
          </div>
          <div className="text-sm">
            <p>© 2025 Artifact Legends. All rights reserved.</p>
            <div className="mt-4">
              <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> | 
              <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> | 
              <a href="#" className="text-blue-400 hover:underline">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
