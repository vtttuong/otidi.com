import React from 'react';
import { FormattedMessage } from 'react-intl';
import Carousel from 'components/carousel/carousel';
import PaymentCard from '../payment-card/payment-card';
import { Plus } from 'assets/icons/PlusMinus';
import { Button } from 'components/button/button';
import {
  Header,
  PaymentCardList,
  IconWrapper,
  SavedCard,
  OtherPayOption,
} from './payment-group.style';

interface PaymentCardType {
  id: number | string;
  type: string;
  lastFourDigit: string;
  name: string;
}

interface PaymentOptionType {
  showCard?: boolean;
  addedCard?: PaymentCardType[];
  mobileWallet?: boolean;
  cashOnDelivery?: boolean;
}

interface PaymentGroupProps {
  id?: any;
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  name: string;
  disabled?: boolean;
  label?: string;
  className?: string;
  value?: string;
  onChange: Function;
  items: any;
  onDelete: any;
  handleAddNewCard: any;
}

const PaymentGroup: React.FunctionComponent<PaymentGroupProps> = ({
  items,
  deviceType,
  className,
  name,
  onChange,
  onDelete,
  handleAddNewCard,
}) => {
  // RadioGroup State

  // Handle onChange Func
  const handleChange = (item: any) => {
    onChange(item);
  };
  return (
    <>
      <PaymentCardList>
        <Carousel
          deviceType={deviceType}
          autoPlay={false}
          infinite={false}
          data={items}
          component={(item: any) => (
            <PaymentCard
              key={item.id}
              onChange={() => handleChange(item)}
              onDelete={() => onDelete(item)}
              {...item}
            />
          )}
        />
      </PaymentCardList>
    </>
  );
};

export default PaymentGroup;
