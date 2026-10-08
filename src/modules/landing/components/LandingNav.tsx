import React, { useState, useEffect } from "react";
import { icons } from "../../../assets";
import { useAuth } from "../../../contexts";
import AppRoutes from "../../../AppRoutes";
import { Button, ButtonVariants, ComponentSizes } from "../../../design";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface ILandingNavProps {
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
  hideEnter?: boolean;
  mode?: LandingMode;
}

export const LandingNav: React.FC<ILandingNavProps> = ({
  activeSection = "#hero",
  onSectionClick,
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Our Heart", href: "#promise" },
    { label: "How It Works", href: "#how" },
    { label: "Courses", href: "#courses" },
    { label: "Choose Your Path", href: "#merit" },
    { label: "Stories", href: "#voices" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    if (onSectionClick) {
      onSectionClick(href);
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
      <div className="nav__inner">
        <a
          href="#hero"
          className="nav__logo"
          onClick={(e) => handleLinkClick(e, "#hero")}
        >
          <div className="moon-mascot moon-mascot--nav" id="nav-moon">
            <img src={icons.mascot.src} alt="MeritMoon" />
          </div>
          <div className="nav__wordmark">
            <span className="nav__name">MeritMoon</span>
            <span className="nav__tagline-tiny">
              Breathe. Earn. Transcend.
            </span>
          </div>
        </a>

        <ul className={`nav__links ${isOpen ? "open" : ""}`} id="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href ? "active" : ""}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          {activeMode === "live" && isAuthenticated ? (
            <li>
              <Button
                to={AppRoutes.client.protected.HOME}
                size={ComponentSizes.SM}
                variant={ButtonVariants.PRIMARY}
                className="nav__pill"
                id="nav-cta"
              >
                Open App
              </Button>
            </li>
          ) : (
            <li>
              <Button
                href={config.navCta.href}
                size={ComponentSizes.SM}
                variant={ButtonVariants.PRIMARY}
                className="nav__pill"
                id="nav-cta"
                onClick={(e) => handleLinkClick(e as any, config.navCta.href)}
              >
                {config.navCta.text}
              </Button>
            </li>
          )}
        </ul>

        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default LandingNav;
