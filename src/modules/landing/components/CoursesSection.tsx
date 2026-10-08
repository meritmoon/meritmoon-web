import React, { useState, useRef, useEffect, useCallback } from "react";
import { icons } from "../../../assets";
import { LANDING_CONFIG, LandingMode } from "../constants";
import { LANDING_COURSES } from "../data";
import { resolveCourseMeter } from "../helpers";

export interface ICoursesSectionProps {
  mode?: LandingMode;
}

export const CoursesSection: React.FC<ICoursesSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const getPerView = () => {
    if (typeof window === "undefined") return 3;
    return Math.max(1, Math.floor(window.innerWidth / 348));
  };

  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const updatePerView = () => setPerView(getPerView());
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const maxIndex = Math.max(0, LANDING_COURSES.length - perView);

  const goTo = useCallback(
    (idx: number) => {
      const nextIdx = Math.max(0, Math.min(idx, maxIndex));
      setCurrentIndex(nextIdx);
    },
    [maxIndex],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      goTo(dx < 0 ? currentIndex + 1 : currentIndex - 1);
    }
  };

  const cardWidth = 340 + 24; // 340px width + 24px gap

  return (
    <section className="courses" id="courses">
      <div className="container">
        <div className="eyebrow">What Awaits You</div>
        <h2 className="section-title">
          Courses made with
          <br />
          <span className="grad-text">deep care for you.</span>
        </h2>
        <p className="section-body">
          Every course was built to genuinely help — not to impress, not to
          sell, not to keep you subscribed. To give you a real shift, from the
          inside out, that you carry with you wherever you go.
        </p>
      </div>

      <div
        className="carousel-outer"
        id="courses-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carousel-track"
          id="courses-track"
          ref={trackRef}
          style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
        >
          {LANDING_COURSES.map((course) => {
            const mascotSrc =
              course.mascotVariant === "joyful"
                ? icons.mascotJoyful.src
                : icons.mascotMeditating.src;
            const meter = resolveCourseMeter(course, activeMode);

            return (
              <div
                key={course.id}
                className={`ccard ${course.isFeatured ? "ccard--featured" : ""}`}
              >
                <div
                  className={`ccard__glow ${course.isFeatured ? "ccard__glow--lit" : ""}`}
                />
                {course.isFeatured && (
                  <div className="ccard__badge">Most Transformative</div>
                )}
                <div className="ccard__level">{course.level}</div>
                <div className="ccard__moon-wrap">
                  <div className="moon-mascot moon-mascot--ccard">
                    <img src={mascotSrc} alt={course.title} />
                  </div>
                </div>
                <h3 className="ccard__title">
                  {course.title}
                  <br />
                  <small>{course.subtitle}</small>
                </h3>
                <p className="ccard__body">{course.body}</p>
                <div className="ccard__tags">
                  {course.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`ctag ${tag.isPremium ? "ctag--premium" : "ctag--free"}`}
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="ccard__meter">
                  <div
                    className="meter-fill"
                    style={{ ["--pct" as string]: `${meter.pct}%` } as React.CSSProperties}
                  />
                  <span>{meter.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="c-btn c-btn--prev"
          id="c-prev"
          aria-label="Previous courses"
          onClick={() => goTo(currentIndex - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="c-btn c-btn--next"
          id="c-next"
          aria-label="Next courses"
          onClick={() => goTo(currentIndex + 1)}
        >
          ›
        </button>
        <div className="c-dots" id="c-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
