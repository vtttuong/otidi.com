import styled from "styled-components";
import {
  background,
  compose,
  space,
  color,
  layout,
  position,
  flexbox,
  border,
} from "styled-system";
import css from "@styled-system/css";

export const BoxSave = styled.div`
  width: 100%;
  font-size: 18px;
  position: relative;
  .save {
    width: 100%;
    margin-top: 10px;
    position: absolute;
    @media only screen and (min-width: 991px) and (max-width: 1200px) {
      width: 170% !important;
      background: #fff;
    }
  }
  .title {
    font-weight: 600;
    position: relative;
    width: 100%;
    background: #009e7f33;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 10px;
  }
  .title.saved {
    background: #d5cf0291;
    padding: 5px;
  }
`;
export const SearchSave = styled.ul`
  position: relative;
  padding: 15px;
  background: #fff;
  &.first {
    padding-bottom: 0;
  }
  img {
    width: 17px;
    height: 17px;
    margin-right: 10px;
    position: relative;
    top: 2px;
  }
  button {
    position: absolute;
    right: 15px;
  }
  > li:first-child {
    border-top: 1px solid red;
  }
`;
export const SearchSaveItem = styled.li`
  font-weight: 500;
  color: #989898;
  padding: 7px 7px 7px 30px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
    border-radius: 5px;
  }
`;
export const BtnRemove = styled.button`
  color: blue;
  border: 0;
  background: transparent;
  top: 7px;
  align-self: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export const Box = styled.div<any>(
  css({
    height: ["auto", "auto", "750px"],
  }),
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",

    "@media (max-width: 990px)": {
      padding: "80px 0 25px",
      height: "600px",
    },
    "@media (max-width: 1441px)": {
      height: "600px",
    },
    "@media (max-width: 768px)": {
      height: "auto",
    },
  },
  compose(space, color, layout, position, flexbox, border)
);
export const Image = styled.div<any>(
  css({
    backgroundSize: ["contain"],
  }),
  {
    width: "100%",
    height: "100%",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#f9f9f9",
    position: "absolute",
    top: 0,
    left: 0,
    "@media (max-width: 990px) and (min-width: 768px)": {
      backgroundPosition: "inherit",
    },
  },
  background
);

export const Content = styled.div(
  css({
    px: ["20px", "20px", "15px"],
    pt: [0],
  }),
  {
    position: "relative",
    zIndex: 2,
    width: "100%",
    top: -40,
    "@media (max-width: 990px)": {
      top: 20,
    },
    "@media (max-width: 426px)": {
      top: 0,
    },
  }
);
export const Title = styled.h2(
  css({
    fontSize: [17, "2xl", 45],
    color: "text.bold",
    fontWeight: "bold",
    width: "85%",
    margin: "0 auto",
    lineHeight: 1.5,
  }),
  {
    marginBottom: 15,
    textAlign: "center",
  }
);
export const Description = styled.p(
  css({
    fontSize: ["base", "md"],
    color: "text.regular",
    marginBottom: [null, null, 60],
    display: ["block"],
    fontWeight: "regular",
    lineHeight: "body",
    textAlign: ["left", "left", "center"],

    "@media (max-width: 990px)": {
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingRight: "15px",
    },
  })
);

export const ContentRow = styled.div(
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,

    button: {
      padding: 0,

      ":before": {
        content: '""',
        width: 5,
        height: 5,
        display: "block",
        borderRadius: "50%",
        backgroundColor: "yellow.regular",
        marginRight: "7px",
      },
    },
  })
);

export const SearchWrapper = styled.div(
  css({
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
  })
);
