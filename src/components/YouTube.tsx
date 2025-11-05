import React, { useState, useEffect } from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';

const CHANNEL_ID = 'UCClkF1QSNiZiRirlkbqiUUA';
const RSS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const YouTube = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch the latest video from RSS feed
    const fetchLatestVideo = async () => {
      try {
        // Use a CORS proxy to fetch the RSS feed
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_FEED_URL)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        // Parse the XML content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        // Get the first entry (latest video)
        const entry = xmlDoc.querySelector('entry');
        if (entry) {
          // Extract video ID from the entry link or videoId element
          // The link format is: https://www.youtube.com/watch?v=VIDEO_ID
          const linkElement = entry.querySelector('link');
          if (linkElement) {
            const href = linkElement.getAttribute('href');
            if (href) {
              // Extract video ID from URL
              const match = href.match(/[?&]v=([^&]+)/);
              if (match && match[1]) {
                setVideoId(match[1]);
                setLoading(false);
                return;
              }
            }
          }
          
          // Fallback: try to get videoId element (with namespace handling)
          const videoIdElement = entry.getElementsByTagNameNS('http://www.youtube.com/xml/schemas/2015', 'videoId')[0] ||
                                entry.querySelector('videoId');
          if (videoIdElement) {
            const id = videoIdElement.textContent;
            if (id) {
              setVideoId(id);
              setLoading(false);
              return;
            }
          }
        }
        setError(true);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube video:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

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
          <h2 className="text-3xl font-bold mb-8 text-white">Latest Video</h2>
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

