import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { PostFormProvider } from "contexts/post-form/post-form.provider";
import PostForm from "features/post-form/post-form";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React from "react";
import { getFields } from "utils/api/category";
import { getCookie } from "utils/session";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fields: any;
  categoryTypes: any;
};

const Post: NextPage<Props> = ({ fields, categoryTypes, deviceType }) => {
  let initData = {
    title: "",
    description: "",
    type: "sell",
    indexOptionType: 0,
    price: null,
    unit: "VND",
    indexOptionUnit: 0,
    fieldId: fields[0].id,
    categoryTitle: "",
    categoryId: "",
    categorySlug: "",
    indexCategory: 0,
    address: "",
    files: "",
    indexOptionStatus: 0,
    additionalInfo: {},
    latitude: 10.772603,
    longitude: 106.657754,
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
            fields={fields}
            categoryTypes={categoryTypes}
          />
        </Modal>
      </PostFormProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const locale = getCookie("locale", context);
  const token = getCookie("access_token", context);
  const auth = getCookie("phone_verified_at", context);
  if (!token || !auth) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }
  const fields = await getFields(locale);
  let categoryTypes = [];
  if (typeof fields !== "undefined") {
    fields.map((type) => {
      let obj = {
        key: "fieldId",
        value: type.id,
        label: type.translates[0].title,
      };
      categoryTypes.push(obj);
    });
  }

  return {
    props: {
      fields: fields,
      categoryTypes: categoryTypes,
    },
  };
}

export default observer(Post);
