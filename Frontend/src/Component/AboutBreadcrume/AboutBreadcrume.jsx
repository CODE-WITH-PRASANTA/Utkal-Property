import React from "react";
import { ArrowRight, Building2 } from "lucide-react";

import "./AboutBreadcrume.css";

/* =========================================================
   HOME ILLUSTRATION — premium apartment complex
   Built from a strict modular grid (floors x bays) so every
   slab, window and mullion lines up perfectly. Swap for a
   real property photo later via .abh-hero background-image,
   or keep this as the brand's signature architectural mark.
========================================================= */

const TOWER = { x: 250, top: 92, bottom: 430, floors: 6, bays: 4 };
const WING = { x: 118, top: 246, bottom: 430, floors: 3, bays: 2 };
const SKYLINE = { x: 520, top: 40, bottom: 430, floors: 9, bays: 2 };

const buildGrid = ({ x, top, bottom, floors, bays }, width, gapRatio = 0.32) => {
  const floorH = (bottom - top) / floors;
  const bayW = width / bays;
  const winW = bayW * (1 - gapRatio);
  const winH = floorH * 0.58;

  const windows = [];
  const slabs = [];

  for (let f = 0; f < floors; f++) {
    const floorY = top + f * floorH;
    slabs.push({ id: `slab-${x}-${f}`, x: x - 6, y: floorY, width: width + 12 });

    for (let b = 0; b < bays; b++) {
      windows.push({
        id: `win-${x}-${f}-${b}`,
        x: x + b * bayW + (bayW - winW) / 2,
        y: floorY + floorH - winH - floorH * 0.16,
        width: winW,
        height: winH,
        lit: (f * bays + b) % 3 !== 1,
      });
    }
  }
  return { windows, slabs, floorH };
};

const towerGrid = buildGrid(TOWER, 232);
const wingGrid = buildGrid(WING, 118);
const skylineGrid = buildGrid(SKYLINE, 90, 0.4);

const roofFins = Array.from({ length: 7 }, (_, i) => ({
  id: `fin-${i}`,
  x: TOWER.x + 16 + i * ((232 - 32) / 6),
}));

const plants = [
  { cx: 78, cy: 402, r: 15 },
  { cx: 104, cy: 412, r: 10 },
  { cx: 500, cy: 414, r: 13 },
  { cx: 526, cy: 420, r: 9 },
  { cx: 640, cy: 418, r: 12 },
];

const pathLights = [128, 172, 216, 470, 514, 558].map((cx, i) => ({
  id: `light-${i}`,
  cx,
  cy: 452 + (i % 2) * 8,
}));

const AbhHomeIllustration = () => {
  return (
    <svg
      className="abh-home-illustration"
      viewBox="0 0 700 500"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="abhGlassLit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="abh-stop-gold-a" />
          <stop offset="100%" className="abh-stop-gold-b" />
        </linearGradient>
        <linearGradient id="abhGlassDim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="abh-stop-glass-a" />
          <stop offset="100%" className="abh-stop-glass-b" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="430" width="700" height="70" className="abh-home-ground" />
      <rect x="0" y="430" width="700" height="2" className="abh-home-groundline" />

      {/* Background skyline (soft depth) */}
      <g className="abh-skyline">
        <rect
          x={SKYLINE.x}
          y={SKYLINE.top}
          width="90"
          height={SKYLINE.bottom - SKYLINE.top}
          rx="3"
          className="abh-home-back"
        />
        {skylineGrid.windows.map((w) => (
          <rect key={w.id} x={w.x} y={w.y} width={w.width} height={w.height} rx="1" className="abh-skyline-window" />
        ))}
      </g>

      {/* Side wing */}
      <g>
        <rect
          x={WING.x}
          y={WING.top}
          width="118"
          height={WING.bottom - WING.top}
          rx="4"
          className="abh-home-wing"
        />
        <rect x={WING.x - 8} y={WING.top - 6} width="134" height="6" rx="2" className="abh-home-roof" />
        {wingGrid.slabs.slice(1).map((s) => (
          <rect key={s.id} x={s.x} y={s.y} width={s.width} height="2.5" className="abh-home-slab" />
        ))}
        {wingGrid.windows.map((w) => (
          <rect
            key={w.id}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            rx="1.5"
            fill={w.lit ? "url(#abhGlassLit)" : "url(#abhGlassDim)"}
            className={w.lit ? "abh-window abh-window-lit" : "abh-window"}
          />
        ))}
      </g>

      {/* Main tower */}
      <g>
        <rect
          x={TOWER.x}
          y={TOWER.top}
          width="232"
          height={TOWER.bottom - TOWER.top}
          rx="5"
          className="abh-home-main"
        />

        {/* Floor slab lines — perfectly aligned via grid data */}
        {towerGrid.slabs.map((s) => (
          <rect key={s.id} x={s.x} y={s.y} width={s.width} height="3" className="abh-home-slab" />
        ))}

        {/* Balcony rails (every other floor) */}
        {towerGrid.slabs
          .filter((_, i) => i % 2 === 1)
          .map((s) => (
            <g key={`rail-${s.id}`}>
              <rect x={s.x + 4} y={s.y - 5} width={s.width - 8} height="4" rx="1.5" className="abh-home-balcony-rail" />
              {Array.from({ length: 6 }, (_, p) => (
                <rect
                  key={`${s.id}-post-${p}`}
                  x={s.x + 10 + p * ((s.width - 20) / 5)}
                  y={s.y - 22}
                  width="1.6"
                  height="17"
                  className="abh-home-balcony-post"
                />
              ))}
            </g>
          ))}

        {/* Windows */}
        {towerGrid.windows.map((w) => (
          <rect
            key={w.id}
            x={w.x}
            y={w.y}
            width={w.width}
            height={w.height}
            rx="2"
            fill={w.lit ? "url(#abhGlassLit)" : "url(#abhGlassDim)"}
            className={w.lit ? "abh-window abh-window-lit" : "abh-window"}
          />
        ))}

        {/* Rooftop parapet + crown fins */}
        <rect x={TOWER.x - 8} y={TOWER.top - 10} width="248" height="8" rx="2" className="abh-home-roof" />
        {roofFins.map((f, i) => (
          <rect key={f.id} x={f.x} y={TOWER.top - 24} width="4" height="16" rx="1" className="abh-home-fin" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}

        {/* Entrance canopy */}
        <rect x={TOWER.x + 78} y={TOWER.bottom - 46} width="76" height="6" rx="2" className="abh-home-canopy" />
        <rect x={TOWER.x + 82} y={TOWER.bottom - 40} width="2" height="40" className="abh-home-pillar" />
        <rect x={TOWER.x + 148} y={TOWER.bottom - 40} width="2" height="40" className="abh-home-pillar" />

        {/* Entrance glass doors */}
        <rect x={TOWER.x + 92} y={TOWER.bottom - 36} width="48" height="36" rx="1.5" className="abh-home-door" />
        <rect x={TOWER.x + 115} y={TOWER.bottom - 36} width="2" height="36" className="abh-home-door-mullion" />
      </g>

      {/* Boundary wall + gate pillar */}
      <rect x="36" y="404" width="120" height="26" rx="3" className="abh-home-wall" />
      <rect x="150" y="390" width="10" height="40" rx="2" className="abh-home-pillar" />

      {/* Planting */}
      <g className="abh-home-plants">
        {plants.map((p) => (
          <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={p.r} />
        ))}
      </g>

      {/* Path lights */}
      <g className="abh-home-path-lights">
        {pathLights.map((l, i) => (
          <circle key={l.id} cx={l.cx} cy={l.cy} r="3.4" style={{ animationDelay: `${i * 0.45}s` }} />
        ))}
      </g>
    </svg>
  );
};

/* =========================================================
   EYEBROW
========================================================= */

const AbhEyebrow = ({ children }) => {
  return (
    <div className="abh-eyebrow">
      <Building2 size={14} strokeWidth={2.25} />
      <span className="abh-eyebrow-line"></span>
      <span>{children}</span>
    </div>
  );
};

/* =========================================================
   CTA BUTTONS
========================================================= */

const AbhCtaGroup = () => {
  return (
    <div className="abh-cta-group">
      <button type="button" className="abh-btn abh-btn-primary">
        <span>Explore Properties</span>
        <ArrowRight size={16} />
      </button>

      <button type="button" className="abh-btn abh-btn-outline">
        <span>Contact Us</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

/* =========================================================
   MAIN ABOUT HERO
========================================================= */

const AboutBreadcrume = () => {
  return (
    <section className="abh-hero">
      <AbhHomeIllustration />

      <div className="abh-overlay"></div>
      <div className="abh-glow"></div>

      <div className="abh-container">
        <div className="abh-content">
          <AbhEyebrow>Find Your Perfect Space</AbhEyebrow>

          <h1 className="abh-heading">
            Discover Properties
            <br />
            That <span>Define You</span>
          </h1>

          <p className="abh-subtext">
            Your trusted partner for buying, renting and property
            solutions across Odisha.
          </p>

          <AbhCtaGroup />
        </div>
      </div>
    </section>
  );
};

export default AboutBreadcrume;