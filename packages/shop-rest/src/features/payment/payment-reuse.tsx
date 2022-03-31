import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { handleModal } from "features/checkouts/checkout-modal";
import { ProfileContext } from "contexts/profile/profile.context";
import useUser from "data/use-user";
import PaymentGroup from "components/payment-group/payment-group-reuse";
import StripePaymentForm from "./stripe-form";
import { useCart } from "contexts/cart/use-cart";
import { CardHeader } from "components/card-header/card-header";
interface Props {
  deviceType: any;
  increment?: boolean;
}

const Payment = ({ deviceType, increment = false }: Props) => {
  const { deletePaymentCard } = useUser();
  const { calculatePrice } = useCart();
  const [type, setType] = useState(false);

  // const {
  //   state: { card },
  //   dispatch,
  // } = useContext(ProfileContext);
  // console.log(state);
  const card = [
    {
      id: "1",
      type: "primary",
      cardType: "paypal",
    },

    {
      id: "2",
      type: "secondary",
      cardType: "momo",
    },
    // {
    //   id: "3",
    //   type: "secondary",
    //   cardType: "visa",
    // },
  ];

  const handleOnDelete = async (item) => {};
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="selectPaymentText"
          defaultMessage="Select Payment Option"
        />
      </CardHeader>
      <PaymentGroup
        // type={type}
        name="payment"
        deviceType={deviceType}
        items={card}
        onChange={(item: any) => {
          // setType(true);
        }}
        handleAddNewCard={() => {
          handleModal(
            StripePaymentForm,
            { totalPrice: calculatePrice() },
            "add-address-modal stripe-modal"
          );
        }}
      />
    </>
  );
};

export default Payment;
