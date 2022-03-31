import { Button } from "components/button/button";
import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import useProducts from "data/use-products";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import Fade from "react-reveal/Fade";
import FoodCard from "../../product-card/product-card-four/product-card-four";
import {
  ButtonWrapper,
  LoaderItem,
  LoaderWrapper,
  ProductCardWrapper,
  ProductsCol,
  ProductsRow,
} from "./product-list.style";

const ErrorMessage = dynamic(() =>
  import("components/error-message/error-message")
);

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
  page?: number;
  type?: string;
};
export const Products: React.FC<ProductsProps> = ({
  fetchLimit,
  loadMore = true,
  type,
  page,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const responseDataNormal = useProducts({
    type,
    text: router.query.text,
    page: page,
    category: router.query.category,
    sort: router.query.sort,
    post_type: router.query.postType,
    radius: router.query.radius,
    days_ago: router.query.daysAgo,
    offset: 0,
    limit: fetchLimit,
    isPriority: 0,
  });

  const responseDataPrioity = useProducts({
    type,
    text: router.query.text,
    page: page,
    category: router.query.category,
    sort: router.query.sort,
    post_type: router.query.postType,
    radius: router.query.radius,
    days_ago: router.query.daysAgo,
    offset: 0,
    limit: fetchLimit,
    isPriority: 1,
  });

  let dataPriority = responseDataPrioity.data;
  let dataNormal = responseDataNormal.data;

  if (responseDataNormal.error)
    return <ErrorMessage message={responseDataNormal.error.message} />;

  if (!responseDataPrioity.data || !responseDataNormal.data) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="4" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (
    responseDataPrioity.data.length == 0 &&
    responseDataNormal.data.length == 0
  ) {
    return <NoResultFound />;
  }
  const data = dataPriority.concat(dataNormal);

  const handleLoadMore = async () => {
    setLoading(true);
    // await fetchMore(Number(data.length), fetchLimit);
    setLoading(false);
  };

  return (
    <>
      <ProductsRow>
        {data.map((item: any, index: number) => (
          <ProductsCol key={index} className="food-col">
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: "100%" }}
              >
                <FoodCard
                  name={item.title}
                  image={item.main_img_url}
                  address={item.address}
                  createdAt={item.created_at}
                  price={item.price}
                  unit={item.unit}
                  isFree={false}
                  typeOfPost={item.type}
                  data={item}
                  prioriry={item.is_priority}
                  onClick={() => {
                    router.push("/[type]/[slug]", `/${item.category_type}/${item.slug}`);
                    setTimeout(() => {
                      window.scrollTo(0, 0);
                    }, 500);
                  }}
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && responseDataNormal.data?.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            style={{
              fontSize: 14,
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
