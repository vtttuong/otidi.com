import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const ProgressBarWrapper = styled.div<any>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 9999999;
  opacity: ${({ isFinished }) => (isFinished ? "0" : "1")};
  transition: all 0.2s;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${themeGet("colors.gray.700", "#E6E6E6")};
  // border-radius: 9px;
  position: relative;
  // margin-bottom: 10px;
`;

const ProgressMeter = styled.span`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${themeGet("colors.primary.regular", "#00C58D")};
`;

export { ProgressBarWrapper, ProgressBar, ProgressMeter };
