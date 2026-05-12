import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/loanSlice";
import { PATHS } from "../../constants/paths";
import "./CodeConfirmation.css";

function CodeConfirmation() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  const handleSubmit = async (fullCode: string) => {
    if (fullCode.length !== 4) {
      setError("Please enter 4-digit code");
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await fetch(`/document/${applicationId}/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: fullCode }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError("Invalid code. Please try again.");
        setCode(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(null);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === 3 && newCode.every((digit) => digit !== "")) {
      handleSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (isSuccess) {
    return (
      <div className="code__success">
        <div className="success-icon">
          <img
            src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/SurpriseImage.png`}
          />
        </div>
        <h2>Congratulations! You have completed your new credit card.</h2>
        <p>Your credit card will arrive soon. Thank you for choosing us!</p>
        <button onClick={() => navigate("/")} className="success-button">
          View other offers of our bank
        </button>
      </div>
    );
  }

  return (
    <div className="code-confirmation">
      <div className="code-confirmation__container">
        <div className="code-confirmation__header">
          <h2>Please enter confirmation code</h2>
        </div>

        <div className="code-inputs">
          {code.map((digit, index) => (
            <div key={index} className="code-input-wrapper">
              {!digit && <span className="code-dot" />}
              <input
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={setInputRef(index)}
                className={`code-input ${error ? "error" : ""}`}
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}

export default CodeConfirmation;
