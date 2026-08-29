import React from "react";
import { ArrowRight } from "lucide-react";

import "./BlogBreadcrume.css";

/* =========================================================
   APARTMENT ILLUSTRATION — Premium Modern High-Rise
   Features structural pillars, glass balconies, and warm lighting.
========================================================= */

const APT = { x: 320, top: 70, bottom: 430, floors: 5, bays: 4, width: 360 };
const floorH = (APT.bottom - APT.top) / APT.floors;
const bayW = APT.width / APT.bays;

const floorsArray = Array.from({ length: APT.floors }, (_, i) => i);
const baysArray = Array.from({ length: APT.bays }, (_, i) => i);

const BbhApartmentIllustration = () => {
  return (
    <svg
      className="bbh-illustration"
      viewBox="0 0 700 500"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        {/* Warm premium lighting for interiors */}
        <linearGradient id="aptLitInterior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff2c8" />
          <stop offset="100%" stopColor="#eab561" />
        </linearGradient>
        {/* Dim/Dark glass for unlit units */}
        <linearGradient id="aptDimInterior" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2720" />
          <stop offset="100%" stopColor="#111914" />
        </linearGradient>
        {/* Glass railing reflection */}
        <linearGradient id="aptBalconyGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(183, 236, 210, 0.45)" />
          <stop offset="100%" stopColor="rgba(79, 209, 139, 0.15)" />
        </linearGradient>
      </defs>

      {/* Ground & Landscaping base */}
      <rect x="0" y="430" width="700" height="70" className="bbh-ground" />
      <rect x="0" y="430" width="700" height="2" className="bbh-groundline" />

      {/* Background Trees (Left & Right) */}
      <g className="bbh-trees">
        <circle cx="678" cy="350" r="42" />
        <circle cx="650" cy="392" r="30" />
        <rect x="674" y="370" width="8" height="60" className="bbh-tree-trunk" />
        <circle cx="60" cy="380" r="22" />
        <rect x="56" y="392" width="5" height="38" className="bbh-tree-trunk" />
      </g>

      {/* Main Building Structure */}
      {floorsArray.map((floorIdx) => {
        const isGround = floorIdx === APT.floors - 1;
        const y = APT.top + floorIdx * floorH;

        return (
          <g key={`floor-${floorIdx}`}>
            {baysArray.map((bayIdx) => {
              const x = APT.x + bayIdx * bayW;
              // Create a realistic scattered lighting pattern
              const isLit = (floorIdx * 3 + bayIdx) % 3 !== 0 || isGround;

              return (
                <g key={`unit-${floorIdx}-${bayIdx}`}>
                  {/* Unit Interior / Window */}
                  <rect
                    x={x + 4}
                    y={y + (isGround ? 15 : 10)}
                    width={bayW - 8}
                    height={floorH - (isGround ? 15 : 10)}
                    fill={isLit ? "url(#aptLitInterior)" : "url(#aptDimInterior)"}
                    className={isLit ? "bbh-apt-lit" : ""}
                  />
                  
                  {/* Ground floor door logic */}
                  {isGround && bayIdx === 1 && (
                    <rect x={x + bayW / 2 - 16} y={y + 35} width="32" height="37" fill="#0d1a13" opacity="0.85" rx="2" />
                  )}

                  {/* Upper floor balconies */}
                  {!isGround && (
                    <>
                      {/* Glass Railing */}
                      <rect x={x + 2} y={y + floorH - 30} width={bayW - 4} height="30" fill="url(#aptBalconyGlass)" rx="1.5" />
                      {/* Top Handrail */}
                      <rect x={x + 2} y={y + floorH - 30} width={bayW - 4} height="2.5" fill="#2c4033" />
                      {/* Window Mullions */}
                      <rect x={x + bayW / 2 - 1} y={y + 10} width="2" height={floorH - 10} fill="#0d1a13" opacity="0.6" />
                    </>
                  )}
                </g>
              );
            })}

            {/* Architectural Concrete Slabs separating floors */}
            <rect
              x={APT.x - 12}
              y={y + floorH - 6}
              width={APT.width + 24}
              height="6"
              rx="2.5"
              className="bbh-apt-slab"
            />
          </g>
        );
      })}

      {/* Vertical Structural Pillars extending ground to roof */}
      {Array.from({ length: APT.bays + 1 }).map((_, i) => (
        <rect
          key={`pillar-${i}`}
          x={APT.x + i * bayW - 4}
          y={APT.top}
          width="8"
          height={APT.bottom - APT.top}
          className="bbh-apt-pillar"
        />
      ))}

      {/* Roof Parapet */}
      <rect x={APT.x - 14} y={APT.top - 12} width={APT.width + 28} height="12" rx="3" className="bbh-apt-roof" />
      {/* Roof Landscaping / Planters */}
      <path d={`M ${APT.x + 20} ${APT.top - 12} Q ${APT.x + 35} ${APT.top - 30} ${APT.x + 50} ${APT.top - 12}`} fill="#12834d" opacity="0.8" />
      <path d={`M ${APT.x + APT.width - 60} ${APT.top - 12} Q ${APT.x + APT.width - 40} ${APT.top - 25} ${APT.x + APT.width - 20} ${APT.top - 12}`} fill="#12834d" opacity="0.7" />

      {/* Foreground Landscaping */}
      <g className="bbh-shrubs">
        <circle cx="300" cy="420" r="18" />
        <circle cx="328" cy="424" r="12" />
        <circle cx="700" cy="416" r="20" />
      </g>
    </svg>
  );
};

/* =========================================================
   EYEBROW
========================================================= */

const BbhEyebrow = ({ children }) => (
  <div className="bbh-eyebrow">
    <span className="bbh-eyebrow-line"></span>
    <span>{children}</span>
  </div>
);

/* =========================================================
   CTA
========================================================= */

const BbhCta = () => (
  <button type="button" className="bbh-cta">
    <span>Explore Articles</span>
    <ArrowRight size={16} />
  </button>
);

/* =========================================================
   MAIN BLOG HERO
========================================================= */

const BlogBreadcrume = () => {
  return (
    <section className="bbh-hero">
      <BbhApartmentIllustration />

      <div className="bbh-scrim"></div>
      <div className="bbh-glow"></div>

      <div className="bbh-container">
        <div className="bbh-content">
          <BbhEyebrow>Our Blog</BbhEyebrow>

          <h1 className="bbh-heading">
            Insights, Trends &amp;
            <br />
            Updates in <span>Real Estate</span>
          </h1>

          <p className="bbh-subtext">
            Stay informed with the latest property news,
            <br className="bbh-subtext-break" />
            market trends and expert tips.
          </p>

          <BbhCta />
        </div>
      </div>
    </section>
  );
};

export default BlogBreadcrume;