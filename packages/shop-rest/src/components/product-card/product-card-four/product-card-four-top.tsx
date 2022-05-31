// product card for food
import React from "react";
import Image from "components/image/image";
import {
  BuyLabel,
  Category,
  DeliveryOpt,
  Duration,
  FoodCardWrapper,
  FoodImageWrapper,
  ProductInfo,
  ProductMeta,
  SellLabel,
  SellLabelTop,
  BoxAvatar,
} from "../product-card.style";
import { FormattedMessage } from "react-intl";
import AddressIcon from "../../../assets/images/location.png";
import { formatRelativeTime } from "utils/formatRelativeTime";
import NumberFormat from "react-number-format";

type CardProps = {
  name: string;
  image: any;
  address: string;
  price: string;
  unit: string;
  isFree?: boolean;
  createdAt?: string;
  typeOfPost?: string;
  avatar?: string;
  user_name?: string;
  data: any;
  prioriry?: boolean;
  onClick?: (e: any) => void;
};

const ProductCard: React.FC<CardProps> = ({
  name,
  image,
  address,
  price,
  unit,
  isFree,
  createdAt,
  typeOfPost,
  data,
  avatar,
  user_name,
  prioriry,
  onClick,
  ...props
}) => {
  let formatTime = formatRelativeTime(createdAt);
  return (
    <FoodCardWrapper onClick={onClick} className="food-card-top">
      <FoodImageWrapper className="top">
        <Image
          url={image}
          className="product-image top"
          style={{ position: "relative" }}
          alt={name}
        />
        {typeOfPost === "sell" ? (
          <SellLabel>
            <FormattedMessage id="sellPost" defaultMessage="Sell" />
          </SellLabel>
        ) : (
          <BuyLabel>
            <FormattedMessage id="buyPost" defaultMessage="Sell" />
          </BuyLabel>
        )}
      </FoodImageWrapper>
      <ProductInfo className="top">
        <BoxAvatar>
          <Image
            url={avatar}
            className="product-image top"
            style={{ position: "relative" }}
            alt={name}
          />
          <h4 className="product-title">{user_name}</h4>
        </BoxAvatar>
        <h3
          className="product-title"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h3>
        <Category style={{ marginBottom: 20, display: "inline-block" }}>
          <img src={AddressIcon} alt={"address"} />
          {address}
        </Category>
        <ProductMeta style={{ marginTop: "auto" }}>
          <DeliveryOpt>
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <div>{value}</div>}
            />
            <span style={{ position: "absolute", left: "121%", top: 0 }}>
              {unit}
            </span>
            {/*<FormattedMessage id='deliveryText' defaultMessage='Delivery' />*/}
          </DeliveryOpt>
          <Duration>
            {formatTime.time}
            <FormattedMessage id={formatTime.unit} />
          </Duration>
          {prioriry == true ? (
            <SellLabelTop>
              <FormattedMessage id="topPost" defaultMessage="Top post" />
            </SellLabelTop>
          ) : null}
        </ProductMeta>
      </ProductInfo>
    </FoodCardWrapper>
  );
};

export default ProductCard;
