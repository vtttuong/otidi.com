import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const PopoverWrapper = styled.div`
  div.have-noti {
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
  position: relative;
  cursor: pointer;
  z-index: 99;
  &.notificationTab {
    .popover-content {
      min-width: 400px;
      overflow: hidden;
      left: unset;
      right: 0;
    }
  }

  &.action-post {
    // position: absolute;
    margin-left: auto;

    right: 10px;
    .popover-handler {
      position: relative;
      top: -4px;
      span {
        font-size: 20px;
      }
    }
    .popover-content {
      padding: 0;
      min-width: 190px;
      overflow: hidden;
      left: -158px;
      bottom: 30px !important;
      top: initial;

      .action p {
        padding: 7px 12px;
        font-size: 14px;
      }
      .action p:hover {
        background: #f1f1f1;
      }
    }
  }
  .popover-handler {
    display: inline-block;
    cursor: pointer;
  }

  .popover-content {
    left: -20px;
    top: calc(100% + 15px);
    display: block;
    min-width: 350px;
    padding: 15px;
    position: absolute;
    border-radius: ${themeGet("radii.base", "6px")};
    background-color: ${themeGet("colors.white", "#ffffff")};
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    z-index: 99;
    &:before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 9px 8px;
      border-color: transparent transparent
        ${themeGet("colors.white", "#ffffff")} transparent;
      top: -8px;
      left: 15px;
      box-shadow: -4px -4px 8px -3px rgba(142, 142, 142, 0.14);
      pointer-events: none;
    }
  }

  /* If direction prop set to right */
  &.right {
    .popover-content {
      left: auto;
      right: 0px;
      &:before {
        left: auto;
        right: 15px;
      }
    }
  }
`;

export default PopoverWrapper;
