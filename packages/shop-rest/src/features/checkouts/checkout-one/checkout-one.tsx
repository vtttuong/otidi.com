import { Button } from "components/button/button";
import { CouponDisplay } from "components/coupon-box/coupon-box";
import { useCart } from "contexts/cart/use-cart";
import { ProfileContext } from "contexts/profile/profile.context";
import BalanceOption from "features/balance-options/balance-option";
import Coupon from "features/coupon/coupon";
import CouponPhone from "features/coupon/phone";
import PaymentOptions from "features/payment-option/payment-option";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { numberWithCommas } from "utils/formatNumber";
import {
  DeliverySchedule,
  InformationBox,
} from "../checkout-two/checkout-two.style";
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutSubmit,
  CouponBoxWrapper,
  OrderAmount,
  OrderLabel,
  OrderSummary,
  OrderSummaryItem,
} from "./checkout-one.style";
// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

const Checkout: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const {
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
  } = useCart();

  const { state } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { address, contact, card, schedules } = state;
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: state.amount,
        return_url: `${window.location.origin}/payment-capture`,
        voucher_id: state.voucherId,
      }),
    };

    const res = await fetch(
      process.env.NEXT_PUBLIC_LARAVEL_API_URL +
        "/api/client/v1/payment/momo/auth",
      options
    );
    const data = await res.json();

    if (data && data.error) {
    }

    if (data) {
      router.push(data.payUrl);
    }
  };

  useEffect(() => {
    if (
      calculatePrice() > 0 &&
      cartItemsCount > 0 &&
      address.length &&
      contact.length &&
      card.length &&
      schedules.length
    ) {
      setIsValid(true);
    }
  }, [state]);

  return (
    <CheckoutWrapper>
      <CheckoutContainer>
        <OrderSummary>
          <InformationBox>
            <PaymentOptions
              flexStart={true}
              buttonProps={{
                variant: "text",
                type: "button",
                className: "addButton",
              }}
              icon={true}
            />
          </InformationBox>

          <InformationBox>
            <DeliverySchedule>
              <BalanceOption />
            </DeliverySchedule>
          </InformationBox>

          <OrderSummaryItem style={{ marginBottom: 15 }}>
            <OrderLabel>
              <FormattedMessage id="amount" />
            </OrderLabel>
            <OrderAmount>${numberWithCommas(state.amount)}</OrderAmount>
          </OrderSummaryItem>

          <OrderSummaryItem
            style={{ marginBottom: 30 }}
            className="voucherWrapper"
          >
            <OrderLabel>
              <FormattedMessage id="voucherText" defaultMessage="Voucher" />
            </OrderLabel>
            {coupon ? (
              <CouponDisplay
                code={coupon.code}
                sign="-"
                currency="$"
                price={calculateDiscount()}
                onClick={(e) => {
                  e.preventDefault();
                  removeCoupon();
                }}
              />
            ) : (
              <CouponBoxWrapper>
                <Coupon
                  errorMsgFixed={true}
                  style={{ maxWidth: 350, height: 50 }}
                  // applyVoucherCode={applyVoucherCode}
                />
              </CouponBoxWrapper>
            )}
          </OrderSummaryItem>
          <OrderSummaryItem
            style={{ marginBottom: 30 }}
            className="voucherWrapper"
          >
            <OrderLabel>
              <FormattedMessage id="paymentPhone" />
            </OrderLabel>
            <CouponBoxWrapper>
              <CouponPhone
                errorMsgFixed={true}
                style={{ maxWidth: 350, height: 50 }}
              />
            </CouponBoxWrapper>
          </OrderSummaryItem>

          <OrderSummaryItem>
            <OrderLabel>
              <FormattedMessage id="unitConversion" />
            </OrderLabel>

            <OrderAmount>
              <img
                src={
                  "https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png"
                }
                alt=""
                style={{ marginRight: 10 }}
              />
              {numberWithCommas(state.amount / 1000)}
            </OrderAmount>
          </OrderSummaryItem>

          <OrderSummaryItem style={{ marginTop: 30 }}>
            <OrderLabel>
              <FormattedMessage id="discount"/>
            </OrderLabel>
            <OrderAmount>{state.discount || 0} %</OrderAmount>
          </OrderSummaryItem>

          <div style={{ marginTop: 30 }}>
            <OrderSummaryItem>
              <OrderLabel>
                <FormattedMessage id="totalText" defaultMessage="Total" />
              </OrderLabel>
              <OrderAmount>
                <img
                  src={
                    "https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png"
                  }
                  alt=""
                  style={{ marginRight: 10 }}
                />
                {state.discount ? numberWithCommas(state.amount / 1000 + (state.amount / 1000) * (state.discount / 100)) : numberWithCommas(state.amount / 1000)}
              </OrderAmount>
            </OrderSummaryItem>
          </div>

        </OrderSummary>

        {/* <PaymentOption>
          <Payment deviceType={deviceType} />
        </PaymentOption> */}

        <CheckoutSubmit>
          <Button
            type="button"
            onClick={handleSubmit}
            size="big"
            loading={loading}
            width="100%"
          >
            <FormattedMessage
              id="processCheckout"
              defaultMessage="Proceed to Checkout"
            />
          </Button>
        </CheckoutSubmit>
      </CheckoutContainer>
    </CheckoutWrapper>
  );
};

export default Checkout;
