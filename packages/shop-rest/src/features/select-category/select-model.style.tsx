import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Row as Rows, Col as Cols } from "react-styled-flexboxgrid";

export const ContainerCategory = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  border-radius: ${themeGet("radii.base", "6px")};
  overflow: hidden;
  position: relative;
  padding: 20px 0px;
  &.getSubCat {
    margin-left: 20px;
    padding: 5px;
  }
  .hasIcon {
    position: relative;
    > svg,
    > img {
      position: absolute;
      top: 12px;
      left: 10px;
      display: inline-block;
      z-index: 1;
    }
  }
`;
export const Category = styled.li`
  position: relative;
  font-size: 17px;
  padding: 10px 20px;
  font-weight: 600;
  padding-left: 50px;
  cursor: pointer;
  transition: all 0.2s;

  &.getSub {
    padding: 5px;
    padding-left: 40px;
    color: #676767;
    font-weight: 400;
    :before {
      content: "-";
      position: relative;
      left: -15px;
    }
  }
  &:hover {
    background: #e6fcf5;
  }

  &.active {
    background: #0193762b;
    border-bottom: unset !important;
  }
`;
export const ParentIcon = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  right: 20px;
  top: 7px;
`;
