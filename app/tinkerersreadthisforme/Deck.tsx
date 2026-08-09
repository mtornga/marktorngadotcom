'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const PRESENTING_CLASSES = [
  'fixed inset-0 z-50 bg-neo-bg overflow-y-auto overscroll-contain',
  // Proximity, not mandatory: a few slides are taller than a laptop viewport,
  // and mandatory snapping fights you when you scroll through one of those.
  'snap-y snap-proximity',
  '[&>section]:min-h-screen [&>section]:snap-start',
  '[&>section]:flex [&>section]:flex-col [&>section]:justify-center',
  '[&>section]:py-10',
  // Panels carry bottom margin for the scrolling read; in the deck that is
  // 48px of dead space under every slide.
  '[&>section>div>div]:mb-0',
].join(' ');

const CHROME =
  'border-4 border-neo-text shadow-neo font-heading font-bold uppercase tracking-wide transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1';

/**
 * Hybrid deck wrapper. Content is passed through as `children` so every slide
 * stays server-rendered — this component only owns presentation state.
 *
 * Scroll mode (default): plain document flow.
 * Presenter mode: full-screen scroll-snap overlay with keyboard navigation.
 */
export default function Deck({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [presenting, setPresenting] = useState(false);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  // Keep the active index readable from effects without re-subscribing.
  const indexRef = useRef(0);
  indexRef.current = index;

  const getSlides = useCallback(
    () =>
      Array.from(containerRef.current?.children ?? []).filter(
        (el): el is HTMLElement => el instanceof HTMLElement && el.tagName === 'SECTION'
      ),
    []
  );

  const goTo = useCallback(
    (target: number, behavior: ScrollBehavior = 'smooth') => {
      const slides = getSlides();
      if (!slides.length) return;
      const clamped = Math.max(0, Math.min(slides.length - 1, target));
      slides[clamped].scrollIntoView({ behavior, block: 'start' });
      setIndex(clamped);
    },
    [getSlides]
  );

  useEffect(() => {
    setCount(getSlides().length);
  }, [getSlides]);

  // Allow linking straight into the deck: /tinkerersreadthisforme?present=1
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('present') === '1') {
      setPresenting(true);
    }
  }, []);

  // Lock body scroll while the overlay is up.
  useEffect(() => {
    if (!presenting) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [presenting]);

  // Hold position across a mode switch so nobody loses their place mid-talk.
  useEffect(() => {
    const id = requestAnimationFrame(() => goTo(indexRef.current, 'auto'));
    return () => cancelAnimationFrame(id);
  }, [presenting, goTo]);

  // Active-slide tracking: a thin band across the middle of the scroll area.
  // Works for slides both taller and shorter than the viewport.
  useEffect(() => {
    const slides = getSlides();
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = slides.indexOf(entry.target as HTMLElement);
          if (i >= 0) setIndex(i);
        }
      },
      {
        root: presenting ? containerRef.current : null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [presenting, getSlides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        setPresenting((p) => !p);
        return;
      }

      // Navigation keys only take over once the deck is actually running,
      // so normal arrow-key scrolling still works on the page.
      if (!presenting) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setPresenting(false);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          event.preventDefault();
          goTo(indexRef.current + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goTo(indexRef.current - 1);
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(count - 1);
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [presenting, goTo, count]);

  return (
    <>
      <div ref={containerRef} className={presenting ? PRESENTING_CLASSES : undefined}>
        {children}
      </div>

      <button
        type="button"
        onClick={() => setPresenting((p) => !p)}
        className={`fixed bottom-4 right-4 z-[60] bg-neo-secondary text-neo-text px-4 py-3 text-xs md:text-sm print:hidden ${CHROME}`}
        aria-pressed={presenting}
      >
        {presenting ? 'Exit deck (esc)' : 'Present (f)'}
      </button>

      {presenting && (
        <div className="fixed bottom-4 left-4 z-[60] flex items-stretch gap-2 print:hidden">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
            className={`bg-neo-surface text-neo-text px-4 py-3 text-lg disabled:opacity-40 disabled:hover:shadow-neo disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${CHROME}`}
          >
            &larr;
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index >= count - 1}
            aria-label="Next slide"
            className={`bg-neo-surface text-neo-text px-4 py-3 text-lg disabled:opacity-40 disabled:hover:shadow-neo disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${CHROME}`}
          >
            &rarr;
          </button>
          <div
            className="border-4 border-neo-text bg-neo-primary text-white shadow-neo px-4 py-3 font-heading font-bold text-sm md:text-base tabular-nums flex items-center"
            aria-live="polite"
          >
            {index + 1} / {count}
          </div>
        </div>
      )}
    </>
  );
}
