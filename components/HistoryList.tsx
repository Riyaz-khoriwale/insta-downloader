import React, { useState } from 'react';
import ClockIcon from './icons/ClockIcon';
import TrashIcon from './icons/TrashIcon';
import SearchIcon from './icons/SearchIcon';

interface HistoryListProps {
  history: string[];
  onItemClick: (url: string) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onItemClick, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClearing, setIsClearing] = useState(false);
  const [pulsingUrl, setPulsingUrl] = useState<string | null>(null);


  if (history.length === 0) {
    return null;
  }
  
  const handleClear = () => {
    setIsClearing(true);
    setTimeout(() => {
        onClear();
        setIsClearing(false);
    }, 300);
  };

  const handleItemClick = (url: string) => {
    if (pulsingUrl) return; // Prevent re-triggering animation
    setPulsingUrl(url);
    onItemClick(url);
    setTimeout(() => {
        setPulsingUrl(null);
    }, 500); // Animation duration
  };

  const filteredHistory = history.filter(url =>
    url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-2xl mt-8 animate-fadeInUp px-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          Recent Links
        </h3>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors duration-200"
          aria-label="Clear history"
        >
          <TrashIcon className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search history..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition-colors duration-300 text-gray-200"
          aria-label="Search history"
        />
      </div>

      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((url, index) => {
            // Determine animation class
            const isNewest = index === 0 && history.indexOf(url) === 0;
            const clearAnimation = isClearing ? 'animate-fadeOut' : '';
            const newAnimation = isNewest ? 'animate-slideInRight' : '';
            const clickAnimation = pulsingUrl === url ? 'animate-pulse-feedback' : '';

            return (
              <button
                key={`${index}-${url}`}
                onClick={() => handleItemClick(url)}
                className={`w-full text-left p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors truncate text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 ${clearAnimation} ${newAnimation} ${clickAnimation}`}
                title={url}
              >
                {url}
              </button>
            )
          })
        ) : (
          <p className="text-center text-gray-400 p-4">No matching links found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryList;