import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About, Marquee, Process, Team, Visit, Work, WhyUs } from './components/Sections';

export default function App() {
  // one rAF-throttled scroll listener feeds CSS variables that drive all parallax
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const h = window.innerHeight;
      root.style.setProperty('--sy', String(Math.min(y, h * 1.5)));
      root.style.setProperty('--hero-p', String(Math.min(1, y / h)));
      document.getElementById('nav')?.classList.toggle('solid', y > 120);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhyUs />
        <Work />
        <Team />
        <Process />
        <Visit />
      </main>
    </>
  );
}
