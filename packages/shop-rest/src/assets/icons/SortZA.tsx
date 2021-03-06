import React from "react";

export const SortZA = ({
  color = "currentColor",
  width = "20px",
  height = "20px",
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="bi bi-sort-alpha-up-alt"
      fill={color}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4 14a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-1 0v11a.5.5 0 0 0 .5.5z"
      />
      <path
        fillRule="evenodd"
        d="M6.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L4 3.207l1.646 1.647a.5.5 0 0 0 .708 0z"
      />
      <path d="M9.027 7h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055L9.027 6.309V7zm.637 7l.418-1.371h1.781L12.281 14h1.121l-1.78-5.332h-1.235L8.597 14h1.067zM11 9.687l.652 2.157h-1.351l.652-2.156H11z" />
    </svg>
  );
};
