import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const PostDetailsWrapper = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  box-sizing: border-box;
  margin: 30px 15px;
  @media (max-width: 426px) {
    margin: 30px 0px;
  }
  ul.react-multi-carousel-dot-list {
    max-height: 70px;
  }
  .quick-view-modal-like {
    height: auto;
    max-height: 600px;
    overflow: auto;
  }

  * {
    box-sizing: border-box;
  }
  @media (min-width: 991px) {
    margin: 0 auto;
    max-width: 1200px;
    width: auto;
  }

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const PostPreview = styled.div`
  width: 68%;
  padding: 20px;
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

  img {
    display: block;
    max-width: 100%;
    max-height: 590px;
    cursor: pointer;
    height: auto;
    border-radius: 10px;
  }
  @media (max-width: 991px) {
    width: 99%;
    display: block;
    padding: 0;
    ul.react-multi-carousel-track {
      margin-bottom: 20px !important;
    }
  }
`;

export const BackButton = styled.div`
  position: relative;
  margin-bottom: 20px;
  z-index: 999;
  cursor: pointer;

  @media (max-width: 990px) {
    left: 25px;
    &.back {
      top: 0;
      left: 0;
    }
  }
  .reusecore__button {
    font-family: ${themeGet("fonts.body", "sans-serif")};
    font-size: ${themeGet("fontSizes.sm", "13")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.text.regular", "#77798C")};
    height: 30px;
    .btn-icon {
      margin-right: 5px;
    }
    .btn-text {
      padding: 0;
    }
  }
  &.reportItem {
    width: 50% !important;
    text-align: right;
    display: block;
    svg,
    img {
      left: 10px;
      top: 10px;
      position: absolute;
    }
  }
  &.saveIcon {
    width: auto;
    top: -25px;
    margin-bottom: 0 !important;
    svg,
    img {
      top: -2px;
      left: 0;
      position: absolute;
    }
  }
`;

export const PostInfo = styled.div`
  width: 100%;
  margin-top: 30px;
  //border-left: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};

  @media (max-width: 990px) {
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 30px 25px;
    border: 0;
    order: 1;
  }
  @media (max-width: 426px) {
    padding: 5px;
  }
`;

export const SaleTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${themeGet("colors.white", "#ffffff")};
  background-color: ${themeGet("colors.yellow.alternate", "#f4c243")};
  padding: 0 10px;
  line-height: 24px;
  border-radius: ${themeGet("radii.medium", "12px")};
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const DiscountPercent = styled.span`
  font-size: ${themeGet("fontSizes.xs", "12")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  line-height: 24px;
  background-color: ${themeGet("colors.secondary.regular", "#ff5b60")};
  padding-left: 20px;
  padding-right: 15px;
  position: relative;
  display: inline-block;
  position: absolute;
  bottom: 180px;
  right: -60px;
  -webkit-transform: translate3d(0, 0, 1px);
  transform: translate3d(0, 0, 1px);

  &:before {
    content: "";
    position: absolute;
    left: -8px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 12px 0;
    border-color: transparent ${themeGet("colors.secondary.regular", "#ff5b60")}
      transparent transparent;
  }

  &:after {
    content: "";
    position: absolute;
    left: -8px;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 12px 8px;
    border-color: transparent transparent
      ${themeGet("colors.secondary.regular", "#ff5b60")} transparent;
  }
`;

export const PostTitlePriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const PostTitle = styled.h1`
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: 25px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: #0055aa;
  line-height: 1.5;
  display: flex;

  @media (max-width: 767px) {
    word-break: break-word;
    font-size: 18px;
  }
`;

export const PostPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 25px;
  line-height: 31px;

  @media (max-width: 767px) {
    margin-left: 15px;
  }
`;

export const PostPrice = styled.div`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px + 1px);
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: red;
`;

export const SalePrice = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  font-style: italic;
  padding: 0 5px;
  overflow: hidden;
  position: relative;
  margin-right: 10px;

  &:before {
    content: "";
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const PostWeight = styled.div`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  margin-bottom: 20px;
  color: ${themeGet("colors.text.regular", "#77798C")};
`;

export const PostDescription = styled.div`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.medium", "#424561")};
  line-height: 2;
  margin-top: 30px;
  text-transform: lowercase;
  textarea {
    resize: none;
    overflow: hidden;
    min-height: 30px;
  }
`;

export const PostCartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
`;
export const H4Text = styled.h4`
  text-transform: capitalize;
  background: #009e7f;
  padding: 10px 7px;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;

  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
export const A = styled.a`
  color: #0055aa;
  &::after {
    content: ">";
    position: "absolute";
    width: 10px;
    height: 10px;
    margin: 0 5px;
  }
`;
export const Span = styled.span`
  color: rgba(0, 0, 0, 0.4);
  &.title {
    width: 50%;
  }
  // margin-right: 50px;

  &:first-child {
    color: #000;
    font-weight: 600;
    &::after {
      content: ":";
      margin-left: 5px;
    }
  }
`;
export const SubDetail = styled.div`
  display: flex;
  margin: 10px 0;
  width: 50%;
  float: left;
  > a:last-child {
    &::after {
      content: "";
    }
  }
`;
export const Detail = styled.div`
  display: flex;
  &.social-share {
    display: block;
    h2 {
      margin-bottom: 17px;
    }
    button {
      margin-right: 10px;
    }
  }
  flex-direction: column;
  &.comment {
    margin: 20px 0;
  }
  &.social {
    width: 100%;
    flex-direction: row;
    margin-bottom: 15px;
  }
  &.detail {
    display: block;
    overflow: overlay;
  }
`;

export const AuthorInfor = styled.div`
  width: 32%;
  padding: 20px 20px 20px 0;
  flex-shrink: 0;
  .fixedCartBox {
    width: 100%;
    box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
    /* height: 100vh; */
    .items-wrapper {
      height: calc(100vh - 385px);
    }
  }
  @media (max-width: 991px) {
    width: 60%;
    // width: 90%;
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    width: 99%;
    padding: 0;
  }
`;

export const PostCartBtn = styled.div`
  .cart-button {
    border-radius: 20px;
    padding-left: 20px;
    padding-right: 20px;

    .btn-icon {
      margin-right: 5px;

      svg {
        width: 14px;
        height: auto;
        @media (max-width: 990px) {
          width: 14px;
        }
      }
    }
  }
  .quantity {
    width: 115px;
    height: 38px;
  }
`;
export const ChatButtons = styled.div`
  @media (min-width: 576px) and (max-width: 991px) {
    display: flex;
    gap: 10px;
  }
`;

export const ButtonText = styled.span`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const PostMeta = styled.div`
  margin-top: 60px;

  @media (max-width: 767px) {
    margin-top: 40px;
  }
`;

export const MetaSingle = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
`;

export const MetaItem = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${themeGet("colors.gray.200", "#f7f7f7")};
  padding: 0 15px;
  border-radius: ${themeGet("radii.base", "6px")};
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RelatedItems = styled.div`
  margin: 0 auto;
  margin-top: 70px;
  max-width: 1200px;
  width: auto;

  @media (max-width: 990px) {
    margin-top: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
  @media (max-width: 426px) {
    margin-left: 0px;
    margin-right: 0px;
  }
  > h2 {
    font-family: ${themeGet("fonts.heading", "sans-serif")};
    font-size: ${themeGet("fontSizes.lg", "21")}px;
    font-weight: ${themeGet("fontWeights.semiBold", "600")};
    color: ${themeGet("colors.text.bold", "#0D1136")};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }

  > div > div {
    flex: 0 0 20%;
    max-width: 20%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;

    @media (max-width: 1400px) {
      flex: 0 0 25%;
      max-width: 25%;
    }
    @media (max-width: 1060px) {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
    }
    @media (max-width: 1199px) and (min-width: 991px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
    }
    @media (max-width: 767px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;
