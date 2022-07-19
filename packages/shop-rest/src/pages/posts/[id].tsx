import { Modal } from "@redq/reuse-modal";
import PostSingleWrapper, {
  PostSingleContainer,
} from "assets/styles/post-single.style";
import NotFound from "components/notfound";
import { SEO } from "components/seo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getPost, viewPost } from "utils/api/post";
import { getCookie } from "utils/session";

const PostDetails = dynamic(
  () => import("components/post-details/post-details-one/post-details-one")
);

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  post: any;
  userId?: number;
  token?: string;
  [key: string]: any;
};

const PostPage: NextPage<Props> = ({ post, userId, token, deviceType }) => {
  if (!post) {
    return <NotFound />;
  }

  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const content = (
    <PostDetails
      userId={userId}
      data={post}
      user={post.user}
      token={token}
      deviceType={deviceType}
    />
  );
  // React.useEffect(() => {
  //   viewPost(id);
  // }, [id]);

  return (
    <>
      <SEO
        title={`${post.slug || "Do cu"} - SecondHandShop`}
        description={`${post.slug || "do cu"} Details`}
      />

      <Modal>
        <PostSingleWrapper className="detail">
          <PostSingleContainer>{content}</PostSingleContainer>
        </PostSingleWrapper>
      </Modal>
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;
  const userId = getCookie("userId", context);
  const token = getCookie("access_token", context);
  const post = await getPost(id);
  console.log(post);

  return {
    props: {
      post: post,
      userId,
      token,
    },
  };
}

export default PostPage;
