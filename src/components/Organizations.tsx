import React from 'react';
import { AnimateOnScroll } from './AnimateOnScroll';
import { motion } from 'framer-motion';
export const Organizations = () => {
  const organizations = [{
    name: 'Arch',
    period: '2025 - Present',
    description: 'Arch is a Series B fintech startup that is working to automate the post-investment process for alts investors. I am apart of the Operations team, where I work to onboard our clients and ensure our business is ticking.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/download.jpeg',
    website: 'https://arch.co/'
  },{
    name: 'Taob Holdings',
    period: '2022 - Present',
    description: 'I am on the Board of Directors of Taob Holdings, LLC, a family-owned asset management company. My roles comprise identifying investment property leads, underwriting deals, and networking with other professionals. In our first year, I led a portfolio growth of 20%. We have investments across the PNW and Nashville, Tennessee. I look at real estate as a puzzle waiting to be pieced together, as each property of a portfolio needs to fit together to create a beautiful picture/successful portfolio.',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Screenshot%202023-11-05%20at%2012_15_38%20PM.avif'
  }, {
    name: 'Oregon Consulting Group',
    period: '2022 - 2025',
    description: 'I worked with the Oregon Consulting Group (OCG) for two and a half years as a Consultant, Account Manager, Project Manager, Senior Manager, and President. The OCG is a student-run strategy consulting firm housed out of the Lundquist College of Business at the University of Oregon. I have been staffed on multiple projects with amazing clients, focusing on business strategy and expansion. My past clients include a healthcare per diem staffing startup, an electrochemistry lab startup, and a >$1B AUM regional bank. Under my leadership, our group landed a US-leading Kombucha manufacturer and a $3B+ valued lithium-ion battery material producer as clients.',
    logo: 'https://github.com/iamnotacoder13/images/blob/main/Screenshot_2025-10-17_at_4.17.44_PM-removebg-preview.png?raw=true',
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
  return <section id="projects" className="py-20 px-6 bg-[#124734]">
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
