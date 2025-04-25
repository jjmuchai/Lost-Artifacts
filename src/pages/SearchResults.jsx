import React from 'react';
import ArtifactCard from '../components/ArtifactCard';

const SearchResults = () => {
  const searchResults = [
    { title: 'Artifact 1', description: 'Description 1', posted_by: 'User 1' },
    { title: 'Artifact 2', description: 'Description 2', posted_by: 'User 2' },
  ];

  return (
    <div className='search-results'>
      <h1>Search Results</h1>
      <div className='artifact-list'>
        {searchResults.map((artifact, index) => (
          <ArtifactCard key={index} artifact={artifact} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;