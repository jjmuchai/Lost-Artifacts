import React, { useState } from 'react';

const ArtifactForm = ({ addArtifact }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posted_by: '',
    tags: '',
    comments: [],
    likes: 0,
    posted_on: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArtifact = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    addArtifact(newArtifact);
    setFormData({
      title: '',
      description: '',
      posted_by: '',
      tags: '',
      comments: [],
      likes: 0,
      posted_on: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <div>
        <label className="block mb-2 font-semibold">Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border rounded" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border rounded" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Explorer Name</label>
        <input type="text" name="posted_by" value={formData.posted_by} onChange={handleChange} required className="w-full p-3 border rounded" />
      </div>
      <div>
        <label className="block mb-2 font-semibold">Tags (comma separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full p-3 border rounded" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full font-bold">Add Artifact</button>
    </form>
  );
};

export default ArtifactForm;
