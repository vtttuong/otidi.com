import { Modal } from "@redq/reuse-modal";
import PostSingleWrapper, {
  PostSingleContainer,
} from "assets/styles/post-single.style";
import { SEO } from "components/seo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { viewPost } from "utils/api/post";
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
  slug: string;
  userId?: number;
  token?: string;
  [key: string]: any;
};

const PostPage: NextPage<Props> = ({ slug, userId, token, deviceType }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;
  const content = (
    <PostDetails
      userId={userId}
      slug={slug}
      token={token}
      deviceType={deviceType}
    />
  );
  React.useEffect(() => {
    viewPost(slug);
  }, [slug]);

  return (
    <>
      <SEO
        title={`${slug || "Do cu"} - SecondHandShop`}
        description={`${slug || "do cu"} Details`}
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

export default PostPage;
