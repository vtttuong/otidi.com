import { useDrawerDispatch } from "context/DrawerContext";
import React from "react";
import NumberFormat from "react-number-format";
import {
  BuyPost,
  Image,
  OrderID,
  PostAddress,
  PostAddressIcon,
  PostCardWrapper,
  PostImageWrapper,
  PostInfo,
  PostMeta,
  PostPrice,
  PostPriceWrapper,
  PostTitle,
  PostWeight,
  SellPost,
  PostAvatar,
  ImageAvatar,
} from "./PostCard.style";
import LocationIcon from "assets/image/location.png";
import { Avatar } from "baseui/avatar";

type PostCardProps = {
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

const PostCard: React.FC<PostCardProps> = ({
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
    <PostCardWrapper
      {...props}
      className="product-card"
      // onClick={openDrawer}
    >
      <PostImageWrapper>
        <Image url={image} className="product-image" />
        {/* {typeOfPost === "sell" ? (
          <>
            <SellPost className="sell">SELL</SellPost>
          </>
        ) : (
          <>
            <BuyPost>Buy</BuyPost>
          </>
        )} */}
      </PostImageWrapper>
      <PostInfo>
        <PostTitle>{title}</PostTitle>
        <PostAddress>
          <PostAddressIcon>
            <Image url={LocationIcon} />
          </PostAddressIcon>
          <span className="address-admin">{data.address}</span>
        </PostAddress>
        <PostMeta>
          <PostPriceWrapper>
            <PostPrice>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                // prefix={"$"}
                // renderText={(value) => <div>{value}</div>}
              />
              <PostWeight>{weight}</PostWeight>
            </PostPrice>
          </PostPriceWrapper>

          <OrderID>{orderId}</OrderID>
          <PostAvatar>
            <Avatar name="N O" size="scale1200" src={avatar} />
          </PostAvatar>
        </PostMeta>
      </PostInfo>
    </PostCardWrapper>
  );
};

export default PostCard;
