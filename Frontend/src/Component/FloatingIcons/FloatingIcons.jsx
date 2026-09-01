import React from "react";
import "./FloatingIcons.css";
import { FaPhoneAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const FloatingIcons = () => {
  const phoneNumber = "+919861566735";
  const whatsappNumber = "919861566735";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsapp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank", "noopener,noreferrer");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-icons" role="region" aria-label="Quick contact and navigation">
      {/* Call Button */}
      <button 
        type="button"
        className="float-btn call-btn" 
        onClick={handleCall}
        aria-label="Call customer support"
      >
        <FaPhoneAlt />
      </button>

      {/* WhatsApp Button */}
      <button 
        type="button"
        className="float-btn whatsapp-btn" 
        onClick={handleWhatsapp}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Scroll To Top */}
      <button 
        type="button"
        className="float-btn top-btn" 
        onClick={scrollToTop}
        aria-label="Scroll back to top of the page"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default FloatingIcons;