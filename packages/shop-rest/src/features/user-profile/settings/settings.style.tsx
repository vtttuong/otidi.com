import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Row as Rows, Col as Cols } from "react-styled-flexboxgrid";

const SettingsForm = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  font-family: ${themeGet("fonts.body", "sans-serif")};
`;

const HeadingSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;
const ButtonCancle = styled.div`
  width: auto;
  background: #666;
  border-radius: 7px;
  padding: 13px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`;

const Title = styled.h3`
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
`;

const SettingsFormContent = styled.div`
  .change-pass > div {
    margin-bottom: 15px;
  }
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 100% !important;

  &:last-child {
    margin-bottom: 0;
  }
  .box {
    display: flex;
    width: 100%;
    @media (max-width: 426px) {
      display: block;
    }
  }

  form div.profile-right {
    @media (max-width: 426px) {
      width: 100%;
      padding-left: 7px;
    }
    padding: 7px;
    padding-left: 20px;
    width: 70%;
    label {
      font-weight: 600;
    }
    input {
      border-color: #f1f1f1;
      border-radius: 6px;
      background-color: #f7f7f7;
      font-family: Lato, sans-serif;
      padding: 0 7px;
      font-size: 15px;
      border: 0 !important;
      box-shadow: none;
      transition: unset;
      color: #000;
      &:hover {
        border: 1px solid #009e7f !important;
      }
    }
    // box-shadow: 20px 9px 25px rgba(0, 0, 0, 0.19), 0 3px 3px #f1f1f1;
  }
  .btn-submit-profile {
    display: block;
    width: 180px;
    text-align: center;
    margin: 20px auto;
    button {
      padding: 22px;
    }
  }
  form div.profile-left {
    .label-upload-front,
    .label-upload-back {
      margin-bottom: 20px;
    }
    @media (max-width: 426px) {
      width: 100%;
      max-width: 100%;
      padding-right: 0;
    }
    width: 30%;
    padding: 7px;
    padding-right: 20px;
    label {
      font-weight: 600;
    }
    input {
      border-color: #f1f1f1;
      border-radius: 6px;
      background-color: #f7f7f7;
      font-family: Lato, sans-serif;
      padding: 0 7px;
      font-size: 15px;
      border: 0 !important;
      box-shadow: none;
      transition: unset;
      color: #000;
      &:hover {
        border: 1px solid #009e7f !important;
      }
    }
    // border-right: 1px solid #009e7f6e;
  }
`;

const Row = styled(Rows)`
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
export {
  SettingsForm,
  HeadingSection,
  Title,
  SettingsFormContent,
  Col,
  Row,
  ButtonGroup,
  ButtonCancle,
};
