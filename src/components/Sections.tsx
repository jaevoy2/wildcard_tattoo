import { useState } from 'react';
import { piercings, reasons, steps, studio, tattoos, team } from '../data';
import { Button, Eyebrow, MaskedHeading, Reveal } from './Reveal';

export function Marquee() {
  const chunk = 'TATTOOS ✦ PIERCINGS ✦ SINCE 1997 ✦ WILMINGTON, DE ✦ ';
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i}>{chunk}</span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap split">
        <Reveal variant="left" className="photo-frame">
          <img src="/img/1249230.jpg" alt="Inside Wildcard Studios" className="grey" />
          <span className="photo-tag">THE SHOP · 1708-B NEWPORT GAP PIKE</span>
        </Reveal>
        <div>
          <Eyebrow>Welcome to Wildcard</Eyebrow>
          <MaskedHeading lines={['Looking for quality', 'you can trust?']} />
          <Reveal delay={300}>
            <p className="body mt">
              Welcome to Wildcard Studios in Wilmington, Delaware. We are a full service tattoo and piercing studio providing you with the best in the
              business — the number one place to go for quality tattoos and piercings.
            </p>
            <p className="body">
              We love what we do and are committed to giving you the quality attention you are looking for. Stop by during our business hours or call to
              make an appointment.
            </p>
          </Reveal>
          <Reveal delay={450} className="mt">
            <Button href={studio.phoneHref}>CALL TO BOOK</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="section no-top" id="why">
      <div className="wrap">
        <div className="center">
          <Eyebrow>Why choose us</Eyebrow>
          <MaskedHeading lines={['Why people choose Wildcard']} />
        </div>
        <div className="grid-4">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={i * 120}>
              <div className="card">
                <div className="card-num">{r.n}</div>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const [tab, setTab] = useState<'tattoos' | 'piercings'>('tattoos');
  const [active, setActive] = useState<string | null>(null);
  const items = tab === 'tattoos' ? tattoos : piercings;
  const ratios = [1.3, 1, 1.15, 1.4];

  return (
    <section className="section no-top" id="work">
      <div className="wrap">
        <div className="work-head">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <MaskedHeading lines={['Our work']} />
          </div>
          <Reveal delay={200}>
            <div className="tabs">
              {(['tattoos', 'piercings'] as const).map((t) => (
                <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="masonry" key={tab}>
          {items.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 90}>
              <button
                className="shot"
                style={{ aspectRatio: `1 / ${ratios[(i * 3 + Math.floor(i / 4)) % ratios.length]}` }}
                onClick={() => setActive(src)}
              >
                <img src={src} alt={`${tab === 'tattoos' ? 'Tattoo' : 'Piercing'} by Wildcard Studios`} loading="lazy" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {active && (
        <div className="lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <img src={active} alt="" />
          <span>CLICK ANYWHERE TO CLOSE ✕</span>
        </div>
      )}
    </section>
  );
}

export function Team() {
  return (
    <section className="section no-top" id="team">
      <div className="wrap">
        <Eyebrow>The team</Eyebrow>
        <MaskedHeading lines={['Meet the people', 'behind the needle']} />
        <div className="team">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 180}>
              <article className="member">
                <div className="member-img">
                  <img src={m.img} alt={m.name} className="grey" />
                </div>
                <div>
                  <div className="role">{m.role.toUpperCase()}</div>
                  <h3 className="name">{m.name}</h3>
                  <p className="body sm">{m.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section no-top" id="process">
      <div className="wrap">
        <div className="split process-top">
          <Reveal variant="right" className="photo-frame wide">
            <img src="/img/6927642.jpg" alt="Flash sheets on the studio wall" className="grey" />
          </Reveal>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <MaskedHeading lines={['How a session', 'goes at Wildcard']} />
          </div>
        </div>
        <div className="grid-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 130}>
              <div className="card step">
                <div className="card-num">{s.n}</div>
                <hr />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="btn-row mt">
          <Button ghost href={studio.tattooCare}>TATTOO CARE SHEET</Button>
          <Button ghost href={studio.piercingCare}>PIERCING CARE SHEET</Button>
        </Reveal>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <div id="visit">
      <section className="section no-top">
        <div className="wrap split visit">
          <div>
            <Eyebrow>Visit the studio</Eyebrow>
            <MaskedHeading lines={['Ready for your', 'next piece?']} />
            <Reveal delay={300} className="info-list">
              <Info label="Address" value={studio.address.join('\n')} />
              <Info label="Hours" value={studio.hours} />
              <Info label="Phone" value={studio.phone} />
              <div className="btn-row">
                <Button href={studio.phoneHref}>CALL NOW</Button>
                <Button ghost href={studio.mapHref}>GET DIRECTIONS</Button>
              </div>
            </Reveal>
          </div>
          <Reveal variant="scale" className="photo-frame square">
            <img src="/img/5056419.jpg" alt="Wildcard Studios storefront" />
          </Reveal>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-big">WILDCARD</div>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} WILDCARD STUDIOS · WILMINGTON, DE</span>
          <a href={studio.facebook} target="_blank" rel="noreferrer">FACEBOOK ↗</a>
        </div>
      </footer>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="info">
      <span className="role">{label.toUpperCase()}</span>
      <span className="info-v">{value}</span>
    </div>
  );
}
