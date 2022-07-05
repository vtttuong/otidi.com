import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { PostFormProvider } from "contexts/post-form/post-form.provider";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React from "react";
import { getCookie } from "utils/session";
import { getPostBySlug } from "utils/api/post";
import { getFields, findIndex } from "utils/api/category";
import { useRouter } from "next/router";

import {
  postStatus,
  unitOptions,
} from "features/post-form/post-form-update-back-up";
import Router from "next/router";
import PostFormUpdate from "features/post-form/post-form-update";
import { getBrands } from "utils/api/brand";
import { getMyPosts } from "utils/api/profile";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  posts: any[];
  postId: number;
  brands: any;
};

const EditPost: NextPage<Props> = ({ brands, posts, postId, deviceType }) => {
  console.log("POST", posts);

  const updatedPost = posts.filter((p) => p.id == postId)[0];

  console.log(updatedPost, postId);

  let initData = {
    title: updatedPost.title,
    description: updatedPost.description,
    indexOptionType: 0,
    price: updatedPost.price,
    unit: updatedPost.unit || "VND",
    indexOptionUnit: 0,
    brandId: brands[0].id,
    modelName: "",
    modelId: "",
    indexBrand: 0,
    files: "",
    additionalInfo: {
      fuel: updatedPost.detail.fuel,
      gear: updatedPost.detail.gear,
      status: updatedPost.detail.status,
      kilometers: updatedPost.detail.kilometers || 0,
      origin: updatedPost.detail.origin,
      released_year: updatedPost.detail.released_year,
    },
  };

  return (
    <>
      <SEO
        post={true}
        title="Post - SecondHandShop"
        description="Update Post"
      />
      <PostFormProvider initData={initData}>
        <Modal>
          <PostFormUpdate
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
  const postId = context.params.id;

  if (!token || !auth) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }
  const brands = await getBrands();
  const posts = await getMyPosts(token);

  return {
    props: {
      posts: posts,
      postId: postId,
      brands: brands,
    },
  };
}

export default observer(EditPost);

// export async function getServerSideProps(context) {
//   const token = getCookie("access_token", context);

//   const fields = await getFields(locale);
//   let categoryTypes = [];
//   if (typeof fields !== "undefined") {
//     fields.map((type) => {
//       let obj = {
//         key: "fieldId",
//         value: type.id,
//         label: type.translates[0].title,
//         type: type.value,
//       };
//       categoryTypes.push(obj);
//     });
//   }

//   const indexCategory = await findIndex(categoryTypes, data.category_type);
//   const indexOptionStatus = await postStatus.findIndex(
//     (item) => item.value == data.additional_info?.postStatus
//   );
//   const indexOptionUnit = await unitOptions.findIndex(
//     (item) => item.value == data.unit
//   );

//   return {
//     props: {
//       data: data,
//       categoryTypes: categoryTypes,
//       fields: fields,
//       indexCategory: indexCategory,
//       indexOptionStatus: indexOptionStatus == -1 ? 0 : indexOptionStatus,
//       indexOptionUnit: indexOptionUnit,
//     },
//   };
// }

// export default observer(EditPost);
