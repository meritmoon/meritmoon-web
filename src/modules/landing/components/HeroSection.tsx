import React, { useEffect, useRef } from "react";
import { FallingLeaves } from "./FallingLeaves";
import { HeroMoonThree } from "./HeroMoonThree";
import { Button, ButtonVariants, ComponentSizes } from "../../../design";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface IHeroSectionProps {
  mode?: LandingMode;
}

export const HeroSection: React.FC<IHeroSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  const moonRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax scroll on hero moon
    const handleScroll = () => {
      if (!moonRef.current) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        moonRef.current.style.transform = `translateY(${y * 0.08}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Eye follow cursor
    const handleMouseMove = (e: MouseEvent) => {
      const face = faceRef.current;
      if (!face) return;
      const r = face.getBoundingClientRect();
      const fcx = r.left + r.width / 2;
      const fcy = r.top + r.height / 2;
      const dx = e.clientX - fcx;
      const dy = e.clientY - fcy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 2.0;
      const mx = dist > 0 ? (dx / dist) * Math.min(dist * 0.03, max) : 0;
      const my = dist > 0 ? (dy / dist) * Math.min(dist * 0.03, max) : 0;
      face.querySelectorAll<HTMLElement>(".mm-eye").forEach((eye) => {
        eye.style.transform = `translate(${mx}px, ${my}px)`;
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Periodic gentle blink
    let blinkTimeout: number;
    const scheduleBlink = () => {
      blinkTimeout = window.setTimeout(() => {
        const face = faceRef.current;
        if (face) {
          face.querySelectorAll<HTMLElement>(".mm-eye").forEach((eye) => {
            eye.style.transform = `${eye.style.transform || ""} scaleY(0.08)`;
            setTimeout(() => {
              eye.style.transform = eye.style.transform.replace(" scaleY(0.08)", "");
            }, 120);
          });
        }
        scheduleBlink();
      }, 3200 + Math.random() * 4500);
    };
    scheduleBlink();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(blinkTimeout);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="grass-field" />
      <FallingLeaves />
      <div className="ground-mist" />

      <div className="hero__stage">
        <div className="hero__content">
          <p className="hero__kicker vis">
            Deep in the forest. <br className="mobile-only" /> Beneath the mindful moon.
          </p>
          <h1 className="hero__headline">
            <span className="hero__hl-line vis">A Mind That Hurts Less.</span>
            <span className="hero__hl-line hero__hl-grad vis">
              A Heart That Loves More.
            </span>
          </h1>
          <p className="hero__body vis">
            The discipline-first meditation platform.
            <br />
            Practice meditation techniques that are thousands of years old.
            <br />
            Real practice. Real transformation.
            <br />
            Pay with either discipline or devotion.
          </p>
          <div className="hero__cta-row vis">
            <Button
              variant={ButtonVariants.PRIMARY}
              size={ComponentSizes.MD}
              href={config.heroCta.href}
              id="hero-cta-primary"
              leaf={config.heroCta.leaf}
            >
              {config.heroCta.text}
            </Button>
            <Button
              variant={ButtonVariants.SECONDARY}
              size={ComponentSizes.MD}
              href="#how"
            >
              See How It Works
            </Button>
          </div>
          <div className="hero__proof vis" id="hero-proof-pills">
            {config.heroProofPills.map((pill, idx) => (
              <div className="proof-pill" key={idx}>
                <span
                  className={`proof-dot ${pill.isGold ? "proof-dot--gold" : ""}`}
                />
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero-moon-wrap" ref={moonRef}>
            <div className="hero-moon" id="hero-moon">
              <HeroMoonThree />
              <div className="hero-moon__surface" />
              <div className="mm-face hero-mm-face" ref={faceRef}>
                <div className="mm-eye mm-eye--l" />
                <div className="mm-eye mm-eye--r" />
                <div className="mm-smile" />
                <div className="mm-blush mm-blush--l" />
                <div className="mm-blush mm-blush--r" />
              </div>
              <div className="hero-moon__ring r1" />
              <div className="hero-moon__ring r2" />
              <div className="hero-moon__ring r3" />
            </div>
            <div className="moon-pool-reflection" />
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <div className="scroll-stem" />
        <span>step into the quiet</span>
      </div>
    </section>
  );
};

export default HeroSection;
