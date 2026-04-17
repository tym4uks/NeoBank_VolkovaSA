import { useState } from "react";
import "./Design.css";
import { PATHS } from "../../constants/paths";

function Design() {
  return (
    <section className="design_section">
      <div>
        <h2>Choose the design you like and apply for card right now</h2>
        <button>Choose the card</button>
      </div>
      <div className="design_section__div">
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/cardImage1.png`}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/cardImage2.png`}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/cardImage3.png`}
        ></img>
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/cardImage4.png`}
        ></img>
      </div>
    </section>
  );
}

export default Design;
