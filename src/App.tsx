import "@openfonts/ubuntu_all/index.css";
import React from "react";
import Header from "./components/Header/Header";
import Design from "./components/Design/Design";
import Features from "./components/Features/Features";
import Exchange from "./components/Exchange/Exchange";
import MapServices from "./components/MapServices/MapServices";
import CurrentNews from "./components/CurrentNews/CurrentNews";
import Feedback from "./components/Feedback/Feedback";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Design />
        <Features />
        <Exchange />
        <MapServices />
        <CurrentNews />
        <Feedback />
      </main>
      <Footer />
    </>
  );
}

export default App;
