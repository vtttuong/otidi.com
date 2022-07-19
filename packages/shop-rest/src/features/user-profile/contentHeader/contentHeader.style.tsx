import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Row as Rows, Col as Cols } from "react-styled-flexboxgrid";

const ButtonFollow = styled.div`
  background-color: #009e7f;
  margin-right: 5px;
  height: 40px;
  padding: 7px;
  margin-top: 10px;
  text-align: center;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &.following {
    background: #ffc107;
  }
  img {
    filter: brightness(0) invert(1);
    margin-right: 7px;
  }
`;
const ItemRate = styled.span`
  position: relative;
  top: 3px;
  left: 10px;
  cursor: pointer;
  &:hover {
    color: #009e7f;
  }
`;
const ContentHeaderWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  &.voucher {
    max-width: 500px;
    height: 100px;
    margin: 0;
    @media only screen and (max-width: 426px) {
      height: 100px !important;
      div,
      p {
        font-size: 13.5px !important;
      }
    }
  }
  flex-direction: column;
  border-top: 3px solid #009e7f;
  margin-bottom: 20px;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  font-family: ${themeGet("fonts.body", "sans-serif")};

  @media only screen and (max-width: 426px) {
    // height: 550px !important;
  }

  @media only screen and (max-width: 1199px) {
    height: max-content;
    width: 96%;
    margin: 0 auto;

    // margin-left: 20px;

    .col {
      border-right: 1px solid transparent !important;
    }
  }

  @media only screen and (max-width: 850px) {
    width: 95%;
  }

  @media only screen and (max-width: 650px) {
    width: 92%;
  }

  & .avatar-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
  }
`;

const SettingsForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeadingSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
`;

const SettingsFormContent = styled.div`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Row = styled(Rows)`
  &.header-profile {
    // height: 200px !important;
    margin-bottom: 0;
    @media (max-width: 1025px) {
      // height: 500px !important;
    }
  }
  &.header-voucher {
    .coin-icon {
      display: flex;
      > img {
        margin-right: 5px;
        width: 25px;
        height: 25px;
      }
    }
  }
  margin-bottom: 40px;
  @media only screen and (min-width: 0em) and (max-width: 47.99em) {
    margin-bottom: 30px;
  }
`;

const Col = styled(Cols)`
  @media only screen and (min-width: 0em) and (max-width: 47.99em) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  .radioGroup {
    flex-grow: 1;
    justify-content: space-between;

    label {
      margin-top: 0;
      flex: calc(33.333333333% - 10px);
      max-width: calc(33.333333333% - 10px);
      margin-bottom: 15px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      @media (max-width: 700px) {
        flex: calc(50% - 10px);
        max-width: calc(50% - 10px);

        &:nth-child(3n) {
          margin-right: 15px;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }
      }

      @media (max-width: 480px) {
        flex: 100%;
        max-width: 100%;
        margin-right: 0;

        &:nth-child(3n) {
          margin-right: 0;
        }

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }

  .add-button {
    flex: calc(33.3333333333% - 10px);
    max-width: calc(33.3333333333% - 10px);
    flex-shrink: 0;
    height: auto;
    min-height: 77px;
    border: 1px dashed ${themeGet("colors.gray.500", "#f1f1f1")};
    margin-bottom: 15px;
    margin-left: 0;
    margin-right: auto;
    &:hover {
      border-color: ${themeGet("colors.primary.regular", "#009e7f")};
    }

    @media (max-width: 700px) {
      flex: calc(50% - 10px);
      max-width: calc(50% - 10px);
    }

    @media (max-width: 480px) {
      flex: 100%;
      max-width: 100%;
    }
  }
`;

const GroupButtons = styled.div`
  span.active,
  a.active {
    background: #009e7f;
    position: relative;
    b {
      display: none;
    }
    &:hover {
      b {
        position: absolute;
        display: inline;
        background: #2040bb;
        padding: 0 3px;
        top: -20px;
        border-radius: 5px;
        font-size: 10px;
        width: 100px;
        text-align: center;
      }
    }
  }
  span.deactive,
  a.deactive {
    position: relative;
    background: #aba8a8;
    b {
      display: none;
    }
    &:hover {
      b {
        position: absolute;
        background: #7d7e82;
        display: inline;
        padding: 0 3px;
        top: -20px;
        border-radius: 5px;
        font-size: 10px;
        width: 100px;
        text-align: center;
      }
    }
  }
  display: flex;
  margin-top: 5px;
  @media only screen and (max-width: 1859px) {
    margin-top: 30px;
    margin-left: -78px;
  }
  a.active {
    background-color: #009e7f !important;
  }
  a {
    background-color: #888888;
  }
`;

export {
  SettingsForm,
  ButtonFollow,
  ItemRate,
  HeadingSection,
  Title,
  SettingsFormContent,
  Col,
  Row,
  ButtonGroup,
  ContentHeaderWrapper,
  GroupButtons,
};
