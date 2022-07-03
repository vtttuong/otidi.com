import React from "react";
import url from "./icon/verified.png";
export const Verified = (props) => {
  return (
    <img
      style={props.style}
      width="25"
      height="25"
      src={url}
      alt="Dollars money bag free icon"
      title="Accout has been verified"
    />
  );
};
