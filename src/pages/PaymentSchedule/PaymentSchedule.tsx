import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loanSlice";
import Table from "../../components/table/Table";
import Checkbox from "../../components/checkbox/Checkbox";
import Modal from "../../components/modal/Modal";
import { mockPaymentData } from "./paymentData";
import "./PaymentSchedule.css";

export interface Payment {
  id: number;
  number: number;
  date: string;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}

function PaymentSchedule() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payments] = useState<Payment[]>(mockPaymentData); //直接用 mock-данные
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [isDenyConfirmModalOpen, setIsDenyConfirmModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const columns = [
    { key: "number" as const, title: "NUMBER", sortable: true },
    { key: "date" as const, title: "DATE", sortable: true },
    { key: "totalPayment" as const, title: "TOTAL PAYMENT", sortable: true },
    {
      key: "interestPayment" as const,
      title: "INTEREST PAYMENT",
      sortable: true,
    },
    { key: "debtPayment" as const, title: "DEBT PAYMENT", sortable: true },
    { key: "remainingDebt" as const, title: "REMAINING DEBT", sortable: true },
  ];

  const handleSend = async () => {
    if (!isAgreed) return;
    dispatch(setLoading(true));
    try {
      await fetch(`/document/${applicationId}`, { method: "POST" });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeny = () => {
    setIsDenyModalOpen(false);
    setIsDenyConfirmModalOpen(true);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate(`/loan/${applicationId}/document/sign`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, applicationId, navigate]);

  if (isSubmitted) {
    return (
      <div className="payment-schedule__success">
        <div className="success-card">
          <h2>Documents are formed</h2>
          <p>Documents for signing will be sent to your email</p>
        </div>
        {/* <button
            onClick={() => navigate(`/loan/${applicationId}/document/sign`)}
          >
            Кнопка отладки
          </button> */}
      </div>
    );
  }

  return (
    <div className="payment-schedule">
      <div className="payment-schedule__container">
        <div className="payment-schedule__header">
          <h2>Payment Schedule</h2>
          <p className="payment-schedule__step">Step 3 of 5</p>
        </div>

        <Table columns={columns} data={payments} />

        <div className="payment-schedule__actions">
          <button className="btn-deny" onClick={() => setIsDenyModalOpen(true)}>
            Deny
          </button>
          <div className="agree-section">
            <Checkbox
              checked={isAgreed}
              onChange={setIsAgreed}
              label="I agree with the payment schedule"
            />
            <button
              className="btn-send"
              onClick={handleSend}
              disabled={!isAgreed}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDenyModalOpen}
        onClose={() => setIsDenyModalOpen(false)}
        title="Deny application"
      >
        <p>You exactly sure, you want to cancel this application?</p>
        <div className="modal-buttons">
          <button className="btn-deny" onClick={handleDeny}>
            Deny
          </button>
          <button onClick={() => setIsDenyModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal
        isOpen={isDenyConfirmModalOpen}
        onClose={() => setIsDenyConfirmModalOpen(false)}
        title="Deny application"
      >
        <p>Your application has been deny!</p>
        <div className="modal-buttons">
          <button className="btn-home" onClick={handleGoHome}>
            Go home
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PaymentSchedule;
