import React, { useEffect, useRef, useState } from "react";
import { icons } from "../../../assets";
import { LANDING_CONFIG, LandingMode } from "../constants";

interface CounterStatProps {
  target: number;
  suffix?: string;
  label: string;
}

const CounterStat: React.FC<CounterStatProps> = ({ target, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const start = performance.now();
            const dur = 2000;
            const step = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const easeOut = 1 - Math.pow(1 - p, 4);
              setCount(Math.floor(easeOut * target));
              if (p < 1) requestAnimationFrame(step);
              else setCount(target);
            };
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="fstat" ref={ref}>
      <span className="fstat__num">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="fstat__label">{label}</span>
    </div>
  );
};

export interface IPromiseSectionProps {
  mode?: LandingMode;
}

export const PromiseSection: React.FC<IPromiseSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;

  return (
    <section className="promise" id="promise">
      <div className="container">
        <div className="eyebrow">Our Heart to You</div>
        <h2 className="section-title">
          We want you to be
          <br />
          genuinely <em>well</em>.
          <br />
          <span className="grad-text">Not just calmer.</span>
        </h2>
        <p className="section-body">
          There are many ways to feel better for a moment. MeritMoon is
          interested in something deeper — a mind so clear and a heart so open
          that the people around you feel it too. That kind of change doesn't
          come from passive listening. It comes from sitting down, day after day,
          with patience and love for yourself.
        </p>

        <div className="promise__cards">
          <div className="pcard">
            <div className="pcard__icon">
              <div className="leaf-icon">🌿</div>
            </div>
            <h3>Show up for yourself. Receive everything.</h3>
            <p>
              Every course on MeritMoon is completely free — not as a trick,
              not with hidden conditions. Just a simple, loving agreement: sit
              with us every day, and we'll give you everything we have. You
              deserve that.
            </p>
            <div className="pcard__bar" />
          </div>

          <div className="pcard pcard--lit">
            <div className="pcard__icon">
              <div className="pcard__top">
                <div className="moon-mascot moon-mascot--card">
                  <img src={icons.mascot.src} alt="MeritMoon" />
                </div>
                <div className="pcard__badge">Our Deepest Promise</div>
              </div>
            </div>
            <h3>What you earn with discipline is yours forever.</h3>
            <p>
              Complete a course without breaking your streak and it unlocks
              permanently — no re-purchase, no expiry, no conditions. It
              belongs to you. Because real growth, honestly earned, should never
              be taken away.
            </p>
            <div className="pcard__bar" />
          </div>

          <div className="pcard">
            <div className="pcard__icon">
              <div className="moon-icon-simple" />
            </div>
            <h3>Your Discipline is the currency. Nothing else.</h3>
            <p>
              Miss a day and the course begins again from Day 1. We say this
              gently but honestly: a mind truly worth having is built by
              unbroken care — the way a forest grows, ring by ring, night by
              night.
            </p>
            <div className="pcard__bar" />
          </div>
        </div>

        <div className="forest-stats" id="forest-stats">
          {config.forestStats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="fstat__div">✦</div>}
              <CounterStat
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;
