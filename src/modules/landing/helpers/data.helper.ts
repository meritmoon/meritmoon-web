// src/modules/landing/helpers/data.helper.ts
// ==============================================================================
// 🏛️ MeritMoon Landing Data Transformation & Formatting (Law U14 & Law U15)
// ==============================================================================
// Pure, deterministic transformation utilities adhering to standard data analyst
// hygiene (formatting currencies from base cents, numbers with locale groupings,
// and resolving mode-specific projections without scattered string templates).
// ==============================================================================

import {
  ICourseEntity,
  IDanaStat,
  IForestStat,
  ILandingPlatformMetrics,
  ITestimonialEntity,
  LandingMode,
} from "../types";

/**
 * Formats a currency amount stored in base cents into an internationalized USD string.
 * Example: 4820000 -> "$48,200"
 */
export const formatCurrency = (cents: number): string => {
  const dollars = Math.round(cents / 100);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(dollars);
};

/**
 * Formats integer counts with standard thousand separators.
 * Example: 47283 -> "47,283"
 */
export const formatCount = (count: number): string => {
  return new Intl.NumberFormat("en-US").format(count);
};

/**
 * Resolves the appropriate course progress meter based on the active platform mode.
 * In 'waitlist' mode: displays practice curriculum depth.
 * In 'live' mode: displays cohort completion rate analytics.
 */
export const resolveCourseMeter = (
  course: ICourseEntity,
  mode: LandingMode,
): { pct: number; text: string } => {
  if (mode === "waitlist") {
    return course.waitlistMetric;
  }
  return {
    pct: course.liveMetric.completionRatePct,
    text: course.liveMetric.text,
  };
};

/**
 * Resolves testimonial metadata.
 * In 'waitlist' mode: returns honest founding member/practitioner title.
 * In 'live' mode: returns verified streak days and path tier.
 */
export const resolveTestimonialMeta = (
  testimonial: ITestimonialEntity,
  mode: LandingMode,
): string => {
  if (mode === "waitlist") {
    return testimonial.waitlistMeta;
  }
  const { streakDays, summary } = testimonial.liveMeta;
  return `Day ${streakDays} · ${summary}`;
};

/**
 * Projections of platform metrics into the 4 Forest Counters in PromiseSection.
 */
export const buildForestStats = (
  metrics: ILandingPlatformMetrics,
  mode: LandingMode,
): IForestStat[] => {
  if (mode === "waitlist") {
    return [
      {
        target: metrics.ancientTraditionsCount,
        suffix: "",
        label: "Ancient traditions taught",
      },
      {
        target: metrics.freeCoursePercent,
        suffix: "%",
        label: "Free with daily practice",
      },
      {
        target: metrics.teacherDanaPercent,
        suffix: "%",
        label: "Dedicated to lineage teachers",
      },
      {
        target: metrics.adOrAlgorithmFeedsCount,
        suffix: "",
        label: "Ads or algorithm feeds",
      },
    ];
  }

  return [
    {
      target: metrics.practitionerCount,
      suffix: "+",
      label: "Minds growing daily",
    },
    {
      target: metrics.activeSittersCount,
      suffix: "",
      label: "Sitting right now",
    },
    {
      target: metrics.teachersSupportedCount,
      suffix: "",
      label: "Teachers supported",
    },
    {
      target: metrics.freeCoursePercent,
      suffix: "%",
      label: "% free, always",
    },
  ];
};

/**
 * Projections of platform metrics into the 3 Dāna stats in MeritSection.
 */
export const buildDanaStats = (
  metrics: ILandingPlatformMetrics,
  mode: LandingMode,
): IDanaStat[] => {
  if (mode === "waitlist") {
    return [
      {
        number: `${metrics.teacherDanaPercent}%`,
        label: "of subscriptions dedicated to teachers",
      },
      {
        number: `${metrics.freeCoursePercent}%`,
        label: "free with daily discipline",
      },
      {
        number: "100%",
        label: "arrives whole — no deductions",
      },
    ];
  }

  return [
    {
      number: formatCurrency(metrics.totalTeacherDanaCents),
      label: "reached teachers this year",
    },
    {
      number: formatCount(metrics.teachersSupportedCount),
      label: "meditation centers supported",
    },
    {
      number: "100%",
      label: "arrives whole — no deductions",
    },
  ];
};
