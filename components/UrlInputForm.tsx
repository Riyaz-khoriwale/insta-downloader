import React from 'react';
import DownloadIcon from './icons/DownloadIcon';
import ExclamationIcon from './icons/ExclamationIcon';

interface UrlInputFormProps {
  url: string;
  onUrlChange: (newUrl: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, onUrlChange, onSubmit, isLoading, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl text-center px-4">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        Download Instagram Videos
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        Just paste the link to an Instagram video below and get your download links instantly. It's fast, free, and easy.
      </p>
      <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Paste Instagram video URL here..."
          className="w-full text-lg px-6 py-4 rounded-lg bg-white border-2 border-gray-300 focus:border-pink-500 focus:ring-pink-500 focus:outline-none transition-colors duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <DownloadIcon className="w-5 h-5" />
              <span>Download</span>
            </>
          )}
        </button>
      </form>
      {error && (
        <div className="mt-4 flex items-center justify-center gap-2 text-red-600 font-semibold p-3 bg-red-100 border border-red-200 rounded-lg animate-shake">
          <ExclamationIcon className="w-6 h-6" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default UrlInputForm;