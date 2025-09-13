import React, { useState, useEffect } from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const WhoIAm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Photo data - your uploaded photos
  const photos = [
    {
      id: 1,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/2025.05.17.MCU.Banquet-45.JPEG',
      alt: 'Mason - MCU Banquet',
      caption: ''
    },
    {
      id: 2,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/7e12f827-8100-4baf-adf3-7ed4c54a4b8a.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 3,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0004.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 4,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0092.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 5,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0156.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 6,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0652.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 7,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0799.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 8,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_1183.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 9,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_1274.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 10,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_2246.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 11,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_3371.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 12,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_3925.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 13,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_3945.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 14,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_5090.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 15,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_5162.jpg',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 16,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_7005.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 17,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_8575.JPG',
      alt: 'Mason - Photo',
      caption: ''
    },
    {
      id: 18,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/OCG10th_481_5_18_24_Original.jpg',
      alt: 'Mason - OCG Event',
      caption: ''
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change photo every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="who-i-am" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-12 text-center">Who I Am</h2>
        </AnimateOnScroll>
        
        <div className="relative">
          {/* Main carousel container */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={photos[currentIndex].src}
                  alt={photos[currentIndex].alt}
                  className="w-full h-96 object-cover object-center"
                />
                {photos[currentIndex].caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-lg font-medium">
                      {photos[currentIndex].caption}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAutoPlaying
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto-Play
            </button>
          </div>
        </div>

        {/* Description text */}
        <AnimateOnScroll>
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              These photos capture different moments and aspects of who I am - from professional 
              settings to personal adventures. Each image tells a story about my journey, interests, 
              and the experiences that have shaped me.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};
