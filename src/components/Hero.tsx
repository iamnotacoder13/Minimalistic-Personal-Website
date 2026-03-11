import React from 'react';
import { motion } from 'framer-motion';

// ── Star field ───────────────────────────────────────────────────────────────
// 4 tiers matching real night sky reference:
//   0 = tiny dim pinpoints  (~55%)
//   1 = small visible dots  (~28%)
//   2 = bright dots w/ glow (~13%)
//   3 = sparkle stars — cross-glow effect (~4%)
const STARS = Array.from({ length: 200 }, (_, i) => {
  const t = i * 1.6180339;
  const x = ((Math.sin(t * 7.391) + 1) / 2) * 100;
  const y = ((Math.sin(t * 4.723) + 1) / 2) * 62;
  const r = (Math.sin(t * 11.37) + 1) / 2;
  // tier 0 = tiny dim (~55%), tier 1 = medium (~30%), tier 2 = bright (~15%)
  const tier = r < 0.55 ? 0 : r < 0.85 ? 1 : 2;
  const dur  = 2.0 + ((Math.sin(t * 5.13) + 1) / 2) * 5;
  const del  = ((Math.sin(t * 9.71) + 1) / 2) * 8;
  const size = tier === 2 ? 2.6 : tier === 1 ? 1.6 : 1.0;
  return { x, y, tier, dur, del, size };
});

const TWINKLE_CSS = `
  @keyframes tw0 { 0%,100%{opacity:.32} 50%{opacity:.18} }
  @keyframes tw1 { 0%,100%{opacity:.65} 50%{opacity:.40} }
  @keyframes tw2 { 0%,100%{opacity:.90} 50%{opacity:.60} }
`;

const StarField: React.FC = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
    <style>{TWINKLE_CSS}</style>
    {STARS.map((s, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${s.x}%`,
          top:  `${s.y}%`,
          width:  s.size,
          height: s.size,
          borderRadius: '50%',
          background: 'rgba(240,248,255,0.95)',
          boxShadow: s.tier === 2 ? '0 0 4px 1px rgba(220,235,255,0.40)' : 'none',
          animation: `tw${s.tier} ${s.dur}s ${s.del}s infinite ease-in-out both`,
        }}
      />
    ))}
  </div>
);

// ── Mountain scene ──────────────────────────────────────────────────────────
const MW = 1440;
const MH = 380;

// Build filled mountain silhouette path from a skyline point array
function toPath(pts: [number, number][]): string {
  return (
    'M0,' + MH + ' ' +
    pts.map(([x, y]) => 'L' + x + ',' + y).join(' ') +
    ' L' + MW + ',' + MH + ' Z'
  );
}

// Linear interpolation along a polyline
function interpY(pts: [number, number][], x: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return pts[pts.length - 1][1];
}

// Ridge baseline for pine trees
const PINE_RIDGE: [number, number][] = [
  [0, 316], [140, 309], [300, 302], [460, 296],
  [620, 291], [780, 288], [940, 285], [1100, 283],
  [1240, 285], [1370, 290], [1440, 295],
];

// Generate pine-tree silhouette — each tree is an isoceles triangle
const PINE_PATH = ((): string => {
  const TW = 18, GAP = 2;
  let d = 'M0,' + MH;
  for (let x = 0; x < MW; x += TW + GAP) {
    const cx   = x + TW / 2;
    const base = interpY(PINE_RIDGE, cx);
    // Deterministic height variation using overlapping sine waves
    const v = Math.sin(cx * 0.17 + 0.4) * Math.sin(cx * 0.041 + 1.2) * Math.sin(cx * 0.013 + 2.8);
    const h  = 38 + v * 14;
    d += ' L' + x        + ',' + interpY(PINE_RIDGE, x);
    d += ' L' + cx       + ',' + (base - h);
    d += ' L' + (x + TW) + ',' + interpY(PINE_RIDGE, x + TW);
  }
  d += ' L' + MW + ',' + interpY(PINE_RIDGE, MW) + ' L' + MW + ',' + MH + ' Z';
  return d;
})();

// ── Mountain range profiles (Bridger Range / Montana Rockies) ───────────────

// Layer 1 — distant horizon, atmospheric blue haze
const L1: [number, number][] = [
  [0,238],[55,232],[110,224],[165,214],[212,202],[252,190],
  [285,176],[312,162],[334,148],[352,135],[366,122],[377,110],
  [385,100],[390,91],[394,83],[396,91],[399,102],[404,114],
  [412,126],[424,137],[440,146],[460,152],[484,149],[502,141],
  [516,132],[527,123],[535,132],[546,143],[561,152],[580,159],
  [602,162],[624,157],[640,148],[650,140],[657,149],[667,160],
  [683,168],[703,172],[726,168],[742,159],[752,151],[758,160],
  [767,170],[782,177],[803,179],[821,174],[830,166],[836,174],
  [846,183],[862,188],[882,185],[895,177],[903,186],[916,196],
  [934,200],[956,197],[972,188],[982,197],[998,207],[1020,211],
  [1048,209],[1074,202],[1098,209],[1128,215],[1164,218],
  [1206,221],[1254,224],[1310,229],[1378,238],[1440,248],
];

// Layer 2 — mid-distant range
const L2: [number, number][] = [
  [0,265],[48,256],[96,246],[142,234],[184,220],[220,204],
  [250,187],[274,170],[292,153],[305,137],[313,122],[318,108],
  [320,95],[321,83],[322,72],[324,83],[328,95],[334,108],
  [344,121],[358,133],[378,143],[402,149],[430,151],[458,146],
  [478,137],[491,128],[500,119],[507,129],[517,141],[532,151],
  [552,158],[574,155],[590,146],[600,137],[607,128],[613,137],
  [622,148],[637,158],[657,163],[680,159],[695,150],[704,142],
  [710,151],[721,163],[738,171],[760,168],[774,159],[781,151],
  [786,160],[796,171],[813,179],[836,176],[851,167],[858,159],
  [863,168],[874,180],[892,187],[916,184],[932,174],[940,165],
  [946,174],[958,186],[978,193],[1006,190],[1028,180],[1038,171],
  [1046,181],[1060,193],[1082,199],[1114,196],[1144,188],
  [1170,195],[1202,203],[1242,207],[1292,211],[1352,219],
  [1440,232],
];

// Layer 3 — main dramatic peaks (Sacajawea / Hardscrabble style)
const L3: [number, number][] = [
  [0,284],[42,274],[82,262],[118,248],[150,232],[176,214],
  [196,195],[211,175],[221,155],[227,136],[230,117],[231,99],
  [232,82],[233,66],[234,52],[236,66],[240,82],[246,99],
  [255,116],[268,132],[287,145],[312,154],[344,158],[384,154],
  [411,143],[427,130],[437,120],[443,130],[453,143],[469,154],
  [492,161],[518,158],[535,148],[544,139],[551,148],[563,161],
  [582,171],[610,175],[642,170],[659,160],[668,151],[675,161],
  [687,173],[710,180],[740,177],[758,167],[766,158],[772,167],
  [784,180],[806,188],[836,185],[856,174],[864,166],[870,176],
  [884,190],[908,196],[940,192],[960,181],[970,172],[977,182],
  [992,196],[1018,203],[1056,199],[1090,188],[1102,179],
  [1110,190],[1130,204],[1162,210],[1206,207],[1246,198],
  [1268,208],[1300,218],[1344,224],[1400,230],[1440,238],
];

// Layer 4 — dark forest ridge (base for pine silhouette)
const L4: [number, number][] = [
  [0,308],[70,301],[160,294],[280,287],[420,281],[570,276],
  [720,273],[870,270],[1020,268],[1170,270],[1300,274],
  [1420,280],[1440,282],
];

const MTN_LAYERS: { pts: [number, number][]; fill: string; delay: number }[] = [
  { pts: L1, fill: '#13274a', delay: 0.20 },
  { pts: L2, fill: '#0f1e3c', delay: 0.32 },
  { pts: L3, fill: '#0b1830', delay: 0.44 },
  { pts: L4, fill: '#080e1c', delay: 0.56 },
];

export const MountainScene: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: MH + 'px', pointerEvents: 'none', overflow: 'hidden',
  }}>
    {MTN_LAYERS.map(({ pts, fill, delay }, i) => (
      <motion.svg
        key={i}
        viewBox={'0 0 ' + MW + ' ' + MH}
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <path d={toPath(pts)} fill={fill} />
      </motion.svg>
    ))}

    {/* Pine forest silhouette — fills to --dark for seamless page transition */}
    <motion.svg
      viewBox={'0 0 ' + MW + ' ' + MH}
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
    >
      <path d={PINE_PATH} fill="var(--dark)" />
    </motion.svg>
  </div>
);

// ── Photo badge ─────────────────────────────────────────────────────────────
const PhotoBadge: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
  >
    {/* Lanyard string */}
    <svg width="40" height="18" viewBox="0 0 40 18" style={{ zIndex: 2, position: 'relative' }}>
      <path d="M14,16 L14,7 Q14,1 20,1 Q26,1 26,7 L26,16"
        stroke="#9ca3af" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <line x1="9" y1="16" x2="31" y2="16" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>

    {/* Swaying badge */}
    <div className="badge-sway" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: '190px',
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      }}>
        {/* Header bar */}
        <div style={{
          background: '#0f1e30',
          padding: '10px 14px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'white', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>M</span>
            <span style={{ fontSize: '11px', color: '#c9a84c', fontFamily: 'var(--font-body)' }}>△</span>
          </div>
          <span style={{ fontSize: '8px', color: '#64748b', letterSpacing: '0.14em', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            ID · 2026
          </span>
        </div>

        {/* Photo */}
        <img
          src="/mason-profile.jpg"
          alt="Mason Ferré"
          style={{
            width: '100%',
            display: 'block',
            height: '150px',
            objectFit: 'cover',
            objectPosition: 'center 15%',
          }}
        />

        {/* Info section */}
        <div style={{ padding: '12px 14px 10px' }}>
          <div style={{
            fontSize: '14px',
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '0.02em',
            marginBottom: '3px',
          }}>
            Mason Ferré
          </div>
          <div style={{
            fontSize: '10px',
            fontFamily: 'var(--font-body)',
            color: '#475569',
            fontWeight: 500,
            letterSpacing: '0.04em',
            marginBottom: '10px',
          }}>
            Connector & Entrepreneur
          </div>

          {/* Barcode decoration */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', marginBottom: '6px' }}>
            {[3,5,2,4,5,2,3,1,4,3,5,2,4,3,5,2,3,4,2,5,3].map((h, i) => (
              <div key={i} style={{
                width: '2px',
                height: `${h * 3}px`,
                background: '#0f172a',
                borderRadius: '1px',
                opacity: 0.7,
              }} />
            ))}
          </div>

          <div style={{
            fontSize: '8px',
            fontFamily: 'var(--font-body)',
            color: '#94a3b8',
            letterSpacing: '0.1em',
            fontWeight: 500,
          }}>
            BOZ · MF · 2026
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── Hero ─────────────────────────────────────────────────────────────────────
export const Hero: React.FC = () => (
  <section style={{
    minHeight: '100vh',
    background: 'var(--dark)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '60px 24px 80px',
  }}>
    {/* Radial glow */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 65% 55% at 50% 38%, #0d2347 0%, transparent 72%)',
    }} />

    {/* Dot-grid texture */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
    }} />

    {/* Twinkling star field */}
    <StarField />

    {/* Text content */}
    <div style={{ position: 'relative', zIndex: 2 }}>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 7.5vw, 100px)',
          fontWeight: 300,
          color: '#c7e0f4',
          lineHeight: 1,
          margin: 0,
          marginBottom: '4px',
        }}
      >
        Hey there.
      </motion.p>

      {/* Heading with gold circle animation */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '36px', padding: '12px 24px' }}>
        <svg
          style={{
            position: 'absolute',
            top: '-8px', left: '-72px',
            width: 'calc(100% + 144px)',
            height: 'calc(100% + 16px)',
            pointerEvents: 'none',
            overflow: 'visible',
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 50,2 A 48,48 0 0 1 98,50 A 48,48 0 0 1 50,98 A 48,48 0 0 1 2,50 A 48,48 0 0 1 50,2 Z"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1.01, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7.5vw, 100px)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#ffffff',
            lineHeight: 1,
            margin: 0,
          }}
        >
          I'm Mason.
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.55 }}
        style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          marginBottom: '64px',
        }}
      >
        Bozeman-based — comfortable with the altitude
      </motion.p>

      <PhotoBadge />
    </div>

    {/* Mountain scene */}
    <MountainScene />

    {/* Scroll cue */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      style={{
        position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', zIndex: 3,
      }}
    >
      <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: '#1e3a5f', textTransform: 'uppercase' }}>scroll</span>
      <motion.svg animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
        width="12" height="18" viewBox="0 0 12 18" fill="none">
        <path d="M6 1v12M1 8l5 5 5-5" stroke="#1e3a5f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </motion.div>
  </section>
);
