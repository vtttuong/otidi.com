import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Order from "features/user-profile/order/order";
import {
  PageWrapper,
  SidebarSection,
} from "features/user-profile/user-profile.style";
import { NextPage } from "next";
import React from "react";

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO title="Order - Otodi.vn" description="Order Details" />
      <Modal>
        <PageWrapper>
          <SidebarSection>{/* <Sidebar /> */}</SidebarSection>
          <Order />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrderPage;
