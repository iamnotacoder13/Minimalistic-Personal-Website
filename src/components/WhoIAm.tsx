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
      id: 7,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_0799.JPG',
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
      id: 17,
      src: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/IMG_8575.JPG',
      alt: 'Mason - Photo',
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
          <h2 className="text-3xl font-bold mb-12">Who I Am</h2>
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

        </div>

      </div>
    </section>
  );
};
