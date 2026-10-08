import React from "react";
import { Link } from "react-router-dom";
import { icons } from "../../../assets";
import AppRoutes from "../../../AppRoutes";
import { STORE_LINKS, LANDING_CONFIG, LandingMode } from "../constants";

export interface LandingFooterProps {
  activePage?: string;
  mode?: LandingMode;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const isWaitlist = (mode || LANDING_CONFIG.mode) === "waitlist";

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="moon-mascot moon-mascot--footer">
            <img src={icons.mascot.src} alt="MeritMoon" />
          </div>
          <span className="footer__name">MeritMoon</span>
          <p className="footer__sub">Discipline. Clarity. Transformation.</p>
          <p className="footer__dhamma">
            "As moonlight falls on every tree without choosing — may the merit
            of practice reach all beings."
          </p>
        </div>
        <div className="footer__nav">
          <div className="fcol">
            <h4>Practice</h4>
            <a href="#courses">All Courses</a>
            <a href="#promise">How Streaks Work</a>
            <a href="#about">Our Teachers</a>
            <a href="#how">The Traditions</a>
          </div>
          <div className="fcol">
            <h4>Choose Your Path</h4>
            <a href="#merit">How We Support Teachers</a>
            <a href="#merit">Supported Teachers</a>
            <a href="#merit">The Moonlit Path</a>
            <a href="#voices">Gratitude Dedication</a>
          </div>
          <div className="fcol">
            <h4>Community</h4>
            <a href="#voices">Practitioner Circle</a>
            <a href="#about">Retreat Directory</a>
            <a href="#download">Ask a Teacher</a>
            <a href="#download">Open Forum</a>
          </div>
          <div className="fcol">
            <h4>Company</h4>
            <a href="#about">Our Story</a>
            <a href="#about">Why We Built This</a>
            <Link to={AppRoutes.client.public.PRIVACY_POLICY}>Privacy Policy</Link>
            <Link to={AppRoutes.client.public.TERMS_AND_CONDITIONS}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>
          © 2026 MeritMoon. Built with love. All merit offered to all beings,
          everywhere.
        </p>
        <div className="footer__app-links">
          <a
            href={isWaitlist ? "#download" : STORE_LINKS.APP_STORE}
            target={isWaitlist ? undefined : "_blank"}
            rel={isWaitlist ? undefined : "noopener noreferrer"}
            id="footer-link-apple"
          >
            App Store
          </a>
          <a
            href={isWaitlist ? "#download" : STORE_LINKS.GOOGLE_PLAY}
            target={isWaitlist ? undefined : "_blank"}
            rel={isWaitlist ? undefined : "noopener noreferrer"}
            id="footer-link-google"
          >
            Google Play
          </a>
          <Link to={AppRoutes.client.public.PRIVACY_POLICY}>Privacy Policy</Link>
          <Link to={AppRoutes.client.public.TERMS_AND_CONDITIONS}>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
