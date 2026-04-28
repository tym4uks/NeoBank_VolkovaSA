import React from "react";
import "./Loan.css";
import BestCard from "./BestCard/BestCard";
import Tabs from "../../components/tabs/Tabs";
import About from "./BestCard/sections/About/About";
import Rates from "./BestCard/sections/Rates/Rates";
import Cashback from "./BestCard/sections/Cashback/Cashback";
import FAQ from "./BestCard/sections/FAQ/FAQ";

function Loan() {
  const tabs = [
    {
      id: 1,
      label: "About card",
      content: <About />,
    },
    {
      id: 2,
      label: "Rates and conditions",
      content: <Rates />,
    },
    {
      id: 3,
      label: "Cashback",
      content: <Cashback />,
    },
    {
      id: 4,
      label: "FAQ",
      content: <FAQ />,
    },
  ];

  return (
    <main>
      <BestCard />
      <Tabs tabs={tabs} defaultActiveTab={1} />
    </main>
  );
}

export default Loan;
