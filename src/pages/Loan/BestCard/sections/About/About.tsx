import React from "react";
import { PATHS } from "../../../../../constants/paths";
import "./About.css";

function About() {
  const cards = [
    {
      id: 1,
      title: "Up to 50 000 ₽",
      description: "Cash and transfers without commission and percent",
      icon: "Money_duotone.svg",
    },
    {
      id: 2,
      title: "Up to 160 days",
      description: "Without percent on the loan",
      icon: "Calendar_duotone.svg",
    },
    {
      id: 3,
      title: "Free delivery",
      description:
        "We will deliver your card by courier at a convenient place and time for you",
      icon: "Clock_duotone.svg",
    },
    {
      id: 4,
      title: "Up to 12 months",
      description:
        "No percent. For equipment, clothes and other purchases in installments",
      icon: "Bag_duotone.svg",
    },
    {
      id: 5,
      title: "Convenient deposit and withdrawal",
      description:
        "At any ATM. Top up your credit card for free with cash or transfer from other cards",
      icon: "Creditcard_duotone.svg",
    },
  ];

  return (
    <div className="about-container">
      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card-placeholder ${card.id % 2 === 0 ? "card-white" : "card-gray"}`}
          >
            <div className="card-icon">
              <img
                src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/${card.icon}`}
                alt={card.title}
              />
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
