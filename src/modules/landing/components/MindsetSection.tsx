import React from "react";

export const MindsetSection: React.FC = () => {
  return (
    <section className="mindset">
      <div className="container">
        <div className="mindset__quote-wrap">
          <blockquote className="mindset__quote">
            <span className="mq-open">❝</span>
            The forest doesn't grow because it's trying.
            <br />
            It grows because it never stopped caring.
            <cite>— Way of The MeritMoon</cite>
          </blockquote>
        </div>

        <div className="mindset__trio">
          <div className="mtile">
            <div className="mtile__icon">🌲</div>
            <h4>Reset is the Path, not the End</h4>
            <p>
              If you miss a day, the course begins again. We know this sounds
              hard — and it is. But beginning again is not failure. It is you
              choosing yourself, again. Every great tree started as a seed that
              simply refused to stop.
            </p>
          </div>
          <div className="mtile">
            <div className="mtile__icon">
              <div className="moon-icon-simple" />
            </div>
            <h4>Not to Compete, but to Care</h4>
            <p>
              MeritMoon wasn’t built to outrun competitors or capture attention.
              It was built to help deep inner transformation flourish again in
              an age of endless distraction — through timeless meditation
              practices that have guided minds for centuries.
            </p>
          </div>
          <div className="mtile">
            <div className="mtile__icon">🌿</div>
            <h4>No idle state. Only growth.</h4>
            <p>
              Practice daily and earn everything free. Subscribe, and let
              MeritMoon continue supporting the teachers who preserve these
              timeless practices, so the path remains open for everyone who
              follows. There is no path through MeritMoon where you lose. Only
              different ways of winning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindsetSection;
