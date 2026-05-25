import "@openfonts/ubuntu_all/index.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Loan from "./pages/Loan/Loan";
import CardOffers from "./pages/Loan/GetCard/CardOffers/CardOffers";
import NotFound from "./pages/NotFound/NotFound";
import Scoring from "./pages/Scoring/Scoring"; //loan/:applicationId

import PaymentSchedule from "./pages/PaymentSchedule/PaymentSchedule";
import DocumentSign from "./pages/DocumentSign/DocumentSign";
import CodeConfirmation from "./pages/CodeConfirmation/CodeConfirmation";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/product" element={<NotFound />} />
        <Route path="/account" element={<NotFound />} />
        <Route path="/resources" element={<NotFound />} />
        <Route path="loan-offers" element={<CardOffers />} />
        <Route path="*" element={<Home />} />
        <Route path="loan/:applicationId" element={<Scoring />} />
        <Route
          path="loan/:applicationId/document"
          element={<PaymentSchedule />}
        />
        <Route
          path="loan/:applicationId/document/sign"
          element={<DocumentSign />}
        />
        <Route path="loan/:applicationId/code" element={<CodeConfirmation />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
