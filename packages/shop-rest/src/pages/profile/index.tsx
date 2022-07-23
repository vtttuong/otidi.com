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
import PushUpdate from "features/filter-modal/push-update-post";
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
import React, { useCallback, useRef, useState } from "react";
import {
  getMyPosts,
  getPackage,
  getProfile,
  pushPost,
  updatePushPackage,
} from "utils/api/profile";
import { getFollowers, getFollowings, getReviews } from "utils/api/user";
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
  const [errorTime, setErrorTime] = useState(false);
  const [arrayService, setArrayService] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const getP = async () => {
    const services = await getPackage(token);

    setArrayService(services);
  };
  React.useEffect(() => {
    getP();
  }, []);

  React.useEffect(() => {
    data.waiting_approve_posts = data.posts.filter(
      (post) => post.status === post_status.WAITING
    );

    data.sold_posts = data.posts.filter(
      (post) => post.status === post_status.SOLD
    );
    data.active_posts = data.posts.filter(
      (post) => post.status === post_status.ACTIVE
    );
    data.pushing_posts = data.posts.filter((post) => post.advertise !== null);
    // data.posts.map((item) => {
    //   if (item.status !== post_status.SOLD && !item.advertise) {
    //     posting.push(item);
    //   }
    // });
  }, [data]);

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
      number: data.pushing_posts.length,
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
      number: data.followings?.length || 0,
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
        item.status = "sold";
        data.sold_posts.push(item);
        return;
      }
    });
  };

  const scrollToManageTable = () => {
    const yOffset = -110;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };
  const onChangeFollow = (i: string) => {
    scrollToManageTable();
    if (i == "following") setActiveTab("following");
    else setActiveTab("follower");
  };
  const onPush = useCallback(
    (id) => {
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
        componentProps: {
          onPush: onPushClick,
          service: arrayService,
          id: id,
          loading: loading,
        },
      });
    },
    [arrayService]
  );
  const onUpdatePackage = useCallback((id) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: PushUpdate,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: "500px",
        height: "auto",
      },
      componentProps: {
        onUpdate: onUpdatePackageClick,
        id: id,
        loading: loading,
      },
    });
  }, []);

  const onUpdatePackageClick = async (packId: number, time: string) => {
    const formatTime = moment(time).format("YYYY-MM-DD HH:mm");
    console.log(packId, formatTime);

    closeModal();
    setLoading(true);
    const { result, advertise } = await updatePushPackage(
      token,
      packId,
      String(formatTime)
    );

    console.log(
      "🚀 ~ file: index.tsx ~ line 232 ~ onUpdatePackageClick ~ advertise",
      advertise
    );
    if (result) {
      data.posts.forEach((item) => {
        if (item.id == advertise[0].post_id) {
          item.advertise = advertise[0];
          return;
        }
      });

      setData({ ...data });
      setSuccessPush(true);
    } else {
      setErrorTime(true);
    }
    setLoading(false);
  };

  const onPushClick = async (id, packageId, time) => {
    let serviceMoney =
      arrayService.find((service) => service.id == packageId)?.price || 0;

    if (data.balance < serviceMoney) {
      closeModal();
      setErrorMoneyPush(true);

      return;
    }

    const formatTime = moment(time).format("YYYY-MM-DD HH:mm");
    closeModal();
    setLoading(true);
    const { result, advertise } = await pushPost(
      token,
      id,
      packageId,
      String(formatTime)
    );

    if (result) {
      data.posts.forEach((item) => {
        if (item.id == id) {
          item.advertise = advertise;
          return;
        }
      });

      data.balance = data.balance - serviceMoney;

      setData({ ...data });
      setLoading(false);
      setSuccessPush(true);
    } else {
      setLoading(false);
      setErrorTime(true);
    }
  };

  setTimeout(() => {
    setErrorMoneyPush(false);
    setErrorTime(false);
  }, 3000);

  return (
    <>
      <SEO title="Profile - SecondHandApp" description="Profile Details" />
      <ProfileProvider>
        <Modal>
          <PageWrapper>
            <ContenHeader
              data={data}
              onChangeFollow={onChangeFollow}
              scrollTo={scrollToManageTable}
            />

            <ContainBody>
              <BodyContain>
                <Sidebar
                  balance={data.balance}
                  dataPost={data}
                  setActiveTab={setActiveTab}
                  setActive={scrollToManageTable}
                />
                {/* <Point deviceType={deviceType} /> */}
              </BodyContain>

              <ContentContainer ref={ref}>
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
                      onUpdatePackage={onUpdatePackage}
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
                      data={data.sold_posts}
                      currentUser={true}
                      onDeletePost={onDeletePost}
                    />
                  ) : null}
                  {activeTab === "pushPosts" ? (
                    <WrapCard
                      data={data.pushing_posts}
                      pushNews={true}
                      currentUser={true}
                      onDeletePost={onDeletePost}
                      onUpdatePackage={onUpdatePackage}
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
                    <ManagePost data={data.followings} />
                  ) : null}

                  {activeTab === "follower" ? (
                    <ManagePost data={data.followers} />
                  ) : null}
                  {activeTab === "review" ? (
                    <ManagePostReview data={data.reviews} userId={data.id} />
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
            {errorTime ? (
              <Notice
                status={"errror"}
                content={
                  "Vui lòng chọn thời gian bắt đầu từ thời điểm hiện tại"
                }
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
  if (data) {
    const posts = await getMyPosts(token);
    const followers = await getFollowers(data.id);
    const followings = await getFollowings(data.id);
    const reviews = await getReviews(data.id);
    data.posts = posts;
    data.followers = followers;
    data.reviews = reviews;
    data.followings = followings;

    data.waiting_approve_posts = data.posts.filter(
      (post) => post.status === post_status.WAITING
    );

    data.sold_posts = data.posts.filter(
      (post) => post.status === post_status.SOLD
    );
    data.active_posts = data.posts.filter(
      (post) => post.status === post_status.ACTIVE
    );
    data.pushing_posts = data.posts.filter((post) => post.advertise != null);
  }

  return {
    props: {
      datas: data,
      token: token,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
