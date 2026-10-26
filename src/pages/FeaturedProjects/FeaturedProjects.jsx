 

import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProjects.css";

function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // =========================================================
  // ALL PROVISTAR PROJECT IMAGES
  // =========================================================

  const projects = [
    // ================= LIVING ROOM =================
    {
      id: 1,
      title: "Elegant Living Space",
      category: "Living",
      image: "/images/Living Room Design1.png",
      description:
        "A warm and elegant living space designed around comfort, luxury and timeless details.",
    },
    {
      id: 2,
      title: "Contemporary Living Room",
      category: "Living",
      image: "/images/Living Room Design2.png",
      description:
        "A contemporary living environment combining sophisticated furniture with modern styling.",
    },
    {
      id: 3,
      title: "Modern Family Lounge",
      category: "Living",
      image: "/images/Living Room Design3.webp",
      description:
        "A welcoming family lounge designed for everyday comfort and refined aesthetics.",
    },
    {
      id: 4,
      title: "Luxury Living Interior",
      category: "Living",
      image: "/images/Living Room Design4.png",
      description:
        "A premium living interior featuring balanced lighting, textures and elegant finishes.",
    },
    {
      id: 5,
      title: "Minimal Living Space",
      category: "Living",
      image: "/images/Living Room Design5.png",
      description:
        "A clean and minimal living space where functionality meets sophisticated design.",
    },
    {
      id: 6,
      title: "Classic Living Interior",
      category: "Living",
      image: "/images/Living Room Design6.png",
      description:
        "A timeless interior blending classic details with modern comfort.",
    },
    {
      id: 7,
      title: "Premium Lounge Design",
      category: "Living",
      image: "/images/Living Room Design7.png",
      description:
        "A carefully planned lounge designed to create a luxurious yet inviting atmosphere.",
    },
    {
      id: 8,
      title: "Modern Comfort Living",
      category: "Living",
      image: "/images/Living Room Design8.png",
      description:
        "A modern living space designed with comfort, proportion and visual harmony in mind.",
    },
    {
      id: 9,
      title: "Statement Living Room",
      category: "Living",
      image: "/images/Living Room Design9.png",
      description:
        "A statement interior using elegant materials and carefully selected design elements.",
    },
    {
      id: 10,
      title: "Refined Residential Lounge",
      category: "Living",
      image: "/images/Living Room Design10.png",
      description:
        "A refined residential lounge combining practical planning with sophisticated aesthetics.",
    },
    {
      id: 11,
      title: "Luxury Family Space",
      category: "Living",
      image: "/images/Living Room Design11.png",
      description:
        "A luxurious family space created for memorable moments and everyday living.",
    },
    {
      id: 12,
      title: "Modern Signature Living",
      category: "Living",
      image: "/images/Living Room Design12.png",
      description:
        "A signature ProVistar living concept combining elegance, warmth and functionality.",
    },

    // ================= KITCHEN =================
    {
      id: 13,
      title: "Modern Modular Kitchen",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design1.jpg",
      description:
        "A functional modular kitchen combining smart storage with contemporary style.",
    },
    {
      id: 14,
      title: "Contemporary Kitchen",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design2.avif",
      description:
        "A contemporary kitchen planned for efficient workflow and sophisticated aesthetics.",
    },
    {
      id: 15,
      title: "Premium Modular Kitchen",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design3.jpg",
      description:
        "A premium kitchen design balancing storage, usability and modern elegance.",
    },
    {
      id: 16,
      title: "Elegant Kitchen Interior",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design4.avif",
      description:
        "An elegant kitchen concept with refined finishes and intelligent space planning.",
    },
    {
      id: 17,
      title: "Luxury Kitchen",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design5.avif",
      description:
        "A sophisticated kitchen designed around premium materials and everyday functionality.",
    },
    {
      id: 18,
      title: "Smart Kitchen Design",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design6.webp",
      description:
        "A smart modular kitchen maximising storage while maintaining a clean visual language.",
    },
    {
      id: 19,
      title: "Modern Kitchen Concept",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design7.jpg",
      description:
        "A modern kitchen concept designed with practical layouts and contemporary details.",
    },
    {
      id: 20,
      title: "Stylish Modular Kitchen",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design8.jpg",
      description:
        "A stylish kitchen interior where material, colour and functionality work together.",
    },
    {
      id: 21,
      title: "Functional Kitchen Interior",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design9.webp",
      description:
        "A functional kitchen planned to make everyday cooking efficient and enjoyable.",
    },
    {
      id: 22,
      title: "Signature Kitchen Design",
      category: "Kitchen",
      image: "/images/Modular Kitchen Design10.jpg",
      description:
        "A signature modular kitchen reflecting ProVistar's focus on detail and usability.",
    },

    // ================= BEDROOM =================
    {
      id: 23,
      title: "Contemporary Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design1.avif",
      description:
        "A calm and sophisticated bedroom designed as a personal retreat.",
    },
    {
      id: 24,
      title: "Modern Bedroom Interior",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design2.webp",
      description:
        "A modern bedroom combining comfort, warmth and elegant interior details.",
    },
    {
      id: 25,
      title: "Luxury Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design3.avif",
      description:
        "A luxury bedroom designed with refined materials and a peaceful atmosphere.",
    },
    {
      id: 26,
      title: "Premium Bedroom Design",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design4.avif",
      description:
        "A premium bedroom concept focused on comfort, proportion and visual balance.",
    },
    {
      id: 27,
      title: "Elegant Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design5.jpg",
      description:
        "An elegant bedroom with carefully selected finishes and thoughtful lighting.",
    },
    {
      id: 28,
      title: "Minimal Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design6.jpg",
      description:
        "A minimal bedroom designed to create a clean and peaceful personal environment.",
    },
    {
      id: 29,
      title: "Modern Master Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design7.jpg",
      description:
        "A sophisticated master bedroom balancing luxury, comfort and functionality.",
    },
    {
      id: 30,
      title: "Calm Bedroom Retreat",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design8.jpg",
      description:
        "A serene bedroom retreat designed around relaxation and timeless aesthetics.",
    },
    {
      id: 31,
      title: "Residential Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design9.jpg",
      description:
        "A beautifully planned residential bedroom with practical and elegant detailing.",
    },
    {
      id: 32,
      title: "Signature Bedroom",
      category: "Bedroom",
      image: "/images/Bedroom Interior Design10.jpeg",
      description:
        "A signature bedroom concept bringing together warmth, luxury and modern styling.",
    },

    // ================= OFFICE =================
    {
      id: 33,
      title: "Professional Workspace",
      category: "Office",
      image: "/images/Office & Workspace Design1.jpg",
      description:
        "A modern workspace designed to balance productivity, comfort and aesthetics.",
    },
    {
      id: 34,
      title: "Corporate Office",
      category: "Office",
      image: "/images/Office & Workspace Design2.jpg",
      description:
        "A professional office interior designed for collaboration and productivity.",
    },
    {
      id: 35,
      title: "Modern Work Environment",
      category: "Office",
      image: "/images/Office & Workspace Design3.webp",
      description:
        "A contemporary work environment combining clean design with practical planning.",
    },
    {
      id: 36,
      title: "Executive Workspace",
      category: "Office",
      image: "/images/Office & Workspace Design4.jpg",
      description:
        "An executive workspace designed with refined materials and a premium aesthetic.",
    },
    {
      id: 37,
      title: "Creative Office",
      category: "Office",
      image: "/images/Office & Workspace Design5.jpg",
      description:
        "A creative office environment encouraging collaboration, focus and innovation.",
    },
    {
      id: 38,
      title: "Contemporary Office",
      category: "Office",
      image: "/images/Office & Workspace Design6.jpg",
      description:
        "A contemporary office combining professional character with employee comfort.",
    },
    {
      id: 39,
      title: "Smart Workspace",
      category: "Office",
      image: "/images/Office & Workspace Design7.jpg",
      description:
        "A smart workspace designed around efficient circulation and modern work requirements.",
    },
    {
      id: 40,
      title: "Premium Office Interior",
      category: "Office",
      image: "/images/Office & Workspace Design9.jpg",
      description:
        "A premium office interior focused on functionality, identity and refined aesthetics.",
    },
    {
      id: 41,
      title: "Modern Corporate Space",
      category: "Office",
      image: "/images/Office & Workspace Design10.jpg",
      description:
        "A modern corporate environment designed for productivity and professional presentation.",
    },
    {
      id: 42,
      title: "Collaborative Workspace",
      category: "Office",
      image: "/images/Office & Workspace Design11.jpg",
      description:
        "A collaborative workspace designed to support teams, meetings and focused work.",
    },
    {
      id: 43,
      title: "Elegant Office Design",
      category: "Office",
      image: "/images/Office & Workspace Design12.jpg",
      description:
        "An elegant office concept combining comfort, functionality and a refined identity.",
    },
    {
      id: 44,
      title: "Signature Workspace",
      category: "Office",
      image: "/images/Office & Workspace Design13.webp",
      description:
        "A signature workspace designed around modern business needs and visual sophistication.",
    },

    // ================= CUSTOM FURNITURE =================
    {
      id: 45,
      title: "Custom Furniture & Decor",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor1.png",
      description:
        "Bespoke furniture and decor crafted to complement the character of the space.",
    },
    {
      id: 46,
      title: "Bespoke Furniture",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor2.png",
      description:
        "Custom furniture pieces designed specifically around your lifestyle and interiors.",
    },
    {
      id: 47,
      title: "Luxury Furniture",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor3.png",
      description:
        "Premium furniture designed to bring personality and elegance to your space.",
    },
    {
      id: 48,
      title: "Modern Custom Decor",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor4.png",
      description:
        "Modern decor solutions carefully crafted to complement the surrounding interior.",
    },
    {
      id: 49,
      title: "Designer Furniture",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor5.png",
      description:
        "Designer furniture combining craftsmanship, comfort and contemporary aesthetics.",
    },
    {
      id: 50,
      title: "Premium Custom Pieces",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor6.png",
      description:
        "Premium custom pieces created to add character and functionality to your space.",
    },
    {
      id: 51,
      title: "Statement Furniture",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor7.png",
      description:
        "Statement furniture designed to become a defining element of the interior.",
    },
    {
      id: 52,
      title: "Contemporary Decor",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor8.png",
      description:
        "Contemporary decor designed to create a cohesive and sophisticated environment.",
    },
    {
      id: 53,
      title: "Elegant Custom Interior",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor9.png",
      description:
        "Elegant custom solutions tailored to the proportions and character of your space.",
    },
    {
      id: 54,
      title: "Functional Furniture",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor10.png",
      description:
        "Functional furniture combining smart usability with refined visual design.",
    },
    {
      id: 55,
      title: "Signature Decor",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor11.png",
      description:
        "Signature decor pieces that bring warmth, identity and detail to the interior.",
    },
    {
      id: 56,
      title: "Bespoke Interior Collection",
      category: "Furniture",
      image: "/images/Custom Furniture & Decor12.png",
      description:
        "A bespoke collection created to complete the overall interior experience.",
    },

    // ================= RESIDENTIAL =================
    {
      id: 57,
      title: "Complete Residential Interior",
      category: "Residential",
      image: "/images/Residential Interior Design1.png",
      description:
        "A complete residential interior planned to create a cohesive experience throughout the home.",
    },
    {
      id: 58,
      title: "Luxury Residential Design",
      category: "Residential",
      image: "/images/Residential Interior Design2.png",
      description:
        "A luxury residential concept combining thoughtful planning with sophisticated detailing.",
    },
  ];

  const categories = [
    "All",
    "Living",
    "Kitchen",
    "Bedroom",
    "Office",
    "Furniture",
    "Residential",
  ];

  // =========================================================
  // FILTER
  // =========================================================

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory, projects]);

  // =========================================================
  // CREATE SLIDES
  // 5 PROJECTS PER SCREEN
  // =========================================================

  const slides = useMemo(() => {
    const result = [];

    for (let i = 0; i < filteredProjects.length; i += 5) {
      result.push(filteredProjects.slice(i, i + 5));
    }

    return result;
  }, [filteredProjects]);

  const totalSlides = slides.length;

  // =========================================================
  // CATEGORY CHANGE
  // =========================================================

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  };

  // =========================================================
  // NEXT / PREVIOUS
  // =========================================================

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev < totalSlides - 1 ? prev + 1 : prev
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev > 0 ? prev - 1 : prev
    );
  };

  // =========================================================
  // DRAG START
  // =========================================================

  const handlePointerDown = (event) => {
    setIsDragging(true);

    dragStartX.current = event.clientX;
    dragCurrentX.current = event.clientX;

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  // =========================================================
  // DRAG MOVE
  // =========================================================

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    dragCurrentX.current = event.clientX;
  };

  // =========================================================
  // DRAG END
  // =========================================================

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const distance =
      dragCurrentX.current - dragStartX.current;

    const minimumSwipeDistance = 70;

    if (Math.abs(distance) < minimumSwipeDistance) {
      return;
    }

    if (distance < 0) {
      nextSlide();
    } else {
      previousSlide();
    }
  };

  return (
    <section className="featured-projects-section" id="featured-projects">

      {/* Decorative elements */}
      <div className="featured-bg-dot"></div>
      <div className="featured-bg-circle"></div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="featured-header">

        <div className="featured-heading">

          <span className="featured-eyebrow">
            OUR FEATURED PROJECTS
          </span>

          <h2>
            Spaces Designed
            <br />
            <span>With Purpose & Detail</span>
          </h2>

        </div>

        <p>
          Explore ProVistar's collection of thoughtfully designed
          interiors — from luxurious living spaces and modular
          kitchens to bedrooms, workspaces and bespoke furniture.
        </p>

      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="project-filters">

        {categories.map((category) => (
          <button
            key={category}
            className={`project-filter ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() =>
              handleCategoryChange(category)
            }
          >
            {category}
          </button>
        ))}

      </div>

      {/* =====================================================
          CAROUSEL
      ===================================================== */}

      {slides.length > 0 && (
        <div className="featured-carousel">

          {/* Previous */}
          <button
            className={`carousel-arrow carousel-prev ${
              currentSlide === 0 ? "disabled" : ""
            }`}
            onClick={previousSlide}
            disabled={currentSlide === 0}
            aria-label="Previous projects"
          >
            ←
          </button>

          {/* Viewport */}
          <div
            className={`featured-carousel-viewport ${
              isDragging ? "dragging" : ""
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={(event) => {
              if (isDragging) {
                handlePointerUp(event);
              }
            }}
          >

            {/* Track */}
            <div
              className="featured-carousel-track"
              style={{
                transform: `translateX(-${
                  currentSlide * 100
                }%)`,
              }}
            >

              {slides.map((slide, slideIndex) => (

                <div
                  className="featured-slide"
                  key={slideIndex}
                >

                  {slide.map((project, index) => (

                    <article
                      className={`project-card project-card-${index + 1}`}
                      key={project.id}
                    >

                      <div className="project-image-wrapper">

                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                          draggable="false"
                          onError={(event) => {
                            event.currentTarget.src =
                              "/images/logo.png";
                          }}
                        />

                        {/* Overlay */}
                        <div className="project-overlay">

                          <div className="project-overlay-content">

                            <span className="project-category">
                              {project.category}
                            </span>

                            <h3>
                              {project.title}
                            </h3>

                            <p>
                              {project.description}
                            </p>

                            <span className="project-view">
                              View Project
                              <span>→</span>
                            </span>

                          </div>

                        </div>

                        {/* Number */}
                        <span className="project-number">
                          {String(
                            project.id
                          ).padStart(2, "0")}
                        </span>

                      </div>

                    </article>

                  ))}

                </div>

              ))}

            </div>

          </div>

          {/* Next */}
          <button
            className={`carousel-arrow carousel-next ${
              currentSlide === totalSlides - 1
                ? "disabled"
                : ""
            }`}
            onClick={nextSlide}
            disabled={
              currentSlide === totalSlides - 1
            }
            aria-label="Next projects"
          >
            →
          </button>

        </div>
      )}

      {/* =====================================================
          CAROUSEL INFO
      ===================================================== */}

      <div className="carousel-controls">

        <div className="carousel-dots">

          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                currentSlide === index
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setCurrentSlide(index)
              }
              aria-label={`Go to project page ${
                index + 1
              }`}
            />
          ))}

        </div>

        <div className="carousel-counter">

          <span>
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <i>/</i>

          <span>
            {String(totalSlides).padStart(2, "0")}
          </span>

        </div>

      </div>

      {/* Drag hint */}
      <div className="drag-hint">
        <span className="drag-icon">↔</span>
        <span>
          Drag or swipe to explore more projects
        </span>
      </div>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <div className="featured-bottom">

        <div className="featured-bottom-text">

          <span>
            WANT TO SEE MORE?
          </span>

          <h3>
            Discover Our Complete
            <strong> Interior Collection</strong>
          </h3>

        </div>

        <Link
          to="/all-services"
          className="featured-explore-btn"
        >
          <span>
            Explore All Projects
          </span>

          <span className="featured-btn-arrow">
            →
          </span>

        </Link>

      </div>

    </section>
  );
}

export default FeaturedProjects;