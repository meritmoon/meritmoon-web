// src/modules/landing/landing.service.ts
// ==============================================================================
// 🏛️ MeritMoon Landing Service (Law U14 & Architecture Compliance)
// ==============================================================================

import { api } from "../../services";

export interface IWaitlistSubmissionResult {
  readonly success: boolean;
  readonly error?: string;
}

export class LandingService {
  /**
   * Submits an email address to the pre-launch waitlist endpoint reusing the shared API service.
   */
  async submitWaitlist(
    url: string,
    email: string,
  ): Promise<IWaitlistSubmissionResult> {
    const response = await api.post<{ ok?: boolean }>(
      url,
      { email },
      { withCredentials: false },
    );

    if (response.data && !response.error) {
      return { success: true };
    }

    return {
      success: false,
      error: response.error || "Something went wrong. Please try again.",
    };
  }
}

export const landingService = new LandingService();
export default landingService;
