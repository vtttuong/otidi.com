import { themeGet } from "@styled-system/theme-get";
import { Col as Cols, Row as Rows } from "react-styled-flexboxgrid";
import styled from "styled-components";

export const Container = styled.div`
  div.address {
    @media (max-width: 480px) {
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      font-size: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        display: block;
      }
    }
    align-self: center;
    img {
      top: 5px;
      position: relative;
      margin-right: 5px;
      @media (max-width: 480px) {
        top: 0;
      }
    }
    span {
      font-weight: 600;
      font-size: 17px;
    }
  }
  background-color: transparent;
  padding: 10px;
  border-radius: ${themeGet("radii.base", "6px")};
  overflow: unset;
  position: relative;
  margin-bottom: 10px;
  #color {
    width: 100% !important;
  }
  @media (max-width: 480px) {
    padding: 20px;
    max-height: 88px;
  }
`;

export const ButtonFilter = styled.div`
  color: #3c3e3e;
  background: #fff;
  padding: 8px;
  border-radius: 5px;
  width: 80%;
  font-size: 15px;
  position: relative;
  text-align: center;
  margin-left: 20%;
  cursor: pointer;
  img {
    position: absolute;
    left: 15px;
  }
`;

export const FormTitle = styled.h3`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
  line-height: 1.2;
  margin: 0px;
`;
export const Col = styled(Cols)`
  @media only screen and (min-width: 0em) and (max-width: 47.99em) {
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

export const Row = styled(Rows)`
  margin: 0 !important;
  padding: 5px 0;
  justify-content: flex-end;
`;
