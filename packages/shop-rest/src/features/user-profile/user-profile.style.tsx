import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const PageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: ${themeGet("colors.white", "#ffffff")};
  padding: 140px 250px 40px;
  &.voucher {
    align-items: center;
    justify-content: center;
    flex-direction: column !important;
    @media only screen and (max-width: 426px) {
    }
  }

  @media only screen and (max-width: 990px) {
    padding: 100px 0 60px;
  }
  .other-profile-content {
    width: 100%;
  }
  @media only screen and (min-width: 991px) and (max-width: 1280px) {
    padding: 130px 50px 60px;
  }
  @media only screen and (min-width: 1281px) and (max-width: 1400px) {
    padding: 130px 100px 60px;
    max-width: 1100px;
    margin: 0 auto;
  }
`;

const SidebarSection = styled.div`
  width: 300px;
  flex-shrink: 0;
  margin-right: 30px;

  @media only screen and (max-width: 1199px) {
    // display: none;
  }
`;

const ContentBox = styled.div`
  &.order {
    margin-top: 0;
  }
  &.voucher {
    padding: 0;
    border: 0;
    border-top: 2px solid #009e7f;
    padding-top: 5px;
  }

  width: 100%;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
  margin-top: 20px;
  border-top: 3px solid #009e7f;
  font-family: ${themeGet("fonts.body", "sans-serif")};

  @media only screen and (max-width: 1199px) {
    width: 100%;
    border: 0;
    padding: 20px;
  }
`;

const ItemCard = styled.div`
  width: 33%;
  padding: 10px;
  &.voucher {
    width: 100%;
    border-bottom: 1px solid #009e7f;
    padding: 0;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  &.other {
    width: 25%;
  }
  @media only screen and (max-width: 990px) {
    width: 50%;
    padding: 10px;
  }
`;

const TabContain = styled.div`
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 0px 0px;
  font-family: ${themeGet("fonts.body", "sans-serif")};
  // border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
    &.voucher{
    padding:0 !important;
    ul.tab-voucher >li{
      width:33.3% ;
    }
  }
  &.voucher-container {
    max-width: 500px;
  }
  @media only screen and (max-width: 1199px) {
    width: 100%;
    border: 0;
    padding: 20px;
  }
  &.voucher{
    padding:0;

    >ul li{
      width:33%;
      tabpanel-item{
        border-right:0;
         border-left:0
      }
      .tabpanel-item-active{
        border-bottom: 2px solid red;
        border-top: none;
        border-left:0 !important;
        &:hover {
        border-top: none;
      }
    }
  }
`;

const BodyContain = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-right: 3%;

  @media only screen and (max-width: 1199px) {
    width: 100%;
    padding: 20px;
    margin-right: 0%;
  }
`;

const ContainBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  &.voucher-container {
    max-width: 500px;
    @media (max-width: 426px) {
      padding: 15px;
      div,
      p {
        font-size: 13px !important;
      }
    }
  }
  .get-poin-box {
    width: 87%;
    color: #000;
    display: flex;
    align-items: center;

    h4 {
      font-size: 15px;
      font-weight: 500;
    }
    img {
      width: 40px;
      margin-right: 5px;
    }
  }
  @media only screen and (max-width: 1199px) {
    display: flex;
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  &.voucher {
    max-width: 500px;
  }
  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`;

export {
  PageWrapper,
  SidebarSection,
  ContentBox,
  TabContain,
  ItemCard,
  BodyContain,
  ContainBody,
  ContentContainer,
};
