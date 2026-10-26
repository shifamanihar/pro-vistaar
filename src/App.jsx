
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import AllServices from "./pages/AllServices/AllServices";
import Contact from "./pages/Contact/Contact";
import Portfolio from "./pages/Portfolio/Portfolio";
import FeaturedProjects from "./pages/FeaturedProjects/FeaturedProjects";
import DesignProcess from "./pages/DesignProcess/DesignProcess";
 
import VisionMission from "./pages/VisionMission/VisionMission";
import WhyChoose from "./pages/WhyChoose/WhyChoose";
import StudioPage from "./pages/Studio/StudioPage";

import Admin from "../Admin/Admin";
import Quote from "./pages/Quote/Quote";
import OurStory from "./pages/OurStory/OurStory";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/all-services" element={<AllServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/featured-projects" element={<FeaturedProjects />} />
        <Route path="/design-process" element={<DesignProcess />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/why-choose-us" element={<WhyChoose />} />
        <Route path="/quote" element={<Quote />} />
 

        <Route
          path="/our-team"
          element={<StudioPage variant="team" />}
        />

        <Route
          path="/materials-quality"
          element={<StudioPage variant="materials" />}
        />

        <Route
          path="/our-expertise"
          element={<StudioPage variant="expertise" />}
        />

        <Route path="/services/*" element={<AllServices />} />
        <Route path="/projects/*" element={<Portfolio />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <span className="not-found-number">404</span>
        <p className="not-found-label">PAGE NOT FOUND</p>

        <h1>
          Looks like this space
          <br />
          hasn&apos;t been designed yet.
        </h1>

        <p className="not-found-description">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <a href="/" className="not-found-button">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;
