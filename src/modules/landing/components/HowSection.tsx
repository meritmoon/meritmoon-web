import React from "react";
import { icons } from "../../../assets";

export const HowSection: React.FC = () => {
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="eyebrow">Path of Merits</div>
        <h2 className="section-title">
          Tender as a seed.
          <br />
          <span className="grad-text">Strong as an ancient tree.</span>
        </h2>

        <div className="how__steps">
          <div className="how__step">
            <div className="step-num">01</div>
            <div className="step-moon">
              <div className="moon-mascot moon-mascot--step">
                <img src={icons.mascot.src} alt="MeritMoon" />
              </div>
            </div>
            <h3>Choose the course of your heart</h3>
            <p>
              Begin with practices rooted in ancient, time-honored meditation
              traditions. Each course is offered with care and sincerity — not
              merely to help you briefly escape stress, but to gently guide the
              mind toward lasting clarity, steadiness, and inner transformation.
            </p>
          </div>

          <div className="how__connector">
            <div className="connector-line" />
            <div className="connector-leaf">🌿</div>
          </div>

          <div className="how__step">
            <div className="step-num">02</div>
            <div className="step-moon">
              <div className="moon-mascot moon-mascot--step">
                <img src={icons.mascot.src} alt="MeritMoon" />
              </div>
            </div>
            <h3>Sit with yourself, every single day</h3>
            <p>
              This is the kindest and most demanding thing we ask. Each day you
              show up is a gift to your future self — and quietly, to everyone in
              your life. The continuity matters. Love it enough to keep it.
            </p>
          </div>

          <div className="how__connector">
            <div className="connector-line" />
            <div className="connector-leaf">🌿</div>
          </div>

          <div className="how__step">
            <div className="step-num">03</div>
            <div className="step-moon">
              <div className="moon-mascot moon-mascot--step">
                <img src={icons.mascot.src} alt="MeritMoon" />
              </div>
            </div>
            <h3>Finish it — and it's yours, forever</h3>
            <p>
              Complete the course without breaking your streak and own it
              permanently. You earned it with something infinitely more valuable
              than money — your own discipline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowSection;
