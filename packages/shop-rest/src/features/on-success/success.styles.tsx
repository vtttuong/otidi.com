import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Row as Rows, Col as Cols } from "react-styled-flexboxgrid";


export const ContainerCategory = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  border-radius: ${themeGet("radii.base", "6px")};
  overflow: hidden;
  position: relative;
  padding: 20px 17px;
  text-align: center;
  img{
    width: 30%;
  }
  .text{
    font-size:22px;
    font-weight: bold;
    color: #dc6060;
  }
  a{
    color: #444;
    font-size: 20px;
    border: 2px solid #009e7f;
    padding: 5px 10px;
    margin-top: 10px;
    display: inline-block;
    border-radius: 10px;
  }
 }
`;
