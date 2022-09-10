// post card for food
import React from "react";
import Image from "components/image/image";
import {
  BuyLabel,
  Category,
  DeliveryOpt,
  Duration,
  FoodCardWrapper,
  FoodImageWrapper,
  PostInfo,
  PostMeta,
  SellLabel,
  SellLabelTop,
  BoxAvatar,
} from "../post-card.style";
import { FormattedMessage } from "react-intl";
import AddressIcon from "../../../assets/images/location.png";
import { formatRelativeTime } from "utils/formatRelativeTime";
import NumberFormat from "react-number-format";
import { CURRENCY } from "utils/constant";
import { formatMoney } from "utils/formatNumber";

type CardProps = {
  name: string;
  image: any;
  address: string;
  price: string;
  isFree?: boolean;
  createdAt?: string;
  avatar?: string;
  user_name?: string;
  data: any;
  prioriry?: boolean;
  onClick?: (e: any) => void;
};

const PostCard: React.FC<CardProps> = ({
  name,
  image,
  address,
  price,
  isFree,
  createdAt,
  data,
  avatar,
  user_name,
  prioriry,
  onClick,
  ...props
}) => {
  let formatTime = formatRelativeTime(createdAt);

  let { value, unit } = formatMoney(
    data.discount_price || data.price_after_tax
  );
  return (
    <FoodCardWrapper onClick={onClick} className="food-card-top">
      <FoodImageWrapper className="top">
        <Image
          url={image}
          className="post-image top"
          style={{ position: "relative" }}
          alt={name}
        />
        {/* {typeOfPost === "sell" ? (
          <SellLabel>
            <FormattedMessage id="sellPost" defaultMessage="Sell" />
          </SellLabel>
        ) : (
          <BuyLabel>
            <FormattedMessage id="buyPost" defaultMessage="Sell" />
          </BuyLabel>
        )} */}
      </FoodImageWrapper>
      <PostInfo className="top">
        <BoxAvatar>
          <Image
            url={avatar}
            className="post-image top"
            style={{ position: "relative", objectFit: "cover" }}
            alt={name}
          />
          <h4 className="post-title">{user_name}</h4>
        </BoxAvatar>
        <h3
          className="post-title"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h3>
        <Category style={{ marginBottom: 20, display: "flex" }}>
          <img src={AddressIcon} alt={"address"} />
          <span className="address"> {address}</span>
        </Category>
        <PostMeta style={{ marginTop: "auto" }} className="top">
          <DeliveryOpt>
            <div className="price">
              {value + " "}
              <FormattedMessage id={unit} defaultMessage={unit} />
            </div>
            {/*<FormattedMessage id='deliveryText' defaultMessage='Delivery' />*/}
          </DeliveryOpt>
          <Duration>
            {formatTime.time}
            <FormattedMessage id={formatTime.unit} />
          </Duration>
          {data.advertise ? (
            <SellLabelTop>
              <FormattedMessage id="topPost" defaultMessage="Top post" />
            </SellLabelTop>
          ) : null}
        </PostMeta>
      </PostInfo>
    </FoodCardWrapper>
  );
};

export default PostCard;
