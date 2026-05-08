import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./Loan.css";
import BestCard from "./BestCard/BestCard";
import Steps from "./GetCard/Steps/Steps";
import CardForm from "./GetCard/CardForm/CardForm";
import CardOffers from "./GetCard/CardOffers/CardOffers";
import Tabs from "../../components/tabs/Tabs";
import About from "./BestCard/sections/About/About";
import Rates from "./BestCard/sections/Rates/Rates";
import Cashback from "./BestCard/sections/Cashback/Cashback";
import FAQ from "./BestCard/sections/FAQ/FAQ";

function Loan() {
  const [showOffers, setShowOffers] = useState(false);
  const { isPrescoringCompleted, offers } = useSelector(
    (state: RootState) => state.loan,
  );

  const shouldShowOffers =
    showOffers || (isPrescoringCompleted && offers && offers.length > 0);

  const tabs = [
    { id: 1, label: "About card", content: <About /> },
    { id: 2, label: "Rates and conditions", content: <Rates /> },
    { id: 3, label: "Cashback", content: <Cashback /> },
    { id: 4, label: "FAQ", content: <FAQ /> },
  ];

  return (
    <main>
      <BestCard />
      <Tabs tabs={tabs} defaultActiveTab={1} />
      <Steps /> {/* ← статичные шаги */}
      {!shouldShowOffers ? (
        <CardForm onSuccess={() => setShowOffers(true)} />
      ) : (
        <CardOffers />
      )}
    </main>
  );
}

export default Loan;
