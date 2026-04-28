import React from "react";
import "./Rates.css";

function Rates() {
  const rates = [
    { param: "Card currency", value: "Rubles, dollars, euro" },
    { param: "Interest free period", value: "0% up to 160 days" },
    { param: "Payment system", value: "Mastercard, Visa" },
    { param: "Maximum credit limit on the card", value: "600 000 ₽" },
    {
      param: "Replenishment and withdrawal",
      value:
        "At any ATM. Top up your credit card for free with cash or transfer from other cards",
    },
    { param: "Max cashback per month", value: "15 000 ₽" },
    {
      param: "Transaction Alert",
      value: (
        <>
          60 ₽ — SMS or push notifications
          <br />0 ₽ — card statement, information about transactions in the
          online bank
        </>
      ),
    },
  ];

  return (
    <div className="rate-table-container">
      <table className="rate-table">
        <tbody>
          {rates.map((item, index) => (
            <tr key={index}>
              <td>{item.param}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rates;
