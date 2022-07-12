import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ButtonSave = styled.div`
  position: absolute;
  top: 17px;
  right: 50px;
  cursor: pointer;

  @media (max-width: 1025px) {
    right: 20px;
  }
  @media (max-width: 768px) {
    right: 40px;
  }
`;
export const Container = styled.div`
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
