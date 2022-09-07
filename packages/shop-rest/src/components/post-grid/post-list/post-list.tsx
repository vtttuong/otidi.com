import { Button } from "components/button/button";
import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import usePosts, { useRecommendPosts } from "data/use-posts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Fade from "react-reveal/Fade";
import PostCard from "../../post-card/post-card-four/post-card-four";
import {
  ButtonWrapper,
  LoaderItem,
  LoaderWrapper,
  PostCardWrapper,
  PostsCol,
  PostsRow,
} from "./post-list.style";

const ErrorMessage = dynamic(
  () => import("components/error-message/error-message")
);

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
};
export const Posts: React.FC<PostsProps> = () => {
  const router = useRouter();
  const [pageNum, setPageNum] = useState(1);
  const SIZE = 8;
  const {
    posts,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    isLoadingInitialData,
  } = usePosts({
    page: pageNum,
    count: SIZE,
    sort: router.query.sort,
    dir: router.query.dir,
    text: router.query.text,
    brandId: router.query.brandId,
    modelId: router.query.modelId,
  });

  if (error) return <ErrorMessage message={error.message} />;

  if (isLoadingInitialData) {
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

  if (posts.length == 0) {
    return <NoResultFound />;
  }

  const handleLoadMore = async () => {
    setSize((prevPage) => prevPage + 1);
  };

  const onClickOnCard = async (item) => {
    router.push(`/posts/${item.slug}`);
  };

  return (
    <>
      <PostsRow>
        {posts &&
          posts.map((item: any, index: number) => (
            <PostsCol key={index} className="food-col">
              <PostCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  <PostCard
                    name={item.title}
                    image={item.main_image?.url}
                    address={item.user.address}
                    createdAt={item.created_at}
                    price={item.price}
                    unit={item.unit}
                    isFree={false}
                    typeOfPost={item.type}
                    data={item}
                    prioriry={item.is_advertise}
                    onClick={() => onClickOnCard(item)}
                  />
                </Fade>
              </PostCardWrapper>
            </PostsCol>
          ))}
      </PostsRow>
      {!isReachingEnd && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={isLoadingMore}
            variant="secondary"
            style={{
              fontSize: 14,
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreBtn" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Posts;
