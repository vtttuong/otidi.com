import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Button } from "components/button/button";
import { Warning } from "assets/icons/Warning";
export { Button };

export const IconWrapper = styled.div`
  display: flex;
  margin-right: 6px;
`;
export const ActionButton = styled.button`
  position: relative;
  width: 30%;
  color: #000;
  padding: 10px 0 6px 0;
  padding-left: 25px;
  height: 44px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  display: flex;
  background: #009e7f;
  border-radius: 5px;

  p {
    margin: 0 auto;
    display: block;
  }
  > svg,
  img {
    position: absolute;
    color: #fff;
    top: 10px;
    left: 10px;
    filter: brightness(0) invert(1);
  }
`;
export const Title = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: #fff;
  padding-left: 5px;
  padding-right: 10px;
  &.title {
    color: #0055aa;
    font-size: 18px;
    margin: 15px 0;
  }
`;

export const Input = styled.input`
  background: transparent;
`;

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
`;
export const Choose = styled.div`
  border-radius: 50%;
  border: 1px solid #dadada;
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
`;

export const Container = styled.div`
  padding: 40px;
  &.warning-modal {
    display: flex;
    padding: 30px;
    img {
      margin-right: 20px;
      width: 50px;
    }
    h3 {
      align-self: center;
      margin-bottom: 0;
      color: #ad8716;
    }
  }
  div.bargain {
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #009e7f;
      border-radius: 9px;
      margin-bottom: 10px;
    }
  }
  .option-push {
    display: flex;
  }
  .title-like {
    margin-top: -10px;
  }
  .user-like {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    img.avatar-image {
      width: 44px;
      height: 44px;
      border-radius: 50%;
    }
    > p {
      cursor: pointer;
      width: 50%;
      text-align: left;
      span {
        font-weight: 600;
        margin-left: 7px;
        font-size: 16px;
      }
    }
  }
  .report {
    margin-top: 20px;

    & label {
      display: block;
      text-align: start !important;
      width: 100%;
    }
    > div {
      padding: 0;
      textarea {
        padding: 5px;
        border-radius: 5px;
        max-width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 30px;

  img {
    max-width: 160px;
  }
`;

export const Heading = styled.h3`
  margin-bottom: 20px;
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
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
