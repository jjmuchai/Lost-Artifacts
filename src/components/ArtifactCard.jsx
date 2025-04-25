import React from 'react';

const ArtifactCard = ({ artifact }) => {
  return (
    <div className='artifact-card'>
      <h2>{artifact.title}</h2>
      <p>{artifact.description}</p>
      <p>Posted by: {artifact.posted_by}</p>
    </div>
  );
};

export default ArtifactCard;
