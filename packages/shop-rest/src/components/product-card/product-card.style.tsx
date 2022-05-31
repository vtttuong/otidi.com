import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import css from "@styled-system/css";

const StyledBox = styled.div(
  css({
    py: [30, 50],
    px: ["1rem", 0],
  }),
  {
    width: "100%",
  }
);

export const SellLabelTop = styled.span(
  css({
    color: "#ffffff",
    lineHeight: "1.6",
    backgroundColor: "#ff0000",
    paddingLeft: "15px",
    paddingRight: "15px",
    display: "inline-block",
    position: "absolute",
    bottom: "20px",
    right: "66.5%",
    "&.main-content": {
      right: 0,
      bottom: 0,
    },
    ":before": {
      content: '""',
      position: "absolute",
      left: "-8px",
      top: "0",
      width: "0",
      height: "0",
      borderStyle: "solid",
      borderWidth: "0 8px 12px 0",
      borderColor: `transparent red transparent transparent`,
    },

    ":after": {
      content: '""',
      position: "absolute",
      left: "-8px",
      bottom: " 0",
      width: " 0",
      height: "0",
      borderStyle: "solid",
      borderWidth: "0 0 12px 8px",
      borderColor: `transparent transparent red transparent`,
    },
  })
);

export const ProductCardWrapper = styled.div(
  css({
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    fontFamily: "inherit",
    borderRadius: "base",
    cursor: "pointer",

    ".card-counter": {
      "@media (max-width: 767px)": {
        width: 30,
        height: 90,
        flexDirection: "column-reverse",
        position: "absolute",
        bottom: 0,
        right: 0,
      },
    },
  })
);

export const DotDelete = styled.span`
  position: relative;
  top: -15px;
  left: 10%;
  font-size: 27px !important;
  color: red;
  z-index: 199;
  &:hover {
    .text-delete {
      display: inline;
    }
  }
  .text-delete {
    position: absolute;
    top: -5px;
    left: -47px;
    font-size: 13px !important;
    color: #fff;
    z-index: 199;
    padding: 2px 5px;
    background: red;
    display: none;
  }
`;
export const BoxAvatar = styled.div`
  display: flex;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
  }
  h4 {
    width: auto !important;
    top: 15px;
    position: relative;
  }
  &.all {
    z-index: 100;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #dadada;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 12px;
      margin-left: 15px;
      margin-top: 4px;
    }
    span.view img {
      width: 18px;
      height: 18px;
      margin-top: 3px;
    }
    span > img {
      width: 15px;
      height: 15px;
      border-radius: 0;
      margin-right: 5px;
    }
  }
`;
export const ProductImageWrapper = styled.div`
  height: 240px;
  padding: 5px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
  }
  @media (max-width: 640px) {
    height: 145px;
  }
`;

export const SaleTag = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  padding: 0 10px;
  line-height: 24px;
  border-radius: ${themeGet("radii.medium", "12px")};
  display: inline-block;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const SellLabel = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  line-height: 24px;
  background-color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: ${themeGet("radii.medium", "12px")};
  z-index: 2;
`;

export const BuyLabel = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  line-height: 24px;
  background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  display: inline-block;
  position: absolute;
  top: 15px;
  right: 15px;
  border-radius: ${themeGet("radii.medium", "12px")};
  z-index: 2;
`;

export const ProductInfo = styled.div`
  padding: 20px 15px;
  padding-bottom: 3px;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  &.top {
    padding: 15px;
    width: 65%;
  }
  @media (max-width: 990px) {
    padding: 15px;
    min-height: 123px;
  }
  @media (max-width: 426px) {
    padding: 10px;
  }
  .current-user.product-title {
    width: 88%;
  }
  .product-title {
    font-family: ${themeGet("fonts.body", "sans-serif")};
    font-size: ${themeGet("fontSizes.base", "15")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.text.bold", "#0D1136")};
    margin: 0 0 7px 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 767px) {
      font-size: 14px;
      margin: 0 0 5px 0;
    }
  }
  .product-weight {
    font-family: ${themeGet("fonts.body", "sans-serif")};
    font-size: ${themeGet("fontSizes.sm", "13")}px;
    font-weight: ${themeGet("fontWeights.regular", "400")};
    color: ${themeGet("colors.text.regular", "#77798c")};
    @media (max-width: 767px) {
      font-size: ${themeGet("fontSizes.xs", "12")}px;
    }
  }
  .product-meta {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    @media (max-width: 767px) {
      min-height: 36px;
    }
    .productPriceWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .product-price {
        font-family: ${themeGet("fonts.body", "sans-serif")};
        font-size: ${themeGet("fontSizes.base", "15")}px;
        font-weight: ${themeGet("fontWeights.bold", "700")};
        color: ${themeGet("colors.primary.regular", "#009E7F")};
        @media (max-width: 767px) {
          font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
        }
      }
      .discountedPrice {
        font-family: ${themeGet("fonts.body", "sans-serif")};
        font-size: ${themeGet("fontSizes.sm", "13")}px;
        font-weight: ${themeGet("fontWeights.regular", "400")};
        color: ${themeGet("colors.yellow.hover", "#FBB979")};
        font-style: italic;
        padding: 0 5px;
        position: relative;
        overflow: hidden;
        position: absolute;
        top: -20px;
        left: -4px;
        &:before {
          content: "";
          width: 100%;
          height: 1px;
          display: inline-block;
          background-color: ${themeGet("colors.yellow.hover", "#FBB979")};
          position: absolute;
          top: 50%;
          left: 0;
        }
      }
    }
    .cart-button {
      border: 2px solid ${themeGet("colors.gray.200", "#f7f7f7")};
      border-radius: ${themeGet("radii.big", "18px")};
      height: 36px;
      padding-left: 17px;
      padding-right: 17px;
      font-size: ${themeGet("fontSizes.sm", "13")}px;
      font-weight: ${themeGet("fontWeights.bold", "700")};
      @media (max-width: 767px) {
        width: 36px;
        height: 36px;
        padding: 0;
        border-radius: 50%;
      }
      .btn-text {
        padding: 0 0 0 6px;
        @media (max-width: 767px) {
          display: none;
        }
      }
      &:hover {
        color: ${themeGet("colors.white", "#ffffff")};
        background-color: ${themeGet("colors.primary.regular", "#009e7f")};
        border-color: ${themeGet("colors.primary.regular", "#009e7f")};
      }
      svg {
        fill: currentColor;
        @media (max-width: 767px) {
          margin: 0;
        }
      }
    }
    @media (max-width: 767px) {
      .quantity {
        width: 32px;
        height: 90px;
        display: block;
        flex-shrink: 0;
        position: absolute;
        bottom: 15px;
        right: 15px;
        z-index: 1;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
      }
      button {
        width: 100%;
        height: 27px;
      }
      .incBtn {
        top: 0;
        justify-content: center;
      }
      .decBtn {
        top: auto;
        bottom: 0;
        justify-content: center;
      }
      input[type="number"] {
        left: 0;
        font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
        height: calc(100% - 54px);
        position: absolute;
        top: 27px;
        width: 100%;
        color: ${themeGet("colors.white", "#ffffff")};
      }
    }
  }
`;

export const ButtonText = styled.span`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const BookImageWrapper = styled.div`
  height: 275px;
  padding: 0;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
  }
  @media (max-width: 767px) {
    height: 215px;
  }
  ${SellLabel} {
    top: 0;
    right: 0;
  }
`;

export const BookInfo = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    padding: 15px 0px 0px;
  }
`;

export const ProductName = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin: 0 0 7px 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  display: block;
  &:only-child {
    margin: 0;
  }
  @media (max-width: 767px) {
    font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
    margin: 0 0 5px 0;
  }
`;

export const AuthorInfo = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};
  @media (max-width: 767px) {
    font-size: ${themeGet("fontSizes.sm", "13")}px;
  }
`;

// export const AddCartBox = styled.div`
//   width: calc(100% - 40px);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 20px;
//   border-radius: 6px;
//   background-color: #ffffff;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   opacity: 0;
//   transition: all 0.3s;

//   .cart-button {
//     border-radius: 18px;
//     height: 36px;
//     padding-left: 17px;
//     padding-right: 17px;
//     font-size: ${themeGet('fontSizes.1', '13')} px;
//     font-weight: ${themeGet('fontWeights.bold', '700')};
//     @media (max-width: 767px) {
//       width: 32px;
//       height: 32px;
//       padding: 0;
//       border-radius: 50%;
//     }
//     .btn-text {
//       padding: 0 0 0 6px;
//       @media (max-width: 767px) {
//         display: none;
//       }
//     }
//     &:hover {
//       color: #fff;
//       background-color: ${themeGet('colors.primary.regular', '#009e7f')};
//       border-color: #009e7f;
//     }
//     svg {
//       fill: currentColor;
//     }
//   }
// `;

export const PriceWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.base", "15")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  @media (max-width: 767px) {
    font-size: calc(${themeGet("fontSizes.base", "15")}px - 1px);
  }
`;

export const DiscountedPrice = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")} px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
  font-style: italic;
  padding: 0 5px;
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  margin-left: -4px;
  z-index: 2;
  &:before {
    content: "";
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet("colors.yellow.regular", "#FFAD5E")};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const BookCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 30px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  font-family: ${themeGet("fonts.body", "Lato")};
  border-radius: ${themeGet("radii.base", "6px")};
  cursor: pointer;
  @media (max-width: 767px) {
    padding: 15px;
  }
`;

export const FoodCardWrapper = styled.div`
  &.deactive {
    filter: grayscale(70%);
  }
  height: 100%;
  width: 100%;
  padding: 0;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  font-family: ${themeGet("fonts.body", "sans-serif")};
  border-radius: ${themeGet("radii.base", "6px")};
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  @media (max-width: 990px) {
    border-radius: 0;
  }
  &.food-card-top {
    flex-direction: row;
    border-radius: 0;
    background: #e0e0e0;
  }
`;

export const FoodImageWrapper = styled.div`
  span.label,
  span.persion:nth-child(1) {
    position: absolute;
    bottom: -35px;
    right: 0;
    background: #009e7e;
    padding: 5px 10px;
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
    // border-bottom-right-radius: 5px;
  }
  span.schedule {
    position: absolute;
    font-size: 13px;

    left: 10px;
    top: 16px;
    background: #2c4eff;
    color: #fff;
    padding: 2px 10px;
    font-weight: 600;
    border-radius: 10px;
  }
  span.persion:nth-child(2) {
    position: absolute;
    bottom: -35px;
    right: 70px;
    background: #1874d4;
    padding: 5px 10px;
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
    // border-bottom-left-radius: 5px;
    // border-bottom-right-radius: 5px;
  }
  span.persion:nth-child(3) {
    position: absolute;
    bottom: -35px;
    right: 130px;
    background: orange;
    padding: 5px 10px;
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
    // border-bottom-left-radius: 5px;
    // border-bottom-right-radius: 5px;
  }
  span.persion:nth-child(4) {
    position: absolute;
    bottom: -35px;
    right: 200px;
    background: red;
    padding: 5px 10px;
    color: #fff;
    font-weight: 600;
    border-radius: 30px;
    // border-bottom-left-radius: 5px;
    // border-bottom-right-radius: 5px;
  }
  height: 230px;
  padding: 0;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &.top {
    width: 35%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img.top {
    width: 200px;
    border-radius: 5px;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  @media (max-width: 767px) {
    height: 145px;
  }
`;

export const ProductMeta = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeliveryOpt = styled.span`
  span.dadoi {
    background: #54565a !important;
  }
  span.doingay {
    top: 28px;
    min-width: 70px;
    text-align: center;
    right: 0;
    position: absolute;
    color: #fff;
    background: #4974ec;
    padding: 5px 10px;
    border-radius: 5px;
  }
  span.name {
    font-size: 17px;
    margin-top: -25px;
    display: inherit;
    font-weight: 600;
    opacity: 0.7;
  }
  &.score {
    color: #009e7f;
    justify-content: center;
    align-items: center;
    display: flex;
    > img {
      width: 20px;
      margin-right: 7px;
      align-self: end;
    }
  }
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: 15px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  white-space: nowrap;
  position: relative;
`;

export const Category = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.bold", "400")};
  color: ${themeGet("colors.text.regular", "#77798c")};

  > img {
    width: 15px;
    height: 17px;
    object-fit: cover;
    margin-right: 5px;
    padding-top: 4px;
  }
`;

export const Duration = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.white", "#ffffff")};
  background-color: ${themeGet("colors.primary.regular", "#009E7F")};
  border-radius: ${themeGet("radii.big", "18px")};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 20px;
  padding-right: 20px;
  height: 36px;
  width: auto;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  @media (max-width: 600px) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (max-width: 426px) {
    font-size: 10px;
  }
`;
