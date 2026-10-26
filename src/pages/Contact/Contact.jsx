import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Palette,
  Ruler,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";
import "./Contact.css";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const CONTACT = {
  phone: "+91 86573 78088",
  phoneLink: "+918657378088",
  email: "helloprovistaar@gmail.com",
  address:
    "Shop No. 2/2, Old Wood Market, J.M.M. Road, Asalpha, Ghatkopar West, Mumbai, Maharashtra 400084",
  mapUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Pro+Nirmaan+Solutions,+Shop+no+2,+Old+wood+Market,+J.M.M+Rd,+Asalpha,+Ghatkopar+West,+Mumbai,+Maharashtra+400084",
  whatsapp:
    "https://wa.me/918657378088?text=Hello%20PRO%20Vistaar%2C%20I%20would%20like%20to%20enquire%20about%20your%20interior%20design%20services.",
};

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

const projectTypes = [
  "Residential Interior",
  "Modular Kitchen",
  "Bedroom Design",
  "Office / Workspace",
  "Custom Furniture",
  "Commercial Interior",
];

const budgets = [
  "Below ₹5 Lakh",
  "₹5 – ₹10 Lakh",
  "₹10 – ₹20 Lakh",
  "₹20 – ₹30 Lakh",
  "₹30+ Lakh",
];

function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Your enquiry could not be sent. Please try again."
        );
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Your enquiry has been sent successfully! Our team will contact you.",
      });

      setFormData({ ...INITIAL_FORM });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to connect. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pv-contact-page">
      {/* HERO */}
      <section className="pv-contact-hero">
        <div className="pv-contact-orb pv-contact-orb-one" />
        <div className="pv-contact-orb pv-contact-orb-two" />

        <div className="pv-contact-hero-inner">
          <span className="pv-contact-eyebrow">
            LET'S CREATE SOMETHING BEAUTIFUL
          </span>

          <h1>
            Let's Talk About
            <span> Your Space.</span>
          </h1>

          <p>
            Every beautiful space begins with an idea. Tell us what
            you're imagining, and let's plan an interior that feels
            uniquely yours.
          </p>

          <div className="pv-contact-hero-actions">
            <a href="#project-enquiry" className="pv-contact-btn-primary">
              Start Your Project <ArrowRight size={18} />
            </a>

            <a
              href={`tel:${CONTACT.phoneLink}`}
              className="pv-contact-btn-secondary"
            >
              <Phone size={17} /> Call Our Team
            </a>
          </div>

          <div className="pv-contact-hero-note">
            <span><CheckCircle2 size={16} /></span>
            Personalised consultation · Thoughtful design · Clear planning
          </div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="pv-contact-details section-pad">
        <div className="pv-contact-section-heading">
          <span className="pv-contact-eyebrow">GET IN TOUCH</span>
          <h2>
            We'd Love to <span>Hear From You.</span>
          </h2>
          <p>
            Have a question or a project in mind? Choose the easiest
            way to connect with our design team.
          </p>
        </div>

        <div className="pv-contact-info-grid">
          <a
            className="pv-contact-info-card"
            href={`tel:${CONTACT.phoneLink}`}
          >
            <span className="pv-contact-info-icon"><Phone /></span>
            <span className="pv-contact-info-label">CALL OUR TEAM</span>
            <strong>{CONTACT.phone}</strong>
            <small>Tap to call us directly</small>
            <span className="pv-contact-card-link">Call Now <ArrowRight size={15} /></span>
          </a>

          <a
            className="pv-contact-info-card"
            href={`mailto:${CONTACT.email}`}
          >
            <span className="pv-contact-info-icon"><Mail /></span>
            <span className="pv-contact-info-label">EMAIL US</span>
            <strong className="pv-contact-email">{CONTACT.email}</strong>
            <small>Send your questions or project details</small>
            <span className="pv-contact-card-link">Send Email <ArrowRight size={15} /></span>
          </a>

          <a
            className="pv-contact-info-card"
            href={CONTACT.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="pv-contact-info-icon"><MapPin /></span>
            <span className="pv-contact-info-label">OUR LOCATION</span>
            <strong>Mumbai, Maharashtra</strong>
            <small>Asalpha, Ghatkopar West, Mumbai 400084</small>
            <span className="pv-contact-card-link">Get Directions <ArrowRight size={15} /></span>
          </a>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section
        className="pv-contact-form-section"
        id="project-enquiry"
      >
        <div className="pv-contact-form-layout">
          <aside className="pv-contact-form-intro">
            <span className="pv-contact-eyebrow">YOUR IDEAS, OUR EXPERTISE</span>

            <h2>
              Tell Us About
              <span> Your Project.</span>
            </h2>

            <p>
              Share a few details so we can understand your needs and
              prepare for a meaningful conversation.
            </p>

            <div className="pv-contact-benefits">
              <div><CheckCircle2 /> Personalised design discussion</div>
              <div><CheckCircle2 /> Project-specific recommendations</div>
              <div><CheckCircle2 /> Budget-aware planning</div>
              <div><CheckCircle2 /> A team ready to hear your ideas</div>
            </div>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="pv-contact-whatsapp"
            >
              <MessageCircle size={19} />
              Prefer WhatsApp? Chat with us
              <ArrowRight size={17} />
            </a>

            <div className="pv-contact-mini-note">
              <span><Clock size={20} /></span>
              <div>
                <strong>Let's discuss your vision</strong>
                <p>We'll use your details to respond to your enquiry.</p>
              </div>
            </div>
          </aside>

          <div className="pv-contact-form-card">
            <div className="pv-contact-form-heading">
              <span>PROJECT ENQUIRY</span>
              <h3>Let's get to know your project.</h3>
              <p>Fields marked * are required.</p>
            </div>

            {status.message && (
              <div
                className={`pv-contact-alert ${
                  status.type === "success"
                    ? "is-success"
                    : "is-error"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={21} />
                ) : (
                  <MessageCircle size={21} />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="pv-contact-form-row">
                <div className="pv-contact-field">
                  <label htmlFor="contact-name">Your Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </div>

                <div className="pv-contact-field">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="pv-contact-form-row">
                <div className="pv-contact-field">
                  <label htmlFor="contact-phone">Phone Number *</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={20}
                    pattern="[0-9()+ -]{8,20}"
                    title="Enter a valid phone number"
                    required
                  />
                </div>

                <div className="pv-contact-field">
                  <label htmlFor="contact-project">Project Type</label>
                  <select
                    id="contact-project"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option value={type} key={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pv-contact-field">
                <label htmlFor="contact-budget">Estimated Budget</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select your budget</option>
                  {budgets.map((budget) => (
                    <option value={budget} key={budget}>{budget}</option>
                  ))}
                </select>
              </div>

              <div className="pv-contact-field">
                <label htmlFor="contact-message">
                  Tell Us About Your Project *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Describe your space, requirements, preferred style, location and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  minLength={10}
                  maxLength={5000}
                  required
                />
                <small className="pv-contact-character-count">
                  {formData.message.length}/5000 characters
                </small>
              </div>

              <button
                className="pv-contact-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="pv-contact-spinner" size={19} />
                    Sending Enquiry...
                  </>
                ) : (
                  <>
                    Send Project Enquiry <ArrowRight size={19} />
                  </>
                )}
              </button>

              <p className="pv-contact-privacy-note">
                By submitting this form, you agree to be contacted by
                the ProVistaar design team regarding your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* STUDIO / LOCATION */}
      <section className="pv-contact-location">
        <div className="pv-contact-location-copy">
          <span className="pv-contact-eyebrow">FIND US IN MUMBAI</span>
          <h2>
            Good design begins with
            <span> a conversation.</span>
          </h2>
          <p>{CONTACT.address}</p>

          <div className="pv-contact-location-actions">
            <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={17} /> Open in Google Maps
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="pv-contact-map-wrap">
          <iframe
            title="PRO Vistaar location in Mumbai"
            src="https://maps.google.com/maps?q=Old%20Wood%20Market%2C%20J.M.M.%20Road%2C%20Asalpha%2C%20Ghatkopar%20West%2C%20Mumbai%20400084&t=&z=14&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pv-contact-final">
        <div>
          <span className="pv-contact-eyebrow">YOUR SPACE. YOUR STORY.</span>
          <h2>Ready to create a space you'll love?</h2>
          <p>Tell us your idea. Let's explore what's possible together.</p>
        </div>
        <a href="#project-enquiry">
          Start Your Project <ArrowRight size={18} />
        </a>
      </section>
    </main>
  );
}

export default Contact;
