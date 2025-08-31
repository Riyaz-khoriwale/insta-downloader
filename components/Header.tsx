
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-8 md:px-16 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <h1 className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            InstaDownloader
          </h1>
        </div>
        <button className="hidden sm:inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
          Go Premium
        </button>
      </div>
    </header>
  );
};

export default Header;
