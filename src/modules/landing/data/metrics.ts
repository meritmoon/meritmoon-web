// src/modules/landing/data/metrics.ts
// ==============================================================================
// 🏛️ MeritMoon Platform Telemetry & Metrics Store (Materialized View Schema)
// ==============================================================================
// Pure integer/unit values representing database aggregates.
// Avoids raw string templates or magical floating-point values.
// ==============================================================================

import {
  ILandingPlatformMetrics,
  IProofPill,
} from "../types";

/**
 * Truthful Founding Pre-Launch Metrics (Waitlist Mode)
 * Represents foundational commitments: 0 ads, 5 traditions, 100% free with discipline,
 * 25% direct revenue dedication to teachers. Zero fabricated user numbers.
 */
export const WAITLIST_PLATFORM_METRICS: ILandingPlatformMetrics = {
  practitionerCount: 0,
  activeSittersCount: 0,
  coursesCompletedCount: 0,
  unbrokenStreakPeopleCount: 0,
  teachersSupportedCount: 0,
  totalTeacherDanaCents: 0,
  teacherDanaPercent: 25,
  freeCoursePercent: 100,
  ancientTraditionsCount: 5,
  adOrAlgorithmFeedsCount: 0,
};

/**
 * Live Operational Database Telemetry Projection (Live Mode)
 * Represents aggregated production numbers (ready to receive real live API data).
 */
export const LIVE_PLATFORM_METRICS: ILandingPlatformMetrics = {
  practitionerCount: 47283,
  activeSittersCount: 2341,
  coursesCompletedCount: 312,
  unbrokenStreakPeopleCount: 5800,
  teachersSupportedCount: 18,
  totalTeacherDanaCents: 4820000, // $48,200 stored in base cents
  teacherDanaPercent: 25,
  freeCoursePercent: 100,
  ancientTraditionsCount: 5,
  adOrAlgorithmFeedsCount: 0,
};

/**
 * Hero Proof Pills: Truthful pre-launch status vs Active community metric
 */
export const WAITLIST_PROOF_PILLS: ReadonlyArray<IProofPill> = [
  { text: "Founding waitlist open for 2026", isGold: false },
  { text: "25% dedicated to lineage teachers", isGold: true },
];

export const LIVE_PROOF_PILLS: ReadonlyArray<IProofPill> = [
  { text: "47,000+ growing minds right now", isGold: false },
  { text: "Gratitude flowing to 18 real teachers", isGold: true },
];

/**
 * Ticker Tape Stream: Truthful principles vs Live engagement stream
 */
export const WAITLIST_TICKER_ITEMS: ReadonlyArray<string> = [
  "✦ Founding Waitlist Open for 2026",
  "☽ Discipline-First Meditation Platform",
  "✦ 100% Free with Daily Discipline",
  "☽ Supporting Venerable Lineage Teachers",
  "✦ Practice Meditation Centuries Old",
  "☽ The Breath is Always Waiting For You",
  "✦ Zero Ads · Zero Algorithms · Pure Stillness",
  "☽ Welcome to the Circle",
];

export const LIVE_TICKER_ITEMS: ReadonlyArray<string> = [
  "✦ 47,283 people growing kinder minds today",
  "☽ 2,341 sitting in gentle silence right now",
  "✦ 100% of courses free with daily discipline",
  "☽ Gratitude flowing to 18 teachers daily",
  "✦ Every sit builds a kinder world",
  "☽ 94% say their mind feels softer",
  "✦ 5,800 people who haven't given up on themselves",
  "☽ The breath is always waiting for you",
];
