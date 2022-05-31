import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const SpanHistory = styled.p`
  padding: 20px 0;
  font-weight: 600;
  position: relative;
  display: flex;

  flex-direction: column;
  background: #fff;
  margin-bottom: 10px;
  // @media (min-width: 990px) {
  //   display: none;
  // }
  > span:nth-child(2) {
    margin-top: 10px;
  }
  span {
    position: relative;
    left: 20px;
    cursor: pointer;
  }
`;
export const BoxHistory = styled.div`
  position: relative;
  > div {
    position: absolute !important;
    right: 13px;
    top: 20px;
  }
  span.agreeNoti {
    position: absolute !important;
    right: 10px;
    top: 53px;
  }
`;

export const SpanTitleHistory = styled.p`
  padding: 20px;
  font-weight: 600;
  font-size: 20px;
  position: relative;
  background: #fff;
  margin-bottom: 10px;
  color: #009e7f;
  span {
    position: absolute;
    right: 20px;
    cursor: pointer;
  }
`;

const AccordionWrapper = styled.div`
  .rc-collapse {
    background-color: transparent;
    border-radius: 0;
    border: 0;

    > .rc-collapse-item {
      margin-bottom: 5px;
      border-width: 1px;
      border-style: solid;
      border-color: ${themeGet("colors.gray.500", "#f1f1f1")};
      border-image: initial;
      border-radius: ${themeGet("radii.base", "6px")};
      background-color: ${themeGet("colors.white", "#ffffff")};
      overflow: hidden;

      > .rc-collapse-header {
        display: flex;
        align-items: center;
        padding: 23px 30px;
        padding-right: 25px;
        cursor: pointer;
        outline: 0;
        position: relative;
        justify-content: space-between;

        i {
          order: 2;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          color: ${themeGet("colors.text.bold", "#0D1136")};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h3 {
          margin-top: 0px;
          margin-bottom: 0px;
          font-family: ${themeGet("fonts.body", "sans-serif")};
          font-size: ${themeGet("fontSizes.base", "15")}px;
          font-weight: ${themeGet("fontWeights.bold", "700")};
          color: ${themeGet("colors.text.bold", "#0D1136")};
          line-height: ${themeGet("lineHeights.body", 1.5)};
        }
      }

      .rc-collapse-content {
        padding: 0px;
        > .rc-collapse-content-box {
          box-sizing: border-box;
          margin-top: 0px;
          margin-bottom: 0px;
          padding: 0px 30px 23px;
          p {
            font-family: inherit;
            font-size: ${themeGet("fontSizes.base", "15")}px;
            font-weight: ${themeGet("fontWeights.regular", "400")};
            color: ${themeGet("colors.text.regular", "#77798C")};
            line-height: 1.75;
          }
        }
      }
    }
  }
`;

export default AccordionWrapper;
