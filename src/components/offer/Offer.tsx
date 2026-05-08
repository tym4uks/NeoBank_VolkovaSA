import React from "react";
import { LoanOffer } from "../../store/loanSlice";
import { PATHS } from "../../constants/paths";
import "./Offer.css";

interface OfferCardProps {
  offer: LoanOffer;
  onSelect: () => void;
  isSelected?: boolean;
}

function Offer({ offer, onSelect, isSelected }: OfferCardProps) {
  return (
    <div className={`offer-card ${isSelected ? "selected" : ""}`}>
      <div className="offer-card__content">
        <img
          src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/SurpriseImage.png`}
        ></img>
        <div className="offer-card__row">
          <span className="offer-card__label">Requested amount:</span>
          <span className="offer-card__value">
            {offer.requestedAmount.toLocaleString()} ₽
          </span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">Total amount:</span>
          <span className="offer-card__value">
            {offer.totalAmount.toLocaleString()} ₽
          </span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">For {offer.term} months</span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">Monthly payment:</span>
          <span className="offer-card__value">
            {offer.monthlyPayment.toLocaleString()} ₽
          </span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">Your rate:</span>
          <span className="offer-card__value offer-card__rate">
            {offer.rate}%
          </span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">Insurance included:</span>
          <span className="offer-card__value">
            {offer.insuranceIncluded ? "✅" : "❌"}
          </span>
        </div>
        <div className="offer-card__row">
          <span className="offer-card__label">Salary client:</span>
          <span className="offer-card__value">
            {offer.salaryClient ? "✅" : "❌"}
          </span>
        </div>
      </div>
      <button className="offer-card__button" onClick={onSelect}>
        {isSelected ? "Selected" : "Select"}
      </button>
    </div>
  );
}

export default Offer;
