
import { useState } from "react";
import "./CostCalculator.css";

// PROVISTAAR — Market-aware interior cost estimator
// Rates are configurable planning estimates, not live supplier quotes.
// Keep sensitive margin settings on the backend in production.

const CITY_RATES = {
  Mumbai: 1.08,
  Thane: 1.0,
  "Navi Mumbai": 1.03,
  Pune: 0.96,
  Other: 1.0,
};

const FINISHES = {
  Basic: {
    base: 650,
    kitchen: 160000,
    wardrobe: 35000,
    ceiling: 75,
    lighting: 60,
    tvUnit: 30000,
    furniture: 80000,
    text: "Functional layouts and economical finishes",
  },
  Standard: {
    base: 850,
    kitchen: 200000,
    wardrobe: 50000,
    ceiling: 110,
    lighting: 90,
    tvUnit: 45000,
    furniture: 120000,
    text: "Balanced materials and practical upgrades",
  },
  Premium: {
    base: 1100,
    kitchen: 280000,
    wardrobe: 70000,
    ceiling: 180,
    lighting: 140,
    tvUnit: 75000,
    furniture: 200000,
    text: "Refined finishes and premium hardware",
  },
  Luxury: {
    base: 1600,
    kitchen: 420000,
    wardrobe: 100000,
    ceiling: 280,
    lighting: 220,
    tvUnit: 130000,
    furniture: 400000,
    text: "Bespoke finishes and high-end detailing",
  },
};

// Internal planning assumptions.
// Replace these with PROVISTAAR's actual cost data.
const COST_SETTINGS = {
  directCostRatio: 0.74,
  contingencyRate: 0.05,
  overheadRate: 0.08,
  targetGrossMargin: 0.18,
};

const DEFAULT_FORM = {
  property: "2BHK",
  area: "900",
  rooms: 2,
  finish: "Premium",
  kitchen: true,
  wardrobe: true,
  falseCeiling: true,
  lighting: true,
  tvUnit: false,
  furniture: false,
  city: "Mumbai",
};

const FEATURES = [
  {
    key: "kitchen",
    title: "Modular Kitchen",
    description: "Cabinetry, standard fittings and installation allowance",
  },
  {
    key: "wardrobe",
    title: "Bedroom Wardrobes",
    description: "Custom storage priced per bedroom",
  },
  {
    key: "falseCeiling",
    title: "False Ceiling",
    description: "Selected ceiling work, priced by floor area",
  },
  {
    key: "lighting",
    title: "Designer Lighting",
    description: "Lighting allowance based on floor area",
  },
  {
    key: "tvUnit",
    title: "TV Unit",
    description: "Custom TV wall and storage allowance",
  },
  {
    key: "furniture",
    title: "Custom Furniture",
    description: "Made-to-order furniture allowance",
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

function getEstimate(form) {
  const area = Number(form.area);
  const rooms = Number(form.rooms);
  const rates = FINISHES[form.finish];
  const locationFactor = CITY_RATES[form.city] ?? 1;

  if (
    !Number.isFinite(area) ||
    area < 200 ||
    area > 50000 ||
    !rates
  ) {
    return null;
  }

  // Base work: core interior work allowance.
  // Selected features are itemized separately below.
  const items = [
    {
      name: "Core interior work",
      amount: area * rates.base,
    },
  ];

  if (form.kitchen) {
    items.push({
      name: "Modular kitchen",
      amount: rates.kitchen,
    });
  }

  if (form.wardrobe) {
    items.push({
      name: "Bedroom wardrobes",
      amount: rooms * rates.wardrobe,
    });
  }

  if (form.falseCeiling) {
    items.push({
      name: "False ceiling",
      amount: area * rates.ceiling,
    });
  }

  if (form.lighting) {
    items.push({
      name: "Designer lighting",
      amount: area * rates.lighting,
    });
  }

  if (form.tvUnit) {
    items.push({
      name: "TV unit",
      amount: rates.tvUnit,
    });
  }

  if (form.furniture) {
    items.push({
      name: "Custom furniture",
      amount: rates.furniture,
    });
  }

  // Apply location adjustment to the complete project estimate.
  const marketBenchmark =
    items.reduce((sum, item) => sum + item.amount, 0) *
    locationFactor;

  // Estimate direct costs, contingency and required selling price.
  // Gross margin = (selling price - direct cost - overhead) / selling price.
  const directCost =
    marketBenchmark * COST_SETTINGS.directCostRatio;

  const contingency =
    directCost * COST_SETTINGS.contingencyRate;

  const requiredPrice =
    (directCost + contingency) /
    (1 -
      COST_SETTINGS.overheadRate -
      COST_SETTINGS.targetGrossMargin);

  // Never quote below the market benchmark or the margin-protecting price.
  const quote = Math.max(marketBenchmark, requiredPrice);

  // Internal-only planning figures. Do not display these to customers.
  const estimatedOverhead =
    quote * COST_SETTINGS.overheadRate;

  const estimatedGrossProfit =
    quote - directCost - contingency - estimatedOverhead;

  return {
    items: items.map((item) => ({
      ...item,
      amount: item.amount * locationFactor,
    })),
    marketBenchmark,
    quote: Math.ceil(quote / 1000) * 1000,
    low: Math.floor((quote * 0.9) / 1000) * 1000,
    high: Math.ceil((quote * 1.1) / 1000) * 1000,
    internal: {
      directCost,
      contingency,
      estimatedOverhead,
      estimatedGrossProfit,
      grossMargin: (estimatedGrossProfit / quote) * 100,
    },
  };
}

function CostCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ ...DEFAULT_FORM });

  const estimate = getEstimate(form);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const closeCalculator = () => {
    setIsOpen(false);
    setStep(1);
  };

  const resetCalculator = () => {
    setForm({ ...DEFAULT_FORM });
    setStep(1);
  };

  const continueTo = (nextStep) => {
    if (nextStep === 2 && !estimate) return;
    setStep(nextStep);
  };

  return (
    <>
      <button
        type="button"
        className="cost-floating-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open interior cost calculator"
      >
        <span className="cost-icon">₹</span>
        <span className="cost-floating-text">Estimate Cost</span>
      </button>

      {isOpen && (
        <div className="cost-overlay" onClick={closeCalculator}>
          <div
            className="cost-calculator-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cost-title"
          >
            <div className="cost-header">
              <div>
                <span className="cost-eyebrow">
                  PROVISTAAR INTERIORS
                </span>
                <h2 id="cost-title">Interior Cost Estimator</h2>
                <p>
                  Get an indicative estimate tailored to your space,
                  finish and project location.
                </p>
              </div>

              <button
                type="button"
                className="cost-close"
                onClick={closeCalculator}
                aria-label="Close calculator"
              >
                ×
              </button>
            </div>

            <div className="cost-progress">
              {["Space", "Style", "Features", "Estimate"].map(
                (label, index) => (
                  <div
                    key={label}
                    className={`progress-item ${
                      step >= index + 1 ? "active" : ""
                    }`}
                  >
                    <span>0{index + 1}</span>
                    <small>{label}</small>
                  </div>
                )
              )}
            </div>

            {step === 1 && (
              <div className="calculator-step">
                <div className="step-title">
                  <span>01</span>
                  <div>
                    <h3>Tell us about your space</h3>
                    <p>Enter your property and carpet area details.</p>
                  </div>
                </div>

                <div className="calculator-grid">
                  <div className="form-group full-width">
                    <label>Property Type</label>
                    <div className="option-grid">
                      {[
                        "1BHK",
                        "2BHK",
                        "3BHK",
                        "4BHK+",
                        "Villa",
                        "Office",
                      ].map((type) => (
                        <button
                          type="button"
                          key={type}
                          className={`select-card ${
                            form.property === type ? "selected" : ""
                          }`}
                          onClick={() => {
                            updateForm("property", type);

                            const defaultRooms = {
                              "1BHK": 1,
                              "2BHK": 2,
                              "3BHK": 3,
                              "4BHK+": 4,
                              Villa: 4,
                              Office: 4,
                            };

                            updateForm("rooms", defaultRooms[type]);
                          }}
                        >
                          <span className="select-icon">
                            {type === "Office" ? "▦" : "⌂"}
                          </span>
                          <strong>{type}</strong>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost-area">Carpet Area (sq.ft.)</label>
                    <div className="input-with-unit">
                      <input
                        id="cost-area"
                        type="number"
                        min="200"
                        max="50000"
                        value={form.area}
                        onChange={(event) =>
                          updateForm("area", event.target.value)
                        }
                      />
                      <span>sq.ft</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cost-rooms">Bedrooms / Rooms</label>
                    <select
                      id="cost-rooms"
                      value={form.rooms}
                      onChange={(event) =>
                        updateForm("rooms", Number(event.target.value))
                      }
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
                        <option key={room} value={room}>
                          {room === 8 ? "8+ Rooms" : `${room} Room${room > 1 ? "s" : ""}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="cost-city">Project Location</label>
                    <select
                      id="cost-city"
                      value={form.city}
                      onChange={(event) =>
                        updateForm("city", event.target.value)
                      }
                    >
                      {Object.keys(CITY_RATES).map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {!estimate && (
                  <p role="alert">
                    Please enter a valid area between 200 and 50,000 sq.ft.
                  </p>
                )}

                <div className="calculator-footer">
                  <span>Step 1 of 4</span>
                  <button
                    type="button"
                    className="next-button"
                    disabled={!estimate}
                    onClick={() => continueTo(2)}
                  >
                    Continue <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="calculator-step">
                <div className="step-title">
                  <span>02</span>
                  <div>
                    <h3>Choose your design finish</h3>
                    <p>
                      Higher finish levels allow for more expensive
                      materials and detailing.
                    </p>
                  </div>
                </div>

                <div className="finish-options">
                  {Object.entries(FINISHES).map(([name, rates]) => (
                    <button
                      type="button"
                      key={name}
                      className={`finish-card ${
                        form.finish === name ? "selected" : ""
                      }`}
                      onClick={() => updateForm("finish", name)}
                    >
                      <div className="finish-radio">
                        {form.finish === name && "✓"}
                      </div>
                      <div>
                        <h4>{name}</h4>
                        <p>{rates.text}</p>
                        <strong>
                          From ₹{money(rates.base)}/sq.ft.
                        </strong>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="estimate-note">
                  The displayed rate is the base-work allowance.
                  Selected features are calculated separately.
                </p>

                <div className="calculator-footer">
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="next-button"
                    onClick={() => setStep(3)}
                  >
                    Continue <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="calculator-step">
                <div className="step-title">
                  <span>03</span>
                  <div>
                    <h3>Customize your project</h3>
                    <p>Select the features you want included.</p>
                  </div>
                </div>

                <div className="feature-list">
                  {FEATURES.map((feature) => {
                    const selected = Boolean(form[feature.key]);
                    const rates = FINISHES[form.finish];

                    let amount = 0;
                    if (feature.key === "kitchen") {
                      amount = rates.kitchen;
                    } else if (feature.key === "wardrobe") {
                      amount = rates.wardrobe * Number(form.rooms);
                    } else if (feature.key === "falseCeiling") {
                      amount = rates.ceiling * Number(form.area);
                    } else if (feature.key === "lighting") {
                      amount = rates.lighting * Number(form.area);
                    } else if (feature.key === "tvUnit") {
                      amount = rates.tvUnit;
                    } else if (feature.key === "furniture") {
                      amount = rates.furniture;
                    }

                    amount *= CITY_RATES[form.city] ?? 1;

                    return (
                      <button
                        type="button"
                        key={feature.key}
                        className={`feature-card ${
                          selected ? "selected" : ""
                        }`}
                        onClick={() =>
                          updateForm(feature.key, !selected)
                        }
                      >
                        <div className="feature-check">
                          {selected ? "✓" : ""}
                        </div>

                        <div className="feature-content">
                          <h4>{feature.title}</h4>
                          <p>{feature.description}</p>
                        </div>

                        <strong>
                          {selected ? "" : "+ "}₹{money(amount)}
                        </strong>
                      </button>
                    );
                  })}
                </div>

                <div className="calculator-footer">
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="next-button"
                    disabled={!estimate}
                    onClick={() => setStep(4)}
                  >
                    Calculate Estimate <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {step === 4 && estimate && (
              <div className="calculator-result">
                <div className="result-icon">₹</div>

                <span className="result-label">
                  APPROXIMATE PROJECT COST
                </span>

                <h3>₹{money(estimate.quote)}</h3>

                <p className="result-range">
                  Estimated range: ₹{money(estimate.low)} – ₹
                  {money(estimate.high)}
                </p>

                <p className="result-description">
                  This estimate uses configurable location and finish
                  rates, selected features, and a business-margin
                  safeguard. Final pricing depends on measurements,
                  material brands, site conditions and the confirmed
                  scope of work.
                </p>

                <div className="estimate-summary">
                  <div>
                    <span>Property</span>
                    <strong>{form.property}</strong>
                  </div>
                  <div>
                    <span>Carpet Area</span>
                    <strong>{money(Number(form.area))} sq.ft.</strong>
                  </div>
                  <div>
                    <span>Finish</span>
                    <strong>{form.finish}</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>{form.city}</strong>
                  </div>
                </div>

                <div className="calculator-footer">
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep(3)}
                  >
                    ← Edit Features
                  </button>
                  <button
                    type="button"
                    className="result-secondary"
                    onClick={resetCalculator}
                  >
                    Recalculate
                  </button>
                </div>

                <div className="result-actions">
                  <a href="/contact" className="result-primary">
                    Discuss My Project <span>→</span>
                  </a>
                </div>

                <small className="estimate-note">
                  * Indicative estimate only. Not a final quotation.
                  GST, appliances, structural work and other exclusions
                  must be confirmed before the final quote.
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CostCalculator;
