import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValueItem {
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    title: 'SHOOT FOR THE STARS',
    description: '"Never do anything by halves if you want to get away with it. Be outrageous. Go the whole hog. Make sure everything you do is so completely crazy it\'s unbelievable."',
  },
  {
    title: 'EMPATHY',
    description: '"I\'ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."',
  },
  {
    title: 'AUTHENTICITY',
    description: '"Be who you are and say what you feel, because those who mind don\'t matter, and those who matter don\'t mind."',
  },
  {
    title: 'THE LITTLE THINGS',
    description: '"If you can\'t do the little things right, you will never do the big things right."',
  },
  {
    title: 'GROWTH',
    description: '"I am eager to believe that I am completely wrong about everything."',
  },
];

// ── Ice crystal geometry ─────────────────────────────────────────────────────
// Each crystal: a base polygon outline + layered facet polygons
// Colour constants for the ice palette (from light→dark)
const F = {
  frost:  'rgba(238,252,255,0.94)',   // frosted white cap
  pale:   'rgba(172,226,252,0.82)',   // pale ice face
  sky:    'rgba(96,182,238,0.74)',    // sky-blue side face
  deep:   'rgba(20,82,160,0.88)',     // deep interior
  abyss:  'rgba(6,32,105,0.97)',      // darkest bottom point
  glint:  'rgba(210,246,255,0.16)',   // inner luminance
  edge:   'rgba(170,232,255,0.22)',   // edge stroke
};

interface Facet { pts: string; fill: string }
interface CrystalData { outline: string; facets: Facet[] }

// Five unique crystal silhouettes — each hand-tuned
const CRYSTALS: CrystalData[] = [
  // 1. INTEGRITY — classic symmetric hexagonal gem
  {
    outline: '55,4 80,16 100,44 100,100 78,152 55,184 32,152 10,100 10,44 30,16',
    facets: [
      { pts: '55,4 80,16 74,38 55,28 36,38 30,16',                       fill: F.frost },
      { pts: '30,16 10,44 10,100 36,68 55,28 36,38',                     fill: F.sky   },
      { pts: '80,16 100,44 100,100 74,68 55,28 74,38',                   fill: F.pale  },
      { pts: '55,28 74,68 100,100 78,152 55,168 32,152 10,100 36,68',    fill: F.deep  },
      { pts: '32,152 55,168 78,152 55,184',                              fill: F.abyss },
      { pts: '55,28 65,52 58,82 52,82 45,52',                            fill: F.glint },
    ],
  },
  // 2. EMPATHY — wider, more open, gentle proportions
  {
    outline: '56,3 85,18 106,50 103,108 80,158 56,183 32,158 7,108 4,50 27,18',
    facets: [
      { pts: '56,3 85,18 77,42 56,30 35,42 27,18',                       fill: F.frost },
      { pts: '27,18 4,50 7,108 35,72 56,30 35,42',                       fill: F.sky   },
      { pts: '85,18 106,50 103,108 77,72 56,30 77,42',                   fill: F.pale  },
      { pts: '56,30 77,72 103,108 80,158 56,170 32,158 7,108 35,72',     fill: F.deep  },
      { pts: '32,158 56,170 80,158 56,183',                              fill: F.abyss },
      { pts: '56,30 68,56 60,86 52,86 44,56',                            fill: F.glint },
    ],
  },
  // 3. AUTHENTICITY — tallest, most slender, most dramatic spike
  {
    outline: '55,2 76,13 96,40 98,96 79,150 55,188 31,150 12,96 14,40 34,13',
    facets: [
      { pts: '55,2 76,13 69,35 55,24 41,35 34,13',                       fill: F.frost },
      { pts: '34,13 14,40 12,96 41,63 55,24 41,35',                      fill: F.sky   },
      { pts: '76,13 96,40 98,96 69,63 55,24 69,35',                      fill: F.pale  },
      { pts: '55,24 69,63 98,96 79,150 55,174 31,150 12,96 41,63',       fill: F.deep  },
      { pts: '31,150 55,174 79,150 55,188',                              fill: F.abyss },
      { pts: '55,24 64,49 57,78 53,78 46,49',                            fill: F.glint },
    ],
  },
  // 4. THE SMALL THINGS — multi-facet jagged top, slightly chunkier
  {
    outline: '52,4 68,8 85,16 100,44 100,103 78,154 54,182 30,154 10,103 10,44 26,16 42,8',
    facets: [
      { pts: '52,4 68,8 85,16 77,40 56,30 38,40 26,16 42,8',             fill: F.frost },
      { pts: '26,16 10,44 10,103 38,68 56,30 38,40',                     fill: F.sky   },
      { pts: '85,16 100,44 100,103 77,68 56,30 77,40',                   fill: F.pale  },
      { pts: '56,30 77,68 100,103 78,154 54,170 30,154 10,103 38,68',    fill: F.deep  },
      { pts: '30,154 54,170 78,154 54,182',                              fill: F.abyss },
      { pts: '56,30 66,54 59,83 53,83 46,54',                            fill: F.glint },
    ],
  },
  // 5. PROGRESS — angular, slight asymmetric lean, upward energy
  {
    outline: '54,3 79,16 102,46 99,105 76,155 54,184 31,157 8,107 11,48 32,16',
    facets: [
      { pts: '54,3 79,16 71,38 54,27 38,38 32,16',                       fill: F.frost },
      { pts: '32,16 11,48 8,107 38,70 54,27 38,38',                      fill: F.sky   },
      { pts: '79,16 102,46 99,105 71,70 54,27 71,38',                    fill: F.pale  },
      { pts: '54,27 71,70 99,105 76,155 54,171 31,157 8,107 38,70',      fill: F.deep  },
      { pts: '31,157 54,171 76,155 54,184',                              fill: F.abyss },
      { pts: '54,27 65,52 57,81 51,81 44,52',                            fill: F.glint },
    ],
  },
];

// Float timing per crystal — offset phases so they don't sync
const FLOATS = [
  { duration: 3.4, delay: 0.0,  amplitude: 13 },
  { duration: 2.9, delay: 0.85, amplitude: 11 },
  { duration: 3.8, delay: 0.35, amplitude: 15 },
  { duration: 3.1, delay: 1.10, amplitude: 12 },
  { duration: 2.7, delay: 0.55, amplitude: 14 },
];

// ── Single crystal card ───────────────────────────────────────────────────────
const IceCrystalCard: React.FC<{ value: ValueItem; index: number }> = ({ value, index }) => {
  const [revealed, setRevealed] = useState(false);
  const crystal = CRYSTALS[index];
  const fl = FLOATS[index];

  return (
    <motion.div
      animate={{ y: [0, -fl.amplitude, 0] }}
      transition={{ duration: fl.duration, delay: fl.delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: 178, height: 248, cursor: 'pointer', flexShrink: 0 }}
      onClick={() => setRevealed(r => !r)}
    >
      {/* Soft glow pool beneath — brightens when revealed */}
      <motion.div
        animate={{ opacity: revealed ? 1 : 0.6, scale: revealed ? 1.2 : 1 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', bottom: -2, left: '50%',
          transform: 'translateX(-50%)',
          width: 88, height: 24,
          background: 'radial-gradient(ellipse, rgba(100,200,255,0.5) 0%, transparent 70%)',
          filter: 'blur(10px)',
          pointerEvents: 'none',
        }}
      />

      {/* Crystal SVG */}
      <svg
        viewBox="0 0 110 190"
        width="100%" height="100%"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Dark base fill so no bleed-through */}
        <polygon points={crystal.outline} fill="rgba(5,18,52,0.90)" />

        {/* Colour facets */}
        {crystal.facets.map((f, i) => (
          <polygon key={i} points={f.pts} fill={f.fill} />
        ))}

        {/* Dark tint overlay when revealed — ensures text readability */}
        {revealed && (
          <polygon points={crystal.outline} fill="rgba(2,10,35,0.72)" />
        )}

        {/* Edge line — defines the crystal against the dark bg */}
        <polygon points={crystal.outline} fill="none" stroke={F.edge} strokeWidth="1.2" />

        {/* Revealed-state rim brightens */}
        {revealed && (
          <polygon
            points={crystal.outline} fill="none"
            stroke="rgba(190,240,255,0.55)" strokeWidth="1.8"
          />
        )}
      </svg>

      {/* Floating text content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '38px 26px 52px',
      }}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.84 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}
            >
              {/* Small crystal icon */}
              <svg viewBox="0 0 20 24" width="16" height="19" style={{ opacity: 0.65 }}>
                <polygon points="10,1 18,7 18,17 10,23 2,17 2,7" fill="none" stroke="rgba(180,235,255,0.8)" strokeWidth="1.2"/>
                <polygon points="10,1 18,7 10,10 2,7" fill="rgba(180,235,255,0.25)"/>
              </svg>
              <span style={{
                fontSize: 10.5,
                letterSpacing: '0.20em',
                color: 'rgba(228,248,255,0.96)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 1.5,
              }}>
                {value.title}
              </span>
              <span style={{
                fontSize: 8,
                letterSpacing: '0.14em',
                color: 'rgba(100,175,225,0.45)',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                marginTop: 2,
              }}>
                tap
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.84 }}
              transition={{ duration: 0.28 }}
            >
              <p style={{
                fontSize: 10.5,
                color: 'rgba(228,248,255,1)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                lineHeight: 1.6,
                margin: 0,
                textAlign: 'center',
                textShadow: '0 1px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
              }}>
                {value.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export const Values: React.FC = () => (
  <section style={{
    background: 'var(--dark)',
    padding: '120px 24px 140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* Top divider */}
    <div style={{
      position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
      width: '400px', height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(100,200,255,0.28), transparent)',
    }} />

    {/* Ambient background bloom */}
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 700, height: 500, pointerEvents: 'none',
      background: 'radial-gradient(ellipse, rgba(15,55,130,0.10) 0%, transparent 70%)',
    }} />

    {/* Section label */}
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontSize: '10px', letterSpacing: '0.22em',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        fontFamily: 'var(--font-body)', fontWeight: 500,
        marginBottom: '16px',
      }}
    >
      What I Stand On
    </motion.p>

    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(28px, 4vw, 48px)',
        fontWeight: 700, color: 'white',
        margin: 0, marginBottom: '80px', textAlign: 'center',
      }}
    >
      My Values
    </motion.h2>

    {/* 3-top + 2-bottom crystal grid */}
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '52px' }}
    >
      {/* Row 1 */}
      <div style={{ display: 'flex', gap: '44px', alignItems: 'flex-end' }}>
        {VALUES.slice(0, 3).map((value, i) => (
          <IceCrystalCard key={value.title} value={value} index={i} />
        ))}
      </div>

      {/* Row 2 — 2 crystals centered under the gaps of row 1 */}
      <div style={{ display: 'flex', gap: '44px', alignItems: 'flex-end' }}>
        {VALUES.slice(3, 5).map((value, i) => (
          <IceCrystalCard key={value.title} value={value} index={i + 3} />
        ))}
      </div>
    </motion.div>
  </section>
);
