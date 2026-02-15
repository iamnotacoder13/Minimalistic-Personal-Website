import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';
export const Organizations = () => {
  const organizations = [{
    name: 'Arch',
    period: '2025 - 2026',
    description: 'Worked on automating the post-investment process for alts investors. Had the itch to do my own thing. Left in 2026.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/download.jpeg',
    website: 'https://arch.co/'
  },{
    name: 'Taob Holdings',
    period: '2022 - Present',
    description: 'Growing a small real estate portfolio. Focused on multi-family and small scale commercial units across the PNW and Nashville area.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Screenshot%202023-11-05%20at%2012_15_38%20PM.avif'
  }, {
    name: 'Oregon Consulting Group',
    period: '2022 - 2025',
    description: 'Some of the most fun I have had in my life. Worked across health tech, electrochemistry, and banking industries. Spent a lot of early mornings and late nights working on decks, chugging coffee, and laughing. OCG <3',
    logo: 'https://github.com/iamnotacoder13/images/blob/main/Screenshot_2025-10-17_at_4.17.44_PM-removebg-preview.png?raw=true',
    website: 'https://oregonconsultinggroup.com'
  }, {
    name: 'July AI',
    period: '2025 - 2025',
    description: 'Led growth for July AI to help students and knowlege workers prepare for the AI transition in the workforce. Launched alpha product during my tenure.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/july_JPG.avif',
    website: 'https://gojuly.ai'
  }, {
    name: 'Beer Me.',
    period: '2024-2025',
    description: 'Co-founded Beer Me. with my roommate and best friend. Sold hundreds of hoodies through in-person tactics. Found it is easier to sell after shotgunning one brew.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Black%20Logo.avif',
    website: 'https://shopbeerme.com/'
  }];
  return <section id="projects" className="py-20 px-6 bg-[#2d5a47]">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-12 text-white">Amazing Organizations I Have Worked With</h2>
        </AnimateOnScroll>
        <div className="space-y-8">
          {organizations.map((org, index) => <AnimateOnScroll key={index}>
              <motion.div whileHover={{
            scale: 1.02,
            y: -5
          }} transition={{
            duration: 0.3
          }} className="p-6 border border-gray-300 rounded-lg hover:border-gray-200 hover:shadow-lg transition-all bg-white/10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {org.website ? <a href={org.website} target="_blank" rel="noopener noreferrer" className="block group relative">
                      <motion.img whileHover={{
                  scale: 1.1,
                  rotate: -3
                }} transition={{
                  duration: 0.3
                }} src={org.logo} alt={`${org.name} logo`} className="w-[100px] object-contain cursor-pointer transition-all group-hover:opacity-80" />
                    </a> : <motion.img whileHover={{
                scale: 1.1,
                rotate: -3
              }} transition={{
                duration: 0.3
              }} src={org.logo} alt={`${org.name} logo`} className="w-[100px] object-contain" />}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{org.name}</h3>
                      <span className="text-gray-300 md:ml-2">
                        {org.period}
                      </span>
                    </div>
                    <p className="text-gray-200">{org.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>)}
        </div>
      </div>
    </section>;
};
