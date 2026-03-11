import React from 'react';
import { motion } from 'framer-motion';

export const Closing: React.FC = () => (
  <section id="contact" style={{
    background: '#050c18',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '80px 24px 40px',
    position: 'relative',
    overflow: 'hidden',
  }}>

    {/* Subtle glow */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(30,58,95,0.4) 0%, transparent 70%)',
    }} />

    <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 58px)',
          fontWeight: 400,
          color: '#c7e0f4',
          lineHeight: 1.3,
          margin: 0,
          marginBottom: '6px',
        }}>
          I've started my climb.
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4.5vw, 52px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#64748b',
          lineHeight: 1.3,
          margin: 0,
          marginBottom: '52px',
        }}>
          Time to keep climbing.
        </p>

        <p style={{
          fontSize: '13px',
          letterSpacing: '0.12em',
          color: '#334155',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          marginBottom: '32px',
        }}>
          Reach out to start a new journey.
        </p>

        <a
          href="mailto:masondferre@gmail.com?subject=Let's%20Climb"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 36px', borderRadius: '32px',
            background: 'white', color: '#0f172a',
            fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.04em', textDecoration: 'none',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--blue-light)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'white';
          }}
        >
          Contact
        </a>
      </motion.div>
    </div>
  </section>
);
