import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-[#2d5a47]">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-8 text-white">Subscribe</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-white mb-8">
            Stay updated with my latest thoughts and learnings on Substack.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-[480px]">
              <iframe
                src="https://masonferre.substack.com/embed"
                width="100%"
                height="320"
                style={{ border: '1px solid #EEE', background: 'white', borderRadius: '8px' }}
                frameBorder="0"
                scrolling="no"
                title="Substack Newsletter Subscription"
              />
            </div>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};