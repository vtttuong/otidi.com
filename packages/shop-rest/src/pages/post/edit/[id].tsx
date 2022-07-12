import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import { PostFormProvider } from "contexts/post-form/post-form.provider";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React from "react";
import { getCookie } from "utils/session";
import { getPost, getPostBySlug } from "utils/api/post";
import { getFields, findIndex } from "utils/api/category";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

import {
  postStatus,
  unitOptions,
} from "features/post-form/post-form-update-back-up";
import Router from "next/router";
import PostFormUpdate from "features/post-form/post-form-update";
import { getBrands } from "utils/api/brand";
import { getMyPosts } from "utils/api/profile";
import NoResultFound from "components/no-result/no-result";
import srcToFile from "utils/url-to-file";
import NotFound from "components/notfound";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  post: any;
  brands: any;
};

const EditPost: NextPage<Props> = ({ brands, post, deviceType }) => {
  const router = useRouter();

  console.log(post);
  if (!post) {
    return <NotFound />;
  }

  post.files = [];
  post.images[0].url =
    "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";
  post.images[1].url =
    "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";
  post.images[2].url =
    "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";
  post.images[3].url =
    "https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553";

  post.images.forEach(async (image) => {
    const file = await srcToFile(image.url, "image-" + uuid());
    if (file) {
      post.files.push(file);
    }
    console.log(post.files);
  });

  let initData = {
    id: post.id,
    title: post.title,
    description: post.description,
    indexOptionType: 0,
    price: post.price,
    unit: post.unit || "VND",
    indexOptionUnit: 0,
    brandId: post.brand_id,
    modelName: "",
    modelId: post.brand_model_id,
    indexBrand: 0,
    files: post.files,
    additionalInfo: {
      fuel: post.detail.fuel,
      gear: post.detail.gear,
      status: post.detail.status,
      kilometers: post.detail.kilometers || 0,
      origin: post.detail.origin,
      released_year: post.detail.released_year,
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
            title={"postFormUpdateTitle"}
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
  const post = await getPost(postId);

  return {
    props: {
      post: post,
      brands: brands,
    },
  };
}

export default observer(EditPost);
