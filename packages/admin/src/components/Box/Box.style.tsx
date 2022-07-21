import { styled } from "baseui";
import stylede from "styled-components";
export const TitleWrapper = styled("div", () => ({
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-betwween",
}));

export const BoxHeading = styled("h3", ({ $theme }) => ({
  ...$theme.typography.fontBold16,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  lineHeight: "1.3",
  margin: 0,

  "@media only screen and (max-width: 767px)": {
    display: "block",
  },
}));

const BoxWrapper = stylede.div`
&.box-relative{
  position: relative;
}
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 21px 36px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  div.select-cat{
     height:44px;
     >div{
      >div{

        height:44px
      }
     }
    position: relative;
    margin-left:10px;
     
  }
  div.select-year{
     height:44px;
    >div{
      margin-left:20px;
      // margin-top: -5px;
      >.react-daterange-picker {
        height: 44px;
        background: #eeeeee; 
        padding: 0 5px;
        font-family: sans-serif !important;
        font-weight: 600;
        font-size: 14.5px;
        color: #20286f; 
        input{
           color: #20286f; 
        }
        >div{
          border:0
        }
      }
    }
    
  }
    div.select-cats{
    position: absolute;
    height:44px;
    top: 22px;
    left:10px;
    >div{
      >.react-daterange-picker {
         height: 44px;
        background: #eeeeee; 
        padding: 0 5px;
        font-family: lato;
        font-weight: 600;
        font-size: 14.5px;
        color: #20286f; 
        input{
           color: #20286f; 
        }
        >div{
          border:0
        }
      }
    }
  }


  div.header-revenue-year{
    justify-content: flex-start;  
    display:flex;
    >div{
      margin-right: 30px
    }
    >h3{
          align-self: center;
          margin-right: 30px;
    }
  }
`;

export const BoxContentWrapper = stylede.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  &.radialBar-apexcharts {
    div.apexcharts-legend.apexcharts-align-center{
      left:15% !important;
      top:15% !important;
    }
  }
`;
export default BoxWrapper;
