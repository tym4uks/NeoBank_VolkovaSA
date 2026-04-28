import React from "react";
import "./Cashback.css";

function Cashback() {
  const category = [
    { param: "For food delivery, cafes and restaurants", value: "5%" },
    { param: "In supermarkets with our subscription", value: "5%" },
    { param: "In clothing stores and children's goods", value: "2%" },
    { param: "Other purchases and payment of services and fines", value: "1%" },
    { param: "Shopping in online stores", value: "up to 3%" },
    { param: "Purchases from our partners", value: "30%" },
  ];

  return (
    <div className="Cashback_grid">
      {category.map((item, index) => (
        <div
          key={index}
          className={`Cashback-placeholder ${index % 2 === 0 ? "Cashback_card-white" : "Cashback_card-gray"}`}
        >
          <p className="Cashback_param">{item.param}</p>
          <p className="Cashback_value">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Cashback;
