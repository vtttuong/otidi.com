import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "assets/styles/product-single.style";
import { SEO } from "components/seo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { viewProduct } from "utils/api/product";
import { getCookie } from "utils/session";

const ProductDetails = dynamic(() =>
  import("components/product-details/product-details-one/product-details-one")
);

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  slug: string;
  userId?: number;
  token?: string;
  [key: string]: any;
};

const ProductPage: NextPage<Props> = ({ slug, userId, token, deviceType }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;
  const content = (
    <ProductDetails
      userId={userId}
      slug={slug}
      token={token}
      deviceType={deviceType}
    />
  );
  React.useEffect(() => {
    viewProduct(slug);
  }, [slug]);

  return (
    <>
      <SEO
        title={`${slug || "Do cu"} - SecondHandShop`}
        description={`${slug || "do cu"} Details`}
      />

      <Modal>
        <ProductSingleWrapper className="detail">
          <ProductSingleContainer>{content}</ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const userId = getCookie("userId", context);
  const token = getCookie("access_token", context);
  return {
    props: {
      slug,
      userId,
      token,
    },
  };
}

export default ProductPage;
