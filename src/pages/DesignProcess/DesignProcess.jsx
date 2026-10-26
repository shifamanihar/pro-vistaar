import { Link } from "react-router-dom";
import "./DesignProcess.css";

function DesignProcess() {
  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We begin by understanding your vision, lifestyle, requirements, preferences and project goals.",
    },
    {
      number: "02",
      title: "Space Planning",
      description:
        "Our team carefully plans the layout, functionality and flow of your space to make every area count.",
    },
    {
      number: "03",
      title: "Design & Selection",
      description:
        "We develop the design concept and help you select materials, colours, finishes and furniture details.",
    },
    {
      number: "04",
      title: "Execution",
      description:
        "Once the design is approved, our team brings the vision to life with attention to quality and craftsmanship.",
    },
    {
      number: "05",
      title: "Final Handover",
      description:
        "We complete the finishing details, review the work and hand over a space that is ready for you to enjoy.",
    },
  ];

  return (
    <section className="design-process-section" id="design-process">

      {/* Decorative elements */}
      <div className="process-bg-circle process-bg-circle-one"></div>
      <div className="process-bg-circle process-bg-circle-two"></div>

      <div className="design-process-container">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="process-header">

          <span className="process-eyebrow">
            HOW WE WORK
          </span>

          <h2>
            From Vision
            <br />
            <span>to Reality</span>
          </h2>

         
<p>
  Every great space begins with a clear plan. From
  understanding your needs to refining the final details,
  our step-by-step process keeps your project organised,
  thoughtful and focused on the way you want to live and work.
</p>


        </div>


        {/* =========================================
            PROCESS TIMELINE
        ========================================= */}
        <div className="process-timeline">

          {/* Connecting line */}
          <div className="process-line"></div>

          {processSteps.map((step) => (
            <div
              className="process-step"
              key={step.number}
            >

              {/* Number */}
              <div className="process-number-wrapper">

                <div className="process-number">
                  {step.number}
                </div>

              </div>


              {/* Content */}
              <div className="process-step-content">

                <span className="process-step-label">
                  STEP {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

            </div>
          ))}

        </div>


        {/* =========================================
            BOTTOM TRUST / CTA
        ========================================= */}
        <div className="process-bottom">

          <div className="process-trust">

            <div className="process-trust-icon">
              ✦
            </div>

            <div className="process-trust-content">

              <span>
                EXPERIENCE YOU CAN TRUST
              </span>

              <h3>
                Your Space. Our Expertise.
              </h3>

              <p>
                Creating beautiful and functional spaces
                since <strong>1995.</strong>
              </p>

            </div>

          </div>


          <Link
            to="/contact"
            className="process-cta"
          >
            <span>
              Start Your Project
            </span>

            <span className="process-cta-arrow">
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default DesignProcess;