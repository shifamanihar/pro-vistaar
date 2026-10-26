
import React from "react";
import { Eye, Target, Sparkles, ArrowUpRight } from "lucide-react";
import "./VisionMission.css";

const VisionMission = () => {
  return (
    <section className="vm-section" id="vision-mission">
      <div className="vm-container">
        {/* Section Heading */}
        <div className="vm-heading">
          <span className="vm-tag">
            <Sparkles size={16} />
            OUR PURPOSE & DIRECTION
          </span>

          <h2>
            Designing with Purpose,
            <br className="vm-desktop-break" />
            <span> Creating with Passion.</span>
          </h2>

          <p>
            At ProVistaar, we believe every space has the potential to become
            something extraordinary. Our vision inspires us, our mission guides
            us, and our commitment to thoughtful design brings ideas to life.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="vm-cards">
          <article className="vm-card vm-vision">
            <div className="vm-card-top">
              <div className="vm-icon">
                <Eye size={28} strokeWidth={1.8} />
              </div>
              <span className="vm-number">01</span>
            </div>

            <span className="vm-card-label">OUR FUTURE GOAL</span>

            <h3>Our Vision</h3>

            <p>
              To inspire better living through beautiful, functional, and
              meaningful interior spaces. We aspire to be a trusted design
              partner, transforming ordinary spaces into environments that
              reflect individuality, comfort, and timeless style.
            </p>

            <div className="vm-card-bottom">
              <span>Imagine the possibilities.</span>
              <ArrowUpRight size={20} />
            </div>
          </article>

          <article className="vm-card vm-mission">
            <div className="vm-card-top">
              <div className="vm-icon">
                <Target size={28} strokeWidth={1.8} />
              </div>
              <span className="vm-number">02</span>
            </div>

            <span className="vm-card-label">OUR EVERYDAY COMMITMENT</span>

            <h3>Our Mission</h3>

            <p>
              To turn our clients' ideas into thoughtfully planned spaces
              through creative design, personalised solutions, and careful
              attention to detail. We strive to balance beauty, functionality,
              and quality while making every design journey clear and
              collaborative.
            </p>

            <div className="vm-card-bottom">
              <span>Bring your vision to life.</span>
              <ArrowUpRight size={20} />
            </div>
          </article>
        </div>

        {/* Closing Statement */}
        <div className="vm-closing">
          <span className="vm-closing-line" />
          <p>
            Your space. Your story. <span>Our creative vision.</span>
          </p>
          <span className="vm-closing-line" />
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
