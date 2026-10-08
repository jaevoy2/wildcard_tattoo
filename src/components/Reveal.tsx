import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

/** Reports true the first time the element (or its parent) scrolls into view; CSS does the animating. */
export function useInView<T extends Element>(observeParent = false) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const self = ref.current;
    const node = observeParent ? self?.parentElement : self;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [observeParent]);
  return [ref, seen] as const;
}

type Variant = 'up' | 'left' | 'right' | 'scale' | 'fade';

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as,
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, seen] = useInView<HTMLElement>();
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag ref={ref} className={`reveal reveal-${variant} ${seen ? 'is-in' : ''} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/** Heading whose lines slide up out of a mask. */
export function MaskedHeading({ lines, className = '' }: { lines: string[]; className?: string }) {
  return (
    <h2 className={`heading ${className}`}>
      {lines.map((l, i) => (
        <MaskLine key={i} delay={i * 140}>
          {l}
        </MaskLine>
      ))}
    </h2>
  );
}

function MaskLine({ children, delay }: { children: ReactNode; delay: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(true);
  return (
    <span className="mask">
      <span ref={ref} className={`mask-line ${seen ? 'is-in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal variant="fade" className="eyebrow">
      <span className="eyebrow-line" />
      {children}
    </Reveal>
  );
}

export function Button({ children, href, ghost = false }: { children: ReactNode; href: string; ghost?: boolean }) {
  return (
    <a className={`btn ${ghost ? 'btn-ghost' : ''}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {children} <span>↗</span>
    </a>
  );
}
