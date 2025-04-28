import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditArtifact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false);  

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        setArtifact({
          title: res.data.title,
          description: res.data.description,
          posted_by: res.data.posted_by,
          tags: res.data.tags.join(', '),
          comments: res.data.comments,
          likes: res.data.likes,
          posted_on: res.data.posted_on
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artifact:', error);
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [id]);

  const handleChange = (e) => {
    setArtifact({ ...artifact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedArtifact = {
        title: artifact.title,
        description: artifact.description,
        posted_by: artifact.posted_by,
        tags: artifact.tags.split(',').map(tag => tag.trim()),
        comments: artifact.comments || [],
        likes: artifact.likes || 0,
        posted_on: artifact.posted_on || new Date().toISOString().split('T')[0]
      };

      await axios.put(`http://localhost:5000/posts/${id}`, updatedArtifact);
      navigate('/');
    } catch (error) {
      console.error('Error updating artifact:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-green-100 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Edit Artifact</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={artifact.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={artifact.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="5"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Posted By</label>
          <input
            type="text"
            name="posted_by"
            value={artifact.posted_by}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={artifact.tags}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditArtifact;
