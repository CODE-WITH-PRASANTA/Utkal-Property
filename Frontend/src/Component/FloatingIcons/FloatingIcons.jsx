// Float.jsx

import React from "react";
import "./FloatingIcons.css";
import { FaPhoneAlt, FaWhatsapp, FaArrowUp } from "react-icons/fa";

const FloatingIcons = () => {
  const phoneNumber = "+919876543210"; // Replace with your phone number
  const whatsappNumber = "919876543210"; // Replace with your WhatsApp number

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsapp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="floating-icons">
      {/* Call Button */}
      <button className="float-btn call-btn" onClick={handleCall}>
        <FaPhoneAlt />
      </button>

      {/* WhatsApp Button */}
      <button className="float-btn whatsapp-btn" onClick={handleWhatsapp}>
        <FaWhatsapp />
      </button>

      {/* Scroll To Top */}
      <button className="float-btn top-btn" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </div>
  );
};

export default FloatingIcons;