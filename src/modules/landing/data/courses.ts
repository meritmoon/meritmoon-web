// src/modules/landing/data/courses.ts
// ==============================================================================
// 🏛️ MeritMoon Normalized Course Catalog (Database Entity Schema)
// ==============================================================================
// Maps directly to backend 'courses' table columns + analytics projections.
// Each course maintains dual telemetry: pre-launch curriculum depth & live metrics.
// ==============================================================================

import { ICourseEntity } from "../types";

export const COURSES: ReadonlyArray<ICourseEntity> = [
  {
    id: "breath",
    slug: "the-breath",
    level: "Foundation · 10 Days",
    title: "The Breath",
    subtitle: "Coming Home to Yourself",
    body: "The most loving thing you can do is return to this moment. Ten days of gentle, single-pointed attention to your own breath — and a mind that finally, genuinely, rests.",
    tradition: "Theravada",
    durationDays: 10,
    isFreeWithStreak: true,
    mascotVariant: "meditating",
    tags: [{ text: "Free with streak" }, { text: "10 days" }],
    waitlistMetric: {
      pct: 100,
      text: "10 daily sits · Gentle breath foundation",
    },
    liveMetric: {
      completionRatePct: 82,
      text: "82% who begin, finish with a full heart",
    },
  },
  {
    id: "four-absorptions",
    slug: "the-four-absorptions",
    level: "Deep Practice · 21 Days",
    title: "The Four Absorptions",
    subtitle: "Where Stillness Becomes Love",
    body: "Deep states of quiet where the noise of the world completely dissolves — and what remains is a warmth and spaciousness so profound it reorders how you see everything, including yourself.",
    tradition: "Theravada",
    durationDays: 21,
    isFreeWithStreak: true,
    isFeatured: true,
    mascotVariant: "joyful",
    tags: [{ text: "Free with streak" }, { text: "21 days" }],
    waitlistMetric: {
      pct: 100,
      text: "21 progressive sits · Jhana stillness",
    },
    liveMetric: {
      completionRatePct: 58,
      text: "58% experience deep inner warmth by day 7",
    },
  },
  {
    id: "seeing-clearly",
    slug: "seeing-clearly",
    level: "Insight · 14 Days",
    title: "Seeing Clearly",
    subtitle: "Compassion Begins With Understanding",
    body: "When you truly see how your own mind works — without judgment, with honest curiosity — something softens. You become gentler with yourself first, and then, naturally, with everyone else.",
    tradition: "Vipassana",
    durationDays: 14,
    isFreeWithStreak: true,
    mascotVariant: "meditating",
    tags: [{ text: "Free with streak" }, { text: "14 days" }],
    waitlistMetric: {
      pct: 100,
      text: "14 insight sits · Mindful clarity",
    },
    liveMetric: {
      completionRatePct: 44,
      text: "44% report feeling genuine self-compassion by day 5",
    },
  },
  {
    id: "total-object",
    slug: "total-object",
    level: "Advanced · 30 Days",
    title: "Total Object",
    subtitle: "The Light You Already Carry",
    body: "A rare and demanding path where inner stillness expands until it fills everything. This is not for the faint of heart — but for those willing to go this deep, what's discovered is extraordinary.",
    tradition: "Zen",
    durationDays: 30,
    isFreeWithStreak: false,
    mascotVariant: "meditating",
    tags: [{ text: "Premium unlock", isPremium: true }, { text: "30 days" }],
    waitlistMetric: {
      pct: 100,
      text: "30 deep sits · Rare contemplative depth",
    },
    liveMetric: {
      completionRatePct: 21,
      text: "Every one of the 21% is permanently changed",
    },
  },
  {
    id: "loving-limit",
    slug: "loving-without-limit",
    level: "Heart Practice · 7 Days",
    title: "Loving Without Limit",
    subtitle: "Warmth That Includes Everyone",
    body: "Begin with yourself — genuinely, not just as a concept. Extend outward, slowly, until your goodwill reaches every living thing without exception. This is the practice that makes a kinder world, one heart at a time.",
    tradition: "Brahma-vihara",
    durationDays: 7,
    isFreeWithStreak: true,
    mascotVariant: "joyful",
    tags: [{ text: "Free with streak" }, { text: "7 days" }],
    waitlistMetric: {
      pct: 100,
      text: "7 loving sits · Boundless metta",
    },
    liveMetric: {
      completionRatePct: 91,
      text: "91% feel real warmth — for themselves — by day 3",
    },
  },
  {
    id: "noting-method",
    slug: "the-noting-method",
    level: "Body & Mind · 28 Days",
    title: "The Noting Method",
    subtitle: "Kindness Toward Every Arising",
    body: "Every sensation, every thought, every arising — met with gentle, clear attention, and released. This is deep compassion for your own experience: seeing everything honestly, judging none of it.",
    tradition: "Vipassana",
    durationDays: 28,
    isFreeWithStreak: false,
    mascotVariant: "meditating",
    tags: [{ text: "Premium unlock", isPremium: true }, { text: "28 days" }],
    waitlistMetric: {
      pct: 100,
      text: "28 mindful sits · Vipassana noting",
    },
    liveMetric: {
      completionRatePct: 33,
      text: "33% report a profound softening of old pain",
    },
  },
];

export const LANDING_COURSES = COURSES;
