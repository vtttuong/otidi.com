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
import Router from "next/router";
import { getProfile } from "utils/api/profile";
import { getCookie } from "utils/session";

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
    if (context.req) {
      // If `ctx.req` is available it means we are on the server.
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      // This should only happen on client.
      Router.push("/login");
    }
  }
  const data = await getProfile(token);

  return {
    props: {
      data: data,
      token: token,
    }, // will be passed to the page component as props
  };
}

export default OrderPage;
