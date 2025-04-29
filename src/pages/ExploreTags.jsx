import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExploreTags = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  const fetchArtifacts = async () => {
    try {
      const res = await axios.get('https://lost-artifacts.onrender.com/posts');
      setArtifacts(res.data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const allTags = [...new Set(artifacts.flatMap(a => a.tags))];

  const filteredArtifacts = selectedTag
    ? artifacts.filter(a => a.tags.includes(selectedTag))
    : artifacts;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Explore Tags</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-4 mb-6">
        {allTags.map((tag, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full border ${
              selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredArtifacts.map(artifact => (
          <div key={artifact.id} className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{artifact.title}</h2>
            <p className="text-gray-600 mb-2 italic">Discovered by {artifact.posted_by} on {artifact.posted_on}</p>
            <p className="text-gray-700 mb-4">{artifact.description}</p>
            <Link to={`/artifact/${artifact.id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreTags;
