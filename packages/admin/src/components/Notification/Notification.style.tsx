import { styled } from "baseui";
import stylede from "styled-components";

const getTitleStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

const getTimeStyle = ({ $theme }) => {
  return $theme.typography.font14;
};

const getHeadingStyle = ({ $theme }) => {
  return $theme.typography.fontBold18;
};

const getClearStyle = ({ $theme }) => {
  return $theme.typography.fontBold14;
};

const getDetailsStyle = ({ $theme }) => {
  return $theme.typography.font14;
};

export const Header = styled("div", ({ $theme }) => ({
  padding: "15px 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #E6E6E6",
}));
export const NoItemMessage = styled("div", ({ $theme }) => ({
  padding: "50px 0",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
}));

export const Heading = styled("span", ({ $theme }) => ({
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  ...getHeadingStyle({ $theme }),
}));

export const ButtonRead = stylede.span`
  color: #fff;
  background: #009e7f;
  padding: 5px;
  min-width: 80px;
  font-size: 13px ;
  border-radius: 5px;
  align-self: flex-end;
  text-align:center;
  cursor:pointer;
`;

export const ClearAll = styled("button", ({ $theme }) => ({
  outline: "0",
  border: "none",
  padding: "0",
  backgroundColor: "transparent",
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.red400,
  cursor: "pointer",
  ...getClearStyle({ $theme }),
}));

export const Body = stylede.div`
  padding: 0;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow: auto;
  &.notification-wrapper {
    min-height: 350px;
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	    background-color: #fffff;
    }
    ::-webkit-scrollbar {
      width: 5px;
	    background-color: #fffff;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #666D92;
	    border: 2px solid #666D92;
    }
  }
`;

export const Message = stylede.div`
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #f7f7f7;
  cursor: pointer;
  &.unread {
    background-color: #dcdcdc;
  };
  :last-child:{
    border-bottom: 0;
  };
background-color: #fff;
  `;

export const TitleWrapper = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  marginBottom: "5px",
}));

export const Dot = styled("span", ({ $theme }) => ({
  display: "flex",
  width: "4px",
  height: "4px",
  borderRadius: "2px",
  backgroundColor: $theme.colors.greyE6,
  margin: "0 10px",
}));

export const Title = styled("span", ({ $theme }) => ({
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  ...getTitleStyle({ $theme }),
}));

export const Time = styled("span", ({ $theme }) => ({
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textNormal,
  ...getTimeStyle({ $theme }),
}));

export const Details = styled("p", ({ $theme }) => ({
  margin: "0",
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textNormal,
  ...getDetailsStyle({ $theme }),
}));

export const Footer = styled("div", ({ $theme }) => ({
  padding: "15px 30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTop: `1px solid ${$theme.colors.borderE6}`,
}));

export const FeedsButton = styled("button", ({ $theme }) => ({
  outline: "0",
  border: "none",
  padding: "0",
  backgroundColor: "transparent",
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.primary,
  cursor: "pointer",
  ...getClearStyle({ $theme }),
}));
