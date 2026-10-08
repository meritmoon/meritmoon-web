import React from "react";
import { icons } from "../../../assets";
import { Button, ButtonVariants, ComponentSizes } from "../../../design";
import { LANDING_CONFIG, LandingMode } from "../constants";

export interface IMeritSectionProps {
  mode?: LandingMode;
}

export const MeritSection: React.FC<IMeritSectionProps> = ({
  mode = LANDING_CONFIG.mode,
}) => {
  const activeMode = mode || LANDING_CONFIG.mode;
  const config = LANDING_CONFIG[activeMode] || LANDING_CONFIG.waitlist;
  return (
    <section className="merit" id="merit">
      <div className="container">
        <div className="eyebrow">Two Paths. Both Win</div>
        <h2 className="section-title">
          Cultivate merit,
          <br />
          through <span className="grad-text">discipline or devotion</span>.
        </h2>
        <p className="section-body">
          We designed MeritMoon so that no matter what you choose, there's no
          losing side. Discipline earns you everything. And devotion earns you
          even more.
          <br />
          <br />
          MeritMoon is a subscription-supported meditation learning platform.
          Your membership unlocks premium features while helping us create new
          courses and support the teachers who preserve these timeless
          traditions.
        </p>

        <div className="merit__grid">
          <div className="mcard">
            <div className="mcard__moon-deco">
              <div className="crescent-moon" />
            </div>
            <h3 className="mcard__plan">The Forest Path</h3>
            <div className="mcard__price">
              <span className="mprice">Free</span>
              <span className="mperiod">Honestly & always</span>
            </div>
            <p className="mcard__pitch">
              Show up for yourself each day, and every course gradually opens to
              you. Complete it, and own it forever. Break the streak before
              completion, and the journey begins again from Day 1. Simple.
              Honest. Disciplined.
            </p>
            <ul className="mcard__list">
              <li>
                <span className="mcheck">✦</span>Every course, free — earned
                through daily practice
              </li>
              <li>
                <span className="mcheck">✦</span>Completed courses are yours
                forever, no conditions
              </li>
              <li>
                <span className="mcheck">✦</span>Miss a day — restart from Day
                1 with fresh eyes
              </li>
              <li>
                <span className="mcheck">✦</span>Daily guided sessions, gentle
                timers, forest bells
              </li>
              <li>
                <span className="mcheck">✦</span>A warm community of fellow
                practitioners
              </li>
              <li>
                <span className="mcheck">✦</span>Zero ads. Zero selling of your
                data. Ever.
              </li>
              <li className="mnone">
                <span>—</span>Streak shield for life's interruptions
              </li>
              <li className="mnone">
                <span>—</span>Supporting meditation teachers
              </li>
            </ul>
            <Button
              variant={ButtonVariants.SECONDARY}
              size={ComponentSizes.MD}
              fullWidth
              href={config.freeCta.href}
              id="mcard-cta-free"
            >
              {config.freeCta.text}
            </Button>
            <p className="mcard__foot">
              Your presence is the only thing we ask. It's enough.
            </p>
          </div>

          <div className="mcard mcard--moonlit">
            <div className="mcard__ribbon">Most Generous</div>
            <div className="mcard__moon-deco">
              <div className="moon-mascot moon-mascot--price">
                <img src={icons.mascotJoyful.src} alt="MeritMoon Joyful" />
              </div>
            </div>
            <h3 className="mcard__plan">The Moonlit Path</h3>
            <div className="mcard__price">
              <span className="mprice">
                $9<small>.99</small>
              </span>
              <span className="mperiod">/ month</span>
            </div>
            <p className="mcard__pitch">
              Life is full of surprises. Protect your progress, and cultivate a
              quiet stream of merit through your support — even on the days you
              miss practice.
            </p>
            <ul className="mcard__list">
              <li>
                <span className="mcheck mcheck--gold">✦</span>Everything in the
                Forest Path
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>Streak Shield —
                your chain is protected when life intervenes
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>Instant access to
                any course, right when you need it
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>MeritMoon dedicates
                25% of every subscription to supporting the teachers and
                meditation organizations that lovingly create and preserve every
                course you practice
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>Offline access so
                you can practice anywhere, always
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>Monthly live
                gatherings with course teachers
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>Your name in our
                monthly gratitude dedication
              </li>
              <li>
                <span className="mcheck mcheck--gold">✦</span>First to receive
                every new course we make
              </li>
            </ul>
            <Button
              variant={ButtonVariants.PRIMARY}
              size={ComponentSizes.MD}
              fullWidth
              href={config.paidCta.href}
              id="mcard-cta-paid"
              leaf={config.paidCta.leaf}
            >
              {config.paidCta.text}
            </Button>
            <p className="mcard__foot">
              On the days life asks you to rest, your subscription quietly
              continues supporting the teachers who keep these timeless
              practices alive — <br /> like moonlight through the trees.
            </p>
          </div>
        </div>

        <div className="dana-block">
          <div className="dana-moon-row">
            <div className="moon-mascot moon-mascot--dana">
              <img src={icons.mascotJoyful.src} alt="MeritMoon Joyful" />
            </div>
            <div className="dana-moon-row__moons">
              <div className="tiny-moon tm1" />
              <div className="tiny-moon tm2" />
              <div className="tiny-moon tm3" />
            </div>
          </div>
          <h3>The 25% Promise That Keeps the Path Alive</h3>

          <p>
            A quarter of every subscription is something we never considered
            ours to keep. MeritMoon dedicates 25% of its subscription revenue to
            supporting the meditation teachers and trusted organizations whose
            wisdom, guidance, and care make these courses possible. Your
            subscription helps ensure these teachings continue reaching people
            for generations to come.
          </p>

          <p className="dana-sub">
            Even when life becomes busy, your membership continues nurturing the
            people who preserve and create these practices. While you care for
            your own life, MeritMoon quietly continues caring for the path that
            has cared for so many.
          </p>
          <div className="dana-stats" id="dana-stats">
            {config.danaStats.map((stat, idx) => (
              <div className="dstat" key={idx}>
                <span className="dstat__n">{stat.number}</span>
                <span className="dstat__l">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeritSection;
