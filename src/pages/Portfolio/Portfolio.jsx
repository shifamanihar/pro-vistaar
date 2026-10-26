
import React from "react";
import {
  Sparkles,
  ArrowUpRight,
  Heart,
  DraftingCompass,
  Layers3,
} from "lucide-react";
import "./Portfolio.css";

const teamMembers = [
  {
    name: "Manihar Roshan Ali",
    initials: "RA",
    role: "Interior Design Team",
    number: "01",
    description:
      "Bringing ideas together to create thoughtful, functional and beautiful interiors.",
    icon: DraftingCompass,
    className: "ros han",
  },
  {
    name: "Manihar Arshad Ali",
    initials: "AA",
    role: "Interior Design Team",
    number: "02",
    description:
      "Focused on creating welcoming spaces that balance aesthetics with everyday needs.",
    icon: Layers3,
    className: "arshad",
  },
  {
    name: "Manihar Maqsood Ali",
    initials: "MA",
    role: "Interior Design Team",
    number: "03",
    description:
      "Contributing to a thoughtful design approach where details make a difference.",
    icon: Heart,
    className: "maqsood",
  },
];

export default function Portfolio() {
  return ( 
    <main className="our-team-page">
      <section className="team-section">
        <div className="team-container">

          {/* Section introduction — no website header or hero */}
          <div className="team-heading">
            <span className="team-eyebrow">
              <Sparkles size={15} />
              THE PEOPLE BEHIND PROVISTAAR
            </span>

            <h1>
              Meet the people
              <span> behind the spaces.</span>
            </h1>

            <p>
              Great interiors begin with people who care about the details.
              Meet the team behind PRO Vistaar, bringing ideas and thoughtful
              design together to create spaces that feel like you.
            </p>
          </div>

          {/* Team member cards */}
          <div className="team-grid">
            {teamMembers.map((member) => {
              const MemberIcon = member.icon;

              return (
                <article
                  className={`team-card team-card--${member.number}`}
                  key={member.name}
                >
                  <div className="team-card__visual">
                    <span className="team-card__number">
                      {member.number}
                    </span>

                    <div className="team-card__orb" />

                    <div className="team-card__avatar">
                      <span>{member.initials}</span>
                    </div>

                    <span className="team-card__sparkle">
                      <Sparkles size={18} />
                    </span>

                    <span className="team-card__brand">
                      PRO VISTAAR
                    </span>
                  </div>

                  <div className="team-card__content">
                    <span className="team-card__role">
                      <MemberIcon size={15} />
                      {member.role}
                    </span>

                    <h2>{member.name}</h2>

                    <p>{member.description}</p>

                    <div className="team-card__bottom">
                      <span>Thoughtful by design.</span>

                      <span className="team-card__arrow">
                        <ArrowUpRight size={19} />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Closing message — not a site footer */}
          <div className="team-note">
            <span className="team-note__icon">
              <Heart size={18} />
            </span>

            <p>
              <strong>Every space has a story.</strong>
              <span> We're here to help you create yours.</span>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
