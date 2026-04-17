import { useState } from "react";
import "./MapServices.css";
import { PATHS } from "../../constants/paths";

function MapServices() {
  return (
    <section className="MapServices_section">
      <h3>You can use our services anywhere in the world</h3>
      <p>Withdraw and transfer money online through our application</p>
      <img
        src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/Huge Global.svg`}
      ></img>
    </section>
  );
}

export default MapServices;
