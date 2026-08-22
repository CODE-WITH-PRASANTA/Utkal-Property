import { useEffect, useState } from "react";
import "./PageLoader.css";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="premium-page-loader">
      <div className="loader-blur-layer"></div>
      <div className="loader-glow"></div>
      <div className="loader-particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`particle particle-${i}`}></span>
        ))}
      </div>

      <div className="loader-content">
        <div className="loader-logo">
          <span>U</span>
          <div className="loader-logo-ring"></div>
          <div className="loader-logo-ring loader-logo-ring-delay"></div>
        </div>

        <div className="loader-brand">
          <h1>
            UTKAL<span>PROPERTY</span>
          </h1>
        </div>

        <div className="loader-orb-wrap">
          <div className="orb-scene">
            <div className="orb-core"></div>
            <div className="orb-ring orb-ring-1"></div>
            <div className="orb-ring orb-ring-2"></div>
            <div className="orb-ring orb-ring-3"></div>
            <div className="orb-dot orb-dot-1"></div>
            <div className="orb-dot orb-dot-2"></div>
            <div className="orb-dot orb-dot-3"></div>
          </div>
        </div>

        <div className="loader-text">
          <p>Finding your perfect property...</p>
        </div>

        <div className="loader-progress">
          <div className="loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;