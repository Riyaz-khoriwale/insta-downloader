
import React from 'react';

const AffiliateCard: React.FC<{ title: string; description: string; link: string }> = ({ title, description, link }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-pink-500/50 hover:shadow-lg transition-all duration-300">
        <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-4 text-sm">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-pink-400 font-semibold hover:underline">
            Learn More &rarr;
        </a>
    </div>
);

const AffiliateSection: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mt-16 text-center">
      <h2 className="text-2xl font-bold mb-6">Recommended Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AffiliateCard 
            title="Pro VPN Service"
            description="Protect your privacy while browsing and downloading. Secure and ultra-fast."
            link="#"
        />
        <AffiliateCard 
            title="Cloud Storage"
            description="Save your downloaded videos securely in the cloud. Access them from any device."
            link="#"
        />
      </div>
    </div>
  );
};

export default AffiliateSection;
