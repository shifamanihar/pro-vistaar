import { useMemo, useState } from "react";
import "./Quote.css";

function Quote() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    projectType: "",
    propertyType: "",
    area: "",
    bedrooms: "1",
    bathrooms: "1",
    style: "",
    budget: "",
    timeline: "",
    services: [],
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    file: null,
  });

  const projectTypes = [
    "Full Home Interior",
    "Living Room",
    "Modular Kitchen",
    "Bedroom",
    "Office / Workspace",
    "Furniture & Decor",
    "Commercial Interior",
  ];

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Independent House",
    "Office",
    "Studio",
    "Commercial Space",
  ];

  const styles = [
    "Modern",
    "Minimal",
    "Luxury",
    "Contemporary",
    "Traditional",
    "Scandinavian",
    "Industrial",
  ];

  const budgets = [
    "₹2L – ₹5L",
    "₹5L – ₹10L",
    "₹10L – ₹20L",
    "₹20L – ₹35L",
    "₹35L+",
  ];

  const timelines = [
    "Within 1 Month",
    "1 – 3 Months",
    "3 – 6 Months",
    "6+ Months",
    "Flexible",
  ];

  const serviceOptions = [
    "Space Planning",
    "3D Visualization",
    "Furniture",
    "Lighting",
    "False Ceiling",
    "Modular Kitchen",
    "Wardrobes",
    "Complete Execution",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (service) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);

      return {
        ...prev,
        services: exists
          ? prev.services.filter((item) => item !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.projectType
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Indicative Mumbai market estimate (October 2026).
  // This is an approximate customer-facing price range.
  const estimate = useMemo(() => {
    const area = Number(formData.area);

    if (
      !formData.projectType ||
      !Number.isFinite(area) ||
      area <= 0
    ) {
      return null;
    }

    const styleRates = {
      basic: [1000, 1400],
      mid: [1400, 2400],
      premium: [2400, 4000],
      luxury: [4000, 6000],
    };

    const styleTier =
      formData.style === "Luxury"
        ? "luxury"
        : [
            "Modern",
            "Minimal",
            "Contemporary",
            "Traditional",
            "Scandinavian",
            "Industrial",
          ].includes(formData.style)
          ? "mid"
          : "basic";

    const [lowRate, highRate] = styleRates[styleTier];

    const scopeFactor = {
      "Full Home Interior": 1,
      "Living Room": 0.75,
      "Modular Kitchen": 0.9,
      Bedroom: 0.8,
      "Office / Workspace": 1.05,
      "Furniture & Decor": 0.55,
      "Commercial Interior": 1.15,
    }[formData.projectType] || 1;

    const serviceFactor =
      1 + Math.min(formData.services.length * 0.025, 0.15);

    const city = (formData.city || "").trim().toLowerCase();

    const cityFactor =
      !city || /mumbai|navi mumbai|thane/.test(city)
        ? 1
        : 0.92;

    const rawLow =
      area * lowRate * scopeFactor * serviceFactor * cityFactor;

    const rawHigh =
      area * highRate * scopeFactor * serviceFactor * cityFactor;

    const minimum =
      formData.projectType === "Modular Kitchen"
        ? 150000
        : ["Living Room", "Bedroom"].includes(formData.projectType)
          ? 75000
          : formData.projectType === "Furniture & Decor"
            ? 50000
            : 0;

    const low = Math.max(rawLow, minimum);
    const high = Math.max(rawHigh, minimum * 1.35);

    const formatINR = (value) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Math.round(value / 1000) * 1000);

    return {
      low,
      high,
      label: `${formatINR(low)} – ${formatINR(high)}`,
      rateLabel: `${formatINR(low / area)} – ${formatINR(
        high / area
      )} per sq.ft.`,
      tier: styleTier,
    };
  }, [
    formData.area,
    formData.projectType,
    formData.style,
    formData.services,
    formData.city,
  ]);

  const estimatedRange =
    estimate?.label || "Enter area and project type";

  if (submitted) {
    return (
      <section className="quote-success-page">
        <div className="quote-success-card">
          <div className="success-icon">✓</div>

          <span className="quote-eyebrow">
            REQUEST RECEIVED
          </span>

          <h1>
            Let's Create Something
            <span> Beautiful.</span>
          </h1>

          <p>
            Thank you for sharing your project requirements with
            ProVistaar. Our design team will review your details and
            get back to you shortly.
          </p>

          <div className="success-details">
            <div>
              <small>PROJECT</small>
              <strong>
                {formData.projectType || "Interior Project"}
              </strong>
            </div>

            <div>
              <small>ESTIMATED RANGE</small>
              <strong>{estimatedRange}</strong>
            </div>

            <div>
              <small>NAME</small>
              <strong>{formData.name}</strong>
            </div>

            <div>
              <small>EMAIL</small>
              <strong>{formData.email}</strong>
            </div>
          </div>

          <button
            type="button"
            className="quote-submit-btn"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                projectType: "",
                propertyType: "",
                area: "",
                bedrooms: "1",
                bathrooms: "1",
                style: "",
                budget: "",
                timeline: "",
                services: [],
                name: "",
                email: "",
                phone: "",
                city: "",
                message: "",
                file: null,
              });
            }}
          >
            Create Another Quote
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="quote-page">
      <div className="quote-container">
        <div className="quote-section-heading">
          <span className="quote-eyebrow">
            YOUR DREAM SPACE STARTS HERE
          </span>

          <h1>
            Let's Plan Your
            <span> Perfect Space.</span>
          </h1>

          <p>
            Share a few details about your project and get an
            indicative interior design estimate tailored to your
            requirements.
          </p>
        </div>

        <div className="quote-layout">
          <form className="quote-form" onSubmit={handleSubmit}>
            <section className="quote-form-section">
              <div className="quote-form-heading">
                <span className="quote-step-number">01</span>

                <div>
                  <h2>Project Details</h2>
                  <p>Tell us about the space you want to transform.</p>
                </div>
              </div>

              <div className="quote-two-column">
                <div className="quote-field">
                  <label htmlFor="projectType">
                    Project Type <span>*</span>
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="quote-field">
                  <label htmlFor="propertyType">
                    Property Type
                  </label>

                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="quote-field">
                  <label htmlFor="area">
                    Area (sq. ft.) <span>*</span>
                  </label>

                  <input
                    id="area"
                    name="area"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="e.g. 1200"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="city">Project City</label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="bedrooms">Bedrooms</label>

                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="quote-field">
                  <label htmlFor="bathrooms">Bathrooms</label>

                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="quote-form-section">
              <div className="quote-form-heading">
                <span className="quote-step-number">02</span>

                <div>
                  <h2>Your Design Style</h2>
                  <p>Choose the look and feel you love.</p>
                </div>
              </div>

              <div className="quote-style-grid">
                {styles.map((style) => (
                  <button
                    type="button"
                    key={style}
                    className={`style-card ${
                      formData.style === style ? "active" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        style,
                      }))
                    }
                    aria-pressed={formData.style === style}
                  >
                    <span className="style-card-check">
                      {formData.style === style ? "✓" : "+"}
                    </span>

                    <span className="style-card-title">{style}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="quote-form-section">
              <div className="quote-form-heading">
                <span className="quote-step-number">03</span>

                <div>
                  <h2>Services Required</h2>
                  <p>Select the services you need for your project.</p>
                </div>
              </div>

              <div className="services-check-grid">
                {serviceOptions.map((service) => (
                  <label
                    key={service}
                    className={`service-check-card ${
                      formData.services.includes(service)
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />

                    <span className="custom-checkbox">
                      {formData.services.includes(service) ? "✓" : ""}
                    </span>

                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="quote-form-section">
              <div className="quote-form-heading">
                <span className="quote-step-number">04</span>

                <div>
                  <h2>Budget & Timeline</h2>
                  <p>Help us understand your expectations.</p>
                </div>
              </div>

              <div className="quote-field">
                <label>Preferred Budget</label>

                <div className="quote-choice-grid">
                  {budgets.map((budget) => (
                    <button
                      type="button"
                      key={budget}
                      className={`quote-choice ${
                        formData.budget === budget ? "active" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          budget,
                        }))
                      }
                      aria-pressed={formData.budget === budget}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quote-field quote-timeline-field">
                <label htmlFor="timeline">Expected Timeline</label>

                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">Select your timeline</option>
                  {timelines.map((timeline) => (
                    <option key={timeline} value={timeline}>
                      {timeline}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="quote-form-section">
              <div className="quote-form-heading">
                <span className="quote-step-number">05</span>

                <div>
                  <h2>Your Contact Details</h2>
                  <p>How can our team reach you?</p>
                </div>
              </div>

              <div className="quote-two-column">
                <div className="quote-field">
                  <label htmlFor="name">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="email">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="phone">
                    Phone Number <span>*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="quote-field">
                  <label htmlFor="file">Upload Floor Plan (Optional)</label>

                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />

                  {formData.file && (
                    <small className="quote-file-name">
                      Selected: {formData.file.name}
                    </small>
                  )}
                </div>
              </div>

              <div className="quote-field quote-message-field">
                <label htmlFor="message">
                  Additional Requirements
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your ideas, needs, or special requirements..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </section>

            <button type="submit" className="quote-submit-btn">
              Get My Estimate
              <span aria-hidden="true">↗</span>
            </button>

            <p className="quote-privacy-note">
              Your details will only be used to discuss your interior
              design project.
            </p>
          </form>

          <aside className="quote-summary">
            <div className="quote-summary-top">
              <span className="quote-eyebrow">YOUR PROJECT SNAPSHOT</span>
              <h2>Estimated Investment</h2>

              <p>
                A preliminary price range based on your selected project
                details.
              </p>
            </div>

            <div className="quote-estimate-card">
              <span className="quote-estimate-label">
                INDICATIVE PROJECT RANGE
              </span>

              <strong className="quote-estimate-value">
                {estimatedRange}
              </strong>

              {estimate && (
                <span className="quote-rate-label">
                  {estimate.rateLabel}
                </span>
              )}

              <p>
                Final pricing depends on site conditions, material
                selection, design scope, and execution requirements.
              </p>
            </div>

            <div className="quote-summary-details">
              <div className="quote-summary-row">
                <span>Project Type</span>
                <strong>
                  {formData.projectType || "Not selected"}
                </strong>
              </div>

              <div className="quote-summary-row">
                <span>Property</span>
                <strong>
                  {formData.propertyType || "Not selected"}
                </strong>
              </div>

              <div className="quote-summary-row">
                <span>Area</span>
                <strong>
                  {formData.area
                    ? `${formData.area} sq. ft.`
                    : "Not specified"}
                </strong>
              </div>

              <div className="quote-summary-row">
                <span>Design Style</span>
                <strong>{formData.style || "Not selected"}</strong>
              </div>

              <div className="quote-summary-row">
                <span>Services</span>
                <strong>{formData.services.length} selected</strong>
              </div>

              <div className="quote-summary-row">
                <span>Budget Preference</span>
                <strong>{formData.budget || "Not selected"}</strong>
              </div>

              <div className="quote-summary-row">
                <span>Timeline</span>
                <strong>{formData.timeline || "Not selected"}</strong>
              </div>
            </div>

            <div className="quote-summary-note">
              <span className="quote-note-icon">✦</span>

              <div>
                <strong>Thoughtfully designed. Personally tailored.</strong>
                <p>
                  Our team can refine this estimate after understanding
                  your space, materials, and requirements.
                </p>
              </div>
            </div>

            <p className="quote-disclaimer">
              This is an indicative estimate, not a final quotation.
              Taxes, structural work, and specialist requirements may
              change the final cost.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Quote;