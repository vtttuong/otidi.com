import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import { useRecommendPosts } from "data/use-posts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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
  slug?: string;
  token?: string;
};
export const RecommendProducts: React.FC<ProductsProps> = ({
  loadMore = true,
  type,
  token,
  slug,
}) => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const recommends = useRecommendPosts();

  if (!data) {
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

  if (data.length === 0) {
    return <NoResultFound />;
  }

  return (
    <>
      <ProductsRow>
        {data &&
          data.map((item: any, index: number) => (
            <ProductsCol key={index} className="food-col">
              <ProductCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  <FoodCard
                    name={item.title}
                    image={item.image}
                    address={item.address}
                    createdAt={item.created_at}
                    price={item.price}
                    unit={item.unit}
                    isFree={false}
                    typeOfPost={item.type}
                    data={item}
                    prioriry={item.is_priority}
                    onClick={() => {
                      router.push("/[type]/[slug]", `/${type}/${item.slug}`);
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
    </>
  );
};
export default RecommendProducts;
