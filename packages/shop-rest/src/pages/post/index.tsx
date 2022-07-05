import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { PostFormProvider } from "contexts/post-form/post-form.provider";
import {
  fuelOptions,
  gearOptions,
  originOptions,
  statusOptions,
} from "features/post-form/options";
import PostForm from "features/post-form/post-form";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React from "react";
import { getBrands } from "utils/api/brand";
import { getCookie } from "utils/session";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  brands: any;
};

const Post: NextPage<Props> = ({ brands, deviceType }) => {
  let initData = {
    title: "",
    description: "",
    indexOptionType: 0,
    price: null,
    unit: "VND",
    indexOptionUnit: 0,
    brandId: brands[0].id,
    modelName: "",
    modelId: "",
    indexBrand: 0,
    files: "",
    additionalInfo: {
      fuel: fuelOptions[0].value,
      gear: gearOptions[0].value,
      status: statusOptions[0].value,
      kilometers: "",
      origin: originOptions[0].value,
      released_year: new Date().getFullYear(),
    },
  };

  return (
    <>
      <SEO
        post={true}
        title="Post - SecondHandShop"
        description="Create Post"
      />
      <PostFormProvider initData={initData}>
        <Modal>
          <PostForm
            title={"postFormTitle"}
            deviceType={deviceType}
            brands={brands}
          />
        </Modal>
      </PostFormProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);
  const auth = getCookie("phone_verified_at", context);
  if (!token || !auth) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }
  const brands = await getBrands();

  return {
    props: {
      brands: brands,
    },
  };
}

export default observer(Post);
