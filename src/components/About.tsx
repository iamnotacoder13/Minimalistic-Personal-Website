import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => (
  <section id="about" style={{
    background: 'var(--dark)',
    padding: '130px 24px 120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Faint mountain horizon */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      opacity: 0.05, pointerEvents: 'none',
    }}>
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ width: '100%', height: '180px', display: 'block' }}>
        <path d="M0,180 L0,130 L200,70 L400,110 L600,40 L800,90 L1000,30 L1200,75 L1440,45 L1440,180 Z" fill="var(--blue)"/>
      </svg>
    </div>

    <div style={{ maxWidth: '700px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <motion.p
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 3.8vw, 50px)',
          fontWeight: 400,
          color: '#c7e0f4',
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        <strong style={{ fontWeight: 700, color: 'white' }}>connector</strong>
        {' & '}
        <strong style={{ fontWeight: 700, color: 'white' }}>entrepreneur</strong>
        {'.'}<br />
        from the{' '}
        <em style={{ fontStyle: 'italic', color: 'var(--blue-light)' }}>Pacific Northwest</em>
        {', now in '}
        <strong style={{ fontWeight: 600, color: 'white' }}>Bozeman</strong>
        {'.'}<br />
        loves{' '}
        <strong style={{ fontWeight: 600, color: 'var(--blue-light)' }}>community-building</strong>
        {', '}
        <strong style={{ fontWeight: 600, color: 'var(--blue-light)' }}>outdoor adventure</strong>
        {','}<br />
        {'and strong coffee.'}<br />
        {'chasing '}
        <em style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--blue)' }}>peaks</em>
        {' in business and nature.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ marginTop: '52px' }}
      >
        <svg viewBox="0 0 50 36" width="34" height="25" style={{ opacity: 0.35 }}>
          <polygon points="25,2 48,34 2,34" fill="none" stroke="var(--blue-light)" strokeWidth="1.5"/>
          <polygon points="25,2 31,13 19,13" fill="var(--blue-light)" opacity="0.5"/>
        </svg>
      </motion.div>
    </div>
  </section>
);
