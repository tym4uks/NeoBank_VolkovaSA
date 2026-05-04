import React from "react";

interface IconProps {
  size?: number;
}

function SuccessIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M 12 21 C 16.9706 21 21 16.9706 21 12 C 21 7.02944 16.9706 3 12 3 C 7.02944 3 3 7.02944 3 12 C 3 16.9706 7.02944 21 12 21 Z M 11.7682 15.6402 L 16.7682 9.64018 L 15.2318 8.35982 L 10.9328 13.5186 L 8.70711 11.2929 L 7.29289 12.7071 L 10.2929 15.7071 L 11.0672 16.4814 L 11.7682 15.6402 Z"
        fill="#00B050"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export default SuccessIcon;
