import React from 'react'
import { motion } from 'framer-motion'
export const Hero = () => {
  return <section className="min-h-screen flex items-center justify-center px-6 bg-[#124734]">
      <div className="max-w-3xl text-center">
        {/* Circular Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex justify-center"
        >
          <a
            href="https://www.youtube.com/channel/UCClkF1QSNiZiRirlkbqiUUA"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              {/* Replace the src with your actual photo path */}
              <img
                src="/mason-photo.jpg" // Update this path to your actual photo
                alt="Mason Ferré"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
        </motion.div>

        <div className="relative inline-block mb-6">
          {/* The animated circle */}
          <motion.svg
            viewBox="0 0 4000 500"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000%] h-[187.5%]"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M 2000,250 m -1500,0 a 1500,225 0 1,0 3000,0 a 1500,225 0 1,0 -3000,0"
              fill="none"
              stroke="#ff6b35"
              strokeWidth="8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </motion.svg>
          {/* Your heading text */}
          <motion.h1
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold relative z-10 text-white"
          >
            Hello, I'm Mason Ferré
          </motion.h1>
        </div>
        <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }} className="text-xl md:text-2xl text-gray-200 mb-8">
          A passionate individual building community and a sustainable future.
        </motion.p>
        <motion.a initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.4,
          delay: 0.4
        }} href="mailto:masondferre@gmail.com?subject=Hello%20Mason" className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
          Get in touch
        </motion.a>
      </div>
    </section>;
};