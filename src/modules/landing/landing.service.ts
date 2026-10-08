// src/modules/landing/landing.service.ts
// ==============================================================================
// 🏛️ MeritMoon Landing Service (Law U14 & Architecture Compliance)
// ==============================================================================

export interface IWaitlistSubmissionResult {
  readonly success: boolean;
  readonly error?: string;
}

export class LandingService {
  /**
   * Submits an email address directly to external Formspree waitlist endpoint.
   */
  async submitWaitlist(
    url: string,
    email: string,
  ): Promise<IWaitlistSubmissionResult> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return { success: true };
      }

      const data = await response.json().catch(() => null);
      const errorMessage =
        data?.errors?.map((err: { message: string }) => err.message).join(", ") ||
        data?.error ||
        "Could not join waitlist. Please try again.";

      return {
        success: false,
        error: errorMessage,
      };
    } catch {
      return {
        success: false,
        error: "Network error. Please try again later.",
      };
    }
  }
}

export const landingService = new LandingService();
export default landingService;
