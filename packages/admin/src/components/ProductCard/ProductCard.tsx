import { useDrawerDispatch } from "context/DrawerContext";
import React from "react";
import NumberFormat from "react-number-format";
import {
  BuyPost,
  Image,
  OrderID,
  ProductAddress,
  ProductAddressIcon,
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  ProductMeta,
  ProductPrice,
  ProductPriceWrapper,
  ProductTitle,
  ProductWeight,
  SellPost,
  ProductAvatar,
  ImageAvatar,
} from "./ProductCard.style";
import LocationIcon from "assets/image/location.png";

type ProductCardProps = {
  title: string;
  image: any;
  avatar: any;
  weight?: string;
  currency?: string;
  description?: string;
  price: number;
  salePrice?: number;
  orderId?: number;
  typeOfPost?: string;
  data: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  avatar,
  weight,
  price,
  salePrice,
  typeOfPost,
  currency,
  data,
  orderId,
  ...props
}) => {
  const dispatch = useDrawerDispatch();
  const openDrawer = React.useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "PRODUCT_UPDATE_FORM",
        data: data,
      }),
    [dispatch, data]
  );
  return (
    <ProductCardWrapper
      {...props}
      className="product-card"
      onClick={openDrawer}
    >
      <ProductImageWrapper>
        <Image url={image} className="product-image" />
        {typeOfPost === "sell" ? (
          <>
            <SellPost className="sell">SELL</SellPost>
          </>
        ) : (
          <>
            <BuyPost>Buy</BuyPost>
          </>
        )}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductTitle>{title}</ProductTitle>
        <ProductAddress>
          <ProductAddressIcon>
            <Image url={LocationIcon} />
          </ProductAddressIcon>
          <span className="address-admin">{data.address}</span>
        </ProductAddress>
        <ProductMeta>
          <ProductPriceWrapper>
            <ProductPrice>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                // prefix={"$"}
                renderText={(value) => <div>{value}</div>}
              />
              <ProductWeight>{weight}</ProductWeight>
            </ProductPrice>
          </ProductPriceWrapper>

          <OrderID>{orderId}</OrderID>
          <ProductAvatar>
            <ImageAvatar url={avatar} />
          </ProductAvatar>
        </ProductMeta>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;
