import React from 'react';

interface AdBannerProps {
  size: 'leaderboard' | 'sidebar' | 'square';
}

const AdBanner: React.FC<AdBannerProps> = ({ size }) => {
  const sizeClasses = {
    leaderboard: 'w-full h-24 md:h-28',
    sidebar: 'w-full h-64',
    square: 'w-64 h-64',
  };

  return (
    <div className={`flex items-center justify-center bg-gray-200/50 border-2 border-dashed border-gray-300 rounded-lg my-8 ${sizeClasses[size]}`}>
      <span className="text-gray-500 font-semibold">Advertisement</span>
    </div>
  );
};

export default AdBanner;