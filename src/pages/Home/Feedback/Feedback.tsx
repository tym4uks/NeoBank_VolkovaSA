import { useState, useEffect } from "react";
import "./Feedback.css";
import { PATHS } from "../../../constants/paths";
import axios from "axios";

function Feedback() {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedSubscribed = localStorage.getItem("isSubscribed");

    if (savedEmail !== null) {
      setEmail(savedEmail);
      setIsEmailSent(true);
    }

    if (savedSubscribed === "true") {
      setIsSubscribed(true);
    }
  }, []);
  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setIsEmailSent(false);
    setEmail("");
    localStorage.removeItem("email");
    localStorage.removeItem("isSubscribed");
  };
  const fetchEmail = () => {
    // axios
    //   .post("/email", { email })
    //   // .then(() => {})
    //   .finally(() => {
    setIsEmailSent(true);
    setIsSubscribed(true);
    localStorage.setItem("email", email);
    localStorage.setItem("isSubscribed", "true");
    // });
  };

  return (
    <section className="Feedback_section">
      <a className="Feedback__support">Support</a>
      <a className="Feedback__title_bold">Subscribe Newsletter & get</a>
      <a className="Feedback__title_light">Bank News</a>

      {!isSubscribed ? (
        <div className="Feedback__subscribe">
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/email.svg`}
              alt="email"
            />
            {!isEmailSent && (
              <input
                type="text"
                placeholder="Your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            )}

            {isEmailSent && <span className="Feedback__span">Your email</span>}
          </div>

          <button className="Feedback__button" onClick={fetchEmail}>
            <img
              src={`${process.env.PUBLIC_URL}/${PATHS.ICONS}/Subscribe icon.svg`}
              alt="subscribe"
            />
            <span>Subscribe</span>
          </button>
        </div>
      ) : (
        <div className="Feedback__success">
          <span className="Feedback__span">
            You are already subscribed to the bank's newsletter
          </span>
        </div>
      )}
      {isSubscribed && <button onClick={handleUnsubscribe}>Unsubscribe</button>}
    </section>
  );
}

export default Feedback;
