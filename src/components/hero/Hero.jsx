import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const videos = [
  "/images/carasole1.mp4",
  "/images/carasole2.mp4",
  "/images/carasole3.mp4",
  "/images/carasole4.mp4",
];

function Hero() {
  const videoRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  /*
   * When current video finishes,
   * move to the next video.
   */
  const handleVideoEnd = () => {
    setIsChanging(true);

    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setIsChanging(false);
    }, 400);
  };

  /*
   * Make sure every new video starts automatically.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Video autoplay prevented:", error);
      }
    };

    playVideo();
  }, [currentVideo]);

  return (
    <section className="hero">

      {/* =====================================
          BACKGROUND VIDEO
      ====================================== */}

      <div
        className={`hero-video-wrapper ${
          isChanging ? "hero-video-changing" : ""
        }`}
      >
        <video
          ref={videoRef}
          className="hero-video"
          src={videos[currentVideo]}
          muted
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>


      {/* =====================================
          DARK / PREMIUM OVERLAY
      ====================================== */}

      <div className="hero-overlay"></div>


      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <div className="hero-container">

        <div className="hero-content">

          {/* Small Label */}

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line"></span>

            <span>INTERIOR DESIGN STUDIO</span>
          </div>


          {/* Main Heading */}

          <h1 className="hero-title">
            <span>YOUR SPACE.</span>

            <span className="hero-title-highlight">
              YOUR STORY.
            </span>
          </h1>


          {/* Description */}

          <p className="hero-description">
            Premium interior design crafted around
            <br />
            the way you live, work and experience your space.
          </p>


          {/* CTA */}

          <div className="hero-actions">

            <Link
              to="/projects"
              className="hero-button"
            >
              <span>Explore Projects</span>

              <span className="hero-button-arrow">
                →
              </span>
            </Link>

          </div>

        </div>


        {/* =====================================
            VIDEO INDICATORS
        ====================================== */}

        <div className="hero-video-indicators">

          {videos.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${
                currentVideo === index
                  ? "active"
                  : ""
              }`}
              onClick={() => setCurrentVideo(index)}
              aria-label={`Play interior video ${index + 1}`}
            >
              <span></span>
            </button>
          ))}

        </div>


        {/* Scroll indicator */}

        <div className="hero-scroll">
          <span>SCROLL TO EXPLORE</span>

          <div className="hero-scroll-line"></div>
        </div>

      </div>

    </section>
  );
}

export default Hero;