import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
export const About = () => {
  return <section id="about" className="py-20 px-6 bg-[#2d5a47]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-8 text-white">About Me</h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-gray-200 mb-6">
            Hi, my name is Mason Ferré. I am a recent graduate working in NYC at a series A startup who is passionate about creating meaningful change in
            businesses and our environment.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p className="text-gray-200">
            My blend of experience as a strategy consultant, entrepreneur, and first biz hire
            allows me to look at problems from a unique point of view and
            develop innovative insights.
          </p>
        </AnimateOnScroll>
      </div>
    </section>;
};