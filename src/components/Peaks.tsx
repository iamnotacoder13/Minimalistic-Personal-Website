import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FaceDef { pts: string; tone: 0 | 1 | 2 | 3 | 4 }
interface Peak {
  id: number;
  shortName: string; name: string; elevation: string; location: string;
  period: string; role: string; description: string;
  link: string | null; logo: string; emoji: string;
  labelX: number; labelY: number;
  faces: FaceDef[];
  snowPatches: string[];
  rockLines: Array<[number, number, number, number]>;
  trees: Array<{ x: number; y: number; h: number }>;
}


// ── Peak detail panel palettes (unchanged) ────────────────────────────────────
interface PeakPalette {
  shadow: string; light: string;
  shadowHov: string; lightHov: string;
  shadowSel: string; lightSel: string;
  snow: string; snowHl: string; ridge: string;
  label: string; labelHov: string;
  accent: string; accentBg: string; accentBorder: string;
}
const PALETTES: Record<number, PeakPalette> = {
  1: { shadow: '#141414', light: '#2e2e2e', shadowHov: '#202020', lightHov: '#3e3e3e', shadowSel: '#2a2a2a', lightSel: '#525252', snow: '#e0e0e0', snowHl: '#f6f6f6', ridge: 'rgba(220,220,220,0.13)', label: '#888888', labelHov: '#b0b0b0', accent: '#aaaaaa', accentBg: 'rgba(160,160,160,0.08)', accentBorder: 'rgba(160,160,160,0.25)' },
  2: { shadow: '#5a6898', light: '#8898c4', shadowHov: '#6878ac', lightHov: '#9aacd4', shadowSel: '#7888c0', lightSel: '#aabcde', snow: '#eae8f8', snowHl: '#f5f2ff', ridge: 'rgba(180,180,240,0.18)', label: '#8898c4', labelHov: '#aabcdc', accent: '#9898d0', accentBg: 'rgba(152,152,208,0.10)', accentBorder: 'rgba(152,152,208,0.30)' },
  3: { shadow: '#091c42', light: '#142c6c', shadowHov: '#0e2458', lightHov: '#1c3882', shadowSel: '#152e84', lightSel: '#2448aa', snow: '#e8eeff', snowHl: '#f2f6ff', ridge: 'rgba(100,140,210,0.20)', label: '#5878b2', labelHov: '#7898cc', accent: '#608acc', accentBg: 'rgba(96,138,204,0.10)', accentBorder: 'rgba(96,138,204,0.30)' },
  4: { shadow: '#0d3e2c', light: '#187152', shadowHov: '#12503a', lightHov: '#1e8862', shadowSel: '#185e4a', lightSel: '#239870', snow: '#e6f5ef', snowHl: '#f2faf7', ridge: 'rgba(120,200,160,0.18)', label: '#3aaa78', labelHov: '#5ac494', accent: '#28a46e', accentBg: 'rgba(40,164,110,0.10)', accentBorder: 'rgba(40,164,110,0.30)' },
  5: { shadow: '#183e60', light: '#24608a', shadowHov: '#1e4e78', lightHov: '#2c78a4', shadowSel: '#2260a0', lightSel: '#3488c0', snow: '#e2eef8', snowHl: '#eef6ff', ridge: 'rgba(120,180,230,0.16)', label: '#4a90bc', labelHov: '#6aaad4', accent: '#4a9acc', accentBg: 'rgba(74,154,204,0.10)', accentBorder: 'rgba(74,154,204,0.30)' },
};

// ── Mountain geometry ─────────────────────────────────────────────────────────
const PEAKS: Peak[] = [
  {
    id: 1, shortName: 'Beer Me.', name: 'Beer Me.', elevation: '2,024m', location: 'Eugene, OR',
    period: '2024–2025', role: 'Co-Founder',
    description: "Co-founded Beer Me. with my roommate and best friend. Sold hundreds of hoodies through in-person tactics. Found it's easier to sell after shotgunning one brew.",
    link: 'https://shopbeerme.com/', emoji: '⛰️',
    logo: '/beer-me-logo.png',
    labelX: 82, labelY: 220,
    faces: [
      // Base fills (rendered first)
      { pts: '0,340 82,238 0,238', tone: 1 },
      { pts: '82,238 175,340 0,340', tone: 1 },
      // Main left shadow face
      { pts: '82,238 70,253 56,268 41,284 26,301 11,318 2,332 0,340 82,340', tone: 1 },
      // Deep shadow gully crease
      { pts: '82,238 73,248 64,259 56,270 62,268 73,256 81,243', tone: 0 },
      // Main right light face
      { pts: '82,238 92,250 103,264 116,279 130,294 144,308 156,319 165,327 172,334 175,340 82,340', tone: 3 },
      // Upper right bright facet
      { pts: '82,238 89,248 98,260 104,268 97,263 88,250', tone: 4 },
      // Left mid-shelf
      { pts: '41,286 50,276 57,270 62,276 52,288', tone: 2 },
      // Right mid buttress
      { pts: '116,281 125,269 131,275 122,286', tone: 2 },
      // Small notch left of peak
      { pts: '68,260 75,250 82,245 79,258 70,264', tone: 2 },
    ],
    snowPatches: [
      '72,257 76,247 82,238 88,247 94,257 88,266 82,270 76,266', // main cap
      '62,267 67,258 73,255 77,264 69,273',                        // left crevice
      '94,260 101,267 101,275 94,270',                              // right shelf
    ],
    rockLines: [
      [82, 238, 65, 274], [82, 238, 99, 270],
      [50, 282, 66, 290], [99, 266, 114, 274],
      [33, 304, 48, 310], [128, 296, 142, 304],
      [16, 320, 30, 326],
    ],
    trees: [
      { x: 8, y: 315, h: 21 }, { x: 20, y: 318, h: 19 }, { x: 32, y: 314, h: 23 }, { x: 44, y: 319, h: 18 },
      { x: 148, y: 317, h: 19 }, { x: 160, y: 315, h: 22 }, { x: 172, y: 319, h: 17 },
    ],
  },
  {
    id: 2, shortName: 'July AI', name: 'July AI', elevation: '2,025m', location: 'San Francisco, CA',
    period: '2025', role: 'Head of Growth',
    description: 'Led growth for July AI to help students and knowledge workers prepare for the AI transition in the workforce. Launched alpha product during my tenure.',
    link: 'https://gojuly.ai', emoji: '🗻',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/july_JPG.avif',
    labelX: 256, labelY: 138,
    faces: [
      // Main left shadow
      { pts: '256,156 242,173 227,192 211,214 194,237 177,261 159,285 144,308 143,340 256,340', tone: 1 },
      // Deep shadow upper gully
      { pts: '256,156 244,170 232,186 221,203 229,200 243,183 253,167', tone: 0 },
      // Secondary crease mid-left
      { pts: '218,216 226,201 234,193 240,200 232,213 222,223', tone: 0 },
      // Left shoulder rib
      { pts: '256,156 249,166 242,178 247,177 253,167', tone: 2 },
      // Left sub-peak bump
      { pts: '208,218 216,204 224,196 228,204 220,216 212,226', tone: 1 },
      // Main right light
      { pts: '256,156 266,171 278,189 291,211 305,235 319,258 332,279 344,299 355,315 364,327 372,336 375,340 256,340', tone: 3 },
      // Upper right highlight
      { pts: '256,156 263,168 273,185 280,199 273,193 263,176', tone: 4 },
      // Right secondary face
      { pts: '304,237 313,221 321,230 312,245', tone: 2 },
      // Right lower flank
      { pts: '339,300 348,288 356,295 347,309', tone: 2 },
    ],
    snowPatches: [
      '238,200 245,182 252,169 256,156 260,169 267,183 275,200 269,215 261,222 256,225 251,222 243,215', // main cap
      '228,209 237,197 245,193 249,203 240,215',  // left crevice
      '274,202 282,212 282,224 273,216',           // right ice shelf
      '242,186 248,174 255,168 259,177 252,188',   // upper ice finger
    ],
    rockLines: [
      [256, 156, 232, 212], [256, 156, 281, 210],
      [218, 222, 235, 230], [281, 212, 298, 220],
      [200, 250, 217, 258], [322, 262, 340, 270],
      [184, 270, 200, 276],
    ],
    trees: [
      { x: 150, y: 317, h: 21 }, { x: 162, y: 315, h: 23 }, { x: 174, y: 318, h: 19 }, { x: 185, y: 316, h: 21 },
      { x: 350, y: 318, h: 20 }, { x: 362, y: 315, h: 23 }, { x: 374, y: 319, h: 18 },
    ],
  },
  {
    id: 3, shortName: 'Arch', name: 'Arch', elevation: '4,025m', location: 'New York City, NY',
    period: '2025–2026', role: 'Investment Operations',
    description: 'Worked on automating the post-investment process for alts investors. Had the itch to do my own thing. Left in 2026.',
    link: 'https://arch.co/', emoji: '🏔️',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/download.jpeg',
    labelX: 464, labelY: 36,
    faces: [
      // Main left shadow (full)
      { pts: '464,56 449,74 432,95 413,119 392,147 369,179 345,213 319,248 316,268 316,340 464,340', tone: 1 },
      // Deep shadow upper gully
      { pts: '464,56 451,72 437,90 423,111 410,133 419,130 434,108 450,84', tone: 0 },
      // Second gully mid-left
      { pts: '411,136 402,155 393,175 403,170 413,150', tone: 0 },
      // Base shadow left (dark lower cliff)
      { pts: '319,250 316,268 316,340 342,340 350,316 340,290 330,272', tone: 0 },
      // Left central buttress rib
      { pts: '464,56 457,68 449,84 454,82 461,68', tone: 2 },
      // Left shoulder sub-peak
      { pts: '390,150 399,135 408,125 415,134 406,149 396,160', tone: 1 },
      // Left mid accent face
      { pts: '430,110 438,96 446,89 452,98 443,114 432,122', tone: 2 },
      // Main right light
      { pts: '464,56 475,72 487,92 500,115 514,141 529,168 543,194 556,219 568,243 579,265 590,286 603,306 617,340 464,340', tone: 3 },
      // Upper right highlight
      { pts: '464,56 472,69 482,87 491,107 484,102 473,83 466,67', tone: 4 },
      // Right secondary plane
      { pts: '500,118 511,101 520,110 509,127', tone: 2 },
      // Right ice-shelf face
      { pts: '487,108 496,122 492,135 483,127', tone: 2 },
      // Right mid buttress
      { pts: '551,222 561,205 570,214 560,231', tone: 2 },
      // Right lower flank
      { pts: '585,270 595,254 603,262 593,278', tone: 2 },
    ],
    snowPatches: [
      '434,110 443,89 452,72 459,60 464,56 469,60 477,73 486,91 496,112 490,130 479,143 470,152 464,155 458,152 449,143 440,130', // big main cap
      '451,86 459,68 466,58 470,68 464,84',        // upper ice finger
      '423,120 432,104 441,100 446,113 436,128',   // left snow pocket
      '484,105 494,120 492,132 482,122',            // right ice shelf
      '406,140 415,125 424,121 428,134 418,146',   // mid-left snow
      '347,216 357,200 366,194 368,210 360,222',   // lower left snow
    ],
    rockLines: [
      [464, 56, 430, 132], [464, 56, 500, 126],
      [430, 134, 410, 160], [500, 128, 518, 153],
      [410, 162, 392, 188], [518, 155, 537, 178],
      [350, 218, 335, 242], [570, 250, 556, 272],
      [320, 258, 308, 274], [585, 270, 598, 286],
    ],
    trees: [
      { x: 320, y: 315, h: 24 }, { x: 334, y: 312, h: 26 }, { x: 348, y: 317, h: 22 }, { x: 361, y: 313, h: 25 }, { x: 374, y: 319, h: 20 },
      { x: 572, y: 315, h: 24 }, { x: 584, y: 312, h: 26 }, { x: 596, y: 317, h: 22 }, { x: 608, y: 314, h: 24 }, { x: 620, y: 319, h: 19 },
    ],
  },
  {
    id: 4, shortName: 'OCG', name: 'Oregon Consulting Group', elevation: '3,478m', location: 'Eugene, OR',
    period: '2022–2026', role: 'President',
    description: "Some of the most fun I've had in my life. Worked across health tech, electrochemistry, and banking industries. Early mornings, late nights, coffee, and laughter. OCG ♥",
    link: 'https://oregonconsultinggroup.com', emoji: '🌄',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/main/Screenshot_2025-10-17_at_4.17.44_PM-removebg-preview.png',
    labelX: 694, labelY: 78,
    faces: [
      // Main left shadow
      { pts: '694,98 679,116 661,137 642,161 622,187 600,213 580,238 576,256 576,340 694,340', tone: 1 },
      // Deep shadow upper gully
      { pts: '694,98 680,115 665,133 650,155 659,151 675,131 688,112', tone: 0 },
      // Mid-left gully
      { pts: '641,163 630,182 620,200 629,196 641,177', tone: 0 },
      // Base shadow left
      { pts: '576,258 576,340 601,340 609,313 600,285 588,265', tone: 0 },
      // Left central rib
      { pts: '694,98 687,109 680,122 685,121 692,109', tone: 2 },
      // Left shoulder sub-peak
      { pts: '618,190 628,173 637,162 644,171 635,184 625,197', tone: 1 },
      // Left mid accent face
      { pts: '660,156 669,140 678,133 684,142 674,158 663,167', tone: 2 },
      // Main right light
      { pts: '694,98 705,114 717,134 730,157 744,181 758,206 771,228 783,249 793,268 803,285 812,302 819,340 694,340', tone: 3 },
      // Upper right highlight
      { pts: '694,98 702,112 713,130 720,146 713,140 702,124 697,109', tone: 4 },
      // Right mid-plane
      { pts: '743,184 752,167 761,176 752,193', tone: 2 },
      // Right lower flank
      { pts: '789,252 799,236 807,244 797,261', tone: 2 },
      // Right base buttress
      { pts: '808,284 817,268 824,276 815,292', tone: 2 },
    ],
    snowPatches: [
      '671,136 679,118 687,102 694,98 701,102 709,118 717,136 711,154 702,165 694,168 686,165 677,154', // main cap
      '667,152 676,135 685,130 689,144 679,157',  // left crevice
      '715,140 724,155 722,168 713,160',           // right shelf
      '636,168 644,154 653,150 657,162 648,174',  // mid-left snow
    ],
    rockLines: [
      [694, 98, 667, 160], [694, 98, 721, 158],
      [665, 162, 642, 187], [721, 160, 742, 183],
      [640, 190, 618, 212], [742, 185, 762, 206],
      [614, 218, 598, 234], [768, 212, 782, 226],
    ],
    trees: [
      { x: 582, y: 315, h: 25 }, { x: 595, y: 311, h: 28 }, { x: 608, y: 316, h: 23 }, { x: 621, y: 312, h: 26 }, { x: 634, y: 317, h: 21 }, { x: 646, y: 314, h: 24 },
      { x: 764, y: 315, h: 23 }, { x: 776, y: 312, h: 26 }, { x: 788, y: 316, h: 22 }, { x: 800, y: 314, h: 24 }, { x: 812, y: 318, h: 19 },
    ],
  },
  {
    id: 5, shortName: 'Taob', name: 'Taob Holdings', elevation: '2,022m', location: 'Wallowa, OR',
    period: '2022–Present', role: 'Founder',
    description: 'Growing a small real estate portfolio. Focused on multi-family and small scale commercial units across the PNW and Nashville area.',
    link: null, emoji: '🏕️',
    logo: 'https://raw.githubusercontent.com/iamnotacoder13/images/refs/heads/main/Screenshot%202023-11-05%20at%2012_15_38%20PM.avif',
    labelX: 876, labelY: 172,
    faces: [
      // Main left shadow
      { pts: '876,190 862,207 847,224 830,242 813,260 797,277 784,293 782,310 782,340 876,340', tone: 1 },
      // Deep shadow upper gully
      { pts: '876,190 864,205 851,220 840,236 848,233 862,216 873,201', tone: 0 },
      // Base shadow left
      { pts: '782,310 782,340 804,340 808,320 799,304', tone: 0 },
      // Left rib
      { pts: '876,190 869,201 863,213 868,212 875,201', tone: 2 },
      // Small sub-notch left
      { pts: '848,237 856,223 863,216 867,224 859,235 851,244', tone: 1 },
      // Main right light
      { pts: '876,190 886,204 896,220 907,237 918,255 929,271 939,286 947,299 950,308 950,340 876,340', tone: 3 },
      // Upper right highlight
      { pts: '876,190 883,202 893,219 900,231 893,225 883,209', tone: 4 },
      // Right mid-accent
      { pts: '918,258 927,242 934,251 925,266', tone: 2 },
    ],
    snowPatches: [
      '859,218 867,203 873,192 876,190 879,192 886,204 893,218 887,231 879,237 876,239 873,237 865,231', // main cap
      '864,214 871,201 876,195 879,204 872,216',  // upper ice
      '891,222 900,233 899,245 891,237',           // right shelf
    ],
    rockLines: [
      [876, 190, 851, 244], [876, 190, 902, 240],
      [848, 248, 830, 266], [902, 242, 919, 258],
      [820, 272, 806, 284], [928, 270, 941, 282],
    ],
    trees: [
      { x: 788, y: 316, h: 22 }, { x: 800, y: 312, h: 26 }, { x: 812, y: 317, h: 21 }, { x: 823, y: 314, h: 23 },
      { x: 930, y: 316, h: 20 }, { x: 942, y: 313, h: 24 }, { x: 950, y: 318, h: 17 },
    ],
  },
];

// ── Per-peak background mountain ranges ──────────────────────────────────────
// Two-layer silhouette paths for the detail panel (viewBox 0 0 900 100)
const RANGE_BG: Record<number, string> = {
  // Beer Me — defined peaks, angular ridgeline
  1: 'M0,90 L60,82 L120,88 L180,68 L240,80 L300,58 L360,74 L420,50 L480,70 L540,60 L600,76 L660,56 L720,72 L780,62 L840,74 L900,66 L900,100 L0,100 Z',
  // July AI — SF coastal ridgeline, medium jagged
  2: 'M0,80 L90,55 L170,68 L250,42 L330,60 L410,46 L490,62 L570,48 L650,64 L730,50 L820,64 L900,54 L900,100 L0,100 Z',
  // Arch — NYC Catskills, dramatic high sharp peaks
  3: 'M0,84 L80,70 L160,76 L240,38 L310,64 L380,24 L450,54 L520,38 L590,58 L660,42 L730,60 L800,48 L870,62 L900,56 L900,100 L0,100 Z',
  // OCG — Pacific Northwest, dense layered medium ridges
  4: 'M0,82 L70,64 L140,72 L210,50 L280,66 L350,44 L420,58 L490,42 L560,56 L630,46 L700,60 L770,48 L840,62 L900,56 L900,100 L0,100 Z',
  // Taob — Wallowa mountains, ultra-sharp dramatic spires
  5: 'M0,88 L100,72 L180,80 L260,36 L330,64 L400,16 L470,52 L540,32 L610,56 L680,42 L750,62 L830,50 L880,64 L900,60 L900,100 L0,100 Z',
};
const RANGE_FG: Record<number, string> = {
  // Beer Me — closer angular foreground peaks
  1: 'M0,100 L60,94 L120,98 L180,88 L240,95 L300,84 L360,92 L420,80 L480,90 L540,84 L600,92 L660,86 L720,94 L780,88 L840,94 L900,90 L900,100 Z',
  // July AI — nearer coastal bluffs, stepped
  2: 'M0,100 L80,90 L160,96 L230,82 L300,92 L380,78 L450,88 L520,80 L600,90 L670,82 L750,92 L820,84 L900,90 L900,100 Z',
  // Arch — foreground ridge, sharp & bold
  3: 'M0,100 L70,88 L140,94 L220,76 L290,88 L360,70 L430,84 L500,76 L570,88 L640,78 L710,90 L780,80 L850,90 L900,84 L900,100 Z',
  // OCG — foreground tree-line ridge
  4: 'M0,100 L60,88 L130,94 L200,80 L270,90 L340,76 L410,86 L480,78 L560,88 L630,80 L700,90 L780,82 L850,90 L900,86 L900,100 Z',
  // Taob — Wallowa foreground, jagged near-ridge
  5: 'M0,100 L80,90 L160,96 L240,78 L310,90 L380,72 L450,86 L520,78 L590,90 L660,82 L730,92 L800,84 L870,92 L900,88 L900,100 Z',
};
// Lighter, visible fill colors per peak (bg layer, fg layer)
const RANGE_COLOR: Record<number, [string, string]> = {
  1: ['#484848', '#5a5a5a'],   // Beer Me — mid charcoal, visible on dark bg
  2: ['#5868a0', '#7080b8'],   // July AI — periwinkle
  3: ['#1e3c84', '#2a50a8'],   // Arch — bright navy
  4: ['#186048', '#209060'],   // OCG — forest green
  5: ['#1c5080', '#2470a8'],   // Taob — steel blue
};

// ── Static Image Peak Component ───────────────────────────────────────────────
const StaticPeakImage: React.FC<{ isHov: boolean; isSel: boolean; src: string; idx: number }> = ({ isHov, isSel, src, idx }) => {
  return (
    <motion.div
      animate={isHov
        ? { rotate: [0, -7, 7, -4, 4, 0], scale: 1.1, y: 0 }
        : isSel
        ? { scale: 1.06, y: [0, -8, 0], rotate: 0 }
        : { scale: 1, y: [0, -10, 0], rotate: 0 }
      }
      transition={isHov
        ? { rotate: { duration: 0.55, ease: 'easeInOut' }, scale: { duration: 0.25, ease: 'easeOut' } }
        : isSel
        ? { y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, scale: { duration: 0.25 } }
        : { y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.45 }, scale: { duration: 0.25 } }
      }
      style={{ pointerEvents: 'none' }}
    >
      <img src={src} alt="Peak" style={{ height: '220px', width: 'auto', objectFit: 'contain', display: 'block' }} />
    </motion.div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
export const Peaks: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const sel = PEAKS.find(p => p.id === selected) ?? null;
  const selPal = sel ? PALETTES[sel.id] : null;

  return (
    <section id="peaks" style={{ padding: '110px 24px 40px' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <svg viewBox="0 0 36 30" width="24" height="20" style={{ display: 'block', margin: '0 auto 18px' }}>
              <polygon points="18,1 35,29 1,29" fill="none" stroke="#fff" strokeWidth="1.5" />
              <polygon points="18,1 24,11 12,11" fill="#fff" opacity="0.28" />
            </svg>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px,6vw,78px)', fontWeight: 600, color: '#fff', margin: 0, marginBottom: '14px', lineHeight: 1 }}>
              In The Peaks
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', color: '#94a3b8', margin: '0 0 10px' }}>
              Here are the peaks I've climbed.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#94a3b8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
              Each adventure is unique — from SF to NYC to the PNW.
              I constantly seek new routes to take, peaks to summit, and perspective expanding experiences. Here are some of my favorite adventures so far.
            </p>
          </motion.div>
        </div>

        {/* Peak emoji cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {PEAKS.map((peak, i) => {
            const isSel = selected === peak.id;
            const isHov = hovered === peak.id;
            const pal = PALETTES[peak.id];
            return (
              <motion.div
                key={peak.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelected(selected === peak.id ? null : peak.id)}
                onMouseEnter={() => setHovered(peak.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '14px',
                  transition: 'background 0.25s',
                  background: isSel ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                {/* Emoji / Image */}
                <div style={{
                  height: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {(() => {
                    const srcMap: Record<number, string> = {
                      1: '/floating-mountain.jpeg',
                      2: '/july-ai-mountain.jpg',
                      3: '/arch-mountain.jpg',
                      4: '/ocg-mountain.jpg',
                      5: '/taob-mountain.jpg',
                    };
                    return <StaticPeakImage isHov={isHov} isSel={isSel} src={srcMap[peak.id]} idx={i} />;
                  })()}
                </div>

                {/* Label */}
                <div style={{ padding: '14px 14px 16px', textAlign: 'center' }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '3px',
                    transition: 'color 0.25s',
                  }}>
                    {peak.shortName}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-body)',
                    color: isSel ? pal.accent : '#94a3b8',
                    letterSpacing: '0.06em',
                    transition: 'color 0.25s',
                  }}>
                    {peak.period}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', fontFamily: 'var(--font-body)', marginBottom: '40px' }}>
          (click to summit)
        </p>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {sel && selPal && (
            <motion.div
              key={sel.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: '#0b1627', borderRadius: '16px', padding: '36px 40px 55px',
                display: 'flex', gap: '28px', alignItems: 'flex-start',
                position: 'relative', overflow: 'hidden',
                border: `1px solid ${selPal.accentBorder}`,
              }}
            >
              {/* BG mountain range */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '90px', pointerEvents: 'none', overflow: 'hidden' }}>
                <svg viewBox="0 0 900 100" width="100%" height="100%" preserveAspectRatio="none">
                  <path d={RANGE_BG[sel.id]} fill={RANGE_COLOR[sel.id][0]} opacity="0.7" />
                  <path d={RANGE_FG[sel.id]} fill={RANGE_COLOR[sel.id][1]} opacity="0.9" />
                </svg>
              </div>

              {/* Logo */}
              <div style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={sel.logo} alt={sel.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 600, color: 'white', margin: 0, marginBottom: '3px' }}>
                      {sel.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: selPal.accent, margin: 0, fontWeight: 500, letterSpacing: '0.04em' }}>
                      {sel.role} · {sel.period}
                    </p>
                  </div>
                  <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: selPal.accent, background: selPal.accentBg, padding: '4px 10px', borderRadius: '20px', border: `1px solid ${selPal.accentBorder}`, whiteSpace: 'nowrap' }}>
                    {sel.location}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#ffffff', lineHeight: 1.72, margin: '14px 0 18px' }}>
                  {sel.description}
                </p>

                {sel.link && (
                  <a
                    href={sel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: 'transparent', border: `1px solid ${selPal.accentBorder}`, borderRadius: '24px', color: selPal.accent, fontSize: '12px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = selPal!.accentBg; (e.currentTarget as HTMLElement).style.borderColor = selPal!.accent; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = selPal!.accentBorder; }}
                  >
                    Visit summit →
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
