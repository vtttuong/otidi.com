import { styled } from 'baseui';
import stylede from "styled-components";

export const Wrapper = stylede.div`
  background-color: #ffffff;
  .box-relative-no{
  position:relative;

  }
  @keyframes loadingA {
  0 {
    height: 15px;
  }
  50% {
    height: 35px;
  }
  100% {
    height: 15px;
  }
}
div.load-wrapp {
  float: left;
    width: 500px;
    height: 100px;
    margin: 0 10px 10px 0;
    padding: 20px 20px 20px;
    border-radius: 5px;
    text-align: center;
    position: absolute;
    top: -200px;
    left: 150px;
}
.load-1 .line:nth-last-child(1) {
  animation: loadingA 1.5s 1s infinite;
}
.load-1 .line:nth-last-child(2) {
  animation: loadingA 1.5s 0.5s infinite;
}
.load-1 .line:nth-last-child(3) {
  animation: loadingA 1.5s 0s infinite;
}
.line {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #4b9cdb;
}
`;

export const Header = styled('header', () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '40px',
  /* margin-bottom: 40px, */
  backgroundColor: '#ffffff',

  '@media only screen and (max-width: 990px)': {
    padding: '20px',
  },
}));

export const Heading = styled('h2', ({ $theme }) => ({
  ...$theme.typography.fontBold18,
  color: $theme.colors.textDark,
  margin: 0,
}));

export const ButtonWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '20px',
}));
