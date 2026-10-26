import { Link } from "react-router-dom";
import "./StudioPage.css";

const pageContent = {
  team: {
    eyebrow: "THE PEOPLE BEHIND THE SPACES",
    title: "A design team with a human point of view.",
    body: "Our designers, planners and execution partners bring different perspectives to one shared belief: the best interiors are shaped around the people who use them.",
    image: "/images/founder.png",
    imageAlt: "Pro Vistaar design team founder",
    highlights: ["Experienced design thinking", "Collaborative conversations", "Detail-led execution"],
  },
materials: {
  eyebrow: "MATERIALS & QUALITY",
  title: "Beautiful finishes, chosen to last.",
  body: "From tactile surfaces to considered hardware, we help you choose materials that balance character, performance and the",
  image: "/images/office.png",
  imageAlt: "Refined kitchen materials and finishes",
  highlights: [
    "Curated finish palettes",
    "Practical recommendations",
    "Quality-first detailing"
  ],
},
  expertise: {
    eyebrow: "OUR EXPERTISE",
    title: "A complete design perspective.",
    body: "We bring space planning, visual direction, furniture, lighting and execution thinking together so your interior feels cohesive from the first sketch to the final detail.",
    image: "/images/office.png",
    imageAlt: "Pro Vistaar living room interior",
    highlights: ["Residential interiors", "Commercial workspaces", "Custom furniture and decor"],
  },
};

function StudioPage({ variant = "team" }) {
  const content = pageContent[variant] || pageContent.team;

  return (
    <main className="studio-page">
      <section className="studio-page-hero">
        <div className="studio-page-copy">
          <span>{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.body}</p>
          <div className="studio-page-actions">
            <Link to="/contact" className="studio-page-primary">Work With Us <b>→</b></Link>
            <Link to="/quote" className="studio-page-secondary">Request a Quote</Link>
          </div>
        </div>
        <div className="studio-page-image">
          <img src={content.image} alt={content.imageAlt} />
          <span className="studio-page-badge">PRO VISTAAR<br /><strong>Since 1995</strong></span>
        </div>
      </section>
      <section className="studio-page-highlights" aria-label="What you can expect">
        {content.highlights.map((highlight, index) => (
          <article key={highlight}>
            <span>0{index + 1}</span>
            <h2>{highlight}</h2>
            <p>Thoughtful choices that make the finished space feel distinctly yours.</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default StudioPage;