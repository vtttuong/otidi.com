import React from "react";
import url from "./icon/NotVerified.png";
export const NotVerified = (props) => {
  return (
    <img
      style={props.style}
      width="25"
      height="25"
      src={url}
      alt="Dollars money bag free icon"
      title="Accout has not been verified"
    />
  );
};
