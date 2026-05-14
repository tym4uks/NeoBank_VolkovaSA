import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store/store";
import {
  LoanOffer,
  selectOffer,
  setApplicationSent,
  setLoading,
} from "../../../../store/loanSlice";
import Offer from "../../../../components/offer/Offer";
import "./CardOffers.css";

function CardOffers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offers, selectedOffer, isLoading } = useSelector(
    (state: RootState) => state.loan,
  );
  const [applicationStatus, setApplicationStatus] = useState<string | null>(
    null,
  );
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const handleSelectOffer = async (offer: LoanOffer) => {
    dispatch(selectOffer(offer));
    dispatch(setLoading(true));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      dispatch(setApplicationSent(true));
      setApplicationStatus("success");
    } catch (error) {
      setApplicationStatus("error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (applicationStatus === "success") {
      const timer = setTimeout(() => {
        navigate(`/loan/:applicationId`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [applicationStatus, applicationId, navigate]);

  if (applicationStatus === "success") {
    return (
      <div className="loan-offers__success">
        <div className="success-card">
          <h2>The preliminary decision has been sent to your email.</h2>
          <p>
            In the letter you can get acquainted with the preliminary decision
            on the credit card.
          </p>
        </div>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="loan-offers__empty">
        <p>No offers available. Please go back and submit the form.</p>
      </div>
    );
  }

  return (
    <div className="CardForm_section">
      <div className="loan-offers__grid">
        {offers.map((offer: LoanOffer) => (
          <Offer
            key={offer.id}
            offer={offer}
            onSelect={() => handleSelectOffer(offer)}
            isSelected={selectedOffer?.id === offer.id}
          />
        ))}
      </div>
      {isLoading && (
        <div className="loan-offers__loader">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default CardOffers;
