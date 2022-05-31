import React from "react";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Checkout from "features/checkouts/checkout-one/checkout-one";
import { ProfileProvider } from "contexts/profile/profile.provider";
import { getCookie } from "utils/session";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  token?: string;
};
const CheckoutPage: NextPage<Props> = ({ token, deviceType }) => {
  let initData = {
    payments: [
      {
        id: "1",
        name: "momo",
        type: "primary",
        info: "MOMO",
      },
      {
        id: "2",
        type: "paypal",
        name: "momo",
        info: "PAYPAL",
      },
    ],
    balances: [
      {
        id: "1",
        type: "primary",
        value: 50000,
      },
      {
        id: "2",
        type: "secondary",
        value: 100000,
      },
      {
        id: "3",
        type: "secondary",
        value: 150000,
      },
    ],
    amount: 50000,
    voucher: "",
    phone: "",
  };

  return (
    <>
      <SEO
        title="Payment Subcription - SecondHandShop"
        description="Payment Subcription"
      />
      <ProfileProvider initData={initData}>
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
