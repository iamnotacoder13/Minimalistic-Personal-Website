import React, { useState } from 'react';
import { motion } from 'framer-motion';

const JOBS = [
  {
    emoji: '🐷',
    role: 'Pig Farmer',
    lesson: 'Partnerships',
    body: "Asking for help and acknowledging when you're operating outside your capabilities is crucial. Feeding in the dead cold of winter sucks.",
    accent: '#4A9040',
  },
  {
    emoji: '🪓',
    role: 'Lumberjack',
    lesson: 'Dependability',
    body: "I ran a firewood business serving clients across my home county. They depended on me through the winter. I never missed a delivery.",
    accent: '#2A7840',
  },
  {
    emoji: '🧀',
    role: 'Grilled Cheese Shop',
    lesson: 'Create a Solution',
    body: "Sold grilled cheeses out of my dorm room when the dining hall closed. I saw a gap and filled it — late-night, affordable, delicious.",
    accent: '#d4607a',
  },
  {
    emoji: '⛵',
    role: 'Dock Worker',
    lesson: 'Be Approachable',
    body: "Smile. Hold the kayak when people are getting in. Being warm and present is a competitive advantage most people underestimate.",
    accent: '#3A8C30',
  },
];

const EmojiDisplay: React.FC<{ emoji: string }> = ({ emoji }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={hovered
        ? { rotate: 360, y: 0, scale: 1.1 }
        : { rotate: 0,   y: [0, -8, 0], scale: 1 }
      }
      transition={hovered
        ? { rotate: { duration: 0.55, ease: 'easeInOut' }, scale: { duration: 0.2 } }
        : { y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.2 } }
      }
      style={{
        fontSize: '72px',
        lineHeight: 1,
        cursor: 'default',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {emoji}
    </motion.div>
  );
};

const JobCard: React.FC<{ job: (typeof JOBS)[0]; index: number }> = ({ job, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#0d1a2d',
      boxShadow: '0 2px 0 rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {/* Emoji display area */}
    <div style={{
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,0.03)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <EmojiDisplay emoji={job.emoji} />
    </div>

    {/* Text */}
    <div style={{ padding: '24px 24px 28px', flex: 1 }}>
      <div style={{
        display: 'inline-block',
        fontSize: '10px', fontFamily: 'var(--font-body)', fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: job.accent,
        background: job.accent + '18',
        border: `1px solid ${job.accent}40`,
        borderRadius: '20px', padding: '4px 11px', marginBottom: '12px',
      }}>
        {job.lesson}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700,
        color: '#c7e0f4', marginBottom: '10px', lineHeight: 1.2,
      }}>
        {job.role}
      </div>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: '#ffffff', lineHeight: 1.65, margin: 0,
      }}>
        {job.body}
      </p>
    </div>
  </motion.div>
);

export const OddJobs: React.FC = () => (
  <section style={{
    background: 'var(--dark)',
    padding: '40px 48px 110px',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: '64px' }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#B8860B', marginBottom: '14px',
        }}>
          Before the Startups
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4.5vw, 56px)',
          fontWeight: 700, color: '#c7e0f4', margin: 0, lineHeight: 1.1,
        }}>
          Odd Jobs &<br />
          <em style={{ fontWeight: 300, color: '#c7e0f4', fontStyle: 'italic' }}>what they taught me</em>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
      }}>
        {JOBS.map((job, i) => (
          <JobCard key={job.role} job={job} index={i} />
        ))}
      </div>
    </div>
  </section>
);
