import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddArtifact from './pages/AddArtifact';
import EditArtifact from './pages/EditArtifact';
import ArtifactDetails from './pages/ArtifactDetails';
import Navbar from './components/Navbar';
import SearchResults from './pages/SearchResults';
import './index.css';

const App = () => {
    return (
      <>
        <Navbar />
        <div className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddArtifact />} />
            <Route path="/edit/:id" element={<EditArtifact />} />
            <Route path="/artifact/:id" element={<ArtifactDetails />} />
            <Route path='/search' element={<SearchResults />} />
          </Routes>
        </div>
      </>
    );
  };
export default App
