import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className='search-bar'>
      <input
        type='text'
        value={query}
        onChange={handleSearchChange}
        placeholder='Search artifacts...'
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchBar;