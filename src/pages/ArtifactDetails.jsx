import React from 'react';
import { useParams } from 'react-router-dom';
import ArtifactCard from '../components/ArtifactCard';
import CommentSection from '../components/CommentSection';

const ArtifactDetails = () => {
  const { id } = useParams();

  const artifact = { title: 'Sample Artifact', description: 'This is a description', posted_by: 'User123' }; // Placeholder for demo
  const comments = ['Great artifact!', 'Very interesting story.']; // Placeholder comments for demo

  return (
    <div className='artifact-details'>
      <ArtifactCard artifact={artifact} />
      <CommentSection comments={comments} />
    </div>
  );
};

export default ArtifactDetails;