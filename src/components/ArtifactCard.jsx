import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ArtifactCard = ({ artifact }) => {
  const handleLike = async () => {
    try {
      const updatedArtifact = { ...artifact, likes: artifact.likes + 1 };
      await axios.patch(`http://localhost:5000/posts/${artifact.id}`, { likes: updatedArtifact.likes });
      Swal.fire({
        icon: 'success',
        title: 'Liked!',
        text: 'You liked this artifact.',
        timer: 1500,
        showConfirmButton: false
      });
      window.location.reload(); 
    } catch (error) {
      console.error('Error liking artifact', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{artifact.title}</h2>
      <p className="text-sm text-gray-500 italic mb-2">Discovered by {artifact.posted_by} on {artifact.posted_on}</p>

      <div className="flex gap-2 mb-2 flex-wrap">
        {artifact.tags.map((tag, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
        ))}
      </div>

      <p className="text-gray-700">{artifact.description.slice(0, 100)}...</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-gray-600">
          <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
            ❤️ {artifact.likes}
          </button>
          <div className="flex items-center gap-1">
            💬 {artifact.comments.length}
          </div>
        </div>

        <Link to={`/artifact/${artifact.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ArtifactCard;
