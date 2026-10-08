import React, { useState } from "react";
import { Button, ButtonVariants, ComponentSizes } from "../../../design";
import { FORMSPREE_WAITLIST_URL } from "../constants";
import { landingService } from "../landing.service";

export interface IWaitlistFormProps {
  formUrl?: string;
  className?: string;
}

export const WaitlistForm: React.FC<IWaitlistFormProps> = ({
  formUrl = FORMSPREE_WAITLIST_URL,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await landingService.submitWaitlist(formUrl, trimmedEmail);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.error || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="waitlist-status" id="waitlist-status" style={{ display: "block" }}>
        ✦ Welcome to the circle. Your place is kept on our waiting list.
      </div>
    );
  }

  return (
    <>
      <form
        id="waitlist-form"
        className={`waitlist-form ${className}`}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          id="waitlist-email"
          className="waitlist-input"
          placeholder="Enter your email address..."
          required
          autoComplete="email"
          aria-label="Email address for waiting list"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          variant={ButtonVariants.PRIMARY}
          size={ComponentSizes.MD}
          id="waitlist-submit"
          disabled={isSubmitting}
          leaf="🌿"
        >
          {isSubmitting ? "Reserving..." : "Join Waitlist"}
        </Button>
      </form>
      {errorMessage && (
        <div
          className="waitlist-status"
          id="waitlist-status"
          style={{ display: "block", color: "var(--ruby-bright, #E06060)" }}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default WaitlistForm;
