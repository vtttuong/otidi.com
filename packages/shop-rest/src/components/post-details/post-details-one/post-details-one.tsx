import RecommendPosts from "components/post-grid/post-list/post-list-recommend";
import AuthorInfo from "features/author-infor/author-infor";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import PostDetailsLeft from "./post-details-left";
import {
  AuthorInfor,
  PostDetailsWrapper,
  RelatedItems,
} from "./post-details-one.style";

type PostDetailsProps = {
  slug: string;
  userId: number;
  token: string;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const PostDetails: React.FunctionComponent<PostDetailsProps> = ({
  slug,
  userId,
  token,
  deviceType,
}) => {
  const router = useRouter();

  return (
    <>
      <PostDetailsWrapper className="post-card" dir="ltr">
        <PostDetailsLeft slug={slug} userId={userId} />
        <AuthorInfor>
          <AuthorInfo />
        </AuthorInfor>
      </PostDetailsWrapper>

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

        <RecommendPosts
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

export default PostDetails;
