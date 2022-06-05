import {styled} from "baseui";
import stylede from "styled-components";

export const BoxAvatar = stylede.div`
  display:flex;
  &.id{
    justify-content: center;
  }
  img.id{
    max-height:250px;
    width:100%;
    max-width:100%;
    width:auto;
    height:auto;
    margin-right:unset;
    border-radius:unset;
  }
  div.rating{
    width:30%;
    text-align:center;
    span{
      font-weight:600;
    }
    img,svg{
      width:20px;
      height:20px;
      position:relative;
      top:4px;
      margin-left:1.5px;
    }
  }
  img{
    max-width:150px;
    width:90px;
    height:90px;
    margin-right:15px;
    border-radius:50%;
  }
`;
export const Form = stylede.form`
  background-color: #f7f7f7;
  padding-bottom: 100px;
  .addInfo{
    padding:10px
  }
`;
export const DrawerTitleWrapper = styled("div", ({$theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "-55px 0 30px",
  position: "fixed",
}));

export const DrawerTitle = styled("h3", ({$theme}) => ({
  ...$theme.typography.fontBold18,
  margin: 0,
  color: $theme.colors.textDark,
}));

export const FieldDetails = styled("span", ({$theme}) => ({
  ...$theme.typography.font14,
  padding: "28px 0 15px",
  color: $theme.colors.textNormal,
  display: "block",

  "@media only screen and (max-width: 991px)": {
    padding: "30px 0",
  },
}));

export const ButtonGroup = styled("div", ({$theme}) => ({
  padding: "30px 60px",
  display: "flex",
  alignItems: "center",
  position: "fixed",
  bottom: "0",
  right: "0",
  width: "100%",
  backgroundColor: "#ffffff",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",

  "@media only screen and (max-width: 767px)": {
    padding: "20px 30px",
  },
}));

export const ModelsWrapper = styled("div", () => ({
  marginBottom: "20px",
}));

export const ModelInputWrapper = styled("div", () => ({
  display: "flex",
  gap: "10px",
  justifyContent: "start",
  marginBottom: "20px",
  alignItems: "center",
}));
export const CloseIconWrapper = styled("div", () => ({
  cursor: "pointer",
  background: "rgb(247, 247, 247)",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
}));
