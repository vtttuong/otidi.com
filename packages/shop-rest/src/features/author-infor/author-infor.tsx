import { openModal } from "@redq/reuse-modal";
import { Chat } from "assets/icons/Chat";
import { Follow } from "assets/icons/Follow";
import { Money } from "assets/icons/Money";
import { NotVerified } from "assets/icons/notVerified";
import { Verified } from "assets/icons/verified";
import { Button } from "components/button/button";
import AuthoInforDf from "./author-infor-df";
import ReportModal from "features/filter-modal/bargain";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";
import { compose, withProps } from "recompose";
import { createChat } from "utils/api/chat";
import { getCookie } from "utils/session";
import {
  ActionButton,
  Avatar,
  CenterContainer,
  CenterContainerSub,
  ContainerImage,
  Dot,
  InfoBody,
  MainAvatar,
  Name,
  TextFormat,
  Title,
  TopContainer,
} from "./author-infor.style";
import { follow, getFollowers, unfollow } from "utils/api/user";

type AuthoInforProps = {
  data: any;
};

const AuthoInfor: React.FC<AuthoInforProps> = ({ data }) => {
  const router = useRouter();
  const { query } = useRouter();
  const defaultOptions = { scrollwheel: false };

  const [chatLoading, setChatLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [tok, setTok] = useState("");
  const [followed, setFollowed] = useState(false);
  const [vefifyAccount, setVefifyAccount] = useState(false);
  const [bargainLoading, setBargainLoading] = useState(false);
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const mapEnvironment = compose(
    withProps({
      googleMapURL,
      loadingElement: <div style={{ height: "400px" }} />,
      containerElement: <div style={{ height: "400px", width: "100%" }} />,
      mapElement: <div style={{ height: `400px` }} />,
    }),
    withScriptjs,
    withGoogleMap
  );

  const isCurrentUser = () => {
    const currentId = getCookie("userId");
    return currentId == data.id;
  };

  const MapLayout = (props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: data.latitude, lng: data.longitude }}
      defaultOptions={defaultOptions}
    >
      <Marker position={{ lat: data.latitude, lng: data.longitude }} />
    </GoogleMap>
  );

  const MapComponent = mapEnvironment(MapLayout);

  const onFollows = async () => {
    const token = getCookie("access_token");

    if (token == undefined) {
      router.push("/login");
    } else {
      setFollowLoading(true);
      if (followed == false) {
        const { result } = await follow(token, data.id);
        if (result) {
          setFollowed(true);
        }
      } else {
        const { result } = await unfollow(token, data.id);
        if (result) {
          setFollowed(false);
        }
      }
      setFollowLoading(true);
    }
  };

  useEffect(() => {
    const checkFollowed = async () => {
      const token = getCookie("access_token");
      const currentId = getCookie("userId");
      console.log(
        "🚀 ~ file: author-infor.tsx ~ line 98 ~ checkFollowed ~ currentId",
        currentId
      );

      if (!token) {
        return;
      }
      const followers = await getFollowers(data.id);
      const isFollowed =
        followers.filter((item) => item.follower_id == +currentId).length > 0;
      setFollowed(isFollowed);
    };

    checkFollowed();
  }, []);

  const onChat = async () => {
    const token = getCookie("access_token");

    if (token == undefined) {
      router.push("/login");
    } else {
      setChatLoading(true);
      const response = await createChat(token, data.id);
      if (response.status == 201 || response.status == 200) {
        const uuid: any = await response.json();
        router.push({
          pathname: "/message",
          query: { uuid: uuid.uuid },
        });
      }
    }
  };

  const onBargain = async () => {
    setBargainLoading(true);
    const token = getCookie("access_token");
    if (token == undefined) {
      router.push("/login");
    } else {
      openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: ReportModal,
        closeComponent: "",
        config: {
          enableResizing: false,
          disableDragging: true,
          className: "quick-view-modal",
          width: "500px",
          height: "auto",
        },
        componentProps: {
          titleId: "Bargain !",
          data: { token: token, postId: data.id },
        },
      });
      setBargainLoading(false);
    }
  };

  const verify = (user) => {
    if (user.full_verification) {
      setVefifyAccount(true);
    } else {
      setVefifyAccount(false);
    }
  };
  // const getPost = async () => {
  //   var token = getCookie("access_token");

  //   if (slug) {
  //     setTok(token);
  //     let post = await getPostBySlug(token, slug);
  //     verify(post);
  //   }
  // };
  React.useEffect(() => {
    verify(data);
  }, []);

  if (!data.id) {
    return <AuthoInforDf />;
  }

  return (
    <InfoBody className={"profile-post"}>
      <MainAvatar
        className={"border"}
        onClick={() => {
          let currentUserId = getCookie("userId");
          if (data.id == currentUserId) {
            router.push("/profile");
          } else {
            router.push("/profile/[id]", `/profile/${data.id}`);
          }
        }}
      >
        <Avatar
          src={data.avatar}
          onClick={() => {
            let currentUserId = getCookie("userId");
            if (data.id == currentUserId) {
              router.push("/profile");
            } else {
              router.push("/profile/[id]", `/profile/${data.id}`);
            }
          }}
        />
        <MainAvatar className={"name"}>
          <Name>
            {data.name}
            {vefifyAccount ? (
              <Verified
                style={{
                  top: 7,
                  position: "relative",
                  left: 10,
                }}
              />
            ) : (
              <NotVerified
                style={{
                  top: 7,
                  position: "relative",
                  left: 10,
                }}
              />
            )}
          </Name>
          <Name className={"status"}>
            {/* {data.user.status === "active" ? (
              <>
                <Dot />
                <FormattedMessage id="offStatus" defaultMessage="Offline" />
              </>
            ) : (
              <>
                <Dot className={"active"} />
                <FormattedMessage id="onStatus" defaultMessage="onStatus" />
              </>
            )} */}
          </Name>
        </MainAvatar>
      </MainAvatar>
      <MainAvatar className={"border follow"}>
        {!isCurrentUser() && (
          <MainAvatar className={"sub"}>
            <ActionButton
              onClick={onFollows}
              className={followed ? "following" : "follow"}
            >
              <Follow />
              <>
                <Title>
                  <FormattedMessage id={followed ? "following" : "follow"} />
                </Title>
              </>
            </ActionButton>
          </MainAvatar>
        )}
        <MainAvatar className={"sub subRate"}>
          <Name className={"subInfo rate"}>
            {"(" + parseFloat(data.rating).toFixed(1) + ")"}
          </Name>
          <ContainerImage className={"star"}>
            <StarRatings
              rating={data.rating}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor={"#ffc107"}
            />
          </ContainerImage>
        </MainAvatar>
      </MainAvatar>
      <TopContainer></TopContainer>
      {!isCurrentUser() && (
        <>
          <MainAvatar className={"border"}>
            <ActionButton className={"chat"}>
              <Button
                type="button"
                onClick={onChat}
                size="medium"
                loading={chatLoading}
                style={{ width: "100%", height: "100%" }}
              >
                <Chat />
                <FormattedMessage id="chat" defaultMessage="Message" />
              </Button>
            </ActionButton>
          </MainAvatar>
          <MainAvatar className={"border"}>
            <ActionButton className={"chat"}>
              <Money />
              <Button
                type="button"
                onClick={onBargain}
                size="medium"
                loading={bargainLoading}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Money />
                <FormattedMessage id="bargain" defaultMessage="Trả giá" />
              </Button>
            </ActionButton>
          </MainAvatar>
        </>
      )}
      <CenterContainer>
        <Title className={"title"}>
          <FormattedMessage id="maps" defaultMessage="Maps" />
        </Title>
        <CenterContainerSub>
          <MapComponent />
        </CenterContainerSub>

        <CenterContainerSub>
          <Title className={"info"}>
            <FormattedMessage id="address" defaultMessage="Address:" />
          </Title>
          <Title className={"infosub"}>
            <TextFormat>{data.address}</TextFormat>
          </Title>
        </CenterContainerSub>

        <CenterContainerSub>
          <Title className={"info"}>
            <FormattedMessage id="phone" defaultMessage="Phone:" />
          </Title>
          <Title className={"infosub phone"}>
            {tok ? (
              <TextFormat>{data.phone_number}</TextFormat>
            ) : (
              <TextFormat onClick={() => router.push("/login")}>
                {data.phone_number.replace(/^\d{1,7}/, (x) =>
                  x.replace(/./g, "*")
                )}
              </TextFormat>
            )}
          </Title>
        </CenterContainerSub>
      </CenterContainer>
    </InfoBody>
  );
};

export default AuthoInfor;
