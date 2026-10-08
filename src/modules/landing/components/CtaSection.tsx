import React from "react";
import { STORE_LINKS, LANDING_CONFIG, LandingMode } from "../constants";
import { WaitlistForm } from "./WaitlistForm";

export interface ICtaSectionProps {
  mode?: LandingMode;
}

export const CtaSection: React.FC<ICtaSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  const isWaitlist = activeMode === "waitlist";

  return (
    <section className="cta-section" id="download">
      <div className="cta-grass-field" />
      <div className="cta-moon-scene">
        <div className="cta-moon">
          <div className="cta-moon__ring cr1" />
          <div className="cta-moon__ring cr2" />
          <div className="cta-moon__ring cr3" />
        </div>
        <div className="cta-moonbeam-pool" />
      </div>

      <div className="container cta-content">
        <div className="eyebrow" id="cta-eyebrow">
          The Moon awaits you
        </div>
        <h2 className="section-title" id="cta-title">
          Close your eyes.
          <br />
          Take a deep breath.
          <br />
          <span className="grad-text">You are already enough.</span>
        </h2>
        <p className="section-body" id="cta-body" style={{ whiteSpace: "pre-line" }}>
          {config.ctaBody}
        </p>

        {isWaitlist ? (
          <WaitlistForm />
        ) : (
          <div className="cta-stores" id="cta-stores">
            <a
              href={STORE_LINKS.APP_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
              id="cta-store-apple"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>
            <a
              href={STORE_LINKS.GOOGLE_PLAY}
              target="_blank"
              rel="noopener noreferrer"
              className="store-btn"
              id="cta-store-google"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3.18 23.76a2.5 2.5 0 0 0 2.73-.3l13.05-7.53-3.36-3.36-12.42 11.19zm-1.7-20.2C1.18 3.97 1 4.5 1 5.1v13.8c0 .6.18 1.13.48 1.54l.08.08L9.3 12.5v-.17L1.56 3.48l-.08.08zM20.49 10.8l-2.79-1.6-3.14 3.14 3.14 3.14 2.81-1.62a2.5 2.5 0 0 0 0-4.06zM3.18.24L16.23 7.77l-3.36 3.36L.53.54A2.5 2.5 0 0 1 3.18.24z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        )}

        <p className="cta-whisper">Free to begin. Forever to keep. Merit to Earn.</p>
      </div>
    </section>
  );
};

export default CtaSection;
