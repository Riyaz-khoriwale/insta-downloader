import React, { useState, useCallback, useEffect } from 'react';
import type { VideoDetails } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import UrlInputForm from './components/UrlInputForm';
import VideoPreview from './components/VideoPreview';
import AdBanner from './components/AdBanner';
import PremiumPitch from './components/PremiumPitch';
import AffiliateSection from './components/AffiliateSection';
import HistoryList from './components/HistoryList';

const HISTORY_KEY = 'instaDownloaderHistory';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      setHistory([]);
    }
  }, []);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (error) {
      setError(null);
    }
  };

  const handleFormSubmit = useCallback(() => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(url);
    } catch (_) {
        setError('Invalid URL format. Please check and try again.');
        return;
    }

    if (parsedUrl.hostname !== 'www.instagram.com' && parsedUrl.hostname !== 'instagram.com') {
        setError('URL must be from instagram.com.');
        return;
    }

    const path = parsedUrl.pathname;
    const isVideoLink = path.startsWith('/p/') || path.startsWith('/reel/') || path.startsWith('/tv/');

    if (!isVideoLink) {
        setError('Only links to Posts, Reels, or TV videos are supported.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setVideoDetails(null);

    // Simulate API call
    setTimeout(() => {
        // Mock successful response
        const mockVideoDetails: VideoDetails = {
          thumbnailUrl: `https://picsum.photos/seed/${Math.random()}/500/500`,
          title: 'A beautiful travel video from a recent trip!',
          author: 'wanderlust_adventures',
          downloadOptions: [
            { quality: '1080p', size: '25.4 MB', url: '#' },
            { quality: '720p', size: '14.8 MB', url: '#' },
            { quality: '480p', size: '8.2 MB', url: '#' },
          ],
        };
        setVideoDetails(mockVideoDetails);
        
        // Update history on success
        const newHistory = [url, ...history.filter(item => item !== url)].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

        setIsLoading(false);
    }, 1500);
  }, [url, history]);
  
  const handleHistoryItemClick = (historyUrl: string) => {
    setUrl(historyUrl);
    if(error) setError(null);
  };
  
  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      <Header />
      <main className="flex-grow w-full flex flex-col items-center justify-center py-12 px-4">
        <UrlInputForm
          url={url}
          onUrlChange={handleUrlChange}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          error={error}
        />
        <HistoryList history={history} onItemClick={handleHistoryItemClick} onClear={handleClearHistory} />

        {videoDetails && <VideoPreview video={videoDetails} />}
        
        <div className="w-full max-w-4xl">
            <AdBanner size="leaderboard" />
        </div>
        
        <PremiumPitch />
        <AffiliateSection />

      </main>
      <Footer />
    </div>
  );
};

export default App;