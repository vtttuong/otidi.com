import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const BoxItem = styled.div`
  padding: 5px 25px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  &.top {
    position: relative;
    top: -10px;
  }
  &.contentDetail {
    &.read {
      background: #eae8e8;
    }
    border-top: 1px solid rgb(234 232 232);
    padding: 0;
    padding-bottom: 10px;
    display: block;
    cursor: default;
    position: relative;
    &:hover {
      cursor: default;
      background: #d6d1d1a3;
    }
  }
`;

export const NotificationWrapper = styled.div`
  overflow: auto;
  max-height: 260px;

  &.notification-wrapper {
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
      background-color: #fffff;
    }
    ::-webkit-scrollbar {
      width: 5px;
      background-color: #fffff;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #666d92;
      border: 2px solid #666d92;
    }
  }
`;

export const BoxItemTitle = styled.p`
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  &.title {
    color: #009e7f;
  }
`;

export const OutOfData = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  font-family: "Lato";
  color: #009e7f;
`;

export const NavLinkDiv = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin: 0 7px;
  cursor: pointer;
  position: relative;
  &.have-noti {
    animation: bell 1s 1s both infinite;
    @keyframes bell {
      0% {
        transform: rotate(0);
      }
      10% {
        transform: rotate(30deg);
      }
      20% {
        transform: rotate(0);
      }
      80% {
        transform: rotate(0);
      }
      90% {
        transform: rotate(-30deg);
      }
      100% {
        transform: rotate(0);
      }
    }
  }
  span {
    color: #f1ecec;
    width: 16px;
    height: 16px;
    background: red;
    border-radius: 50%;
    /* display: inline; */
    position: absolute;
    right: 2px;
    top: -5px;
    text-align: center;
  }
`;
export const BoxItemTime = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #666d92;
  cursor: pointer;
  &.more {
    font-size: 20px;
    position: absolute;
    right: 25px;
    bottom: 7px;
    cursor: pointer;
    width: auto;
    min-width: 40%;
    text-align: right;

    &:hover {
      b {
        display: inline;
      }
    }
    b {
      font-size: 12px;
      color: #fff;
      padding: 5px;
      background: #009e7f;
      top: -22px;
      right: 0;
      position: absolute;
      min-width: 70px;
      display: none;
    }
  }
  &.content {
    padding: 0 25px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    top: 0px;
    display: block;
    position: relative;
    color: #666d92;
  }
`;
export const BoxRemove = styled.div`
  padding: 2px;
  top: -2px;
  position: relative;
  color: red;
  border-bottom: 1px solid;
  font-weight: 600;
  color: rgb(252, 92, 99);
  &.all {
    border-bottom: 0;
    text-align: center;
    top: 5px;
    color: #009e7f;
  }
`;

export const AlertDot = styled.div`
  color: red,
  position: 'absolute',
  top: '-4px',
  right: '-2px',
  display: 'flex',
`;

export const NotificationIconWrapper = styled.div`
  display: 'flex',
  position: 'relative',
  margin: '0 45px',
  cursor: 'pointer',

  '@media only screen and (max-width: 767px)': {
    margin: '0 20px',
  },

  '@media only screen and (min-width: 768px) and (max-width: 991px)': {
    margin: '0 30px',
  },
`;

export const RightMenuBox = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .menu-icon {
    min-width: 14px;
    margin-right: 7px;
  }

  .menu-item {
    a {
      font-family: ${themeGet("fonts.body", "Lato")};
      font-size: ${themeGet("fontSizes.base", "15")}px;
      font-weight: ${themeGet("fontWeights.bold", "700")};
      color: ${themeGet("colors.text.bold", "#0D1136")};
      line-height: 1.2em;
      display: block;
      transition: 0.15s ease-in-out;
      display: flex;
      align-items: center;
      margin-right: 45px;

      @media (max-width: 1400px) {
        margin-right: 35px;
        font-size: ${themeGet("fontSizes.base", "15")}px;
      }
      &:hover {
        color: ${themeGet("colors.primary.regular", "#009e7f")};
      }
      &.current-page {
        color: ${themeGet("colors.primary.regular", "#009e7f")};
      }
    }
  }

  .user-pages-dropdown {
    .popover-handler {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .popover-content {
      .inner-wrap {
        /* padding: ; */
      }
    }
  }
`;

export const NoItem = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
