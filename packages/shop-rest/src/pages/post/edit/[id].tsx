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
import { CURRENCY } from "utils/constant";

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

  let initData = {
    id: post.id,
    title: post.name,
    description: post.description,
    indexOptionType: 0,
    price: post.original_price,
    originalPrice: post.original_price,
    discountPrice: post.discount_price,
    priceAfterTax: post.price_after_tax,
    unit: post.unit || CURRENCY,
    indexOptionUnit: 0,
    brandId: post.brand_id,
    modelName: "",
    modelId: post.brand_model_id,
    indexBrand: 0,
    files: post.images,
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
