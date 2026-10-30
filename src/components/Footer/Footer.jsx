
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import { useEffect } from "react";
import "./Footer.css";

// Footer content: update links and details here whenever needed.
const footerData = {
  brand: "PRO VISTAAR",
  description:
    "Creating thoughtful, beautiful and functional interiors designed around the way you live and work.",

  quickLinks: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Projects", to: "/projects" },
    { label: "Studio", to: "/our-expertise" },
    { label: "Contact", to: "/contact" },
  ],

  services: [
    { label: "Modular Kitchen", to: "/services" },
    { label: "Bedroom Interiors", to: "/services" },
    { label: "Living Room Design", to: "/services" },
    { label: "Office & Workspace", to: "/services" },
    { label: "Custom Furniture", to: "/services" },
  ],

  contact: {
    address:
      "Shop No. 2/2, Old Wood Market, J.M.M. Road, Asalpha, Ghatkopar West, Mumbai, Maharashtra 400084",
    phone: "+91 86573 78088",
    phoneLink: "+918657378088",
    email: "provistaars@gmail.com",
    whatsapp:
      "https://wa.me/918657378088?text=Hello%20PRO%20Vistaar%2C%20I%20would%20like%20to%20enquire%20about%20your%20interior%20design%20services.%20Please%20share%20the%20details%20and%20estimated%20cost.%20Thank%20you!",
    map: "https://www.google.com/maps/dir/?api=1&destination=Shop%20No.%202%2F2%2C%20Old%20Wood%20Market%2C%20J.M.M.%20Road%2C%20Asalpha%2C%20Ghatkopar%20West%2C%20Mumbai%20400084",
  },
};

function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top smoothly when navigating between pages.
  const handleFooterNavigation = (to) => {
    if (location.pathname === to) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    navigate(to);
  };

  // When the route changes, smoothly scroll to the top.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const renderFooterLink = (item) => (
    <Link
      to={item.to}
      onClick={(e) => {
        e.preventDefault();
        handleFooterNavigation(item.to);
      }}
    >
      {item.label}
    </Link>
  );

  return (
    <footer className="pv-footer">
      <div className="pv-footer-glow pv-footer-glow-top" />
      <div className="pv-footer-glow pv-footer-glow-bottom" />

      <div className="pv-footer-container">
        <div className="pv-footer-main">
          {/* Brand */}
          <div className="pv-footer-brand">
            <Link
              to="/"
              className="pv-footer-logo"
              aria-label="PRO Vistaar Home"
              onClick={(e) => {
                e.preventDefault();
                handleFooterNavigation("/");
              }}
            >
              <span>PRO</span>
              <span className="pv-footer-logo-accent">VISTAAR</span>
            </Link>

            <p className="pv-footer-description">
              {footerData.description}
            </p>

            <div className="pv-footer-tagline">
              <span />
              <small>DESIGNING SPACES WITH PURPOSE</small>
              <span />
            </div>

            <a
              className="pv-footer-whatsapp"
              href={footerData.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Quick Links */}
          <nav className="pv-footer-column" aria-label="Quick links">
            <h3>Quick Links</h3>
            <ul>
              {footerData.quickLinks.map((item) => (
                <li key={item.label}>
                  {renderFooterLink(item)}
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="pv-footer-column">
            <h3>Our Services</h3>
            <ul>
              {footerData.services.map((item) => (
                <li key={item.label}>
                  {renderFooterLink(item)}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pv-footer-column pv-footer-contact">
            <h3>Get In Touch</h3>

            <a
              className="pv-footer-contact-item"
              href={footerData.contact.map}
              target="_blank"
              rel="noreferrer"
            >
              <span className="pv-footer-icon">
                <MapPin size={17} />
              </span>
              <span>{footerData.contact.address}</span>
            </a>

            <a
              className="pv-footer-contact-item"
              href={`tel:${footerData.contact.phoneLink}`}
            >
              <span className="pv-footer-icon">
                <Phone size={17} />
              </span>
              <span>{footerData.contact.phone}</span>
            </a>

            <a
              className="pv-footer-contact-item"
              href={`mailto:${footerData.contact.email}`}
            >
              <span className="pv-footer-icon">
                <Mail size={17} />
              </span>
              <span className="pv-footer-email">
                {footerData.contact.email}
              </span>
            </a>
          </div>
        </div>

        {/* Project CTA */}
        <div className="pv-footer-cta">
          <div>
            <p className="pv-footer-eyebrow">
              HAVE A PROJECT IN MIND?
            </p>
            <h2>Let&apos;s build your dream space.</h2>
          </div>

          <Link
            to="/quote"
            className="pv-footer-quote"
            onClick={(e) => {
              e.preventDefault();
              handleFooterNavigation("/quote");
            }}
          >
            Request Estimate
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="pv-footer-bottom">
          <p>
            © {year} PRO Vistaar. All rights reserved.
          </p>

          <div className="pv-footer-legal">
            <Link
              to="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                handleFooterNavigation("/privacy-policy");
              }}
            >
              Privacy Policy
            </Link>

            <span className="pv-footer-dot">•</span>

            <Link
              to="/terms"
              onClick={(e) => {
                e.preventDefault();
                handleFooterNavigation("/terms");
              }}
            >
              Terms &amp; Conditions
            </Link>
          </div>

          <div className="pv-footer-socials" aria-label="Social media">
            <a
              href={footerData.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={17} />
            </a>

            <a
              href={`mailto:${footerData.contact.email}`}
              aria-label="Email"
            >
              <Mail size={17} />
            </a>

            <a
              href="tel:+918657378088"
              aria-label="Call PRO Vistaar"
            >
              <Phone size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
 