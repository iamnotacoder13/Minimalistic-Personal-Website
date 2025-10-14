import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
export const Contact = () => {
  return <section id="contact" className="py-20 px-6 bg-[#124734]">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-8 text-white">Get in Touch</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-white mb-8">
            Want to connect? Let's chat.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <a href="mailto:masondferre@gmail.com?subject=Hello%20Mason" className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Email me
          </a>
        </AnimateOnScroll>
      </div>
    </section>;
};