import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { NextPage } from "next";
import React from "react";

const TestPage: NextPage = () => {
  return (
    <>
      <SEO title="Post - SecondHandApp" description="Order Details" />
      <Modal>
        <p></p>
      </Modal>
    </>
  );
};

export default TestPage;
