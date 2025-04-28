import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-evenly items-center">
        <Link to="/" className="text-xl font-semibold hover:underline">Home</Link>
        <Link to="/add" className="text-xl font-semibold hover:underline">Add Artifact</Link>
        <Link to="/edit/1" className="text-xl font-semibold hover:underline">Edit Artifact</Link>
        <Link to="/artifact/1" className="text-xl font-semibold hover:underline">Artifact Details</Link>
        <Link to="/tags" className="hover:underline">Explore Tags</Link>
      </div>
    </nav>
  );
};

export default Navbar;
