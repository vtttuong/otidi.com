import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const PageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: ${themeGet("colors.white", "#ffffff")};
  padding: 0px 70px;
  &.message-chat {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 100px;
  }
  justify-content: center;



  @media only screen and (max-width: 990px) {
    padding: 0px;
    margin-top: 68px;
  }


  @media only screen and (min-width: 991px) and (max-width: 1280px) {
    padding: 0px 15px;
  }
`;

export { PageWrapper };
