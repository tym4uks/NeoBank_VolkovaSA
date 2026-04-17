import { useState } from "react";
import "./Feedback.css";
import { PATHS } from "../../constants/paths";

function Feedback() {
  return (
    <section className="Feedback_section">
      <a className="Feedback__support">Support</a>
      <a className="Feedback__title_bold">Subscribe Newsletter & get</a>
      <a className="Feedback__title_light">Bank News</a>
      <div className="Feedback__subscribe">
        <img src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/email.svg`}></img>
        <input type="text" placeholder="Your email" />
        <button className="Feedback__button">
          <img
            src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/Subscribe icon.svg`}
          ></img>
          <span>Subscribe</span>
        </button>
      </div>
    </section>
  );
}

export default Feedback;
