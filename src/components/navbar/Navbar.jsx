
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import "./Navbar.css";

const PHONE = "918657378088";
const DISPLAY_PHONE = "+91 86573 78088";
const EMAIL = "helloprovistaar@gmail.com";

const MAP_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Pro+Nirmaan+Solutions,+Shop+no+2,+Old+wood+Market,+J.M.M+Rd,+Asalpha,+Ghatkopar+West,+Mumbai,+Maharashtra+400084";

const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(
  "Hello PRO Vistaar, I would like to enquire about your interior design services. Please share the details and estimated cost. Thank you!"
)}`;

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to a requested section after route navigation.
  useEffect(() => {
    const sectionId =
      location.state?.scrollTo || location.hash.slice(1);

    if (!sectionId) return;

    let attempts = 0;
    let timer;

    const findSection = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      // Allow the destination page to render its sections.
      attempts += 1;

      if (attempts < 20) {
        timer = window.setTimeout(findSection, 100);
      }
    };

    timer = window.setTimeout(findSection, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, location.hash]);

  const closeMenu = () => setMobileOpen(false);

  const goHome = () => {
    closeMenu();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    navigate("/");
  };

  // Scroll to a section on Home, navigating there first if necessary.
  const scrollToSection = (sectionId) => {
    closeMenu();

    if (location.pathname !== "/") {
      navigate("/", {
        state: { scrollTo: sectionId },
      });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Navigate to a page and optionally scroll to a section.
  const goToPageSection = (path, sectionId) => {
    closeMenu();

    if (location.pathname === path) {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate(path, {
      state: { scrollTo: sectionId },
    });
  };

  const openPortfolioTeam = () => {
    goToPageSection("/portfolio", "our-team");
  };

  return (
    <header className="pv-header">
      {/* TOP CONTACT BAR */}
      <div className="pv-topbar">
        <div className="pv-topbar-inner">
          <a
            className="pv-top-item pv-location"
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin aria-hidden="true" />
            <span>Mumbai, Maharashtra</span>
          </a>

          <a className="pv-top-item" href={`tel:${PHONE}`}>
            <Phone aria-hidden="true" />
            <span>{DISPLAY_PHONE}</span>
          </a>

          <a className="pv-top-item pv-email" href={`mailto:${EMAIL}`}>
            <Mail aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>

          <div className="pv-top-actions">
            <a
              className="pv-whatsapp-link"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/quote"
              className="pv-estimate-button"
              onClick={closeMenu}
            >
              Request Estimate
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="pv-mainbar">
        <div className="pv-mainbar-inner">
          <button
            type="button"
            className="pv-brand"
            onClick={goHome}
            aria-label="PRO Vistaar home"
          >
            <span className="pv-brand-main">
              <span className="pv-brand-pro">PRO</span>Vistaar
            </span>
            <span className="pv-brand-subtitle">
              INTERIOR DESIGN
            </span>
          </button>

          <nav
            className={`pv-navigation ${
              mobileOpen ? "pv-navigation-open" : ""
            }`}
            aria-label="Main navigation"
          >
            <button
              type="button"
              className={`pv-nav-link pv-nav-button ${
                location.pathname === "/" ? "pv-active" : ""
              }`}
              onClick={goHome}
            >
              Home
            </button>

            {/* ABOUT */}
            <div className="pv-dropdown">
              <button
                type="button"
                className="pv-nav-link pv-nav-button"
                aria-haspopup="true"
              >
                About <span className="pv-plus">+</span>
              </button>

              <div className="pv-dropdown-menu">
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                >
                  About Us
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("our-story")}
                >
                  Our Story
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("vision-mission")}
                >
                  Vision &amp; Mission
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("why-choose-us")}
                >
                  Why Choose Us
                </button>

                <button type="button" onClick={openPortfolioTeam}>
                  Our Team
                </button>
              </div>
            </div>

            {/* SERVICES */}
            <div className="pv-dropdown">
              <button
                type="button"
                className="pv-nav-link pv-nav-button"
                aria-haspopup="true"
              >
                Services <span className="pv-plus">+</span>
              </button>

              <div className="pv-dropdown-menu">
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                >
                  All Services
                </button>

                <Link
                  to="/all-services"
                  onClick={closeMenu}
                >
                  Explore Services
                </Link>

                <Link
                  to="/services/home-interior"
                  onClick={closeMenu}
                >
                  Home Interiors
                </Link>

                <Link to="/services/office" onClick={closeMenu}>
                  Office Interiors
                </Link>

                <Link
                  to="/services/renovation"
                  onClick={closeMenu}
                >
                  Renovation
                </Link>

                <Link to="/quote" onClick={closeMenu}>
                  Design Consultation
                </Link>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="pv-dropdown">
              <button
                type="button"
                className="pv-nav-link pv-nav-button"
                aria-haspopup="true"
              >
                Projects <span className="pv-plus">+</span>
              </button>

              <div className="pv-dropdown-menu">
                <Link to="/portfolio" onClick={closeMenu}>
                  All Projects
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    scrollToSection("featured-projects")
                  }
                >
                  Featured Projects
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("design-process")}
                >
                  Design Process
                </button>

                <button type="button" onClick={openPortfolioTeam}>
                  Our Team
                </button>
              </div>
            </div>

            <NavLink
              to="/our-expertise"
              className={({ isActive }) =>
                `pv-nav-link ${isActive ? "pv-active" : ""}`
              }
              onClick={closeMenu}
            >
              Studio
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `pv-nav-link ${isActive ? "pv-active" : ""}`
              }
              onClick={closeMenu}
            >
              Contact
            </NavLink>

            <a
              className="pv-mobile-whatsapp"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <MessageCircle aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </nav>

          <div className="pv-main-actions">
            <a
              href={`tel:${PHONE}`}
              className="pv-call-button"
              aria-label={`Call ${DISPLAY_PHONE}`}
              title={`Call ${DISPLAY_PHONE}`}
            >
              <Phone aria-hidden="true" />
            </a>

            <Link
              to="/quote"
              className="pv-quote-button"
              onClick={closeMenu}
            >
              Get a Quote
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            className="pv-mobile-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
