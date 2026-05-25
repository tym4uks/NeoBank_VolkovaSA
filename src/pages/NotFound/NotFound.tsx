import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <p className="not-found-code">Oops...</p>
        <p className="not-found-title">Page not found</p>
        <p className="not-found-message">
          This page doesn't exist or was removed! We suggest you go back.
        </p>
        <button onClick={handleGoBack}>Go back</button>
      </div>
      <div>
        <img src={`${process.env.PUBLIC_URL}/${PATHS.IMAGES}/404.png`}></img>
      </div>
    </div>
  );
}

export default NotFound;
