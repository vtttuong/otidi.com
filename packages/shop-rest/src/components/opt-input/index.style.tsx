import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { Button } from "components/button/button";
export { Button };

export const Wrapper = styled.div`
  text-align: center;

  background-color: ${themeGet("colors.white", "#ffffff")};
`;

export const Container = styled.div`
  padding: 40px 60px 0;
  &.updatePhone {
    padding-bottom: 30px;
  }
  @media (max-width: 768px) {
    padding: 40px 30px 0;
  }
  div.box-button{
    display: flex;
    margin-top: 35px;
    justify-content: center;
    >button{
        margin-right:10px
    }
  }
div.box-otp{
    >div{
        justify-content: center;
        >div{
            width:72px;
            height:60px;
        }
    }
    input{
        width:60px !important;
        height:60px;
        border: 1px solid #009e7f;
        font-weight:600;
        font-size:16px;
        &:hover{
        }

    }
}
 
  
`;


export const Heading = styled.h3`
  margin-bottom: 10px;
  font-family: ${themeGet("fonts.heading", "sans-serif")};
  font-size: ${themeGet("fontSizes.lg", "21")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
`;

export const SubHeading = styled.span`
  margin-bottom: 30px;
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  display: block;
`;




export const HelperText = styled.p`
  font-family: ${themeGet("fonts.body", "Lato")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.blue.link", "#4285f4")};
    text-decoration: underline;
  }
`;

