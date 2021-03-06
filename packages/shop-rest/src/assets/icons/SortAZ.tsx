import React from "react";

export const SortAZ = (
  { color = "currentColor", width = "20px", height = "20px", style },
  props
) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      className="bi bi-sort-alpha-down"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11A.5.5 0 0 1 4 2z"
      />
      <path
        fillRule="evenodd"
        d="M6.354 11.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L4 12.793l1.646-1.647a.5.5 0 0 1 .708 0z"
      />
      <path d="M9.664 7l.418-1.371h1.781L12.281 7h1.121l-1.78-5.332h-1.235L8.597 7h1.067zM11 2.687l.652 2.157h-1.351l.652-2.157H11zM9.027 14h3.934v-.867h-2.645v-.055l2.567-3.719v-.691H9.098v.867h2.507v.055l-2.578 3.719V14z" />
    </svg>
  );
};
