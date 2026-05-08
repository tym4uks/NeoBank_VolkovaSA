import React from "react";
import "./Steps.css";

function Steps() {
  return (
    <div className="CardForm_section">
      <h2>How to get a card</h2>
      <div className="steps-list">
        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">1</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            Fill out an online application - you do not need to visit the bank
          </div>
        </div>

        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">2</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            Find out the bank's decision immediately after filling out the
            application
          </div>
        </div>

        <div className="step-item">
          <div className="step-top-row">
            <div className="step-number">3</div>
            <div className="step-divider"></div>
          </div>
          <div className="step-description">
            The bank will deliver the card free of charge, wherever convenient,
            to your city
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default Steps;
