import React, { useEffect, useState } from "react";
import "../styles/landing.css";
import {
  ForestCanvas,
  AmbientMesh,
  Fireflies,
  LandingNav,
  HeroSection,
  TickerSection,
  PromiseSection,
  HowSection,
  CoursesSection,
  AboutSection,
  MeritSection,
  MindsetSection,
  VoicesSection,
  FaqSection,
  CtaSection,
  LandingFooter,
  CustomCursor,
  useButtonFireflies,
} from "../components";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface ILandingPageProps {
  hideEnter?: boolean;
}

export const LandingPage: React.FC<ILandingPageProps> = ({ hideEnter }) => {
  const [activeSection, setActiveSection] = useState("#hero");
  const mode: LandingMode = LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[mode] || LANDING_CONFIG.waitlist;

  useEffect(() => {
    // Document title matching active site mode
    document.title = config.title;

    // Track active navigation section on scroll
    const sections = ["hero", "promise", "how", "courses", "merit", "voices", "faq", "download"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Interactive card hover glow based on cursor position (cached bounds to avoid layout thrashing)
    const cardSelector = ".ccard, .pcard, .tcard, .mcard, .mtile, .dana-block, .forest-stats";
    const cards = document.querySelectorAll<HTMLElement>(cardSelector);
    const cardBounds = new WeakMap<HTMLElement, DOMRect>();

    const handleCardMouseEnter = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      cardBounds.set(card, card.getBoundingClientRect());
    };

    const handleCardMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      let rect = cardBounds.get(card);
      if (!rect) {
        rect = card.getBoundingClientRect();
        cardBounds.set(card, rect);
      }
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pctX = ((x / rect.width) * 100).toFixed(1);
      const pctY = ((y / rect.height) * 100).toFixed(1);
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.background = `
        radial-gradient(circle at ${pctX}% ${pctY}%, rgba(77, 191, 130, 0.08) 0%, transparent 55%),
        var(--bg-glass-card-hover)
      `;
    };

    const handleCardMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      cardBounds.delete(card);
      card.style.background = "";
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleCardMouseEnter as EventListener, { passive: true });
      card.addEventListener("mousemove", handleCardMouseMove as EventListener, { passive: true });
      card.addEventListener("mouseleave", handleCardMouseLeave as EventListener, { passive: true });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleCardMouseEnter as EventListener);
        card.removeEventListener("mousemove", handleCardMouseMove as EventListener);
        card.removeEventListener("mouseleave", handleCardMouseLeave as EventListener);
      });
    };
  }, []);

  // Mindful CTA Button Fireflies (wandering and gently dispersing)
  useButtonFireflies();

  return (
    <div className="meritmoon-landing-root relative min-h-screen bg-[#020A05] text-[#F4FAF0] font-sans selection:bg-[#2E8B57]/30 selection:text-[#E8F0E0]">
      <CustomCursor />
      <ForestCanvas />
      <AmbientMesh />
      <Fireflies />
      <LandingNav
        activeSection={activeSection}
        onSectionClick={(href) => setActiveSection(href)}
        hideEnter={hideEnter}
        mode={mode}
      />
      <main>
        <HeroSection mode={mode} />
        <TickerSection mode={mode} />
        <PromiseSection mode={mode} />
        <HowSection />
        <CoursesSection mode={mode} />
        <AboutSection />
        <MeritSection mode={mode} />
        <MindsetSection />
        <VoicesSection mode={mode} />
        <FaqSection />
        <CtaSection mode={mode} />
      </main>
      <LandingFooter mode={mode} />
    </div>
  );
};

export default LandingPage;
