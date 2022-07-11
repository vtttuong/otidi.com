import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const InfoBody = styled.div`
  width: 100%;
  @media (max-width: 767px) {
    width: 100%;
  }
  &.default {
    opacity: 0.7;
  }
  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;
const TopContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    width: 100%;
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;
const CenterContainer = styled.div`
  border: 1px solid #dcd4d4;
  width: 100%;
  padding: 5%;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  @media (max-width: 767px) {
    width: 100%;
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;
const CenterContainerSub = styled.div`
  width: 100%;
  margin: 20px 0;
  position: relative;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ActionButton = styled.div`
  position: relative;
  &.following {
    background: #ffc107;
  }
  cursor: pointer;
  width: 100%;
  color: #000;
  padding: 10px;
  padding-left: 25px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
    top: 11px;
    left: 22px;
    filter: brightness(0) invert(1);
  }
  &.chat {
    padding: 0;
    width: 100%;
    margin-left: 0;
    background: #009e7f;
    border-radius: 5px;
    color: #fff;
    margin-bottom: 10px;
    height: 50px;
    > button {
      font-size: 16px;
      margin-top: -5px;
    }
  }
  @media (max-width: 767px) {
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;
const CartPopupBody = styled.div`
  height: auto;
  width: 385px;
  display: flex;
  flex-direction: column;
  border-radius: ${themeGet("radii.base", "6px")};
  background-color: ${themeGet("colors.white", "#ffffff")};
  box-sizing: content-box;

  @media (max-width: 767px) {
    width: 100%;
  }

  .cart-scrollbar {
    height: 100%;
    max-height: calc(100vh - 245px);

    @media (max-width: 767px) {
      max-height: 330px;
    }
  }
`;

const PopupHeader = styled.div`
  padding: 15px 25px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};

  @media (max-width: 766px) {
    justify-content: center;
  }
`;

const PopupItemCount = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${themeGet("colors.primary.regular", "#009E7F")};

  span {
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.primary.regular", "#009E7F")};
    padding-left: 10px;

    @media (max-width: 767px) {
      font-size: ${themeGet("fontSizes.sm", "13")}px;
    }
  }
`;

const CloseButton = styled.button`
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: 0;
  flex-shrink: 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  background-color: transparent;

  &:hover {
    color: ${themeGet("colors.red", "#ea4d4a")};
  }

  @media (max-width: 767px) {
    position: absolute;
    top: -45px;
    background-color: ${themeGet("colors.white", "#ffffff")};
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.5);
  }

  &.fixedCartClose {
    @media (min-width: 991px) {
      display: none;
    }
  }
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const ItemCards = styled.div`
  width: 100%;
  padding: 15px 25px;
  display: inline-flex;
  align-items: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  margin-bottom: 1px;
  box-sizing: border-box;
`;

const ItemImgWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemDetails = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const ItemTitle = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  width: 10px;
  height: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  outline: 0;
  margin-left: 15px;
  flex-shrink: 0;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  background-color: transparent;

  &:hover {
    color: #ea4d4a;
  }
`;

const PromoCode = styled.span`
  margin: 20px 0;
  display: flex;
  justify-content: center;

  > button {
    border: 0;
    outline: 0;
    box-shadow: none;
    background-color: transparent;
    display: inline-flex;
    cursor: pointer;
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.primary.regular", "#009E7F")};
    transition: color 0.35s ease;
    &:hover {
      color: ${themeGet("colors.primary.hover", "#019376")};
    }
  }
`;

const CheckoutButton = styled.button`
  height: 48px;
  width: calc(100% - 30px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 48px;
  border: 0;
  outline: 0;
  cursor: pointer;
  /* margin-top: auto; */
  margin-bottom: 15px;
  margin-left: 15px;

  @media (max-width: 767px) {
    height: 45px;
  }

  > a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 30px;
  }
`;

const CheckoutButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  flex-shrink: 0;
`;

const Title = styled.p`
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
  &.info {
    color: #000;
    font-size: 18px;
  }
  &.chat {
    // color:#fff;
  }
  &.infosub.phone {
    cursor: pointer;
    font-weight: 600;
    span {
      color: blue;
    }
  }
  &.infosub {
    color: #8e8e8e;
    font-size: 14px;
    margin-top: 5px;
  }
`;
const LinkRedirect = styled.a`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: #0055aa;
  position: absolute;
  right: 0;
  top: 15px;
`;
const PriceBox = styled.span`
  width: auto;
  height: 44px;
  padding: 0 30px;
  overflow: hidden;
  border-radius: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  margin-right: 2px;

  @media (max-width: 767px) {
    height: 41px;
  }
`;

const NoPostMsg = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
  width: 100%;
  padding: 40px 0;
  text-align: center;
`;

export const NoPostImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 50px;

  @media (max-width: 580px) {
    margin-top: 20px;
  }

  svg {
    width: 140px;
    height: auto;

    @media (max-width: 580px) {
      width: 110px;
    }
  }
`;

const CouponBoxWrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  flex-direction: column;
  padding-right: 22px;
`;

const CouponCode = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.medium", "500")};
  color: ${themeGet("colors.text.regular", "#77798c")};

  width: 100%;
  display: flex;
  justify-content: center;

  span {
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.primary.regular", "#009E7F")};
    margin-left: 5px;
  }
`;

const ErrorMsg = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.secondary.hover", "#FF282F")};
  padding-top: 10px;
  display: flex;
  justify-content: center;
`;

const CartSlidePopup = styled.div`
  width: 420px;
  height: 100vh;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: fixed;
  bottom: 0;
  right: -450px;
  z-index: 1010;
  box-shadow: ${themeGet("shadows.big", "0 21px 36px rgba(0, 0, 0, 0.16)")};
  transition: all 0.35s ease-in-out;

  @media (max-width: 580px) {
    width: 100%;
    display: none;
  }

  @media (min-width: 581px) {
    display: block;
  }

  &.cartPopupFixed {
    right: 0;
  }

  ${CartPopupBody} {
    height: 100%;
    width: 100%;
  }

  ${ItemWrapper} {
    /* height: calc(100vh - 240px); */
    max-height: calc(100vh - 245px);
    background-color: ${themeGet("colors.white", "#ffffff")};
  }

  ${ItemCards} {
    border-bottom: 1px solid ${themeGet("colors.gray.200", "#f7f7f7")};
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    ${PopupHeader} {
      justify-content: space-between;
    }

    ${CloseButton} {
      top: auto;
      position: relative;
      background-color: transparent;
    }
  }
`;
const MainAvatar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  flex-direction: row;
  margin-bottom: 10px;
  border: 0 !important;
  &.border {
    border-bottom: 1px solid #f7f7f7 !important;
  }
  &.name {
    flex-direction: column;
    width: auto;
  }
  &.sub {
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (min-width: 769px) and (max-width: 1000px) {
      width: 100%;
    }
  }
  &.subRate {
    flex-direction: column;
  }

  &.follow {
    @media (min-width: 769px) and (max-width: 1000px) {
      flex-direction: column;
    }
  }
`;
const Name = styled.h5`
  font-weight: 600;
  &.df {
    background: #cac6c6;
    color: transparent;
  }
  &.rate {
    text-decoration: unset !important;

    position: relative;
    top: -5px;
  }
  &.subInfo {
    font-weight: 300;
    color: grey;
    font-size: 15px;
    text-decoration: underline;
    width: auto;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
  }
  &.status {
    font-weight: 300;
    color: grey;
    font-size: 13px;
    display: flex;
    flex-direction: row;
    top: 15px;
    position: relative;
  }
  &:hover {
    cursor: pointer;
  }
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  background: grey;
  top: 2px;
  position: relative;
  &.active {
    background: green;
  }
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  object-fit: cover;

  &:hover {
    cursor: pointer;
  }
`;
const ContainerImage = styled.div`
  display: flex;
  margin: 10px 0;
  &.star {
    margin-top: -2px;
  }
`;

const TextFormat = styled.span`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  line-height: 1.5;
`;

export {
  MainAvatar,
  Avatar,
  Name,
  Dot,
  ContainerImage,
  Title,
  TopContainer,
  CenterContainer,
  CenterContainerSub,
  LinkRedirect,
  InfoBody,
  ActionButton,
  CartSlidePopup,
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  PromoCode,
  CloseButton,
  ItemCards,
  ItemImgWrapper,
  ItemDetails,
  ItemTitle,
  DeleteButton,
  CheckoutButton,
  CheckoutButtonWrapper,
  PriceBox,
  NoPostMsg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
  ErrorMsg,
  TextFormat,
};
