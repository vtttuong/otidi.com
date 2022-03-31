import React from "react";
export const Person = ({
  color = "currentColor",
  width = "20px",
  height = "20px",
  style = { marginRight: "7px" },
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="bi bi-person-fill"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        fillRule="evenodd"
        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      />
    </svg>
  );
};
