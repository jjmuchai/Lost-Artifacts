import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-green-700 h-12 flex items-center px-6">
      <nav className="flex gap-8 text-white">
        <Link to="/" className="hover:underline font-bold">ArtifactHub</Link>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/add" className="hover:underline">Add Artifact</Link>
        <Link to="/edit/1" className="hover:underline">Edit Artifact</Link>
        <Link to="/artifact/1" className="hover:underline">Artifact Details</Link>
      </nav>
    </div>
  );
};

export default Navbar;



{/* <div className=' bg-sky-400 h-12 font-normal'>
      <p className='text-center text-fuchsia-800 pt-4
       font-sans h-10 font-bold'>Discover Legendary Artifacts</p>
    </div> */}