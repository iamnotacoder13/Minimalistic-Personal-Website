import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
  };

  const iconStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
  };

  const hover = (e: React.MouseEvent<HTMLElement>, enter: boolean) => {
    (e.currentTarget as HTMLElement).style.color = enter ? 'var(--text)' : 'var(--text-muted)';
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '18px 36px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: scrolled ? 'rgba(7,16,31,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background 0.4s, backdrop-filter 0.4s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
    }}>
      {/* Logo */}
      <a href="#" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '17px',
        fontWeight: 600,
        color: 'var(--text)',
        textDecoration: 'none',
        letterSpacing: '0.06em',
      }}>
        <em>MF</em>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {/* Nav links */}
        {[['#about', 'About'], ['#peaks', 'My Climbs']].map(([href, label]) => (
          <a key={label} href={href} style={linkStyle}
            onMouseEnter={e => hover(e, true)}
            onMouseLeave={e => hover(e, false)}>
            {label}
          </a>
        ))}

        {/* Divider */}
        <span style={{ width: '1px', height: '16px', background: 'var(--text-faint)', opacity: 0.4 }} />

        {/* Email icon */}
        <a href="mailto:masondferre@gmail.com" aria-label="Email" style={iconStyle}
          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
        </a>

        {/* Instagram icon */}
        <a href="https://www.instagram.com/masonferre1/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={iconStyle}
          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
        </a>

        {/* LinkedIn icon */}
        <a href="https://www.linkedin.com/in/mason-ferre/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={iconStyle}
          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="3"/>
            <path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>
          </svg>
        </a>

        {/* YouTube icon */}
        <a href="https://www.youtube.com/@masonsthoughts" aria-label="YouTube" target="_blank" rel="noopener noreferrer" style={iconStyle}
          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="5" width="20" height="14" rx="3"/>
            <path d="M10 9l5 3-5 3V9z" fill="currentColor" stroke="none"/>
          </svg>
        </a>

        {/* Substack icon */}
        <a href="https://substack.com/@masonferre" aria-label="Substack" target="_blank" rel="noopener noreferrer" style={iconStyle}
          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 4h18v2.5H3zM3 9h18v2.5H3zM3 14l9 6 9-6v6H3z"/>
          </svg>
        </a>
      </div>
    </header>
  );
};
