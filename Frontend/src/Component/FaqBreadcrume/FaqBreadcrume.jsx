import React from "react";
import { Home, ChevronRight } from "lucide-react";

import "./FaqBreadcrume.css";

/* =========================================================
   BACKGROUND — soft wavy topo lines + dot grid accent
========================================================= */

const FbhBackgroundPattern = () => {
  const waves = [
    "M -50 90 C 150 40, 350 140, 550 70 S 950 90, 1150 40",
    "M -50 180 C 200 130, 380 220, 600 160 S 980 180, 1150 130",
    "M -50 270 C 220 220, 420 300, 640 250 S 1000 270, 1150 220",
  ];

  return (
    <svg className="fbh-pattern" viewBox="0 0 1100 340" preserveAspectRatio="none" aria-hidden="true">
      {waves.map((d, i) => (
        <path key={d} d={d} className="fbh-pattern-line" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
    </svg>
  );
};

const FbhDotGrid = () => {
  const rows = Array.from({ length: 4 });
  const cols = Array.from({ length: 4 });

  return (
    <svg className="fbh-dot-grid" viewBox="0 0 60 60" aria-hidden="true">
      {rows.map((_, r) =>
        cols.map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={8 + c * 15}
            cy={8 + r * 15}
            r="2.4"
            className="fbh-dot"
            style={{ animationDelay: `${(r + c) * 0.12}s` }}
          />
        ))
      )}
    </svg>
  );
};

/* =========================================================
   LEFT ILLUSTRATION — potted plant, flat premium style
========================================================= */

const LEAF_ANGLES = [-46, -26, -8, 10, 28, 44];

const FbhPottedPlant = () => {
  return (
    <svg className="fbh-plant" viewBox="0 0 220 260" aria-hidden="true">
      <ellipse cx="110" cy="246" rx="70" ry="10" className="fbh-plant-shadow" />

      {/* Leaves fan out from the rim */}
      <g className="fbh-plant-leaves">
        {LEAF_ANGLES.map((angle, i) => (
          <ellipse
            key={angle}
            cx="110"
            cy="140"
            rx="9"
            ry={54 - Math.abs(angle) * 0.25}
            transform={`rotate(${angle} 110 140)`}
            className={`fbh-leaf fbh-leaf-${i % 3}`}
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </g>

      {/* Pot */}
      <path
        d="M46 152 L174 152 L152 240 Q152 248 144 248 L76 248 Q68 248 68 240 Z"
        className="fbh-pot-body"
      />
      <rect x="40" y="138" width="140" height="18" rx="8" className="fbh-pot-rim" />
      <path d="M64 178 L156 178" className="fbh-pot-line" />
      <path d="M60 206 L160 206" className="fbh-pot-line" />
    </svg>
  );
};

/* =========================================================
   RIGHT ILLUSTRATION — sculptural question mark
========================================================= */

const FbhQuestionMark = () => {
  return (
    <svg className="fbh-question-mark" viewBox="0 0 300 400" aria-hidden="true">
      <defs>
        <linearGradient id="fbhQGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="fbh-stop-mint" />
          <stop offset="100%" className="fbh-stop-emerald" />
        </linearGradient>
      </defs>

      <ellipse cx="150" cy="372" rx="66" ry="14" className="fbh-mark-shadow" />

      <path
        d="M92 70
           C 92 24, 140 4, 182 22
           C 224 40, 228 92, 196 122
           C 172 145, 158 154, 158 196"
        className="fbh-mark-curve"
      />
      <path
        d="M92 70
           C 92 30, 134 12, 172 26"
        className="fbh-mark-highlight"
      />

      <g transform="rotate(-6 158 250)">
        <rect x="128" y="222" width="60" height="56" rx="14" className="fbh-mark-dot" />
      </g>
    </svg>
  );
};

/* =========================================================
   BREADCRUMB
========================================================= */

const FbhBreadcrumb = () => {
  return (
    <nav className="fbh-breadcrumb" aria-label="Breadcrumb">
      <ol className="fbh-breadcrumb-list">
        <li className="fbh-breadcrumb-item">
          <a href="/" className="fbh-breadcrumb-link">
            <Home size={15} strokeWidth={2.25} />
            <span>Home</span>
          </a>
        </li>

        <li className="fbh-breadcrumb-separator" aria-hidden="true">
          <ChevronRight size={15} strokeWidth={2} />
        </li>

        <li className="fbh-breadcrumb-item">
          <span className="fbh-breadcrumb-current" aria-current="page">
            FAQ
          </span>
        </li>
      </ol>
    </nav>
  );
};

/* =========================================================
   MAIN FAQ HERO
========================================================= */

const FaqBreadcrume = () => {
  return (
    <section className="fbh-hero">
      <FbhBackgroundPattern />
      <FbhDotGrid />

      <div className="fbh-container">
        <aside className="fbh-aside fbh-aside-left" aria-hidden="true">
          <FbhPottedPlant />
        </aside>

        <div className="fbh-content">
          <span className="fbh-content-glow" aria-hidden="true"></span>

          <span className="fbh-eyebrow">
            <span className="fbh-eyebrow-dot"></span>
            Support Center
          </span>

          <h1 className="fbh-heading">FAQ</h1>
          <span className="fbh-heading-underline"></span>

          <p className="fbh-subtext">
            Everything you need to know about
            <br className="fbh-subtext-break" />
            Utkal Property.
          </p>

          <FbhBreadcrumb />
        </div>

        <aside className="fbh-aside fbh-aside-right" aria-hidden="true">
          <FbhQuestionMark />
        </aside>
      </div>
    </section>
  );
};

export default FaqBreadcrume;