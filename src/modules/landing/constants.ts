// src/modules/landing/constants.ts
// ==============================================================================
// 🏛️ MeritMoon Landing Configuration & Constants (Law U14 & Law U15)
// ==============================================================================
// Clean, organized source of truth for both 'waitlist' and 'live' versions.
// One-Word Swappable Mode: 'waitlist' | 'live'
// All statistics, proof pills, ticker messages, course metrics, and testimonials
// are synthesized from normalized domain data entities (src/modules/landing/data/).
// ==============================================================================

import {
  LandingMode,
  IStoreLinks,
  ILandingCtaConfig,
  IProofPill,
  IForestStat,
  IDanaStat,
  ICourseMeter,
  ITestimonial,
  ILandingModeConfig,
  ILandingConfig,
} from "./types";
import {
  LANDING_COURSES,
  LANDING_TESTIMONIALS,
  WAITLIST_PLATFORM_METRICS,
  LIVE_PLATFORM_METRICS,
  WAITLIST_PROOF_PILLS,
  LIVE_PROOF_PILLS,
  WAITLIST_TICKER_ITEMS,
  LIVE_TICKER_ITEMS,
} from "./data";
import {
  buildForestStats,
  buildDanaStats,
  resolveCourseMeter,
  resolveTestimonialMeta,
} from "./helpers";

export type {
  LandingMode,
  IStoreLinks,
  ILandingCtaConfig,
  IProofPill,
  IForestStat,
  IDanaStat,
  ICourseMeter,
  ITestimonial,
  ILandingModeConfig,
  ILandingConfig,
};

export const STORE_LINKS: IStoreLinks = {
  APP_STORE: "https://apps.apple.com/app/meritmoon",
  GOOGLE_PLAY:
    "https://play.google.com/store/apps/details?id=com.meritmoon.app",
} as const;

export const FORMSPREE_WAITLIST_URL = "https://formspree.io/f/xeaoowbb";

/**
 * Builds the course meters lookup dictionary for a given mode from normalized courses.
 */
const buildCourseMeters = (mode: LandingMode): Record<string, ICourseMeter> => {
  const result: Record<string, ICourseMeter> = {};
  for (const course of LANDING_COURSES) {
    result[course.id] = resolveCourseMeter(course, mode);
  }
  return result;
};

/**
 * Builds formatted testimonials for a given mode from normalized testimonials.
 */
const buildTestimonials = (mode: LandingMode): ITestimonial[] => {
  return LANDING_TESTIMONIALS.map((t) => ({
    id: t.id,
    quote: t.quote,
    author: t.author,
    meta: resolveTestimonialMeta(t, mode),
    avatarClass: t.avatarClass,
  }));
};

export const LANDING_CONFIG: ILandingConfig = {
  // 🌿 ONE WORD SWAPPABLE MODE: 'waitlist' | 'live'
  mode: "live",

  storeLinks: STORE_LINKS,
  waitlistFormUrl: FORMSPREE_WAITLIST_URL,

  waitlist: {
    title:
      "MeritMoon — A Kinder Mind Changes Everything | Founding Waitlist Open",
    navCta: { text: "Join Waitlist", href: "#download" },
    heroCta: { text: "Join Waitlist", href: "#download", leaf: "🌿" },
    heroProofPills: [...WAITLIST_PROOF_PILLS],
    tickerItems: [...WAITLIST_TICKER_ITEMS],
    forestStats: buildForestStats(WAITLIST_PLATFORM_METRICS, "waitlist"),
    courseMeters: buildCourseMeters("waitlist"),
    danaStats: buildDanaStats(WAITLIST_PLATFORM_METRICS, "waitlist"),
    testimonials: buildTestimonials("waitlist"),
    freeCta: { text: "Join Waitlist", href: "#download" },
    paidCta: { text: "Join Waitlist", href: "#download", leaf: "☽" },
    ctaBody:
      "MeritMoon is arriving soon. Join our waiting list to be the first to practice with us when the moon rises.\nShall we begin?",
  },

  live: {
    title:
      "MeritMoon — A Kinder Mind Changes Everything | Discipline-First Meditation",
    navCta: { text: "Begin", href: "#download" },
    heroCta: { text: "Begin — It's Free", href: "#download", leaf: "🌿" },
    heroProofPills: [...LIVE_PROOF_PILLS],
    tickerItems: [...LIVE_TICKER_ITEMS],
    forestStats: buildForestStats(LIVE_PLATFORM_METRICS, "live"),
    courseMeters: buildCourseMeters("live"),
    danaStats: buildDanaStats(LIVE_PLATFORM_METRICS, "live"),
    testimonials: buildTestimonials("live"),
    freeCta: { text: "Begin the Forest Path", href: "#download" },
    paidCta: { text: "Begin the Moonlit Path", href: "#download", leaf: "☽" },
    ctaBody:
      "MeritMoon is waiting for you — not to fix you, not to optimise you, but simply to hold your hand along the journey.\nShall we begin?",
  },
};

export const getActiveLandingConfig = (): ILandingModeConfig => {
  return LANDING_CONFIG[LANDING_CONFIG.mode] || LANDING_CONFIG.waitlist;
};
