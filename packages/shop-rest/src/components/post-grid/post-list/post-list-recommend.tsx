import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import { useRecommendPosts } from "data/use-posts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Fade from "react-reveal/Fade";
import FoodCard from "../../post-card/post-card-four/post-card-four";
import {
  ButtonWrapper,
  LoaderItem,
  LoaderWrapper,
  PostCardWrapper,
  PostsCol,
  PostsRow,
} from "./post-list.style";

type PostsProps = {
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
  postId: number;
};
export const RecommendPosts: React.FC<PostsProps> = ({
  loadMore = true,
  postId,
  type,
  token,
  slug,
}) => {
  const router = useRouter();
  const { loading, data } = useRecommendPosts(postId);

  if (loading) {
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

  if (data.data.length === 0) {
    return <NoResultFound />;
  }

  return (
    <>
      <PostsRow>
        {data &&
          data.data.map((item: any, index: number) => (
            <PostsCol key={index} className="food-col">
              <PostCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  <FoodCard
                    name={item.title}
                    image={item.main_image?.url}
                    address={item.address}
                    createdAt={item.created_at}
                    price={item.price}
                    unit={item.unit}
                    isFree={false}
                    typeOfPost={item.type}
                    data={item}
                    prioriry={item.is_advertise}
                    onClick={() => {
                      router.push(`/posts/${item.slug}`);
                      setTimeout(() => {
                        window.scrollTo(0, 0);
                      }, 500);
                    }}
                  />
                </Fade>
              </PostCardWrapper>
            </PostsCol>
          ))}
      </PostsRow>
    </>
  );
};
export default RecommendPosts;
