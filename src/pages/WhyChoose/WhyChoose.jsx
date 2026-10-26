import { Link } from "react-router-dom";
import "./WhyChoose.css";

function WhyChoose() {
  const features = [
    {
      number: "01",
      title: "31+ Years of Experience",
      text: "With a legacy dating back to 1995, we bring decades of design experience and practical expertise to every project.",
    },
    {
      number: "02",
      title: "Personalized Designs",
      text: "Every space is designed around your lifestyle, preferences, requirements and the way you actually live.",
    },
    {
      number: "03",
      title: "Quality Materials",
      text: "We focus on thoughtful material selection, refined finishes and quality craftsmanship built for lasting value.",
    },
    {
      number: "04",
      title: "Complete Project Execution",
      text: "From the first concept to the final detail, we provide a seamless interior design and execution experience.",
    },
  ];

  return (
    <section className="why-choose-section" id="why-choose-us">

      {/* Decorative background */}
      <div className="why-bg-circle why-bg-circle-one"></div>
      <div className="why-bg-circle why-bg-circle-two"></div>

      <div className="why-choose-container">

        {/* =========================================
            LEFT CONTENT
        ========================================= */}
        <div className="why-content">

          <span className="why-eyebrow">
            WHY CHOOSE PROVISTAR
          </span>

          <h2>
            Designing Spaces With
            <br />
            <span>Experience & Precision</span>
          </h2>

          <p className="why-description">
            With experience dating back to 1995, ProVistar brings
            together creativity, quality and thoughtful interior
            planning to create spaces that are beautiful, functional
            and made to last.
          </p>


          {/* FEATURES */}
          <div className="why-features">

            {features.map((feature) => (
              <div
                className="why-feature"
                key={feature.number}
              >

                <div className="feature-number">
                  {feature.number}
                </div>

                <div className="feature-content">

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>

                </div>

              </div>
            ))}

          </div>


          {/* BUTTON */}
          <Link
            to="/all-services"
            className="explore-work-btn"
          >
            <span>Explore Our Work</span>

            <span className="explore-arrow">
              →
            </span>
          </Link>

        </div>


        {/* =========================================
            RIGHT VISUAL
        ========================================= */}
        <div className="why-visual">

          <div className="visual-frame">

            <video
              className="why-video"
              src="/images/about.mp4"
              autoPlay
              muted
              loop
              playsInline
            />

            <div className="visual-overlay"></div>


            {/* EXPERIENCE BADGE */}
            <div className="experience-badge">

              <div className="experience-year">
                1995
              </div>

              <div className="experience-line"></div>

              <div className="experience-text">
                ESTABLISHED
              </div>

            </div>


            {/* BOTTOM LABEL */}
            <div className="visual-caption">

              <span>
                PROVISTAR
              </span>

              <strong>
                Creating spaces that inspire.
              </strong>

            </div>

          </div>


          {/* Small decorative card */}
          <div className="experience-card">

            <span className="experience-card-number">
              31+
            </span>

            <div>
              <strong>
                Years
              </strong>

              <small>
                of Experience
              </small>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;