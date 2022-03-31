import styled from "styled-components";
import css from "@styled-system/css";
export const LogoBox = styled.span(
  css({
    color: "text.bold",
    fontSize: 26,
    fontWeight: "bold",
    cursor: "pointer",
    mr: [0, 20, 40],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 426px)": {
      width: "50px",
    },
  })
);

export const LogoImage = styled.img({
  display: "block",
  backfaceVisibility: "hidden",
  maxWidth: 150,
  "@media (max-width: 426px)": {
    maxWidth: "70px",
  },
});
