import "@openfonts/ubuntu_all/index.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Loan from "./pages/Loan/Loan";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/product" element={<div>Product Page</div>} />
        <Route path="/account" element={<div>Account Page</div>} />
        <Route path="/resources" element={<div>Resources Page</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
