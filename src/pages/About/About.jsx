import "./About.css";

function About() {
  return (
    <section className="about-page" id="about">
      <div className="about-container">

        {/* LEFT - VIDEO */}
        <div className="about-media">
          <video
            className="about-video"
            src="/images/about.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="video-overlay"></div>
        </div>

        {/* RIGHT - CONTENT */}
        <div className="about-content">

          <span className="about-eyebrow">
            WE CREATE BEAUTIFUL SPACES
          </span>

          <h1>
            About <span>ProVistar</span>
          </h1>

          <p className="about-description">
            Since 1995, ProVistar has been transforming spaces with thoughtful
            design, quality craftsmanship and timeless interiors. What began
            with a vision to create beautiful and functional spaces has grown
            into a trusted name in interior design.
          </p>

          <p className="about-description">
            From residential homes to commercial spaces, we bring together
            creativity, functionality and attention to detail to create
            interiors that truly reflect the people who experience them.
          </p>

          {/* QUOTE */}
          <div className="about-quote">
            <span className="quote-line"></span>

            <p>
              “We don't just design interiors. We create spaces that tell
              your story, feel like you and stand the test of time.”
            </p>
          </div>

          {/* FOUNDER */}
          <div className="founder-section">

            <div className="founder-image-wrapper">
              <img
                src="/images/founder.png"
                alt="Founder of ProVistar"
                className="founder-image"
              />
            </div>

            <div className="founder-info">
              <h3>ProVistar</h3>

              <p>
                Founder &amp; Visionary
              </p>

              <span className="since">
                EST. <strong>1995</strong>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
 
