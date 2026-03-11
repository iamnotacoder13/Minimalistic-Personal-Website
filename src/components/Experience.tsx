import React from 'react';
import { motion } from 'framer-motion';

interface Org {
  id: number;
  initial: string;
  name: string;
  elevation: string;
  role: string;
  period: string;
  description: string;
  link: string | null;
  logo: string;
  bgText: string;
  mountain: React.ReactNode;
}

// Unique mountain SVG per org for the badge card center
const MtnArch = () => (
  <svg viewBox="0 0 90 64" style={{ width: '100%', display: 'block' }}>
    <polygon points="45,4 82,60 8,60" fill="none" stroke="#1e3a5f" strokeWidth="1.6"/>
    <polygon points="45,4 53,20 37,20" fill="#3b82f6" opacity="0.8"/>
    <line x1="45" y1="4" x2="45" y2="60" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.2"/>
  </svg>
);
const MtnOCG = () => (
  <svg viewBox="0 0 90 64" style={{ width: '100%', display: 'block' }}>
    <polygon points="20,58 45,10 70,58" fill="none" stroke="#1e3a5f" strokeWidth="1.6"/>
    <polygon points="8,58 25,28 42,58" fill="#1e3a5f" opacity="0.18"/>
    <polygon points="50,58 68,28 86,58" fill="#1e3a5f" opacity="0.18"/>
    <polygon points="45,10 52,22 38,22" fill="#3b82f6" opacity="0.8"/>
  </svg>
);
const MtnJuly = () => (
  <svg viewBox="0 0 90 64" style={{ width: '100%', display: 'block' }}>
    <polygon points="45,6 56,58 34,58" fill="none" stroke="#1e3a5f" strokeWidth="1.6"/>
    <polygon points="45,6 49,18 41,18" fill="#3b82f6" opacity="0.8"/>
    <line x1="45" y1="6" x2="34" y2="58" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15"/>
    <line x1="45" y1="6" x2="56" y2="58" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15"/>
  </svg>
);
const MtnBeer = () => (
  <svg viewBox="0 0 90 64" style={{ width: '100%', display: 'block' }}>
    <path d="M10,58 Q20,30 45,14 Q70,30 80,58 Z" fill="none" stroke="#1e3a5f" strokeWidth="1.6"/>
    <polygon points="45,14 51,26 39,26" fill="#3b82f6" opacity="0.7"/>
  </svg>
);
const MtnTaob = () => (
  <svg viewBox="0 0 90 64" style={{ width: '100%', display: 'block' }}>
    <polygon points="10,58 45,20 80,58" fill="none" stroke="#1e3a5f" strokeWidth="1.6"/>
    <line x1="10" y1="58" x2="80" y2="58" stroke="#1e3a5f" strokeWidth="1.2" opacity="0.25"/>
    <polygon points="45,20 52,34 38,34" fill="#3b82f6" opacity="0.8"/>
    <line x1="20" y1="58" x2="20" y2="48" stroke="#1e3a5f" strokeWidth="1" opacity="0.2"/>
    <line x1="35" y1="58" x2="35" y2="42" stroke="#1e3a5f" strokeWidth="1" opacity="0.2"/>
    <line x1="55" y1="58" x2="55" y2="42" stroke="#1e3a5f" strokeWidth="1" opacity="0.2"/>
    <line x1="70" y1="58" x2="70" y2="48" stroke="#1e3a5f" strokeWidth="1" opacity="0.2"/>
  </svg>
);

const ORGS: Org[] = [
  {
    id: 5, initial: 'T', name: 'Taob Holdings', elevation: '2,022m',
    role: 'Founder', period: 'January 2022 · Present',
    description: 'Growing a small real estate portfolio. Focused on multi-family and small scale commercial units across the PNW and Nashville area.',
    link: null,
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Screenshot%202023-11-05%20at%2012_15_38%20PM.avif',
    bgText: 'TAOB', mountain: <MtnTaob />,
  },
  {
    id: 2, initial: 'O', name: 'Oregon Consulting Group', elevation: '3,478m',
    role: 'President', period: 'September 2022 · June 2026',
    description: 'Some of the most fun I\'ve had in my life. Worked across health tech, electrochemistry, and banking industries. Early mornings, late nights, coffee, and laughter. OCG ♥',
    link: 'https://oregonconsultinggroup.com',
    logo: 'https://github.com/iamnotacoder13/images/blob/main/Screenshot_2025-10-17_at_4.17.44_PM-removebg-preview.png?raw=true',
    bgText: 'OCG', mountain: <MtnOCG />,
  },
  {
    id: 1, initial: 'A', name: 'Arch', elevation: '4,025m',
    role: 'Investment Operations', period: 'January 2025 · January 2026',
    description: 'Worked on automating the post-investment process for alts investors. Had the itch to do my own thing. Left in 2026.',
    link: 'https://arch.co/',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/download.jpeg',
    bgText: 'ARCH', mountain: <MtnArch />,
  },
  {
    id: 3, initial: 'J', name: 'July AI', elevation: '2,025m',
    role: 'Head of Growth', period: 'April 2025 · July 2025',
    description: 'Led growth for July AI to help students and knowledge workers prepare for the AI transition in the workforce. Launched alpha product during my tenure.',
    link: 'https://gojuly.ai',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/july_JPG.avif',
    bgText: 'JULY AI', mountain: <MtnJuly />,
  },
  {
    id: 4, initial: 'B', name: 'Beer Me.', elevation: '2,024m',
    role: 'Co-Founder', period: 'August 2024 · May 2025',
    description: 'Co-founded Beer Me. with my roommate and best friend. Sold hundreds of hoodies through in-person tactics. Found it\'s easier to sell after shotgunning one brew.',
    link: 'https://shopbeerme.com/',
    logo: '/beer-me-logo.jpeg',
    bgText: 'BEER ME', mountain: <MtnBeer />,
  },
];

const BadgeCard: React.FC<{ org: Org }> = ({ org }) => (
  <div style={{
    width: '148px', flexShrink: 0,
    background: 'white', borderRadius: '10px',
    padding: '12px 10px 10px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    position: 'relative',
  }}>
    <div style={{ position: 'absolute', top: '7px', left: '8px', fontSize: '10px', fontFamily: 'var(--font-body)', color: '#0f172a', lineHeight: 1.3, fontWeight: 600 }}>
      <div>{org.initial}</div>
      <div style={{ color: '#3b82f6' }}>△</div>
    </div>
    <div style={{ padding: '16px 4px 4px' }}>
      {org.mountain}
    </div>
    <div style={{ textAlign: 'center', fontSize: '8.5px', color: '#64748b', letterSpacing: '0.12em', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
      {org.elevation}
    </div>
    <div style={{ position: 'absolute', bottom: '7px', right: '8px', fontSize: '10px', fontFamily: 'var(--font-body)', color: '#0f172a', lineHeight: 1.3, fontWeight: 600, transform: 'rotate(180deg)' }}>
      <div>{org.initial}</div>
      <div style={{ color: '#3b82f6' }}>△</div>
    </div>
  </div>
);

export const Experience: React.FC = () => (
  <div id="experience">
    {ORGS.map((org, i) => (
      <section key={org.id} style={{
        background: i % 2 === 0 ? 'var(--dark-2)' : 'var(--dark)',
        minHeight: '72vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Faded background org name */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 14vw, 180px)',
            fontWeight: 700,
            color: 'white',
            opacity: 0.025,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            {org.bgText}
          </span>
        </div>

        {/* Subtle mountain silhouette bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, opacity: 0.04, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: '100px', display: 'block' }}>
            <path d="M0,100 L0,70 L200,30 L400,55 L600,15 L800,45 L1000,10 L1200,40 L1440,20 L1440,100 Z" fill="var(--blue)"/>
          </svg>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            gap: '48px',
            alignItems: 'center',
            maxWidth: '820px',
            width: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <BadgeCard org={org} />

          <div style={{ flex: 1 }}>
            {/* Org logo small */}
            <div style={{ marginBottom: '16px' }}>
              <img src={org.logo} alt={org.name}
                style={{ height: '36px', width: 'auto', maxWidth: '120px', objectFit: 'contain', opacity: 0.9 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 600, color: 'white',
              margin: 0, marginBottom: '6px',
              lineHeight: 1.1,
            }}>
              {org.name}
            </h3>

            <p style={{ fontSize: '12px', color: 'var(--blue-light)', margin: '0 0 6px', fontWeight: 500, letterSpacing: '0.04em' }}>
              {org.role}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 18px', letterSpacing: '0.02em' }}>
              {org.period}
            </p>

            <p style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.72, margin: '0 0 24px', maxWidth: '420px' }}>
              {org.description}
            </p>

            {org.link && (
              <a href={org.link} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '9px 22px', borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#e0f2fe', fontSize: '12px', fontWeight: 500,
                  textDecoration: 'none', background: 'transparent',
                  transition: 'all 0.2s', letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--blue-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                  (e.currentTarget as HTMLElement).style.color = '#e0f2fe';
                }}
              >
                Check select project →
              </a>
            )}
          </div>
        </motion.div>
      </section>
    ))}
  </div>
);
