import React, { useContext } from "react";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Checkout from "features/checkouts/checkout-one/checkout-one";
import { getCookie } from "utils/session";
import { options } from "features/payment/amount-option";
import { ProfileContext } from "contexts/profile/profile.context";
import { ProfileProvider } from "contexts/profile/profile.provider";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  token?: string;
};
const CheckoutPage: NextPage<Props> = ({ token, deviceType }) => {
  return (
    <>
      <SEO
        title="Payment Subcription - SecondHandShop"
        description="Payment Subcription"
      />
      <ProfileProvider initData={options}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  return {
    props: {
      token: token,
    },
  };
}

export default CheckoutPage;
