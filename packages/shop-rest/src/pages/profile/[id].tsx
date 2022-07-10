import { Modal } from "@redq/reuse-modal";
import { Bookmarks } from "assets/icons/Bookmarks";
import { CheckMark } from "assets/icons/CheckMark";
import { Hourglass } from "assets/icons/Hourglass";
import { SquareCheck } from "assets/icons/SquareCheck";
import NotFound from "components/notfound";
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
import { useEffect, useState } from "react";
import {
  getFollowers,
  getPostsForUser,
  getReviews,
  getUserById,
} from "utils/api/user";
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
  if (!data) {
    return <NotFound />;
  }

  const [activeTab, setActiveTab] = useState("postingPosts");
  const [currentUser, setCurrentUser] = useState(false);
  const [followers, setFollowers] = useState(data.followers);
  const [reviews, setReviews] = useState(data.reviews);

  const dataTab2 = [
    {
      number: data.posts.length,
      key: "postingPosts",
      title: "Đang đăng",
      icon: <CheckMark width="15px" height="15px" color="green" />,
    },
    {
      number: followers.length,
      key: "follower",
      title: "Ngừoi theo dõi",
      icon: <Hourglass color="#0000ff" width="15px" height="15px" />,
    },
    // {
    //   key: "following",
    //   title: "Đang theo dõi",
    //   icon: <SquareCheck color="#fb00ff" />,
    //   number: data.following.length,
    // },
    {
      key: "review",
      title: "Nhận xét",
      icon: <Bookmarks color="#00d9ff" />,
      number: reviews.length,
    },
  ];

  useEffect(() => {
    if (data.id == currentId) {
      setCurrentUser(true);
    }
  }, []);

  const onRate = () => {
    setActiveTab("review");
  };
  const onChangeFollow = (i: string) => {
    if (i == "following") setActiveTab("following");
    else setActiveTab("follower");
  };

  const resetFollowers = async () => {
    const followers = await getFollowers(data.id);
    setFollowers(followers);
    //reset followers;
  };

  const resetReviews = async () => {
    const reviews = await getReviews(data.id);
    setReviews(reviews);
    //reset followers;
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
              onFollow={resetFollowers}
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
                    <ManagePost currentId={currentId} data={followers} />
                  ) : null}

                  {activeTab === "review" ? (
                    <ManagePostReview
                      onAddReview={resetReviews}
                      userId={data.id}
                      data={reviews}
                    />
                  ) : null}
                </ContentBox>
              </ContentContainer>
            </ContainBody>

            {/* {activeTab === "following" ? (
                    <ManagePost data={data.following} />
                  ) : null} */}

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

  if (data) {
    const posts = await getPostsForUser(context.params.id);
    const followers = await getFollowers(context.params.id);
    const reviews = await getReviews(context.params.id);
    data.posts = posts;
    data.followers = followers;
    data.reviews = reviews;
  }

  // const users = await getUsers();

  // Get the paths we want to pre-render based on posts
  // const paths = users.map((user) => ({
  //   params: {
  //     id: user.id.toString(),
  //   },
  // }));

  return {
    props: {
      data: data,
      currentId: currentId,
      // paths: paths,
      fallback: true,
      token: token,
    },
    // will be passed to the page component as props
  };
}

export default ProfilePage;
