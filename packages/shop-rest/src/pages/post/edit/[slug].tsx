import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { PostFormProvider } from "contexts/post-form/post-form.provider";
import PostFormUpdate from "features/post-form/post-form-update";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React from "react";
import { getCookie } from "utils/session";
import { getPostBySlug } from "utils/api/post";
import { getFields, findIndex } from "utils/api/category";
import { postStatus, unitOptions } from "features/post-form/post-form-update";
import Router from "next/router";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  categoryTypes: any;
  fields: any;
  indexCategory: number;
  indexOptionStatus: number;
  indexOptionUnit: number;
};

const EditPost: NextPage<Props> = ({
  data,
  categoryTypes,
  fields,
  indexCategory,
  indexOptionStatus,
  indexOptionUnit,
  deviceType,
}) => {
  let initDataUpdate = {
    postId: data.id,
    title: data.title,
    description: data.description,
    type: data.type,
    indexOptionType: data.type == "buy" ? 1 : 0,
    price: data.price,
    unit: data.unit,
    indexOptionUnit: indexOptionUnit,
    fieldId: fields[0].id,
    categoryTitle: data.category.translates[0].title,
    categoryId: data.category.id,
    categorySlug: data.category.slug,
    indexCategory: indexCategory,
    address: data.address,
    files: data.gallery,
    indexOptionStatus: indexOptionStatus,
    additionalInfo: data.additional_info,
    latitude: data.latitude,
    longitude: data.longitude,
  };

  return (
    <>
      <SEO
        post={true}
        title="Post - SecondHandShop"
        description="Update Post"
      />
      <PostFormProvider initData={initDataUpdate}>
        <Modal>
          <PostFormUpdate
            deviceType={deviceType}
            title={"postUpdateNow"}
            categoryTypes={categoryTypes}
            fields={fields}
          />
        </Modal>
      </PostFormProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);
  const locale = getCookie("locale", context);

  if (token === null) {
    if (context.req) {
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      Router.push("/login");
    }
  }

  const data = await getPostBySlug(token, context.params.slug);

  const fields = await getFields(locale);
  let categoryTypes = [];
  if (typeof fields !== "undefined") {
    fields.map((type) => {
      let obj = {
        key: "fieldId",
        value: type.id,
        label: type.translates[0].title,
        type: type.value,
      };
      categoryTypes.push(obj);
    });
  }

  const indexCategory = await findIndex(categoryTypes, data.category_type);
  const indexOptionStatus = await postStatus.findIndex(
    (item) => item.value == data.additional_info?.postStatus
  );
  const indexOptionUnit = await unitOptions.findIndex(
    (item) => item.value == data.unit
  );

  return {
    props: {
      data: data,
      categoryTypes: categoryTypes,
      fields: fields,
      indexCategory: indexCategory,
      indexOptionStatus: indexOptionStatus == -1 ? 0 : indexOptionStatus,
      indexOptionUnit: indexOptionUnit,
    },
  };
}

export default observer(EditPost);
