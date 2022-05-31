import React from "react";
export const Ban = ({
  color = "currentColor",
  width = "15px",
  height = "15px",
  style = { marginRight: "7px" },
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="bi bi-slash-circle"
      fill={color}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};
