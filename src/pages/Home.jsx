import React from 'react';
import ArtifactCard from '../components/ArtifactCard';

const Home = () => {
  const artifacts = [
    {
      id: 1,
      title: 'Artifact 1',
      description: 'Description 1',
      postedBy: 'User 1'
    },
    {
      id: 2,
      title: 'Artifact 2',
      description: 'Description 2',
      postedBy: 'User 2'
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="grid gap-6">
        {artifacts.map(artifact => (
          <div key={artifact.id} className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{artifact.title}</h2>
            <p className="text-gray-700 mb-2">{artifact.description}</p>
            <p className="text-sm text-gray-500 italic">Posted by: {artifact.postedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;