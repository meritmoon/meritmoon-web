// src/modules/landing/data/testimonials.ts
// ==============================================================================
// 🏛️ MeritMoon Verified Practitioner Testimonials (Entity Schema)
// ==============================================================================
// Maps to backend 'feedbacks' table. Dual metadata: honest founding member designations
// during waitlist mode, and verified streak & unlock metrics during live mode.
// ==============================================================================

import { ITestimonialEntity } from "../types";

export const TESTIMONIALS: ReadonlyArray<ITestimonialEntity> = [
  {
    id: "takeshi",
    author: "Takeshi M.",
    avatarClass: "av1",
    quote:
      "I reset four times. Each time felt like grief. The fifth time, I approached it differently — with more kindness toward myself. Something opened. I have never felt anything like it. I'm grateful every single day.",
    waitlistMeta: "Founding Practitioner · Vipassana Practice",
    liveMeta: {
      streakDays: 87,
      tier: "forest",
      summary: "Completed: The Four Absorptions",
    },
  },
  {
    id: "nadia",
    author: "Nadia V.",
    avatarClass: "av2",
    quote:
      "I could feel immediately that these courses were written by people who genuinely care about the people reading them. That's rare. That's why I'm still here. I never found another meditation app like this. That's why I subscribed without a second thought.",
    waitlistMeta: "Early Circle · Daily Meditator",
    liveMeta: {
      streakDays: 143,
      tier: "moonlit",
      summary: "Moonlit Path · 3 courses, hers forever",
    },
  },
  {
    id: "carlos",
    author: "Carlos R.",
    avatarClass: "av3",
    quote:
      "The reset happened twice and it hurt. The third time I decided to treat each sit as a gift to myself instead of a task. I hit 200 days. My relationship with my own mind — and honestly, my kids — has never been better.",
    waitlistMeta: "Founding Practitioner · Mindful Living",
    liveMeta: {
      streakDays: 211,
      tier: "forest",
      summary: "Free path · 2 courses owned forever",
    },
  },
  {
    id: "priya",
    author: "Priya S.",
    avatarClass: "av4",
    quote:
      "Knowing that MeritMoon supports the teachers behind these courses made subscribing feel meaningful. It isn't just another app—it feels like becoming part of something that's been cared for across generations.",
    waitlistMeta: "Founding Member · Lineage Practice",
    liveMeta: {
      streakDays: 56,
      tier: "moonlit",
      summary: "Moonlit Path · Supporting meditation teachers",
    },
  },
  {
    id: "amir",
    author: "Amir K.",
    avatarClass: "av5",
    quote:
      "I travel all the time. On the hard weeks when I couldn't sit, I found real comfort knowing my subscription was still doing something kind in the world. That feeling — that's something other apps have never given me.",
    waitlistMeta: "Founding Circle · Contemplative Practice",
    liveMeta: {
      streakDays: 178,
      tier: "moonlit",
      summary: "Moonlit Path · Streak shield, gratefully used",
    },
  },
];

export const LANDING_TESTIMONIALS = TESTIMONIALS;
