// src/modules/landing/components/LegalLayout.tsx

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { icons } from "../../../assets";
import AppRoutes from "../../../AppRoutes";
import {
  Asset,
  Button,
  ButtonVariants,
  ComponentSizes,
  TextLink,
} from "../../../design";
import { LandingFooter } from "./LandingFooter";
import { CustomCursor } from "./CustomCursor";

export interface ILegalTocItem {
  id: string;
  label: string;
}

export interface ILegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  tableOfContents: ILegalTocItem[];
  children: React.ReactNode;
}

export const LegalLayout: React.FC<ILegalLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  tableOfContents,
  children,
}) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");

  const isPrivacy =
    location.pathname === AppRoutes.client.public.PRIVACY_POLICY;
  const isTerms =
    location.pathname === AppRoutes.client.public.TERMS_AND_CONDITIONS;

  // Track active section for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          return;
        }
      }
      if (tableOfContents.length > 0) {
        setActiveSection(tableOfContents[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      data-page="legal"
      className="min-h-screen w-full bg-[#020A05] text-[#F4FAF0] font-sans selection:bg-[#2E8B57]/30 selection:text-[#E8F0E0] relative"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 50% 0%, rgba(14, 46, 26, 0.45) 0%, rgba(2, 10, 5, 0.98) 75%)",
      }}
    >
      <CustomCursor />

      {/* Top Mindful Forest Header */}
      <header className="sticky top-0 z-50 w-full bg-[#020A05]/85 backdrop-blur-xl border-b border-[#c8d8c0]/12 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Brand Logo & Back to Root */}
          <TextLink
            to={AppRoutes.client.public.ROOT}
            className="flex items-center gap-3 no-underline select-none group text-white! hover:no-underline"
            aria-label="Return to MeritMoon Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0d2616] border border-[#c8d8c0]/30 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_12px_rgba(77,191,130,0.3)]">
              <Asset asset={icons.mascot} className="w-7 h-7 object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#F4FAF0]">
                MeritMoon
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#2E8B57]/20 text-[#7DDE92] border border-[#2E8B57]/40">
                Legal
              </span>
            </div>
          </TextLink>

          {/* Center Document Switcher Tabs */}
          <nav
            aria-label="Legal Documents"
            className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-[#081a0e]/70 border border-[#c8d8c0]/15 backdrop-blur-md text-xs sm:text-sm font-medium"
          >
            <TextLink
              to={AppRoutes.client.public.PRIVACY_POLICY}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 hover:no-underline cursor-pointer ${
                isPrivacy
                  ? "bg-[#2E8B57] text-[#020A05] font-bold shadow-[0_0_12px_rgba(46,139,87,0.5)]"
                  : "text-[#C8D8C0]/75 hover:text-white"
              }`}
            >
              Privacy Policy
            </TextLink>
            <TextLink
              to={AppRoutes.client.public.TERMS_AND_CONDITIONS}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 hover:no-underline cursor-pointer ${
                isTerms
                  ? "bg-[#2E8B57] text-[#020A05] font-bold shadow-[0_0_12px_rgba(46,139,87,0.5)]"
                  : "text-[#C8D8C0]/75 hover:text-white"
              }`}
            >
              Terms &amp; Conditions
            </TextLink>
          </nav>

          {/* Right Action: Return to App */}
          <div className="flex items-center gap-2">
            <Button
              to={AppRoutes.client.public.ROOT}
              variant={ButtonVariants.PRIMARY}
              size={ComponentSizes.SM}
            >
              Back to Home
            </Button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Tabs */}
        <div className="sm:hidden flex border-t border-[#c8d8c0]/12 bg-[#041208]/90 px-4 py-2 justify-center gap-2 text-xs font-medium">
          <TextLink
            to={AppRoutes.client.public.PRIVACY_POLICY}
            className={`px-3 py-1 rounded-full transition-all duration-300 hover:no-underline cursor-pointer ${
              isPrivacy
                ? "bg-[#2E8B57] text-[#020A05] font-bold shadow-[0_0_8px_rgba(46,139,87,0.5)]"
                : "text-[#C8D8C0]/75 hover:text-white"
            }`}
          >
            Privacy Policy
          </TextLink>
          <TextLink
            to={AppRoutes.client.public.TERMS_AND_CONDITIONS}
            className={`px-3 py-1 rounded-full transition-all duration-300 hover:no-underline cursor-pointer ${
              isTerms
                ? "bg-[#2E8B57] text-[#020A05] font-bold shadow-[0_0_8px_rgba(46,139,87,0.5)]"
                : "text-[#C8D8C0]/75 hover:text-white"
            }`}
          >
            Terms &amp; Conditions
          </TextLink>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 space-y-12">
        {/* Document Header Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E8B57]/15 border border-[#2E8B57]/30 text-xs font-mono font-medium text-[#7DDE92]">
            <span>{lastUpdated}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F4FAF0]">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[#C8D8C0]/85 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Two-Column Grid: TOC + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Sticky Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
              <div className="p-5 rounded-2xl bg-[#041208]/75 border border-[#c8d8c0]/15 backdrop-blur-md space-y-4 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                <div className="border-b border-[#c8d8c0]/12 pb-3 flex items-center justify-between">
                  <h2 className="font-serif text-sm font-bold tracking-wider text-[#F4FAF0] uppercase">
                    Table of Contents
                  </h2>
                  <span className="text-xs text-[#C8D8C0]/50 font-mono">
                    {tableOfContents.length} Sections
                  </span>
                </div>

                <nav aria-label="Table of contents" className="space-y-1">
                  {tableOfContents.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, item.id)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-[#2E8B57]/20 text-[#7DDE92] border-l-2 border-[#2E8B57] font-semibold shadow-[0_0_12px_rgba(46,139,87,0.2)]"
                            : "text-[#C8D8C0]/65 hover:text-[#F4FAF0] hover:bg-[#081a0e]/40"
                        }`}
                      >
                        <span
                          className={`font-mono text-xs w-5 text-right shrink-0 ${
                            isActive
                              ? "text-[#7DDE92] font-bold"
                              : "text-[#C8D8C0]/40 group-hover:text-[#C8D8C0]/70"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="pt-3 border-t border-[#c8d8c0]/12 text-xs text-[#C8D8C0]/50 space-y-2">
                  <p>Questions or legal inquiries?</p>
                  <a
                    href="mailto:legal@meritmoon.com"
                    className="inline-flex items-center gap-1.5 text-[#7DDE92] hover:underline font-semibold"
                  >
                    <span>legal@meritmoon.com</span>
                  </a>
                </div>
              </div>
            </aside>
          )}

          {/* Legal Document Content Card */}
          <article
            className={`w-full ${
              tableOfContents.length > 0 ? "lg:col-span-8" : "lg:col-span-12"
            } p-6 sm:p-10 rounded-2xl bg-[#041208]/75 border border-[#c8d8c0]/15 backdrop-blur-md space-y-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] leading-relaxed text-[#E0EBE0]`}
          >
            {children}
          </article>
        </div>

        {/* Unified Footer Component (Source of Truth) */}
        <LandingFooter
          activePage={isPrivacy ? "privacy" : isTerms ? "terms" : undefined}
        />
      </main>
    </div>
  );
};

export default LegalLayout;
