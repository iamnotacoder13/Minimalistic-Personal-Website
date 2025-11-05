import React, { useState, useEffect, useRef } from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';

const CHANNEL_ID = 'UCClkF1QSNiZiRirlkbqiUUA';
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const YouTube = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Fetch the latest video from RSS feed
    const fetchLatestVideo = async (isInitialLoad = false) => {
      try {
        // Add cache-busting parameter to prevent stale data
        const cacheBuster = Date.now();
        const feedUrlWithCache = `${RSS_FEED_URL}&_=${cacheBuster}`;
        
        // Use a CORS proxy to fetch the RSS feed
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrlWithCache)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.contents) {
          throw new Error('No content received from RSS feed');
        }
        
        // Parse the XML content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        // Check for parsing errors
        const parseError = xmlDoc.querySelector('parsererror');
        if (parseError) {
          console.error('XML parsing error:', parseError.textContent);
          throw new Error('Failed to parse RSS feed');
        }
        
        // Get all entries and select the first one (latest video)
        const entries = xmlDoc.querySelectorAll('entry');
        if (entries.length === 0) {
          throw new Error('No video entries found in RSS feed');
        }
        
        const entry = entries[0]; // First entry is the latest video
        
        let newVideoId: string | null = null;
        
        // Try to extract video ID from the link element
        const linkElement = entry.querySelector('link');
        if (linkElement) {
          const href = linkElement.getAttribute('href');
          if (href) {
            // Extract video ID from URL
            const match = href.match(/[?&]v=([^&]+)/);
            if (match && match[1]) {
              newVideoId = match[1];
            }
          }
        }
        
        // Fallback: try to get videoId element (with namespace handling)
        if (!newVideoId) {
          const videoIdElement = entry.getElementsByTagNameNS('http://www.youtube.com/xml/schemas/2015', 'videoId')[0] ||
                                entry.querySelector('videoId');
          if (videoIdElement && videoIdElement.textContent) {
            newVideoId = videoIdElement.textContent.trim();
          }
        }
        
        // Fallback: try to get video ID from the entry ID
        if (!newVideoId) {
          const entryId = entry.querySelector('id');
          if (entryId && entryId.textContent) {
            // YouTube entry IDs are in format: yt:video:VIDEO_ID
            const match = entryId.textContent.match(/video:([^:]+)$/);
            if (match && match[1]) {
              newVideoId = match[1];
            }
          }
        }
        
        if (newVideoId) {
          // Always update on initial load, or if video ID changed
          if (isInitialLoad || newVideoId !== videoIdRef.current) {
            setVideoId(newVideoId);
            videoIdRef.current = newVideoId;
            setError(false);
          }
        } else {
          throw new Error('Could not extract video ID from RSS feed');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube video:', err);
        // Only set error if we haven't loaded a video yet
        if (!videoIdRef.current || isInitialLoad) {
          setError(true);
        }
        setLoading(false);
      }
    };

    // Initial fetch - always update on first load
    fetchLatestVideo(true);

    // Poll for new videos every 5 minutes (300000 ms) - more frequent updates
    const pollInterval = setInterval(() => {
      fetchLatestVideo(false);
    }, 300000); // 5 minutes

    // Cleanup interval on unmount
    return () => clearInterval(pollInterval);
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <section id="youtube" className="py-20 px-6 bg-[#124734]">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-white">mason's thoughts</h2>
          </AnimateOnScroll>
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-300">Loading latest video...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !videoId) {
    return (
      <section id="youtube" className="py-20 px-6 bg-[#124734]">
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-white">mason's thoughts</h2>
          </AnimateOnScroll>
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-300">
              Unable to load video. Please visit my{' '}
              <a
                href="https://www.youtube.com/channel/UCClkF1QSNiZiRirlkbqiUUA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6b35] hover:underline"
              >
                YouTube channel
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="youtube" className="py-20 px-6 bg-[#124734]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-8 text-white">mason's thoughts</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <motion.div
            className="relative w-full"
            style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};


