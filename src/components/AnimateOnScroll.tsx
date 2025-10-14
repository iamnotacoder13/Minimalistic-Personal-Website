import React from 'react';
import { motion } from 'framer-motion';
interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
}
export const AnimateOnScroll = ({
  children,
  className = ''
}: AnimateOnScrollProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 50,
    scale: 0.95
  }} whileInView={{
    opacity: 1,
    y: 0,
    scale: 1
  }} viewport={{
    once: true,
    margin: '-100px'
  }} transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1]
  }} className={className}>
      {children}
    </motion.div>;
};