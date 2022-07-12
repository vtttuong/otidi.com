import ErrorMessage from "components/error-message/error-message";
import { SEO } from "components/seo";
import { ProfileProvider } from "contexts/profile/profile.provider";
import Point from "features/poin-pay";
import ManagePostOrder from "features/user-profile/manage-posts/manage-posts-order";
import Sidebar from "features/user-profile/sidebar/sidebar";
import {
  BodyContain,
  ContainBody,
  ContentBox,
  ContentContainer,
  PageWrapper,
} from "features/user-profile/user-profile.style";
import Footer from "layouts/footer";
import { NextPage } from "next";
import { getMyPosts, getProfile } from "utils/api/profile";
import { getCookie } from "utils/session";
const post_status = {
  WAITING: "waiting",
  SOLD: "sold",
  ACTIVE: "active",
};

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  token: string;
};

const OrderPage: NextPage<Props> = ({ data, token, deviceType }) => {
  return (
    <>
      <SEO title="Profile - SecondHandApp" description="Profile Details" />
      <ProfileProvider>
        <PageWrapper>
          <ContainBody>
            <BodyContain>
              <Sidebar balance={data.balance} dataPost={data} />
              <Point deviceType={deviceType} />
            </BodyContain>
            <ContentContainer>
              <ContentBox className="order">
                <ManagePostOrder token={token} data={data.following} />
              </ContentBox>
            </ContentContainer>
          </ContainBody>

          <Footer />
        </PageWrapper>
      </ProfileProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  if (token === null) {
    // If `ctx.req` is available it means we are on the server.
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }
  const data = await getProfile(token);
  const posts = await getMyPosts(token);

  data.posts = posts;

  data.waiting_approve_posts = posts.filter(
    (post) => post.status === post_status.WAITING
  );

  data.sold_posts = posts.filter((post) => post.status === post_status.SOLD);
  data.active_posts = posts.filter(
    (post) => post.status === post_status.ACTIVE
  );

  return {
    props: {
      data: data,
      token: token,
    }, // will be passed to the page component as props
  };
}

export default OrderPage;
