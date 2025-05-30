import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';
export const Organizations = () => {
  const organizations = [{
    name: 'Taob Holdings',
    period: '2022 - Present',
    description: 'I am on the board of directors of Taob Holdings, LLC, a family-owned asset management company. My roles comprise identifying investment property leads, underwriting deals, and networking with other professionals. In our first year, I led a portfolio growth of 20%. We have investments across the PNW and Nashville, Tennessee. I look at real estate as a puzzle waiting to be pieced together, as each property of a portfolio needs to fit together to create a beautiful picture/successful portfolio.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Screenshot%202023-11-05%20at%2012_15_38%20PM.avif'
  }, {
    name: 'Oregon Consulting Group',
    period: '2022 - 2025',
    description: 'I have worked with the Oregon Consulting Group (OCG) for the past two and a half years as a Consultant, Account Manager, Project Manager, Senior Manager, and President. The OCG is a student-run strategy consulting firm housed out of the Lundquist College of Business at the University of Oregon. I have been staffed on multiple projects with amazing clients, focusing on business strategy and expansion. My past clients include a healthcare per diem staffing startup, an electrochemistry lab startup, and a >$1B AUM regional bank. Under my leadership, our group has landed a US-leading Kombucha manufacturer and a $3B+ valued lithium-ion battery material producer.',
    logo: 'https://github.com/iamnotacoder13/images/blob/main/Workmark_Slogan_Green.png?raw=true',
    website: 'https://oregonconsultinggroup.com'
  }, {
    name: 'July AI',
    period: '2025 - 2025',
    description: 'I led growth for July AI, a pre-seed startup that was founded to ensure that everyone can adapt to these changes successfully. During my tenure, we launched our alpha product on the University of Oregon campus, where I spearheaded all user acquisiton.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/july_JPG.avif',
    website: 'https://gojuly.ai'
  }, {
    name: 'Beer Me.',
    period: '2024-2025',
    description: 'My roommate and I co-founded Beer Me., a hoodie that holds your beer. We received $5K in funding from the Oregon Innovation Challenge to launch our first collection of hoodies. I helped lead operations, sales, and marketing, leading to 200+ sold hoodies. In May 2025 we sold the company.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Black%20Logo.avif'
  }];
  return <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-12">Amazing Organizations I Have Worked With</h2>
        </AnimateOnScroll>
        <div className="space-y-8">
          {organizations.map((org, index) => <AnimateOnScroll key={index}>
              <motion.div whileHover={{
            scale: 1.02,
            y: -5
          }} transition={{
            duration: 0.3
          }} className="p-6 border border-gray-100 rounded-lg hover:border-gray-200 hover:shadow-lg transition-all">
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
                      <h3 className="text-xl font-semibold">{org.name}</h3>
                      <span className="text-gray-400 md:ml-2">
                        {org.period}
                      </span>
                    </div>
                    <p className="text-gray-600">{org.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>)}
        </div>
      </div>
    </section>;
};