import React, { useState, useRef, useEffect, useCallback } from "react";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface IVoicesSectionProps {
  mode?: LandingMode;
}

export const VoicesSection: React.FC<IVoicesSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  const testimonials = config.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(584);
  const [perView, setPerView] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth <= 768;
    setPerView(isMobile ? 1 : Math.max(1, Math.floor(window.innerWidth / 588)));

    if (trackRef.current && trackRef.current.children.length >= 2) {
      const cards = trackRef.current.children;
      const firstCard = cards[0] as HTMLElement;
      const secondCard = cards[1] as HTMLElement;
      const measuredStep = secondCard.offsetLeft - firstCard.offsetLeft;
      if (measuredStep > 0) {
        setCardWidth(measuredStep);
        return;
      }
    }

    if (trackRef.current && trackRef.current.firstElementChild) {
      const firstCard = trackRef.current.firstElementChild as HTMLElement;
      setCardWidth(firstCard.offsetWidth + 24);
      return;
    }

    setCardWidth(isMobile ? window.innerWidth - 24 : 584);
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const maxIndex = Math.max(0, testimonials.length - perView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (idx: number) => {
      const nextIdx = Math.max(0, Math.min(idx, maxIndex));
      setCurrentIndex(nextIdx);
    },
    [maxIndex],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  return (
    <section className="voices" id="voices">
      <div className="container">
        <div className="eyebrow" id="voices-eyebrow">
          Whispers Beneath the Moon
        </div>
        <h2 className="section-title" id="voices-title">
          Real People.
          <br />
          <span className="grad-text">Real Peace.</span>
        </h2>
      </div>

      <div
        className="testi-outer"
        id="testi-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="testi-track"
          id="testi-track"
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {testimonials.map((t) => (
            <div key={t.id} className="tcard">
              <div className="tcard__stars">✦ ✦ ✦ ✦ ✦</div>
              <blockquote>"{t.quote}"</blockquote>
              <div className="tcard__who">
                <div className={`tcard__av ${t.avatarClass}`} />
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="c-btn c-btn--prev"
          id="t-prev"
          aria-label="Previous story"
          onClick={() => goTo(currentIndex - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="c-btn c-btn--next"
          id="t-next"
          aria-label="Next story"
          onClick={() => goTo(currentIndex + 1)}
        >
          ›
        </button>

        <div className="c-dots" id="t-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to story ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoicesSection;
