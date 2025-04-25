import React from 'react';
import { useParams } from 'react-router-dom';
import ArtifactForm from '../components/Forms';

const EditArtifact = () => {
  const { id } = useParams();

  const handleFormSubmit = (updatedArtifactData) => {
    // Logic to handle the artifact update
    console.log(updatedArtifactData);
  };

  return (
    <div className='edit-artifact'>
      <h1>Edit Artifact</h1>
      <ArtifactForm onSubmit={handleFormSubmit} initialValues={{ title: 'Existing Title', description: 'Existing Description', posted_by: 'Existing User' }} />
    </div>
  );
};

export default EditArtifact;