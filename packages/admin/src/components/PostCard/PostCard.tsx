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
  PostAvatar,
  ImageAvatar,
  WaitingTag,
  ActiveTag,
  SoldTag,
} from "./PostCard.style";
import LocationIcon from "assets/image/location.png";
import { Avatar } from "baseui/avatar";
import { CURRENCY } from "settings/constants";

type PostCardProps = {
  title: string;
  image: any;
  avatar?: any;
  weight?: string;
  currency?: string;
  description?: string;
  price: number;
  salePrice?: number;
  orderId?: number;
  typeOfPost?: string;
  postId: any;
  status: string;
  user: any;
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
  postId,
  orderId,
  status,
  user,
  ...props
}) => {
  const dispatch = useDrawerDispatch();
  const openDrawer = React.useCallback(() => {
    dispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "POST_UPDATE_FORM",
      data: postId,
    });
  }, [dispatch, postId]);

  return (
    <PostCardWrapper {...props} className="product-card" onClick={openDrawer}>
      <PostImageWrapper>
        <Image url={image} className="product-image" />
        {status === "waiting" && (
          <WaitingTag className="waiting">Waiting</WaitingTag>
        )}
        {status === "active" && (
          <ActiveTag className="active">Active</ActiveTag>
        )}
        {status === "sold" && <SoldTag className="sold">Sold</SoldTag>}
      </PostImageWrapper>
      <PostInfo>
        <PostTitle>{title}</PostTitle>
        {/* <PostAddress>
          <PostAddressIcon>
            <Image url={LocationIcon} />
          </PostAddressIcon>
          <span className="address-admin">{data.address}</span>
        </PostAddress> */}
        <PostMeta>
          <PostPriceWrapper>
            <PostPrice>
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                suffix={` ${CURRENCY}`}
                // renderText={(value) => <div>{value}</div>}
              />
              <PostWeight>{weight}</PostWeight>
            </PostPrice>
          </PostPriceWrapper>

          <OrderID>{orderId}</OrderID>
          <PostAvatar>
            <Avatar name={user.name} size="scale1200" src={user.avatar} />
          </PostAvatar>
        </PostMeta>
      </PostInfo>
    </PostCardWrapper>
  );
};

export default PostCard;
