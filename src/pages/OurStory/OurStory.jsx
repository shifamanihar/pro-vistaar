
import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Heart,
  Ruler,
  Layers3,
  Lightbulb,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import "./OurStory.css";

const journey = [
  {
    number: "01",
    year: "Our Beginning",
    title: "A Vision for Better Spaces",
    description:
      "Every meaningful space begins with an idea. Our approach starts with understanding people, their needs and the way they use their spaces.",
  },
  {
    number: "02",
    year: "Our Approach",
    title: "Design with Purpose",
    description:
      "We bring aesthetics and functionality together through thoughtful layouts, considered materials and attention to detail.",
  },
  {
    number: "03",
    year: "Our Vision",
    title: "Creating What Matters",
    description:
      "We aim to create comfortable, practical and beautiful interiors that feel personal and work effortlessly in everyday life.",
  },
];

const principles = [
  {
    icon: Heart,
    title: "People First",
    description:
      "We listen carefully and understand your needs before exploring design possibilities.",
  },
  {
    icon: Ruler,
    title: "Purposeful Design",
    description:
      "Every layout and detail should make your space more useful and comfortable.",
  },
  {
    icon: Layers3,
    title: "Thoughtful Details",
    description:
      "We bring colours, textures and materials together for a balanced interior.",
  },
  {
    icon: Lightbulb,
    title: "Ideas Into Reality",
    description:
      "We help transform your ideas into practical design directions for your space.",
  },
];

function OurStory() {
  return (
    <main className="our-story-page">
      <section className="story-section">
        <div className="story-container">
          {/* Introduction */}
          <header className="story-heading">
            <span className="story-eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              OUR STORY
            </span>

            <h1>
              Every space has
              <span>a story to tell.</span>
            </h1>

            <p>
              At ProVistaar, we believe great interiors are more
              than beautiful spaces. They reflect your personality,
              support your everyday life and make the ordinary
              feel special.
            </p>
          </header>

          {/* Our journey */}
          <section className="story-journey" id="our-journey">
            <div className="story-section-heading">
              <span className="story-eyebrow">OUR JOURNEY</span>

              <h2>
                Thoughtful ideas.
                <span>Meaningful spaces.</span>
              </h2>

              <p>
                Our approach is guided by creativity, functionality
                and the belief that good design should work for you.
              </p>
            </div>

            <div className="story-journey-grid">
              {journey.map((item) => (
                <article className="story-card" key={item.number}>
                  <span className="story-card-number">
                    {item.number}
                  </span>

                  <span className="story-card-label">
                    {item.year}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Our philosophy */}
          <section className="story-philosophy">
            <div className="story-section-heading">
              <span className="story-eyebrow">
                WHAT GUIDES US
              </span>

              <h2>
                Our philosophy,
                <span>in every detail.</span>
              </h2>

              <p>
                Good design balances how a space looks, how it feels
                and how well it works.
              </p>
            </div>

            <div className="story-principles-grid">
              {principles.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    className="story-principle"
                    key={item.title}
                  >
                    <span className="story-principle-number">
                      0{index + 1}
                    </span>

                    <div className="story-principle-icon">
                      <Icon size={23} aria-hidden="true" />
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Closing statement */}
          <section className="story-closing">
            <span className="story-closing-icon">
              <Heart size={21} aria-hidden="true" />
            </span>

            <span className="story-eyebrow">
              THE PROVISTAAR PROMISE
            </span>

            <h2>
              Your space.
              <span>Your story.</span>
              Our thoughtful approach.
            </h2>

            <p>
              Have an idea or a dream space in mind? Let’s explore
              the possibilities and create something beautiful together.
            </p>

            <div className="story-actions">
              <Link
                to="/contact#project-enquiry"
                className="story-button story-button-primary"
              >
                Start Your Project
                <ArrowRight size={17} aria-hidden="true" />
              </Link>

              <Link
                to="/portfolio"
                className="story-button story-button-outline"
              >
                Explore Our Work
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* Small design note, not a footer */}
          <div className="story-note">
            <Sparkles size={17} aria-hidden="true" />

            <p>
              <strong>Designed with purpose.</strong>
              {" "}Created around you.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default OurStory;
