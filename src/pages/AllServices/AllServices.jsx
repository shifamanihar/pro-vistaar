
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Sparkles,
  Sofa,
  BedDouble,
  CookingPot,
  BriefcaseBusiness,
  Armchair,
  Palette,
  Play,
  X,
} from "lucide-react";

import "./AllServices.css";

/* =========================================
   HERO VIDEO CAROUSEL
   Files are inside public/images/
========================================= */

const heroVideos = [
  "/images/carasole1.mp4",
  "/images/carasole2.mp4",
  "/images/carasole3.mp4",
  "/images/carasole4.mp4",
];

/* =========================================
   IMAGE DATA
   Filenames match the screenshots provided.
========================================= */

const bedroomFurniture = Array.from(
  { length: 7 },
  (_, i) => ({
    image: `/images/bedroom furniture${i + 1}.png`,
    title: `Bedroom Furniture Design ${i + 1}`,
    category: "Bedroom",
    description:
      "Thoughtfully selected bedroom furniture that balances comfort, storage and everyday functionality.",
  })
);

const bedroomInteriors = [
  ["Bedroom Interior Design1.avif", "Bedroom Interior Design 1"],
  ["Bedroom Interior Design2.webp", "Bedroom Interior Design 2"],
  ["Bedroom Interior Design3.avif", "Bedroom Interior Design 3"],
  ["Bedroom Interior Design4.avif", "Bedroom Interior Design 4"],
  ["Bedroom Interior Design4.webp", "Bedroom Interior Design 4 — Alternate"],
  ["Bedroom Interior Design5.jpg", "Bedroom Interior Design 5"],
  ["Bedroom Interior Design6.jpg", "Bedroom Interior Design 6"],
  ["Bedroom Interior Design7.jpg", "Bedroom Interior Design 7"],
  ["Bedroom Interior Design8.jpg", "Bedroom Interior Design 8"],
  ["Bedroom Interior Design9.jpg", "Bedroom Interior Design 9"],
  ["Bedroom Interior Design10.jpeg", "Bedroom Interior Design 10"],
].map(([image, title]) => ({
  image: `/images/${image}`,
  title,
  category: "Bedroom",
  description:
    "Explore bedroom interiors combining restful colours, comfortable layouts, elegant finishes and practical storage.",
}));

const customFurniture = Array.from(
  { length: 12 },
  (_, i) => ({
    image: `/images/Custom Furniture & Decor${i + 1}.png`,
    title: `Custom Furniture & Decor ${i + 1}`,
    category: "Furniture & Decor",
    description:
      "Custom furniture and decor ideas designed to complement your interior, available space and personal style.",
  })
);

const livingRooms = [
  ["Living Room Design1.png", "Living Room Design 1"],
  ["Living Room Design2.png", "Living Room Design 2"],
  ["Living Room Design3.webp", "Living Room Design 3"],
  ["Living Room Design4.png", "Living Room Design 4"],
  ["Living Room Design5.png", "Living Room Design 5"],
  ["Living Room Design6.png", "Living Room Design 6"],
  ["Living Room Design7.png", "Living Room Design 7"],
  ["Living Room Design8.png", "Living Room Design 8"],
  ["Living Room Design9.png", "Living Room Design 9"],
  ["Living Room Design10.png", "Living Room Design 10"],
  ["Living Room Design11.png", "Living Room Design 11"],
  ["Living Room Design12.png", "Living Room Design 12"],
].map(([image, title]) => ({
  image: `/images/${image}`,
  title,
  category: "Living Room",
  description:
    "Living room inspiration featuring inviting layouts, balanced lighting, coordinated finishes and comfortable furniture.",
}));

const modularKitchens = [
  ["Modular Kitchen Design1.jpg", "Modular Kitchen Design 1"],
  ["Modular Kitchen Design2.avif", "Modular Kitchen Design 2"],
  ["Modular Kitchen Design3.jpg", "Modular Kitchen Design 3"],
  ["Modular Kitchen Design4.avif", "Modular Kitchen Design 4"],
  ["Modular Kitchen Design5.avif", "Modular Kitchen Design 5"],
  ["Modular Kitchen Design6.webp", "Modular Kitchen Design 6"],
  ["Modular Kitchen Design7.jpg", "Modular Kitchen Design 7"],
  ["Modular Kitchen Design8.jpg", "Modular Kitchen Design 8"],
  ["Modular Kitchen Design9.webp", "Modular Kitchen Design 9"],
  ["Modular Kitchen Design10.jpg", "Modular Kitchen Design 10"],
].map(([image, title]) => ({
  image: `/images/${image}`,
  title,
  category: "Kitchen",
  description:
    "Modular kitchen inspiration with practical work zones, organised storage and coordinated materials and finishes.",
}));

const workspaces = Array.from(
  { length: 7 },
  (_, i) => ({
    image: `/images/Office & Workspace Design${i + 1}.${i === 2 ? "webp" : "jpg"}`,
    title: `Office & Workspace Design ${i + 1}`,
    category: "Workspace",
    description:
      "Workspace design ideas balancing professional identity, efficient layouts, comfortable furniture and focus.",
  })
);

 

/* Combine all portfolio cards */

const projects = [
  ...livingRooms,
  ...bedroomInteriors,
  ...bedroomFurniture,
  ...modularKitchens,
  ...workspaces,
  ...customFurniture,
].map((project, index) => ({
  ...project,
  id: index + 1,
  number: String(index + 1).padStart(2, "0"),
}));

const categories = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Workspace",
  "Furniture & Decor",
];

const categoryIcons = {
  "Living Room": Sofa,
  Bedroom: BedDouble,
  Kitchen: CookingPot,
  Workspace: BriefcaseBusiness,
  "Furniture & Decor": Armchair,
};

function AllServices() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [failedImages, setFailedImages] = useState([]);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory;

      const matchesSearch = [
        project.title,
        project.category,
        project.description,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchTerm("");
  };

  const handleImageError = (id) => {
    setFailedImages((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  return (
    <main className="all-services-page">
      {/* =====================================
          HERO — FULL BACKGROUND VIDEO CAROUSEL
      ====================================== */}

      <section className="services-hero">
        <div className="services-hero__videos" aria-hidden="true">
          <video
            key={heroVideos[activeVideo]}
            className="services-hero__video"
            src={heroVideos[activeVideo]}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() =>
              setActiveVideo(
                (current) => (current + 1) % heroVideos.length
              )
            }
          />
        </div>

        <div className="services-hero__overlay" aria-hidden="true" />

        <div className="services-hero__orb services-hero__orb--one" />
        <div className="services-hero__orb services-hero__orb--two" />

        <div className="services-container services-hero__inner">
          <div className="services-hero__content">
            <span className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              Spaces & Possibilities
            </span>

            <h1>
              Thoughtful spaces.
              <span>Beautiful living.</span>
            </h1>

            <p>
              Discover interiors designed around your lifestyle,
              from inviting living rooms and peaceful bedrooms
              to functional kitchens, custom furniture and
              inspiring workspaces.
            </p>

            <div className="services-hero__actions">
              <Link to="/quote" className="primary-btn">
                Get a Quote
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>

              <a href="#services-list" className="secondary-btn">
                Explore Our Designs
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="services-hero__note">
              <span className="services-hero__note-icon">
                <Sparkles size={18} aria-hidden="true" />
              </span>

              <p>
                <strong>Designed with intention.</strong>
                <span>Created around you.</span>
              </p>
            </div>
          </div>

          <div className="services-hero__video-controls">
            <span className="services-hero__video-status">
              <Play size={13} fill="currentColor" aria-hidden="true" />
              DESIGN IN MOTION
            </span>

            <div className="services-hero__dots" aria-label="Hero video selection">
              {heroVideos.map((video, index) => (
                <button
                  key={video}
                  type="button"
                  className={
                    activeVideo === index
                      ? "services-hero__dot active"
                      : "services-hero__dot"
                  }
                  aria-label={`Play background video ${index + 1}`}
                  aria-pressed={activeVideo === index}
                  onClick={() => setActiveVideo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          DESIGN COLLECTION
      ====================================== */}

      <section className="services-explorer" id="services-list">
        <div className="services-container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                Explore Our Collection
              </span>

              <h2>
                Find inspiration
                <em> for every space.</em>
              </h2>
            </div>

            <p>
              Browse our design collection to discover different
              styles, furniture ideas, room layouts and finishes
              for your next interior project.
            </p>
          </div>

          {/* Search and filters */}

          <div className="services-toolbar">
            <div
              className="category-filter"
              aria-label="Filter designs by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category ? "active" : ""
                  }
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="service-search">
              <Search size={18} aria-hidden="true" />

              <input
                type="search"
                placeholder="Search designs..."
                aria-label="Search interior designs"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="service-search__clear"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </label>
          </div>

          <div className="services-results">
            <p>
              <strong>{filteredProjects.length}</strong>{" "}
              {filteredProjects.length === 1 ? "design" : "designs"}
              {" "}to explore
            </p>
          </div>

          {/* All image cards */}

          {filteredProjects.length > 0 ? (
            <div className="services-grid">
              {filteredProjects.map((project) => {
                const Icon =
                  categoryIcons[project.category] || Sparkles;

                const imageFailed = failedImages.includes(project.id);

                return (
                  <article className="service-card" key={project.id}>
                    <div className="service-card__image">
                      {!imageFailed ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="420"
                          onError={() => handleImageError(project.id)}
                        />
                      ) : (
                        <div className="service-card__image-fallback">
                          <Icon size={35} aria-hidden="true" />
                          <span>Image unavailable</span>
                        </div>
                      )}

                      <div
                        className="service-card__overlay"
                        aria-hidden="true"
                      />

                      <span className="service-card__number">
                        {project.number}
                      </span>

                      <span className="service-card__category">
                        {project.category}
                      </span>

                      <Link
                        to="/quote"
                        className="service-card__arrow"
                        aria-label={`Get a quote for ${project.title}`}
                      >
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="service-card__content">
                      <div className="service-card__icon">
                        <Icon size={19} aria-hidden="true" />
                      </div>

                      <h3>{project.title}</h3>

                      <p>{project.description}</p>

                      <Link
                        to="/quote"
                        className="service-card__link"
                      >
                        Get a Quote
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="services-empty" role="status">
              <Search size={30} aria-hidden="true" />

              <h3>No designs found</h3>

              <p>
                Try another search term or select a different category
                to explore our collection.
              </p>

              <button type="button" onClick={resetFilters}>
                View All Designs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          FINAL CALL TO ACTION
      ====================================== */}

      <section className="services-cta">
        <div className="services-container">
          <div className="services-cta__inner">
            <span className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              YOUR SPACE, YOUR STORY
            </span>

            <h2>
              Have a space in mind?
              <span>Let’s bring it to life.</span>
            </h2>

            <p>
              Tell us what you have in mind and take the first step
              towards an interior that feels like you.
            </p>

            <Link to="/quote" className="primary-btn">
              Get a Quote
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AllServices;
