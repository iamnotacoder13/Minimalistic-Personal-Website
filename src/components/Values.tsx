import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldIcon, HeartIcon, UserIcon, StarIcon, TrendingUpIcon } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';
interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export const Values = () => {
  const values: ValueItem[] = [{
    title: 'INTEGRITY',
    description: 'Having strong morals and sticking to them is something I practice. Those who have a <span className="font-bold text-[#ff6b35]">strong moral compass</span> tend to attract like-minded individuals and make meaningful impacts.',
    icon: <ShieldIcon className="w-10 h-10 text-[#154733]" />
  }, {
    title: 'EMPATHY',
    description: '<span className="font-bold text-[#ff6b35]">Genuinely caring</span> for others is essential to building relationships and leadership.',
    icon: <HeartIcon className="w-10 h-10 text-[#154733]" />
  }, {
    title: 'AUTHENTICITY',
    description: 'Being my authentic self allows others to <span className="font-bold text-[#ff6b35]">trust</span> and <span className="font-bold text-[#ff6b35]">connect</span> with me more quickly.',
    icon: <UserIcon className="w-10 h-10 text-[#154733]" />
  }, {
    title: 'THE SMALL THINGS',
    description: '<span className="font-bold text-[#ff6b35]">Little actions</span> like being responsive or helping out build <span className="font-bold text-[#ff6b35]">lasting</span> impressions and character.',
    icon: <StarIcon className="w-10 h-10 text-[#154733]" />
  }, {
    title: 'PROGRESS',
    description: 'I strive to be <span className="font-bold text-[#ff6b35]">1% better</span> every day—steady, intentional improvement adds up.',
    icon: <TrendingUpIcon className="w-10 h-10 text-[#154733]" />
  }];
  return <AnimateOnScroll>
      <div className="mt-2">
        <h3 className="text-3xl font-bold mb-8 text-white">
          My Values
        </h3>
        <div className="flex flex-wrap justify-center gap-5">
          {values.map((value, index) => <div key={index} className="w-[280px] h-[250px] cursor-pointer perspective group">
              <div className={"relative w-full h-full transition-transform duration-700 transform-style preserve-3d group-hover:rotate-y-180"}>
                {/* Front Side */}
                <div className="absolute w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg backface-hidden flex flex-col justify-center items-center p-6">
                  <div>{value.icon}</div>
                  <h4 className="text-xl font-semibold mt-4 text-center text-[#154733]">
                    {value.title}
                  </h4>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-white border border-gray-200 rounded-lg shadow-lg backface-hidden transform rotate-y-180 flex items-center justify-center text-sm text-center p-6">
                  <p className="text-[#154733] leading-relaxed" dangerouslySetInnerHTML={{ __html: value.description }}>
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </AnimateOnScroll>;
};