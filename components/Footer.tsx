import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 py-8 px-4 text-center text-gray-500 text-sm border-t border-gray-200">
      <div className="container mx-auto">
        <p className="mb-4">
          <strong>Disclaimer:</strong> This tool is for personal use only. Please respect the intellectual property rights of content creators. Do not download content for which you do not have permission from the copyright holder.
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Contact</a>
        </div>
        <p>&copy; {new Date().getFullYear()} InstaDownloader. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;