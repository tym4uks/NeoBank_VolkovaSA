import React from "react";
import Design from "./Design/Design";
import Features from "./Features/Features";
import Exchange from "./Exchange/Exchange";
import MapServices from "./MapServices/MapServices";
import CurrentNews from "./CurrentNews/CurrentNews";
import Feedback from "./Feedback/Feedback";
import "./Home.css";

function Home() {
  return (
    <main>
      <Design />
      <Features />
      <Exchange />
      <MapServices />
      <CurrentNews />
      <Feedback />
    </main>
  );
}
export default Home;
