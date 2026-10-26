import { useState } from "react";
import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
  const services = [
    {
      number: "01",
      title: "Custom Furniture & Decor",
      description:
        "Bespoke furniture and decor crafted to complement your space, style and everyday living.",
      image: "/images/Custom Furniture & Decor1.png",
    },
    {
      number: "02",
      title: "Modular Kitchen Design",
      description:
        "Smart, elegant and functional modular kitchens designed around your lifestyle and space.",
      image: "/images/Modular Kitchen Design7.jpg",
    },
    {
      number: "03",
      title: "Bedroom Interior Design",
      description:
        "Comfortable and sophisticated bedroom interiors designed to create a calm and personal retreat.",
      image: "/images/Bedroom Interior Design8.jpg",
    },
    {
      number: "04",
      title: "Office & Workspace Design",
      description:
        "Professional workspaces that balance productivity, comfort and a refined modern aesthetic.",
      image: "/images/Office & Workspace Design2.jpg",
    },
    {
      number: "05",
      title: "Living Room Design",
      description:
        "Welcoming living spaces where thoughtful layouts, premium finishes and beautiful details come together.",
      image: "/images/Living Room Design1.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < services.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="services-section" id="services">

      {/* =========================================
          HEADER
      ========================================= */}
      <div className="services-header">

        <span className="services-eyebrow">
          SERVICES WE PROVIDE
        </span>

        <h2>
          Our Interior Design <span>Services</span>
        </h2>

        <p>
          From concept to completion, ProVistar creates beautiful,
          functional and timeless interiors tailored to your lifestyle.
        </p>

      </div>


      {/* =========================================
          SERVICES CAROUSEL
      ========================================= */}
      <div className="services-carousel-wrapper">

        {/* LEFT ARROW */}
        <button
          className={`carousel-arrow carousel-arrow-left ${
            currentIndex === 0 ? "disabled" : ""
          }`}
          onClick={previousSlide}
          disabled={currentIndex === 0}
          aria-label="Previous services"
        >
          ‹
        </button>


        {/* VIEWPORT */}
        <div className="services-carousel">

          {/* TRACK */}
          <div
  className="services-track"
  style={{
    transform: `translateX(calc(${currentIndex} * -100%))`,
  }}
>

            {services.map((service) => (
              <article
                className="service-card"
                key={service.number}
              >

                {/* IMAGE */}
                <div className="service-image">

                  <img
                    src={service.image}
                    alt={service.title}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="service-number">
                    {service.number}
                  </div>

                </div>


                {/* CONTENT */}
                <div className="service-content">

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link
                    to="/all-services"
                    className="learn-more"
                  >
                    Learn More
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>

        </div>


        {/* RIGHT ARROW */}
        <button
          className={`carousel-arrow carousel-arrow-right ${
            currentIndex === services.length - 4 ? "disabled" : ""
          }`}
          onClick={nextSlide}
          disabled={currentIndex === services.length - 4}
          aria-label="Next services"
        >
          ›
        </button>

      </div>


      {/* =========================================
          CAROUSEL INDICATORS
      ========================================= */}
      <div className="carousel-indicators">

        {services.slice(0, services.length - 3).map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>


      {/* =========================================
          CTA
      ========================================= */}
      <div className="services-cta">

        <div className="cta-content">

          <span>
            READY TO TRANSFORM YOUR SPACE?
          </span>

          <h3>
            Let's Create Your{" "}
            <strong>Dream Interior</strong>
          </h3>

        </div>

        <Link
          to="/contact"
          className="hire-button"
        >
          Hire Now
          <span>→</span>
        </Link>

      </div>


      {/* =========================================
          STATS
      ========================================= */}
      <div className="services-stats">

        <div className="stats-heading">

          <span>
            THE PROVISTAR DIFFERENCE
          </span>

          <h3>
            Designing Spaces Since{" "}
            <strong>1995</strong>
          </h3>

        </div>


        <div className="stats-grid">

          <div className="stat-item">

            <div className="stat-icon">
              ✦
            </div>

            <div className="stat-text">
              <strong>31+</strong>
              <span>Years of Experience</span>
            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">
              ⌂
            </div>

            <div className="stat-text">
              <strong>5+</strong>
              <span>Interior Services</span>
            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">
              ✧
            </div>

            <div className="stat-text">
              <strong>100%</strong>
              <span>Custom Designs</span>
            </div>

          </div>


          <div className="stat-item">

            <div className="stat-icon">
              ◆
            </div>

            <div className="stat-text">
              <strong>1995</strong>
              <span>ProVistar Established</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Services;