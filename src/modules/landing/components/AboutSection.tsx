import React from "react";
import { icons } from "../../../assets";

export const AboutSection: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__visual">
          <div className="about__moon-scene">
            <div className="about__big-moon">
              <img
                src={icons.mascotMeditating.src}
                alt="MeritMoon Meditating"
                className="about__moon-img"
              />
              <div className="about__moon-ring ar1" />
              <div className="about__moon-ring ar2" />
            </div>
            <div className="about__meditator">
              <svg
                viewBox="0 0 120 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="160"
                aria-hidden="true"
              >
                <ellipse
                  cx="60"
                  cy="92"
                  rx="40"
                  ry="6"
                  fill="url(#about-sg)"
                  opacity="0.3"
                />
                <circle cx="60" cy="22" r="10" fill="url(#about-sg2)" />
                <path
                  d="M50 32 Q60 28 70 32 L75 52 Q60 58 45 52 Z"
                  fill="url(#about-sg2)"
                />
                <path
                  d="M45 52 Q35 58 28 72 Q36 72 45 66 Z"
                  fill="url(#about-sg2)"
                  opacity="0.8"
                />
                <path
                  d="M75 52 Q85 58 92 72 Q84 72 75 66 Z"
                  fill="url(#about-sg2)"
                  opacity="0.8"
                />
                <ellipse
                  cx="60"
                  cy="78"
                  rx="28"
                  ry="12"
                  fill="url(#about-sg2)"
                  opacity="0.9"
                />
                <defs>
                  <linearGradient id="about-sg" x1="0" y1="0" x2="120" y2="0">
                    <stop offset="0%" stopColor="#C8D8C0" />
                    <stop offset="100%" stopColor="#2E8B57" />
                  </linearGradient>
                  <linearGradient id="about-sg2" x1="0" y1="0" x2="120" y2="100">
                    <stop offset="0%" stopColor="#8B92A0" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#2A7054" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="about__ground-glow" />
          </div>
        </div>

        <div className="about__words">
          <div className="eyebrow">Who Built This</div>
          <h2 className="section-title">
            We sat in the forest
            <br />
            and built <span className="grad-text">MeritMoon</span>.
          </h2>
          <p>
            MeritMoon was never created for endless subscriptions or temporary
            comfort. It was born from a sincere frustration with meditation
            products that offer momentary relief by escaping the reality, yet
            rarely help people deeply understand or transform the mind itself.
          </p>
          <p>
            The practices in MeritMoon have been preserved and refined by
            devoted teachers and monastics for thousands of years. They endure
            not because they are trendy, but because they meet the mind with
            depth, honesty, and care — at the roots of suffering, clarity, and
            peace.
          </p>
          <p>
            Our role is simply to offer these teachings with integrity and
            respect: making them available to anyone willing to practice
            sincerely through a subscription-supported learning platform. Every
            membership helps us continue creating new courses while enabling
            MeritMoon to support the teachers and trusted meditation
            organizations that preserve these timeless traditions.
          </p>
          <p>
            Real transformation comes from your practice, your patience, and
            your consistency. The path itself does the work. We are only here to
            help light the way.
          </p>
          <div className="about__pillars">
            <div className="apillar">
              <span>🌿</span>
              <span>No ads, ever</span>
            </div>
            <div className="apillar">
              <span>☽</span>
              <span>Lineage-rooted courses</span>
            </div>
            <div className="apillar">
              <span>🌿</span>
              <span>Built by practitioners, for you</span>
            </div>
            <div className="apillar">
              <span>☽</span>
              <span>Your data is yours</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
