import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import Swal from 'sweetalert2';

const ArtifactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);

  const fetchArtifact = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/posts/${id}`);
      setArtifact(res.data);
    } catch (error) {
      console.error('Error fetching artifact:', error);
    }
  };

  useEffect(() => {
    fetchArtifact();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this artifact!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/posts/${id}`);
        Swal.fire('Deleted!', 'Your artifact has been deleted.', 'success');
        window.location.href = '/';
      } catch (error) {
        console.error('Error deleting artifact:', error);
      }
    }
  };

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:5000/posts/${id}`, {
        likes: artifact.likes + 1
      });
      Swal.fire('Liked!', 'You liked this artifact.', 'success');
      fetchArtifact();
    } catch (error) {
      console.error('Error liking artifact:', error);
    }
  };

  if (!artifact) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-2">{artifact.title}</h1>
      <p className="text-gray-600 mb-2 italic">
        Discovered by {artifact.posted_by} on {artifact.posted_on}
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {artifact.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-gray-700 mb-6">{artifact.description}</p>

      {/* Action Buttons */}
      <div className="flex items-center mb-6 flex-wrap gap-4">
        <button
          onClick={handleLike}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
        >
          ❤️ {artifact.likes} Likes
        </button>

        <button
          onClick={handleEdit}
          className="bg-yellow-400 text-white px-6 py-2 rounded hover:bg-yellow-500"
        >
          ✏️ Edit Artifact
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Delete Artifact
        </button>
      </div>

      {/* Comments Section */}
      <CommentSection
        artifactId={artifact.id}
        comments={artifact.comments}
        refreshArtifact={fetchArtifact}
      />
    </div>
  );
};

export default ArtifactDetails;
