import React from "react";
import { Img } from "react-image";
import placeholder from "./post-placeholder.png";
const Placeholder = () => <img src={placeholder} alt="post img loader" />;
export default function Image({
  url,
  alt = "placeholder",
  className,
  style,
  onClick,
}: {
  url?: string | [string];
  alt?: string;
  unloader?: string;
  loader?: string;
  className?: string;
  style?: any;
  onClick?: (e: any) => void;
}) {
  return (
    <Img
      draggable={false}
      style={style}
      src={url}
      alt={alt}
      loader={<Placeholder />}
      unloader={<Placeholder />}
      className={className}
      onClick={onClick ? onClick : null}
    />
  );
}
