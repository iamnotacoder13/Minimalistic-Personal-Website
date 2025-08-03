import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
export const About = () => {
  return <section id="about" className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-gray-600 mb-6">
            Hi, my name is Mason Ferré. I am a senior at the University of
            Oregon who is passionate about creating meaningful change in
            businesses and our environment.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-gray-600">
            My blend of experience as a strategy consultant and entrepreneur
            allows me to look at problems from a unique point of view and
            develop innovative insights.
          </p>
        </AnimateOnScroll>
      </div>
    </section>;
};