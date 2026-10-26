
import Hero from "../../components/hero/Hero";

import About from "../About/About";
import Services from "../Services/Services";
import WhyChoose from "../WhyChoose/WhyChoose";
import FeaturedProjects from "../FeaturedProjects/FeaturedProjects";
import DesignProcess from "../DesignProcess/DesignProcess";
import Testimonials from "../Testimonials/Testimonials";
import OurStory from "../OurStory/OurStory";
import VisionMission from "../VisionMission/VisionMission";

import CostCalculator from "../../components/CostCalculator/CostCalculator";

function Home() {
  return (
    <main>
      <Hero />

      <section id="about" className="pv-scroll-section">
        <About />
      </section>

      <section id="services" className="pv-scroll-section">
        <Services />
      </section>

      <section id="why-choose-us" className="pv-scroll-section">
        <WhyChoose />
      </section>

      <section
        id="featured-projects"
        className="pv-scroll-section"
      >
        <FeaturedProjects />
      </section>

      <section id="design-process" className="pv-scroll-section">
        <DesignProcess />
      </section>

      <section id="our-story" className="pv-scroll-section">
        <OurStory />
      </section>

      <section id="vision-mission" className="pv-scroll-section">
        <VisionMission />
      </section>

      <CostCalculator />

      <Testimonials />
    </main>
  );
}

export default Home;
