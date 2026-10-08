const links = [
  ['#top', 'HOME'],
  ['#about', 'ABOUT'],
  ['#work', 'WORK'],
  ['#team', 'TEAM'],
  ['#visit', 'VISIT'],
];

export function Nav() {
  return (
    <header className="nav" id="nav">
      <a href="#top" className="nav-logo">
        <strong>WILDCARD</strong>
        <small>TATTOO &amp; PIERCING STUDIOS</small>
      </a>
      <nav className="nav-right">
        {links.map(([h, l]) => (
          <a key={h} href={h} className="nav-link">
            {l}
          </a>
        ))}
        <a href="#visit" className="nav-cta">
          <span className="cta-long">BOOK AN APPOINTMENT</span>
          <span className="cta-short">BOOK</span> ↗
        </a>
      </nav>
    </header>
  );
}
