import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBankIcon, AxeIcon, SandwichIcon, SailboatIcon } from 'lucide-react';
import { AnimateOnScroll } from './AnimateOnScroll';
interface JobItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export const OddJobs = () => {
  const jobs: JobItem[] = [{
    title: 'Pig Farmer',
    description: 'Partnerships are important. Asking for help and acknowledging when you are operating out of your capabilities is crucial. Feeding in the dead cold of winter sucks.',
    icon: <PiggyBankIcon className="w-6 h-6" />
  }, {
    title: 'Lumberjack',
    description: 'The importance of being dependable. In my sophomore year, I ran a wood fire business with clients across my home county. I lived in a small, cold community that needed firewood to make it through the winter. My clients depended on me to fulfill their orders and deliver them on time.',
    icon: <AxeIcon className="w-6 h-6" />
  }, {
    title: 'Running a Grilled Cheese Shop',
    description: 'Being creative and innovative is key. I started selling grilled cheeses out of my dorm room to provide affordable, late-night food for University of Oregon freshmen. I saw the problem of lack of affordable food upon the closure of dining halls, and instead of accepting what is, I created a solution.',
    icon: <SandwichIcon className="w-6 h-6" />
  }, {
    title: 'Dock Worker',
    description: 'Being approachable is important. So is smiling. So is holding the kayak when people are getting in.',
    icon: <SailboatIcon className="w-6 h-6" />
  }];
  return <AnimateOnScroll>
      <div className="mt-2">
        <h3 className="text-3xl font-bold mb-8">Odd Jobs & What I Learned</h3>
        <div className="grid gap-6">
          {jobs.map((job, index) => <motion.div key={index} whileHover={{
          scale: 1.01
        }} className="p-6 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all">
              <div className="flex gap-4">
                <div className="mt-1 text-gray-700">{job.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{job.title}</h4>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </AnimateOnScroll>;
};