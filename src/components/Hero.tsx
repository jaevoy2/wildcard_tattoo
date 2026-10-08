import { studio } from '../data';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-frame">
        <div className="hero-glow" />

        {/* layer 1 — giant wordmark */}
        <div className="hero-layer hero-text">
          <div className="hero-text-in">
            <div className="hero-big">WILDCARD</div>
            <div className="hero-big hero-outline">STUDIOS</div>
          </div>
        </div>

        {/* layer 2 — portrait */}
        <div className="hero-layer hero-portrait">
          <img src="/img/hero_back.png" alt="Man with a full back tattoo, hands behind his head" />
        </div>

        {/* layer 3 — small copy, drifts fastest */}
        <div className="hero-layer hero-ui">
          <div className="hero-links">
            <a href={studio.facebook} target="_blank" rel="noreferrer">FACEBOOK</a>
            <a href={studio.phoneHref}>CALL US</a>
            <span>{studio.phone}</span>
          </div>
          <p className="hero-blurb">
            Tattooing professionally since 1997. A full-service tattoo and piercing studio providing you with the best in the business.
          </p>
          <p className="hero-based">BASED IN WILMINGTON, DELAWARE</p>
          <a href="#work" className="hero-see">
            <span>
              SEE WORK <i>↗</i>
            </span>
            <img src="/img/tattoo1.jpg" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
}
