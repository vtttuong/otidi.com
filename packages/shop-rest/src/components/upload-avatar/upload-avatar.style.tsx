import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const ProfileImageDiv = styled.div`
  text-align: center;
`;

const MainDiv = styled.div`
  text-align: center;
  span {
    font-size: 14px;
    top: 2px;
    position: relative;
  }
  .profile-image {
    height: 100px;
    width: 100px;
    border: 1px solid grey;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
    object-fit: cover;
  }

  .front-image {
    height: 200px;
    width: auto;
    margin-bottom: 10px;
    object-fit: fill;
  }

  .label-upload {
    // background-color: #41b4b4;
    // border: 1px solid ${themeGet("colors.gray.700", "#e6e6e6")};
    color: black;
    padding: 8px 15px;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    min-width: 200px;
    margin-left: -55px;
  }
`;

export { ProfileImageDiv, MainDiv };
