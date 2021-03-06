import React from "react";
export const Dot = (props) => {
  return (
    <svg
      {...props}
      width="10px"
      style={{ fontSize: 50 }}
      viewBox="0 0 16 16"
      className="bi bi-dot"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      />
    </svg>
  );
};
