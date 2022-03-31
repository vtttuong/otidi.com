import RecommendProducts from "components/product-grid/product-list/product-list-recommend";
import AuthorInfo from "features/author-infor/author-infor";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import ProductDetailsLeft from "./product-details-left";
import {
  AuthorInfor,
  ProductDetailsWrapper,
  RelatedItems,
} from "./product-details-one.style";

type ProductDetailsProps = {
  slug: string;
  userId: number;
  token: string;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  slug,
  userId,
  token,
  deviceType,
}) => {
  const router = useRouter();

  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        <ProductDetailsLeft slug={slug} userId={userId} />
        <AuthorInfor>
          <AuthorInfo />
        </AuthorInfor>
      </ProductDetailsWrapper>

      <RelatedItems>
        {token ? (
          <h2>
            <FormattedMessage id="recommendItems" />
          </h2>
        ) : (
          <h2>
            <FormattedMessage
              id="intlReletedItems"
              defaultMessage="Related Items"
            />
          </h2>
        )}

        <RecommendProducts
          token={token}
          slug={slug}
          type={router.query.type.toString()}
          deviceType={deviceType}
          loadMore={false}
          fetchLimit={8}
          page={2}
        />
      </RelatedItems>
    </>
  );
};

export default ProductDetails;
