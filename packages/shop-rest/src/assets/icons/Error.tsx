import Image from "components/image/image";
import React from "react";
import url from "./icon/Error.svg";
export const Error = (props) => {
  return (
    <>
      <Image url={url} alt="Cancel free icon" className="loaded" />
    </>
  );
};
