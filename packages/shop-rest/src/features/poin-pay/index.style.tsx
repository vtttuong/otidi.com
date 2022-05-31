import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ContainerOption = styled.div`
  width: 100%;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background-color: ${themeGet("colors.white", "#ffffff")};
  border-top: 3px solid #009e7f;
  padding: 10px;
  margin-bottom: 20px;
  @media (max-width: 1199px) {
    width: 100%;
  }

  .reuseModalHolder {
    padding: 0;
    overflow: auto;
    border: 0;
  }
`;
export const Text = styled.p`
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  color: #009e7f;

  @media (max-width: 990px) {
  }
`;
