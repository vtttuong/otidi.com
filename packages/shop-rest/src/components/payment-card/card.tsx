import React from 'react';
import MasterCard from './image/master-card.png';
import Paypal from './image/paypal.png';
import Visa from './image/visa.png';
import Momo from './image/momo.png';
import {
  PaymentCardWrapper,
  CardLogo,
  CardNumber,
  CardNumTitle,
  Name,
} from './payment-card.style';

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
    (cardType === 'paypal' && Paypal) ||
    (cardType === 'master' && MasterCard) ||
    (cardType === 'visa' && Visa) ||
    (cardType === 'momo' && Momo)

  return (
    <PaymentCardWrapper className="payment-card" color={color}>
      <CardLogo>
        <img src={logo} alt={`card-${id}`} />
      </CardLogo>
      <CardNumTitle>Card Number</CardNumTitle>
      <Name>{name}</Name>
    </PaymentCardWrapper>
  );
};

export default Card;
