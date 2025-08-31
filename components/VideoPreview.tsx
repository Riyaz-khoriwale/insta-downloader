import React, { useState, useEffect } from 'react';
import type { VideoDetails, DownloadOption } from '../types';
import DownloadIcon from './icons/DownloadIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import CheckIcon from './icons/CheckIcon';

interface VideoPreviewProps {
  video: VideoDetails;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ video }) => {
  const [selectedQuality, setSelectedQuality] = useState<string>(video.downloadOptions[0]?.quality || '');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete'>('idle');
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  // Reset component state when a new video is passed in
  useEffect(() => {
    setSelectedQuality(video.downloadOptions[0]?.quality || '');
    setCopiedUrl(null);
    setDownloadState('idle');
    setDownloadProgress(0);
  }, [video]);

  const selectedOption = video.downloadOptions.find(opt => opt.quality === selectedQuality);

  const handleCopyLink = (urlToCopy: string) => {
    if (copiedUrl === urlToCopy) return;
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setCopiedUrl(urlToCopy);
      setTimeout(() => {
        setCopiedUrl(null);
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleDownload = () => {
    if (!selectedOption || downloadState !== 'idle') return;

    setDownloadState('downloading');
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const nextProgress = prev + Math.floor(Math.random() * 10) + 5;
        if (nextProgress >= 100) {
          clearInterval(interval);
          
          // Trigger the actual download
          const link = document.createElement('a');
          link.href = selectedOption.url;
          link.setAttribute('download', `instadownload_${video.author}_${selectedOption.quality}.mp4`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setDownloadState('complete');
          
          // Reset after a delay
          setTimeout(() => {
            setDownloadState('idle');
            setDownloadProgress(0);
          }, 4000);

          return 100;
        }
        return nextProgress;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-3xl mt-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8 animate-fadeInUp">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={video.thumbnailUrl}
            alt="Video thumbnail"
            className="w-full rounded-lg shadow-lg aspect-square object-cover"
          />
        </div>
        <div className="md:w-2/3 flex flex-col justify-center">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">{video.title}</h3>
          <p className="text-gray-400 mb-6">by <span className="font-semibold text-gray-300">@{video.author}</span></p>

          <fieldset className="mb-6">
            <legend className="text-white font-semibold mb-3">Select Quality for Download:</legend>
            <div className="space-y-3">
              {video.downloadOptions.map((option) => {
                const isCopied = copiedUrl === option.url;
                return (
                  <div key={option.quality} className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-700/50 border-2 border-transparent has-[:checked]:border-pink-500 has-[:checked]:bg-pink-500/20 transition-all duration-200">
                    <div className="flex items-center gap-3">
                        <input
                            type="radio"
                            id={`quality-${option.quality}`}
                            name="quality-select"
                            value={option.quality}
                            checked={selectedQuality === option.quality}
                            onChange={() => setSelectedQuality(option.quality)}
                            className="h-4 w-4 accent-pink-500 bg-gray-600 border-gray-500 focus:ring-pink-500 cursor-pointer"
                        />
                        <label htmlFor={`quality-${option.quality}`} className="cursor-pointer flex flex-col sm:flex-row sm:items-baseline">
                            <span className="font-bold text-white">{option.quality}</span>
                            <span className="text-gray-400 text-sm sm:ml-2">({option.size})</span>
                        </label>
                    </div>
                    <button
                        onClick={() => handleCopyLink(option.url)}
                        disabled={isCopied}
                        className={`flex-shrink-0 flex items-center justify-center gap-2 text-sm font-semibold py-1 px-3 rounded-md transition-all duration-200 disabled:cursor-not-allowed ${isCopied ? 'bg-green-500/20 text-green-400 w-28' : 'bg-gray-600 hover:bg-gray-500 text-gray-200 w-28'}`}
                    >
                        {isCopied ? (
                        <>
                            <ClipboardCheckIcon className="w-4 h-4" />
                            <span>Copied!</span>
                        </>
                        ) : (
                        <>
                            <ClipboardIcon className="w-4 h-4" />
                            <span>Copy Link</span>
                        </>
                        )}
                    </button>
                  </div>
                );
              })}
            </div>
          </fieldset>
          
          <div className="flex flex-col items-center gap-3 h-12">
            {downloadState === 'idle' && (
              <button
                onClick={handleDownload}
                disabled={!selectedOption}
                className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DownloadIcon className="w-5 h-5" />
                <span>{selectedOption ? `Download ${selectedOption.quality}` : 'Select a quality to download'}</span>
              </button>
            )}
            {downloadState === 'downloading' && (
              <div className="w-full bg-gray-600 rounded-full h-4 relative overflow-hidden">
                <div className="bg-pink-500 h-full rounded-full transition-all duration-300" style={{ width: `${downloadProgress}%` }}></div>
                <span className="absolute inset-0 text-center text-xs font-bold flex items-center justify-center text-white">{Math.round(downloadProgress)}%</span>
              </div>
            )}
            {downloadState === 'complete' && (
              <div className="w-full flex items-center justify-center gap-2 text-green-400 font-semibold text-lg">
                <CheckIcon className="w-6 h-6" />
                <span>Download Started!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
