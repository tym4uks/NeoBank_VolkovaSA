import React, { useState, useEffect, useRef } from "react";
import "./BestCard.css";
import { PATHS } from "../../../constants/paths";

function BestCard() {
  return (
    <section className="BestCard_section">
      <div className="BestCard_section__info">
        <h3 className="BestCard_info__title">Platinum digital credit card</h3>
        <p className="BestCard_info__description">
          Our best credit card. Suitable for everyday spending and shopping.
          <br />
          Cash withdrawals and transfers without commission and interest.
        </p>
        <div className="BestCard_info__benefits">
          <span>
            <p className="BestCard_info__benefits-title">Up to 160 days</p>
            <p className="BestCard_info__benefits-note">No percent</p>
          </span>
          <span>
            <p className="BestCard_info__benefits-title">Up to 600 000 ₽</p>
            <p className="BestCard_info__benefits-note">Credit limit</p>
          </span>
          <span>
            <p className="BestCard_info__benefits-title">0 ₽</p>
            <p className="BestCard_info__benefits-note">Card service is free</p>
          </span>
        </div>
        <button>Apply for card</button>
      </div>

      <div className="BestCard_img">
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/cardImage1.png`}
        ></img>
      </div>
    </section>
  );
}

export default BestCard;
