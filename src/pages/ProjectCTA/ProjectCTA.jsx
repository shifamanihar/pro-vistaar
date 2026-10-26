import { Link } from "react-router-dom";
import "./ProjectCTA.css";

function ProjectCTA() {
  return (
    <section className="project-cta-section">

      {/* Background decoration */}
      <div className="project-cta-glow project-cta-glow-one"></div>
      <div className="project-cta-glow project-cta-glow-two"></div>

      <div className="project-cta-container">

        {/* Left Content */}
        <div className="project-cta-content">

          <span className="project-cta-eyebrow">
            LET'S CREATE TOGETHER
          </span>

          <h2>
            Let's Create
            <br />
            <span>Something Beautiful.</span>
          </h2>

          <p>
            Your space deserves more than just good design.
            It deserves thoughtful planning, timeless details
            and a team that understands your vision.
          </p>

          <div className="project-cta-actions">

            <Link
              to="/contact"
              className="project-cta-button"
            >
              <span>Start Your Project</span>
              <span className="project-cta-arrow">→</span>
            </Link>

            <Link
              to="/all-services"
              className="project-cta-secondary"
            >
              Explore Our Services
            </Link>

          </div>

        </div>


        {/* Right Experience Card */}
        <div className="project-cta-experience">

          <div className="experience-top">

            <span className="experience-small">
              ESTABLISHED
            </span>

            <span className="experience-year">
              1995
            </span>

          </div>

          <div className="experience-divider"></div>

          <div className="experience-bottom">

            <div className="experience-stat">
              <strong>31+</strong>
              <span>Years of<br />Experience</span>
            </div>

            <div className="experience-stat">
              <strong>100+</strong>
              <span>Spaces<br />Designed</span>
            </div>

          </div>

          <div className="experience-tagline">
            <span className="experience-dot"></span>

            <span>
              DESIGNING SPACES WITH PURPOSE
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default ProjectCTA;