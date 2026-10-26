import { useEffect, useState } from "react";
import "./Testimonials.css";

const API_URL = "/api/google-reviews";

function Stars({ rating = 0 }) {
  const score = Math.round(Number(rating) || 0);
  return <span className="pv-stars" aria-label={`${rating} out of 5 stars`}>{[1,2,3,4,5].map((n) => <span key={n} className={n <= score ? "filled" : ""} aria-hidden="true">★</span>)}</span>;
}
function dateLabel(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("en-IN", { month: "short", year: "numeric" }).format(date);
}
function initials(name = "Google customer") {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase();
}

export default function Testimonials() {
  const [data, setData] = useState({ reviews: [], averageRating: null, totalReviewCount: null, reviewUrl: "" });
  const [status, setStatus] = useState("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setStatus("loading");
      try {
        const response = await fetch(API_URL, { headers: { Accept: "application/json" }, signal: controller.signal });
        if (!response.ok) throw new Error(`Reviews request failed: ${response.status}`);
        const result = await response.json();
        setData({
          reviews: Array.isArray(result.reviews) ? result.reviews : [],
          averageRating: result.averageRating ?? null,
          totalReviewCount: result.totalReviewCount ?? null,
          reviewUrl: result.reviewUrl || "",
        });
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    })();
    return () => controller.abort();
  }, [retry]);

  const reviews = data.reviews;
  return (
    <section className="pv-testimonials" id="client-testimonials" aria-labelledby="pv-testimonials-title">
      <div className="pv-testimonials__glow pv-testimonials__glow--one" aria-hidden="true" />
      <div className="pv-testimonials__glow pv-testimonials__glow--two" aria-hidden="true" />
      <div className="pv-testimonials__container">
        <header className="pv-testimonials__header">
          <span className="pv-testimonials__eyebrow"><i /> REAL WORDS. REAL EXPERIENCES.</span>
          <h2 id="pv-testimonials-title">What Our Customers <span>Say</span></h2>
          <p>Honest feedback from customers who have experienced ProVistaar’s interior design and custom furniture services.</p>
          <div className="pv-google-summary" aria-live="polite">
            <span className="pv-google-mark" aria-label="Google">G</span>
            {status === "success" && data.averageRating !== null ? <>
              <strong>{Number(data.averageRating).toFixed(1)}</strong><Stars rating={data.averageRating} />
              <span className="pv-google-count">{data.totalReviewCount ?? reviews.length} Google reviews</span>
            </> : <span className="pv-google-count">{status === "loading" ? "Loading Google reviews…" : "Google customer reviews"}</span>}
          </div>
        </header>

        {status === "loading" && <div className="pv-review-state" role="status"><span className="pv-spinner" /><p>Loading the latest customer reviews…</p></div>}
        {status === "error" && <div className="pv-review-state" role="alert"><h3>Reviews are temporarily unavailable</h3><p>Please try again in a moment, or visit our Google Business Profile.</p><button className="pv-review-button pv-review-button--light" onClick={() => setRetry((n) => n + 1)}>Try again</button></div>}
        {status === "success" && reviews.length === 0 && <div className="pv-review-state"><h3>Customer reviews will appear here</h3><p>Once the Google Business Profile connection is configured and reviews are available, they’ll appear in this section automatically.</p>{data.reviewUrl && <a className="pv-review-button" href={data.reviewUrl} target="_blank" rel="noreferrer">View on Google ↗</a>}</div>}

        {status === "success" && reviews.length > 0 && <>
          <div className="pv-review-grid">
            {reviews.map((review, index) => {
              const name = review.reviewerName || "Google customer";
              const date = dateLabel(review.updateTime || review.createTime);
              return <article className="pv-review-card" key={review.reviewId || `${name}-${date}-${index}`}>
                <div className="pv-review-card__top"><span className="pv-review-source"><b>G</b> Google Review</span><span className="pv-quote" aria-hidden="true">“</span></div>
                <Stars rating={review.starRating} />
                <p className="pv-review-text">{review.comment?.trim() || "The customer left a star rating without a written comment."}</p>
                <footer className="pv-review-footer"><span className="pv-review-avatar" aria-hidden="true">{initials(name)}</span><span className="pv-review-author"><strong>{name}</strong><small>{date || "Google customer"}</small></span><span className="pv-review-check" title="Fetched from Google Business Profile" aria-label="Fetched from Google Business Profile">✓</span></footer>
              </article>;
            })}
          </div>
          <div className="pv-testimonials__bottom"><p>Reviews are fetched from ProVistaar’s connected Google Business Profile.</p>{data.reviewUrl && <a className="pv-review-button" href={data.reviewUrl} target="_blank" rel="noreferrer">Read or write a Google review ↗</a>}</div>
        </>}
      </div>
    </section>
  );
}
