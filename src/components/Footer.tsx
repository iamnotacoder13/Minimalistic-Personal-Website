import React from 'react';
import { MountainScene } from './Hero';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  return (
  <div style={{ position: 'relative', background: 'var(--dark)' }}>
    {/* Mountain overlay — mirrors the hero bottom */}
    <div style={{ position: 'relative', height: isMobile ? '240px' : '380px', overflow: 'hidden' }}>
      <MountainScene />
    </div>

  <footer style={{
    background: 'var(--dark)',
    padding: isMobile ? '20px 20px' : '28px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  }}>
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: isMobile ? '13px' : '15px',
      fontWeight: 500,
      color: 'var(--text-faint)',
      letterSpacing: '0.04em',
    }}>
      Mason Ferré
    </span>
    <span style={{ fontSize: isMobile ? '10px' : '11px', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
      © {new Date().getFullYear()}
    </span>
  </footer>
  </div>
  );
};
