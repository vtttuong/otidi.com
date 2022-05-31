import React from "react";
import MasterCard from "./image/master-card.png";
import Paypal from "./image/paypal_header.png";
import Visa from "./image/visa.png";
import Momo from "./image/momo_header.png";
import {
  PaymentCardWrapper,
  CardLogo,
  CardNumber,
  CardNumTitle,
  Name,
} from "./payment-card.style";

interface Props {
  id: string;
  name: string;
  cardType: string;
  lastFourDigit: string;
  color: string;
}

const Card: React.FC<Props> = ({
  id,
  name,
  cardType,
  lastFourDigit,
  color,
}) => {
  const logo =
    (cardType === "paypal" && Paypal) ||
    (cardType === "momo" && Momo) ||
    (cardType === "visa" && Visa);

  return (
    <PaymentCardWrapper className="payment-card-reuse" color={color}>
      <img src={logo} alt={`card-${id}`} />
    </PaymentCardWrapper>
  );
};

export default Card;
