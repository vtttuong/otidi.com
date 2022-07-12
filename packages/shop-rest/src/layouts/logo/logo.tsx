import React from "react";
import Router from "next/router";
import { LogoBox, LogoImage } from "./logo.style";
type LogoProps = {
  imageUrl: string;
  alt: string;
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt }) => {
  function onLogoClick() {
    Router.push("/");
  }
  return (
    <LogoBox onClick={onLogoClick}>
      <LogoImage src={imageUrl} alt={alt} />
    </LogoBox>
  );
};

export default Logo;
