import { Header }             from './components/Header';
import { Hero }                from './components/Hero';
import { About }               from './components/About';
import { Ticker }              from './components/Ticker';
import { OddJobs }             from './components/OddJobs';
import { Peaks }               from './components/Peaks';
import { Values }              from './components/Values';
import { Closing }             from './components/Closing';
import { Footer }              from './components/Footer';
import { ScrollSnowboarder }   from './components/ScrollSnowboarder';

function StarBeam() {
  return (
    <div style={{ position: 'relative', height: '48px', overflow: 'hidden', pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 1440 48"
        width="100%"
        height="48"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beamGradInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Outer wide beam — full page width */}
        <polygon points="720,0 0,48 1440,48" fill="url(#beamGrad)" />
        {/* Inner brighter beam */}
        <polygon points="720,0 200,48 1240,48" fill="url(#beamGrad)" />
        {/* Core beam */}
        <polygon points="720,0 500,48 940,48" fill="url(#beamGradInner)" />
      </svg>
    </div>
  );
}

export function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--dark)', color: 'var(--text)' }}>
      <ScrollSnowboarder />
      <Header />
      <main>
        <Hero />
        <About />
        <Ticker />
        <Peaks />
        <OddJobs />
        <StarBeam />
        <Values />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
