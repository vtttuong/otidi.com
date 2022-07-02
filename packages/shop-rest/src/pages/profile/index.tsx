import { closeModal, Modal, openModal } from "@redq/reuse-modal";
import { Bookmarks } from "assets/icons/Bookmarks";
import { CheckMark } from "assets/icons/CheckMark";
import { Following } from "assets/icons/Following";
import { Hourglass } from "assets/icons/Hourglass";
import { Person } from "assets/icons/Person";
import { Push } from "assets/icons/Push";
import { Review } from "assets/icons/Review";
import { Sold } from "assets/icons/Sold";
import ErrorMessage from "components/error-message/error-message";
import Notice from "components/notice/notice";
import { SEO } from "components/seo";
import { TabPanel } from "components/TabPanel/tabpanel";
import { ProfileProvider } from "contexts/profile/profile.provider";
import PushForm from "features/filter-modal/push-post";
import ContenHeader from "features/user-profile/contentHeader/contentHeader";
import ManagePost from "features/user-profile/manage-posts/manage-posts";
import ManagePostReview from "features/user-profile/manage-posts/manage-posts-review";
import Sidebar from "features/user-profile/sidebar/sidebar";
import {
  BodyContain,
  ContainBody,
  ContentBox,
  ContentContainer,
  PageWrapper,
  TabContain,
} from "features/user-profile/user-profile.style";
import WrapCard from "features/wrap-card/wrap-card";
import WrapCardSaved from "features/wrap-card/wrap-card-saved";
import Footer from "layouts/footer";
import moment from "moment";
import { NextPage } from "next";
import React, { useState } from "react";
import {
  getMyPosts,
  getPackage,
  getProfile,
  pushPost,
} from "utils/api/profile";
import { getFollowers } from "utils/api/user";
import { getCookie } from "utils/session";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  datas: any;
  token: string;
  service?: any;
};

const post_status = {
  WAITING: "waiting",
  SOLD: "sold",
  ACTIVE: "active",
};

const ProfilePage: NextPage<Props> = ({ datas, token }) => {
  const [activeTab, setActiveTab] = useState("postingPosts");
  const [successPush, setSuccessPush] = useState(false);
  const [data, setData] = useState(datas);
  const [errorMoneyPush, setErrorMoneyPush] = useState(false);
  const [arrayService, setArrayService] = useState([]);
  const posting = [];
  const getP = async () => {
    const service = await getPackage(token);
    setArrayService(service);
  };
  React.useEffect(() => {
    getP();
  }, []);

  data.posts.map((item) => {
    if (item.status !== post_status.SOLD && !item.is_priority) {
      posting.push(item);
    }
  });

  const dataTab2 = [
    {
      // number: posting.length,
      number: data.active_posts.length,
      key: "postingPosts",
      title: "Đang đăng",
      icon: <CheckMark width="15px" height="15px" color="green" />,
    },
    {
      number: data.waiting_approve_posts.length,
      key: "waitingPosts",
      title: "Chờ duyệt",
      icon: <Hourglass color="#0000ff" width="15px" height="15px" />,
    },
    {
      number: data.sold_posts.length,
      key: "soldPosts",
      title: "Đã bán",
      icon: <Sold />,
    },
    {
      number: data.posts.length - posting.length,
      key: "pushPosts",
      title: "Đang đẩy",
      icon: <Push />,
    },

    {
      number: data.post_saves?.length,
      key: "savedNews",
      title: "Tin đã lưu",
      icon: <Bookmarks color="#00d9ff" />,
    },
    {
      number: data.following_count || 0,
      key: "following",
      title: "Dang theo doi",
      icon: <Following />,
    },
    {
      number: data.followers_count,
      key: "follower",
      title: "nguoi theo doi",
      icon: <Person color="blue" />,
    },
    {
      number: data.reviews_count,
      key: "review",
      title: "review",
      icon: <Review />,
    },
  ];
  const onDeletePost = () => {
    alert(123);
  };
  const onMarkedPost = (id) => {
    data.posts.map((item) => {
      if (item.id == id) {
        item.is_sold = true;
        data.sold_post.push(item);
        return;
      }
    });
  };
  const onChangeFollow = (i: string) => {
    if (i == "following") setActiveTab("following");
    else setActiveTab("follower");
  };
  const onPush = (id) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: PushForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: "500px",
        height: "auto",
      },
      componentProps: { onPush: onPushClick, service: arrayService, id: id },
    });
  };
  const onPushClick = async (id, value, time) => {
    let serviceMoney = 0;
    arrayService.map((i) => {
      if (i.id == value) {
        serviceMoney = i.price;
        return;
      }
    });
    if (data.balance < serviceMoney) {
      closeModal();
      setErrorMoneyPush(true);
      return;
    }

    const formatTime = moment(time).format("HH:mm");
    await pushPost(token, id, value, String(formatTime));
    data.posts.map((item) => {
      if (item.id == id) {
        item.post_pushes.push({
          id: id,
          schedule: String(formatTime),
        });
        return;
      }
    });
    data.balance = data.balance - serviceMoney;
    setData(data);
    closeModal();
    setSuccessPush(true);
    setTimeout(() => {
      setSuccessPush(false);
    }, 3000);
  };
  setTimeout(() => {
    setErrorMoneyPush(false);
  }, 3000);

  return (
    <>
      <SEO title="Profile - SecondHandApp" description="Profile Details" />
      <ProfileProvider>
        <Modal>
          <PageWrapper>
            <ContenHeader data={data} onChangeFollow={onChangeFollow} />

            <ContainBody>
              <BodyContain>
                <Sidebar
                  balance={data.balance}
                  dataPost={data}
                  setActiveTab={setActiveTab}
                />
                {/* <Point deviceType={deviceType} /> */}
              </BodyContain>

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
                      onDeletePost={onDeletePost}
                      data={data.active_posts}
                      currentUser={true}
                      onMarkedPost={onMarkedPost}
                      onPush={onPush}
                    />
                  ) : null}

                  {activeTab === "waitingPosts" ? (
                    <WrapCard
                      data={data.waiting_approve_posts}
                      currentUser={true}
                      onDeletePost={onDeletePost}
                    />
                  ) : null}
                  {activeTab === "soldPosts" ? (
                    <WrapCard
                      data={data.sold_post}
                      currentUser={true}
                      onDeletePost={onDeletePost}
                    />
                  ) : null}
                  {activeTab === "pushPosts" ? (
                    <WrapCard
                      data={data.posts}
                      pushNews={true}
                      currentUser={true}
                      onDeletePost={onDeletePost}
                    />
                  ) : null}

                  {activeTab === "savedNews" ? (
                    <WrapCardSaved
                      saveNews={true}
                      data={data.post_saves}
                      currentUser={true}
                    />
                  ) : null}
                  {activeTab === "following" ? (
                    <ManagePost data={data.following} />
                  ) : null}

                  {activeTab === "follower" ? (
                    <ManagePost data={data.followers} />
                  ) : null}
                  {activeTab === "review" ? (
                    <ManagePostReview userId={data.id} />
                  ) : null}
                </ContentBox>
              </ContentContainer>
            </ContainBody>
            {successPush ? (
              <Notice status={"success"} content={"Saved time push post !"} />
            ) : null}

            {errorMoneyPush ? (
              <Notice
                status={"errror"}
                content={"Vui lòng nạp đủ tiền để  sử dụng dịch vụ!"}
              />
            ) : null}
            <Footer />
          </PageWrapper>
        </Modal>
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
  const followers = await getFollowers(data.id);
  data.posts = posts;
  data.followers = followers;

  data.waiting_approve_posts = posts.filter(
    (post) => post.status === post_status.WAITING
  );

  data.sold_posts = posts.filter((post) => post.status === post_status.SOLD);
  data.active_posts = posts.filter(
    (post) => post.status === post_status.ACTIVE
  );

  return {
    props: {
      datas: data,
      token: token,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
