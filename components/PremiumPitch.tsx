import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

const PremiumPitch: React.FC = () => {
    const features = [
        "Ad-Free Experience",
        "Download in 4K Quality",
        "Batch Downloads (up to 10 videos at once)",
        "Download Private Videos",
        "Priority Customer Support",
    ];

  return (
    <div className="w-full max-w-4xl mt-16 p-8 bg-gradient-to-br from-white to-gray-50 border border-violet-500/20 rounded-2xl shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Unlock More with <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Premium</span></h2>
        <p className="text-gray-600 mb-8">Get the ultimate downloading experience with our premium features.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
            </div>
          ))}
      </div>
      <div className="text-center mt-10">
        <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-3 px-10 rounded-lg shadow-lg text-lg hover:scale-105 transition-transform duration-300">
            Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default PremiumPitch;