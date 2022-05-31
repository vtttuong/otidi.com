import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import NavLink from "components/nav-link/nav-link";

const NoticeWrapper = styled.div`
  box-sizing: border-box;
  .btn-remove {
    position: absolute;
    right: -12px;
    color: #000;
    top: -12px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgb(228, 228, 228);
    text-align: center;
    font-size: 15px;
  }
  display: flex;
  width: 30%;
  margin: 0 auto;
  position: fixed;
  left: 35%;
  bottom: 0;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 10px;
  bottom: 20px;
  padding: 10px;
 
  &.notice-success {
    background: #0a735f;
    color: #fff;
    font-weight: 600;
  }
  &.notice-error {
    background: #0b1c21;
    color: #fff;
    font-weight: 600;
  }
  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 30px;
  }
  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`;

const SidebarWrapperTwo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  // border-top: 3px solid #009e7f;
  margin-bottom: 20px;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
  background-color: ${themeGet("colors.white", "#ffffff")};
  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
  background-color: ${themeGet("colors.gray.200", "#f7f7f7")};
`;

const SidebarMenu = styled(NavLink) <any>`
  display: flex;
  a {
    font-family: ${themeGet("fonts.body", "Lato")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.text.bold", "#0D1136")};
    transition: color 0.35s ease;
    padding: 15px 60px;

    &.current-page {
      color: ${themeGet("colors.primary.regular", "#009e7f")};
      border-left: 5px solid ${themeGet("colors.primary.regular", "#009e7f")};
      padding-left: 55px;
    }

    &:hover {
      color: ${themeGet("colors.primary.regular", "#009e7f")};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  transition: color 0.35s ease;
  padding: 15px 60px;
  outline: 0;

  &:hover {
    color: ${themeGet("colors.primary.regular", "#009e7f")};
  }

  &:focus {
    box-shadow: none;
  }

  margin-bottom: 0;
`;

export {
  NoticeWrapper,
  SidebarWrapperTwo,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
};
