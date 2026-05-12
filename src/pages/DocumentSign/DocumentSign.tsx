import React, { useState, useEffect } from "react";
import { PATHS } from "../../constants/paths";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loanSlice";
import "./DocumentSign.css";

const PDF_URL = "/credit-card-offer.pdf";

function DocumentSign() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSigned, setIsSigned] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSign = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`/document/${applicationId}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Sign error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate(`/loan/${applicationId}/code`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted, applicationId, navigate]);
  if (isSubmitted) {
    return (
      <div className="sign__success">
        <div className="success-card">
          <h2>Documents have been successfully signed and sent for approval</h2>
          <p>
            Within 10 minutes you will be sent a PIN code to your email for
            confirmation
          </p>
          {/* <button
            onClick={() => navigate(`/loan/${applicationId}/document/sign`)}
          >
            Кнопка отладки
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="document-sign">
      <div className="document-sign__container">
        <div className="document-sign__header">
          <h2>Sign your credit agreement</h2>
          <p className="document-sign__step">Step 4 of 5</p>
        </div>

        <div className="pdf-viewer">
          <p className="disclaimer-text">
            Information on interest rates under bank deposit agreements with
            individuals. Center for Corporate Information Disclosure.
            Information of a professional participant in the securities market.
            Information about persons under whose control or significant
            influence the Partner Banks are. By leaving an application, you
            agree to the processing of personal data, obtaining information,
            obtaining access to a credit history, using an analogue of a
            handwritten signature, an offer, a policy regarding the processing
            of personal data, a form of consent to the processing of personal
            data.
          </p>
          <div className="pdf-info" onClick={() => setIsModalOpen(true)}>
            <div className="pdf-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    fill-opacity=".25"
                    d="M5 5a2 2 0 0 1 2-2h4.75a.25.25 0 0 1 .25.25V8a2 2 0 0 0 2 2h4.75a.25.25 0 0 1 .25.25V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"
                  />
                  <path
                    fill="currentColor"
                    d="M13 8V3.604a.25.25 0 0 1 .427-.177l5.146 5.146a.25.25 0 0 1-.177.427H14a1 1 0 0 1-1-1"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    d="M8.5 13.5h6m-6 3h5"
                  />
                </g>
              </svg>
            </div>
            <span className="pdf-link">Information on your card</span>
          </div>
        </div>

        <div className="document-sign__actions">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>I agree</span>
          <button
            className="btn-sign"
            onClick={handleSign}
            disabled={!isAgreed || isSigned}
          >
            {isSigned ? "Signed" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentSign;
