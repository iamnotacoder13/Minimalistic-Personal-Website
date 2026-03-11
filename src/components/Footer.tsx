import React from 'react';
import { MountainScene } from './Hero';

export const Footer: React.FC = () => (
  <div style={{ position: 'relative', background: 'var(--dark)' }}>
    {/* Mountain overlay — mirrors the hero bottom */}
    <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
      <MountainScene />
    </div>

  <footer style={{
    background: 'var(--dark)',
    padding: '28px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <span style={{
      fontFamily: 'var(--font-display)',
      fontSize: '15px',
      fontWeight: 500,
      color: 'var(--text-faint)',
      letterSpacing: '0.04em',
    }}>
      Mason Ferré
    </span>
    <span style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
      © {new Date().getFullYear()}
    </span>
  </footer>
  </div>
);
