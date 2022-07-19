import { styled } from "baseui";
import stylede from "styled-components";
import Images from "../Image/Image";

export const PostCardWrapper = styled("div", ({ $theme }) => ({
  height: "100%",
  width: "100%",
  backgroundColor: "#ffffff",
  position: "relative",
  fontFamily: $theme.typography.primaryFontFamily,
  cursor: "pointer",
}));

export const PostImageWrapper = stylede.div`
  height: 240px;
  padding: 10px;
  position: relative;
  border-bottom: 1px solid #dcd9d9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img.product-image{
    height:100% !important;
  };

  @media only screen and (max-width: 767px) {
    height: 165px
  };
`;

export const Image = styled(Images, () => ({
  maxWidth: "100%",
  maxHeight: "100%",
  display: "inline-block",
}));
export const ImageAvatar = styled(Images, () => ({
  maxWidth: "100%",
  maxHeight: "100%",
  display: "inline-block",
  borderRadius: "50%",
  objectFit: "cover",
  width: "100% !important",
  height: "auto",
}));

export const SaleTag = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  // backgroundColor: $theme.colors.warning,
  padding: "0 10px",
  lineHeight: "2",
  borderRadius: "12px",
  display: "inline-block",
  position: "absolute",
  top: "15px",
  right: "15px",
}));

export const DiscountPercent = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  lineHeight: "2",
  backgroundColor: $theme.colors.red400,
  paddingLeft: "20px",
  paddingRight: "15px",
  display: "inline-block",
  position: "absolute",
  bottom: "10px",
  right: "0",

  ":before": {
    content: '""',
    position: "absolute",
    left: "-8px",
    top: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 8px 12px 0",
    borderColor: `transparent ${$theme.colors.red400} transparent transparent`,
  },

  ":after": {
    content: '""',
    position: "absolute",
    left: "-8px",
    bottom: " 0",
    width: " 0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 0 12px 8px",
    borderColor: `transparent transparent ${$theme.colors.red400} transparent`,
  },
}));

export const WaitingTag = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  lineHeight: "2",
  backgroundColor: $theme.colors.yellow400,
  paddingLeft: "20px",
  paddingRight: "15px",
  display: "inline-block",
  position: "absolute",
  bottom: "10px",
  right: "0",

  ":before": {
    content: '""',
    position: "absolute",
    left: "-8px",
    top: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 8px 12px 0",
    borderColor: `transparent ${$theme.colors.yellow400} transparent transparent`,
  },

  ":after": {
    content: '""',
    position: "absolute",
    left: "-8px",
    bottom: " 0",
    width: " 0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 0 12px 8px",
    borderColor: `transparent transparent ${$theme.colors.yellow400} transparent`,
  },
}));
export const ActiveTag = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  lineHeight: "2",
  backgroundColor: $theme.colors.green400,
  paddingLeft: "20px",
  paddingRight: "15px",
  display: "inline-block",
  position: "absolute",
  bottom: "10px",
  right: "0",

  ":before": {
    content: '""',
    position: "absolute",
    left: "-8px",
    top: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 8px 12px 0",
    borderColor: `transparent ${$theme.colors.green400} transparent transparent`,
  },

  ":after": {
    content: '""',
    position: "absolute",
    left: "-8px",
    bottom: " 0",
    width: " 0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 0 12px 8px",
    borderColor: `transparent transparent ${$theme.colors.green400} transparent`,
  },
}));
export const SoldTag = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  lineHeight: "2",
  backgroundColor: $theme.colors.red400,
  paddingLeft: "20px",
  paddingRight: "15px",
  display: "inline-block",
  position: "absolute",
  bottom: "10px",
  right: "0",

  ":before": {
    content: '""',
    position: "absolute",
    left: "-8px",
    top: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 8px 12px 0",
    borderColor: `transparent ${$theme.colors.red400} transparent transparent`,
  },

  ":after": {
    content: '""',
    position: "absolute",
    left: "-8px",
    bottom: " 0",
    width: " 0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 0 12px 8px",
    borderColor: `transparent transparent ${$theme.colors.red400} transparent`,
  },
}));

export const BuyPost = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold12,
  color: "#ffffff",
  lineHeight: "2",
  backgroundColor: "#009E7F",
  paddingLeft: "20px",
  paddingRight: "15px",
  display: "inline-block",
  position: "absolute",
  bottom: "10px",
  right: "0",

  ":before": {
    content: '""',
    position: "absolute",
    left: "-8px",
    top: "0",
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 8px 12px 0",
    borderColor: `transparent #009E7F transparent transparent`,
  },

  ":after": {
    content: '""',
    position: "absolute",
    left: "-8px",
    bottom: " 0",
    width: " 0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "0 0 12px 8px",
    borderColor: `transparent transparent #009E7F transparent`,
  },
}));

export const PostInfo = styled("div", ({ $theme }) => ({
  padding: "20px 25px 30px",

  "@media only screen and (max-width: 767px)": {
    padding: "15px 20px",
    // minHeight: '123px',
  },
}));

export const PostTitle = stylede.div`
  font-size: 16px;
  color: black;
  margin: 0 0 7px 0;
  max-height: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  
  @media only screen and (max-width: 767px) {
    font-size: 14px,
    margin: 0 0 5px 0,
  };
`;

export const PostWeight = styled("span", ({ $theme }) => ({
  ...$theme.typography.font14,
  color: $theme.colors.textNormal,

  "@media only screen and (max-width: 767px)": {
    ...$theme.typography.font12,
  },
}));
export const PostAddress = stylede.div`
  img {
    width: 20px
  };
  span.address-admin {
     display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow: hidden;
   text-overflow: ellipsis;
  };
  @media only screen and (max-width: 767px) {},
`;
export const PostAddressIcon = styled("div", () => ({
  width: "20px",
  display: "inline-block",
  marginRight: "10px",
  lineHeight: "25px",
  "&.avatar": {
    width: "50px",
  },
  "@media only screen and (max-width: 767px)": {},
}));
export const PostAvatar = styled("div", () => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "inline-block",

  "@media only screen and (max-width: 767px)": {},
}));

export const PostMeta = styled("div", ({ $theme }) => ({
  marginTop: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  "@media only screen and (max-width: 767px)": {
    // minHeight: '32px',
  },
}));

export const OrderID = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,

  "@media only screen and (max-width: 767px)": {
    ...$theme.typography.fontBold12,
  },
}));

export const PostPriceWrapper = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
}));

export const PostPrice = styled("span", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.primary,

  "@media only screen and (max-width: 767px)": {
    ...$theme.typography.fontBold12,
  },
}));

export const DiscountedPrice = styled("span", ({ $theme }) => ({
  ...$theme.typography.font11,
  color: $theme.colors.textNormal,
  padding: "0 5px",
  position: "relative",
  overflow: "hidden",
  margin: "0 10px",

  ":before": {
    content: '""',
    width: "100%",
    height: "1px",
    display: "inline-block",
    backgroundColor: $theme.colors.textNormal,
    position: "absolute",
    top: "50%",
    left: "0",
  },
}));
