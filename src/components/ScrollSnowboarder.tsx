import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

// Smaller snow particles
const PARTICLES = [
  { size: 2, offX:  -3, delay: 0.00 },
  { size: 2, offX:   5, delay: 0.10 },
  { size: 2, offX:  -7, delay: 0.18 },
  { size: 1, offX:   2, delay: 0.27 },
  { size: 2, offX:  -5, delay: 0.08 },
  { size: 1, offX:   7, delay: 0.22 },
];

interface ParticleProps { size: number; offX: number; delay: number; dirX: number }

const SnowParticle: React.FC<ParticleProps> = ({ size, offX, delay, dirX }) => (
  <motion.div
    initial={{ x: offX, y: 0, opacity: 0, scale: 1 }}
    animate={{
      x:       [offX, offX + dirX * (8 + size * 3)],
      y:       [0, -(12 + size * 3)],
      opacity: [0, 0.75, 0],
      scale:   [1, 0.3],
    }}
    transition={{ duration: 0.45, delay, repeat: Infinity, repeatDelay: 0.4, ease: 'easeOut' }}
    style={{
      position: 'absolute', bottom: 8, left: '50%',
      marginLeft: -size / 2, width: size, height: size,
      borderRadius: '50%', background: 'rgba(210,245,255,0.95)',
      boxShadow: '0 0 3px rgba(140,215,255,0.7)', pointerEvents: 'none',
    }}
  />
);

// ── Stick figure snowboarder ───────────────────────────────────────────────────
const GOLD = '#B8860B';
const SW   = 2.5;

const SnowboarderSVG: React.FC = () => (
  <svg viewBox="0 0 60 84" width="100%" height="100%" style={{ overflow: 'visible', display: 'block' }}>
    <defs>
      <linearGradient id="s-brd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#70C8E8" />
        <stop offset="100%" stopColor="#2890C4" />
      </linearGradient>
    </defs>
    <rect x="2" y="75" width="56" height="7" rx="3.5" fill="url(#s-brd)" />
    <rect x="2" y="75" width="56" height="2.2" rx="1.1" fill="rgba(255,255,255,0.50)" />
    <rect x="2" y="75" width="56" height="7" rx="3.5" fill="none" stroke="rgba(20,110,180,0.45)" strokeWidth="0.8" />
    <rect x="14" y="72" width="9" height="4" rx="2" fill={GOLD} opacity="0.7" />
    <rect x="37" y="72" width="9" height="4" rx="2" fill={GOLD} opacity="0.7" />
    <line x1="30" y1="55" x2="20" y2="72" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" />
    <line x1="30" y1="55" x2="40" y2="72" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" />
    <line x1="30" y1="30" x2="30" y2="55" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" />
    <line x1="30" y1="38" x2="6"  y2="50" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" />
    <line x1="30" y1="38" x2="54" y2="50" stroke={GOLD} strokeWidth={SW} strokeLinecap="round" />
    <circle cx="30" cy="22" r="8" fill="none" stroke={GOLD} strokeWidth={SW} />
  </svg>
);

// ── Cursor-following component ────────────────────────────────────────────────
export const ScrollSnowboarder: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dirX,    setDirX]    = useState<-1 | 1>(1);
  const lastX = useRef<number | null>(null);

  const springX      = useSpring(200, { stiffness: 120, damping: 18 });
  const springY      = useSpring(200, { stiffness: 100, damping: 16 });
  const springRotate = useSpring(0,   { stiffness: 80,  damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX - 28; // center the figure on cursor
      const cy = e.clientY - 39;

      if (lastX.current !== null) {
        const dx = cx - lastX.current;
        if (Math.abs(dx) > 1) {
          setDirX(dx > 0 ? -1 : 1); // snow flies opposite to movement
          springRotate.set(dx * 0.8); // tilt into direction of travel
        }
      }
      lastX.current = cx;

      springX.set(cx);
      springY.set(cy);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [springX, springY, springRotate]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, pointerEvents: 'none' }}
        >
          <motion.div
            style={{
              x: springX, y: springY, rotate: springRotate,
              position: 'relative', width: 56, height: 78,
            }}
          >
            {PARTICLES.map((p, i) => (
              <SnowParticle key={`${dirX > 0 ? 'r' : 'l'}-${i}`} {...p} dirX={dirX} />
            ))}
            <SnowboarderSVG />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
