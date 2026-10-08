import React, { useState } from "react";

interface IFaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: IFaqItem[] = [
  {
    question: "Is MeritMoon really 100% free?",
    answer:
      "Yes. Every foundational meditation course — including Breath (Ānāpāna), Jhāna, Vipassanā, and Loving-Kindness (Mettā) — is 100% free with your commitment to practice. We never place paywalls between you and inner stillness.",
  },
  {
    question: "What is the difference between the Forest Path and the Moonlit Path?",
    answer:
      "The Forest Path is 100% free with your daily commitment. The Moonlit Path is for practitioners who wish to practice Dāna (generosity) by voluntarily supporting our 18 respected monk teachers and monasteries with monthly or annual contributions.",
  },
  {
    question: "What meditation techniques are taught in MeritMoon?",
    answer:
      "MeritMoon teaches authentic contemplation techniques that are thousands of years old: Ānāpāna (breath awareness at the nostril aperture), Jhāna (absorptive meditative joy and tranquil concentration), Vipassanā (direct insight into impermanence and non-self), and Mettā (boundless loving-kindness for all beings).",
  },
  {
    question: "How does the streak and dedication system work?",
    answer:
      "Every sit counts toward your unbroken practice streak. When you complete a sit, you can dedicate the merits of your stillness to your teachers, loved ones, or all living beings everywhere.",
  },
  {
    question: "Can I practice offline without an internet connection?",
    answer:
      "Yes. The Moonlit Path includes full offline access so your meditation practice remains available even deep in nature, in remote retreat centers, or on flights without any interruption.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="eyebrow">Gentle Inquiries</div>
        <h2 className="section-title">
          Curious Minds.
          <br />
          <span className="grad-text">Gentle Answers.</span>
        </h2>
        <p className="section-body">
          Everything you need to know about the practice, traditions, and the
          Path of Merits.
        </p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-card ${isOpen ? "faq-card--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <div className="faq-icon-wrap">
                    <svg
                      className={`faq-chevron ${isOpen ? "rotate-180" : ""}`}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
