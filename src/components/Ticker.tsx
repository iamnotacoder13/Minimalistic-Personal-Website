import React from 'react';

const QUOTES = [
  "Successful people are successful because they do the things unsuccessful people don't want to do.",
  "I'm eager to believe that I am completely wrong about everything.",
  "Good judgement comes from experience, experience comes from bad judgement.",
  "Trust only movement.",
  "The things you think about determine the quality of your mind. Your soul takes the color of your thoughts.",
  "Worrying doesn't take away tomorrow's struggles, it only takes away today's peace.",
  "You are a human with one life and it is up to you to make it the best life you can.",
  "I have never seen ordinary efforts lead to extraordinary results.",
];

const TickerContent: React.FC = () => (
  <>
    {QUOTES.map((quote, i) => (
      <React.Fragment key={i}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          color: 'white',
          opacity: 0.95,
          whiteSpace: 'nowrap',
        }}>
          {quote}
        </span>
        <span style={{
          display: 'inline-block',
          margin: '0 28px',
          fontSize: '11px',
          color: 'white',
          opacity: 0.7,
        }}>
          ▲
        </span>
      </React.Fragment>
    ))}
  </>
);

export const Ticker: React.FC = () => (
  <div style={{
    background: 'var(--blue)',
    padding: '13px 0',
    overflow: 'hidden',
    userSelect: 'none',
  }}>
<div className="ticker-track">
      {[0, 1].map(i => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <TickerContent />
        </span>
      ))}
    </div>
  </div>
);
