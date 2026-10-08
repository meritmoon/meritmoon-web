// src/modules/landing/types/data.types.ts
// ==============================================================================
// 🏛️ MeritMoon Landing Domain Data Contracts & Schema (Law U14 & Law U15)
// ==============================================================================
// Designed with Data Analyst & Database Schema normalization principles.
// Bridges static pre-launch waitlist baselines with live database telemetry.
// ==============================================================================

export type LandingMode = "waitlist" | "live";

export interface IStoreLinks {
  readonly APP_STORE: string;
  readonly GOOGLE_PLAY: string;
}

export interface ILandingCtaConfig {
  readonly text: string;
  readonly href: string;
  readonly leaf?: string;
}

export interface IProofPill {
  readonly text: string;
  readonly isGold?: boolean;
}

export interface IForestStat {
  readonly target: number;
  readonly suffix?: string;
  readonly label: string;
}

export interface IDanaStat {
  readonly number: string;
  readonly label: string;
}

// ------------------------------------------------------------------------------
// Course Entity Schema (Mirrors backend 'courses' table + completion analytics)
// ------------------------------------------------------------------------------
export interface ICourseEntity {
  readonly id: string;
  readonly slug: string;
  readonly level: string;
  readonly title: string;
  readonly subtitle: string;
  readonly body: string;
  readonly tradition: "Theravada" | "Zen" | "Vipassana" | "Brahma-vihara";
  readonly durationDays: number;
  readonly isFreeWithStreak: boolean;
  readonly isFeatured?: boolean;
  readonly mascotVariant: "meditating" | "joyful";
  readonly tags: ReadonlyArray<{ readonly text: string; readonly isPremium?: boolean }>;

  // Analytics Meters: Waitlist curriculum descriptor vs Live cohort telemetry
  readonly waitlistMetric: {
    readonly pct: number;
    readonly text: string;
  };
  readonly liveMetric: {
    readonly completionRatePct: number;
    readonly text: string;
  };
}

// ------------------------------------------------------------------------------
// Testimonial Entity Schema (Mirrors backend 'feedbacks' table + practitioner metadata)
// ------------------------------------------------------------------------------
export interface ITestimonialEntity {
  readonly id: string;
  readonly author: string;
  readonly avatarClass: string;
  readonly quote: string;

  // Waitlist Founding meta vs Live Verified Streak Telemetry
  readonly waitlistMeta: string;
  readonly liveMeta: {
    readonly streakDays: number;
    readonly tier: "forest" | "moonlit";
    readonly summary: string;
  };
}

// ------------------------------------------------------------------------------
// Platform Telemetry Aggregates (Denormalized Materialized View Contract)
// ------------------------------------------------------------------------------
export interface ILandingPlatformMetrics {
  // Aggregate Practitioner Counts
  readonly practitionerCount: number;
  readonly activeSittersCount: number;
  readonly coursesCompletedCount: number;
  readonly unbrokenStreakPeopleCount: number;

  // Dāna & Teacher Support Financials (Integer units: Cents / Percentages)
  readonly teachersSupportedCount: number;
  readonly totalTeacherDanaCents: number;
  readonly teacherDanaPercent: number; // e.g. 25
  readonly freeCoursePercent: number; // e.g. 100

  // Educational & Structural
  readonly ancientTraditionsCount: number; // e.g. 5
  readonly adOrAlgorithmFeedsCount: number; // strictly 0
}

export interface ICourseMeter {
  readonly pct: number;
  readonly text: string;
}

export interface ITestimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly meta: string;
  readonly avatarClass: string;
}

// ------------------------------------------------------------------------------
// Top-Level Active Landing Configuration
// ------------------------------------------------------------------------------
export interface ILandingModeConfig {
  readonly title: string;
  readonly navCta: ILandingCtaConfig;
  readonly heroCta: ILandingCtaConfig;
  readonly heroProofPills: ReadonlyArray<IProofPill>;
  readonly tickerItems: ReadonlyArray<string>;
  readonly forestStats: ReadonlyArray<IForestStat>;
  readonly courseMeters: Record<string, ICourseMeter>;
  readonly danaStats: ReadonlyArray<IDanaStat>;
  readonly testimonials: ReadonlyArray<ITestimonial>;
  readonly freeCta: ILandingCtaConfig;
  readonly paidCta: ILandingCtaConfig;
  readonly ctaBody: string;
}

export interface ILandingConfig {
  readonly mode: LandingMode;
  readonly storeLinks: IStoreLinks;
  readonly waitlistFormUrl: string;
  readonly waitlist: ILandingModeConfig;
  readonly live: ILandingModeConfig;
}
