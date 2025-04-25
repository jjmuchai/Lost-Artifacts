import React, { useState } from 'react';

const ArtifactForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues ? initialValues.title : '');
  const [description, setDescription] = useState(initialValues ? initialValues.description : '');
  const [posted_by, setPostedBy] = useState(initialValues ? initialValues.posted_by : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const artifactData = { title, description, posted_by };
    onSubmit(artifactData);
  };

  return (
    <form onSubmit={handleSubmit} className='artifact-form'>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label htmlFor='posted_by'>Posted by</label>
      <input
        type='text'
        id='posted_by'
        value={posted_by}
        onChange={(e) => setPostedBy(e.target.value)}
      />

      <button type='submit'>Submit</button>
    </form>
  );
};

export default ArtifactForm;