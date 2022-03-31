import React from 'react';
import { SEO } from 'components/seo';
import OrderReceived from 'features/order-received/order-received';

const OrderReceivedPage = () => {
  return (
    <>
      <SEO title="Payment Billing- SecondHand Shop" description="Payment Billing" />
      <OrderReceived />
    </>
  );
};

export default OrderReceivedPage;
