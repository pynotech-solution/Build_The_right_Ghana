import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="bg-[#e6f0eb] text-[#448c6c] p-6 rounded-full mb-8 shadow-sm">
        <Compass size={64} />
      </div>
      <h1 className="text-6xl md:text-8xl font-bold text-[#2d4e41] mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Looks like you're lost!</h2>
      <p className="text-lg text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-[#448c6c] hover:bg-[#366d54] text-white font-bold py-4 px-10 rounded-full transition-all uppercase tracking-wider shadow-lg hover:-translate-y-1"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;