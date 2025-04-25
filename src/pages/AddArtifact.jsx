import React from 'react';
import ArtifactForm from '../components/Forms';

const AddArtifact = () => {
  const handleFormSubmit = (artifactData) => {
    // Logic to handle the artifact submission
    console.log(artifactData);
  };

  return (
    <div className='add-artifact'>
      <h1>Add New Artifact</h1>
      <ArtifactForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddArtifact;