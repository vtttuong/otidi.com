import { Modal } from "@redq/reuse-modal";
import { Bookmarks } from "assets/icons/Bookmarks";
import { CheckMark } from "assets/icons/CheckMark";
import { Hourglass } from "assets/icons/Hourglass";
import { SquareCheck } from "assets/icons/SquareCheck";
import { SEO } from "components/seo";
import { TabPanel } from "components/TabPanel/tabpanel";
import { ProfileProvider } from "contexts/profile/profile.provider";
import ContenHeader from "features/user-profile/contentHeader/contentHeader";
import ManagePost from "features/user-profile/manage-posts/manage-posts";
import ManagePostReview from "features/user-profile/manage-posts/manage-posts-review";
import {
  ContainBody,
  ContentBox,
  ContentContainer,
  PageWrapper,
  TabContain,
} from "features/user-profile/user-profile.style";
import WrapCard from "features/wrap-card/wrap-card";
import Footer from "layouts/footer";
import { NextPage } from "next";
import { useState } from "react";
import { getUserById, getUsers } from "utils/api/user";
import { getCookie } from "utils/session";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
  token?: string;
  currentId?: number;
};

const ProfilePage: NextPage<Props> = ({ token, data, currentId }) => {
  const dataTab2 = [
    {
      number: data.posts.length,
      key: "postingPosts",
      title: "Đang đăng",
      icon: <CheckMark width="15px" height="15px" color="green" />,
    },
    {
      number: data.followers.length,
      key: "follower",
      title: "Ngừoi theo dõi",
      icon: <Hourglass color="#0000ff" width="15px" height="15px" />,
    },
    {
      key: "following",
      title: "Đang theo dõi",
      icon: <SquareCheck color="#fb00ff" />,
      number: data.following.length,
    },
    {
      key: "review",
      title: "Nhận xét",
      icon: <Bookmarks color="#00d9ff" />,
      number: data.reviews.length,
    },
  ];
  
  const [activeTab, setActiveTab] = useState("postingPosts");
  const [currentUser, setCurrentUser] = useState(false);

  if (data.id == currentId) {
    setCurrentUser(true);
  }

  const onRate = () => {
    setActiveTab("review");
  };
  const onChangeFollow = (i: string) => {
    if (i == "following") setActiveTab("following");
    else setActiveTab("follower");
  };

  const title = `Profile - ${data.name}`;
  return (
    <>
      <SEO title={title} description="Profile Details" />
      <ProfileProvider>
        <Modal>
          <PageWrapper>
            <ContenHeader
              token={token}
              data={data}
              profileOther={true}
              onRate={onRate}
              userId={currentId}
              onChangeFollow={onChangeFollow}
              // onFollow={onFollow}
            />
            <ContainBody>
              <ContentContainer>
                <TabContain>
                  <TabPanel
                    active={activeTab}
                    data={dataTab2}
                    onChange={(val) => {
                      setActiveTab(val);
                    }}
                  />
                </TabContain>
                <ContentBox>
                  {activeTab === "postingPosts" ? (
                    <WrapCard
                      profileOther={true}
                      currentUser={currentUser}
                      data={data.posts}
                    />
                  ) : null}
                  {activeTab === "follower" ? (
                    <ManagePost data={data.followers} />
                  ) : null}
                  {activeTab === "following" ? (
                    <ManagePost data={data.following} />
                  ) : null}
                  {activeTab === "review" ? (
                    <ManagePostReview userId={data.id} />
                  ) : null}
                </ContentBox>
              </ContentContainer>
            </ContainBody>

            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const currentId = getCookie("userId", context);
  const token = getCookie("access_token", context);
  const data = await getUserById(context.params.id);
  const users = await getUsers();

  // Get the paths we want to pre-render based on posts
  const paths = users.map((user) => ({
    params: {
      id: user.id.toString(),
    },
  }));

  return {
    props: {
      data: data,
      currentId: currentId,
      paths: paths,
      fallback: true,
      token: token,
    },
    // will be passed to the page component as props
  };
}

export default ProfilePage;
