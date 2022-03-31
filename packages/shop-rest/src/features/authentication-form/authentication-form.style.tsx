import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Button } from "components/button/button";
export { Button };

export const IconWrapper = styled.div`
  display: flex;
  margin-right: 6px;
`;

export const Wrapper = styled.div`
  text-align: center;

  background-color: ${themeGet("colors.white", "#ffffff")};
`;

export const Container = styled.div`
  padding: 40px 60px 0;
  &.updatePhone {
    padding-bottom: 30px;
  }
  @media (max-width: 768px) {
    padding: 30px;
  }

  .facebook-login-button {
    width: 100%;
    height: 48px;
    text-align: center;
    background: #4267b2;
    margin-bottom: 10px;
    border-radius: 6px;
    padding: 0px 30px;
    font-size: 15px;
    font-family: "Lato";
    color: #ffffff;
    font-weight: 700;
    border: 0px;

    .fa-facebook {
      margin-right: 7px;
    }
  }

  .google-login-button {
    width: 100%;
    height: 48px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 6px !important;
    padding: 0px 30px !important;
    font-size: 15px !important;
    font-family: "Lato" !important;
    font-weight: 700 !important;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 1px;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 30px;

  img {
    max-width: 160px;
  }
`;

export const Heading = styled.h3`
  margin-bottom: 10px;
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 20px;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
  // border: 1px solid #009e7f;
  border-radius: 7px;
  // background: aliceblue;
`;

export const ResponseMessage = styled.span`
  margin-bottom: 30px;
  margin-top: 20px;
  padding: 20px;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
  text-align: left;

  span {
    font-weight: 800;
    cursor: pointer;
  }
`;

export const OfferSection = styled.div`
  padding: 20px;
  background-color: ${themeGet("colors.gray.200", "#F7F7F7")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Offer = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0;
`;

export const HelperText = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.blue.link", "#4285f4")};
    text-decoration: underline;
  }
`;

// export const Input = styled.input`
//   width: 100%;
//   height: 48px;
//   border-radius: ${themeGet('radii.base', '6px')};
//   background-color: ${themeGet('colors.gray.200', '#f7f7f7')};
//   border: 1px solid ${themeGet('colors.gray.700', '#e6e6e6')};
//   font-family: ${themeGet('fonts.body', 'Lato')};
//   font-size: ${themeGet('fontSizes.base', '15')}px;
//   font-weight: ${themeGet('fontWeights.regular', '400')};
//   color: ${themeGet('colors.text.bold', '#0D1136')};
//   line-height: 19px;
//   padding: 0 18px;
//   box-sizing: border-box;
//   transition: border-color 0.25s ease;
//   margin-bottom: 10px;

//   &:hover,
//   &:focus {
//     outline: 0;
//   }

//   &:focus {
//     border-color: ${themeGet('colors.primary.regular', '#009e7f')};
//   }

//   &::placeholder {
//     color: ${themeGet('colors.text.regular', '#77798c')};
//     font-size: calc(${themeGet('fontSizes.base', '15')}px + 1px);
//   }

//   &::-webkit-inner-spin-button,
//   &::-webkit-outer-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
//   }

//   &.disabled {
//     .inner-wrap {
//       cursor: not-allowed;
//       opacity: 0.6;
//     }
//   }
// `;

export const Divider = styled.div`
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.regular", "400")};
    color: ${themeGet("colors.text.bold", "#0D1136")};
    line-height: 1;
    background-color: ${themeGet("colors.white", "#ffffff")};
    z-index: 1;
    position: relative;
    padding: 0 10px;
  }

  &::before {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${themeGet("colors.gray.500", "#f1f1f1")};
    position: absolute;
    top: 50%;
  }
`;

export const LinkButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  padding: 0;
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
  text-decoration: underline;
  cursor: pointer;
`;
