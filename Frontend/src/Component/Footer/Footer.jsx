import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import logo from "../../assets/logo.webp";
import footerImage from "../../assets/footerImage.avif";

import {
  FaPhoneAlt,
  FaChevronRight,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import { FaHouseUser, FaBuildingCircleCheck } from "react-icons/fa6";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { BiHomeAlt2 } from "react-icons/bi";

const Footer = () => {
  const primaryPhone = "8338905897";
  const secondaryPhone = "7077600666";

  return (
    <footer className="footer-container" aria-label="Site Footer">
      {/* =====================================================
          TOP BRAND HEADER
      ====================================================== */}
      <div className="footer-brand-row">
        <div className="footer-brand-mark">
          <div className="footer-brand-logo">
            <img
              src={logo}
              alt="Utkal Property Logo"
              className="footer-logo-img"
              width="52"
              height="52"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="footer-brand-text">
            <h2>
              UTKAL <span>PROPERTY</span>
            </h2>

            <p>
              Your trusted property partner in Bhubaneswar
            </p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div
          className="footer-social-row"
          aria-label="Social Media Links"
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            aria-label="Visit Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            aria-label="Visit Twitter"
          >
            <FaTwitter />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            aria-label="Visit Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
            aria-label="Visit LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* =====================================================
          BUY / SELL CTA CARDS
      ====================================================== */}
      <div className="footer-top-cards">
        {/* BUY PROPERTY CARD */}
        <div className="footer-card footer-buy-card">
          <div className="footer-card-glow" />

          <div className="footer-card-content">
            <div className="footer-card-icon-box">
              <FaHouseUser className="card-large-icon" />
            </div>

            <div className="footer-card-text">
              <span className="footer-card-small-label">
                FIND YOUR HOME
              </span>

              <h3 className="footer-card-title">
                You need a house
              </h3>

              <p className="footer-card-desc">
                Your perfect home is waiting for you.
              </p>

              <p className="footer-card-support-text">
                Tell us your needs, and we will help you find the
                perfect suggestion for your dream home.
              </p>
            </div>
          </div>

          <div className="footer-card-btn-wrapper">
            <a
              href={`tel:+91${primaryPhone}`}
              className="footer-card-btn"
              aria-label="Call Utkal Property"
            >
              <FaPhoneAlt className="btn-react-icon" />
              Contact Us
              <FaArrowRight className="btn-arrow" />
            </a>
          </div>
        </div>

        {/* SELL PROPERTY CARD */}
        <div className="footer-card footer-sell-card">
          <div className="footer-card-glow" />

          <div className="footer-card-content">
            <div className="footer-card-icon-box">
              <FaBuildingCircleCheck className="card-large-icon" />
            </div>

            <div className="footer-card-text">
              <span className="footer-card-small-label">
                SELL YOUR PROPERTY
              </span>

              <h3 className="footer-card-title">
                Sell your house
              </h3>

              <p className="footer-card-desc">
                Gain direct access to thousands of properties as a
                home buyer.
              </p>
            </div>
          </div>

          <div className="footer-card-btn-wrapper">
            <Link
              to="/sell-property"
              className="footer-card-btn"
              aria-label="Sell your property with Utkal Property"
            >
              <BiHomeAlt2 className="btn-react-icon" />
              Sell Property
              <FaArrowRight className="btn-arrow" />
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER CONTENT
      ====================================================== */}
      <div className="footer-main-content">
        {/* =================================================
            OFFICE ADDRESS
        ================================================= */}
        <div className="footer-column footer-office-address">
          <h4 className="footer-column-title">
            Office Address
          </h4>

          {/* HEAD OFFICE */}
          <div className="address-group">
            <div className="address-heading">
              <span className="address-icon">
                <FiMapPin />
              </span>

              <span className="address-label">
                Head Office
              </span>
            </div>

            <p className="address-text bold-address">
              Plot No-55, Ln 2,
              <br />
              Jagannath Vihar, Baramunda,
              <br />
              Bhubaneswar, Odisha 751003
            </p>
          </div>

          {/* CORPORATE OFFICE */}
          <div className="address-group">
            <div className="address-heading">
              <span className="address-icon">
                <FiMapPin />
              </span>

              <span className="address-label">
                Corporate Office
              </span>
            </div>

            <p className="address-text">
              IDCO Tower, Janpath,
              <br />
              Unit-2, Bhubaneswar,
              <br />
              Odisha 751001
            </p>
          </div>

          {/* BRANCH OFFICE */}
          <div className="address-group">
            <div className="address-heading">
              <span className="address-icon">
                <FiMapPin />
              </span>

              <span className="address-label">
                Branch Office
              </span>
            </div>

            <p className="address-text">
              LIG-35, Satya Nagar,
              <br />
              Infront of LEELA Apartment,
              <br />
              Toshali Apartment Compound.
            </p>
          </div>
        </div>

        {/* =================================================
            CONTACT
        ================================================= */}
        <div className="footer-column footer-contact-seller">
          <h4 className="footer-column-title">
            Contact Us
          </h4>

          {/* PROPERTY ADVISOR */}
          <div className="contact-agent-row">
            <div className="agent-avatar-wrapper">
              <img
                src={footerImage}
                alt="Property Advisor"
                className="agent-avatar"
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="agent-info">
              <span className="agent-name">
                PROPERTY ADVISOR
              </span>

              <span className="agent-subname">
                Utkal Property
              </span>

              <a
                href={`tel:+91${primaryPhone}`}
                className="agent-phone"
              >
                +91 83389 05897
              </a>
            </div>

            <a
              href={`tel:+91${primaryPhone}`}
              className="agent-action-btn"
              aria-label="Call Utkal Property"
            >
              <FaPhoneAlt size={13} />
            </a>
          </div>

          {/* PHONE 1 */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper">
              <FiPhoneCall />
            </div>

            <div className="contact-detail-text">
              <span className="detail-label">
                Contact Number
              </span>

              <a
                href={`tel:+91${primaryPhone}`}
                className="detail-value bold-value"
              >
                +91 83389 05897
              </a>
            </div>
          </div>

          {/* PHONE 2 */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper">
              <FiPhoneCall />
            </div>

            <div className="contact-detail-text">
              <span className="detail-label">
                Alternate Number
              </span>

              <a
                href={`tel:+91${secondaryPhone}`}
                className="detail-value bold-value"
              >
                +91 70776 00666
              </a>
            </div>
          </div>

          {/* EMAIL */}
          <div className="contact-detail-row">
            <div className="contact-icon-wrapper">
              <FiMail />
            </div>

            <div className="contact-detail-text">
              <span className="detail-label">
                Email
              </span>

              <a
                href="mailto:support@utkalproperty.com"
                className="detail-value"
              >
                support@utkalproperty.com
              </a>
            </div>
          </div>
        </div>

        {/* =================================================
            COMPANY LINKS
        ================================================= */}
        <div className="footer-column footer-our-company">
          <h4 className="footer-column-title">
            Our Company
          </h4>

          <ul className="company-links-list">
            <li>
              <Link to="/properties">
                <FaChevronRight className="bullet-icon" />
                Property For Sale
              </Link>
            </li>

            <li>
              <Link to="/about">
                <FaChevronRight className="bullet-icon" />
                About Us
              </Link>
            </li>

            <li>
              <Link to="/our-team">
                <FaChevronRight className="bullet-icon" />
                Our Agents
              </Link>
            </li>

            <li>
              <Link to="/faq">
                <FaChevronRight className="bullet-icon" />
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/contact">
                <FaChevronRight className="bullet-icon" />
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/sell-property">
                <FaChevronRight className="bullet-icon" />
                Sell Property
              </Link>
            </li>
          </ul>
        </div>

        {/* =================================================
            NEWSLETTER
        ================================================= */}
        <div className="footer-column footer-newsletter">
          <h4 className="footer-column-title">
            Stay Connected
          </h4>

          <p className="newsletter-subtitle">
            Get the latest property updates, new listings and
            helpful real-estate insights directly in your inbox.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter Subscription Form"
          >
            <div className="newsletter-input-wrapper">
              <FiMail className="newsletter-input-icon" />

              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                aria-label="Email address for newsletter"
                required
              />
            </div>

            <button
              type="submit"
              className="newsletter-submit-btn"
            >
              Sign Up
              <FaArrowRight className="btn-arrow" />
            </button>
          </form>

          <div className="newsletter-terms">
            <input
              type="checkbox"
              id="terms-checkbox"
              className="terms-checkbox"
              required
            />

            <label
              htmlFor="terms-checkbox"
              className="terms-label"
            >
              I have read and agree to the terms &amp; conditions
            </label>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER TAGLINE
      ====================================================== */}
      <div className="footer-tagline">
        <div className="tagline-line" />

        <div className="tagline-content">
          <BiHomeAlt2 className="tagline-icon" />

          <span>
            Your perfect home is waiting for you.
          </span>
        </div>

        <div className="tagline-line" />
      </div>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="footer-bottom-bar">
        <p>
          © {new Date().getFullYear()} Utkal Property. All
          Rights Reserved.
        </p>

        <div className="footer-bottom-links">
          <Link to="/privacy-policy">
            Privacy Policy
          </Link>

          <span className="footer-bottom-dot">•</span>

          <Link to="/terms">
            Terms of Service
          </Link>
        </div>

        <p className="footer-developed">
          Developed By <strong>PRWEBSTOCK</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;