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
import React, { useState } from "react";
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
import { getProductBySlug, onFollow, onUnFollow } from "utils/api/product";
import { getCookie } from "utils/session";
import {
  ActionButton,
  Avata,
  CenterContainer,
  CenterContainerSub,
  ContainerImage,
  Dot,
  InfoBody,
  MainAvata,
  Name,
  TextFormat,
  Title,
  TopContainer,
} from "./author-infor.style";

const AuthoInfor: React.FC<{}> = () => {
  const router = useRouter();
  const { query } = useRouter();
  let slug = query.slug;
  const defaultOptions = { scrollwheel: false };
  const [data, setData] = useState<any>({ user: { avatar_url: "user.png" } });
  const [chatLoading, setChatLoading] = useState(false);
  const [tok, setTok] = useState("");
  const [followed, setFollowed] = useState(false);
  const [vefifyAccount, setVefifyAccount] = useState(false);
  const [bargainLoading, setBargainLoading] = useState(false);
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
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
      if (followed == false) {
        setFollowed(true);
        await onFollow(token, data.user_id);
      } else {
        setFollowed(false);
        await onUnFollow(token, data.user_id);
      }
    }
  };

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

  const verify = (data) => {
    if (
      data.user.email_verified_at &&
      data.user.phone_verified_at &&
      data.user.identify?.identified_at
    ) {
      setVefifyAccount(true);
    } else {
      setVefifyAccount(false);
    }
  };
  const getProduct = async () => {
    var token = getCookie("access_token");
    if (slug) {
      setTok(token);
      let product = await getProductBySlug(token, slug);
      setData(product);
      verify(product);
    }
  };
  React.useEffect(() => {
    getProduct();
  }, [slug]);

  if (!data.id) {
    return <AuthoInforDf />;
  }

  return (
    <InfoBody className={"profile-post"}>
      <MainAvata
        className={"border"}
        onClick={() => {
          let currentUserId = getCookie("userId");
          if (data.user.id == currentUserId) {
            router.push("/profile");
          } else {
            router.push("/profile/[id]", `/profile/${data.user.id}`);
          }
        }}
      >
        <Avata
          src={data.user?.avatar_img_url}
          onClick={() => {
            let currentUserId = getCookie("userId");
            if (data.user.id == currentUserId) {
              router.push("/profile");
            } else {
              router.push("/profile/[id]", `/profile/${data.user.id}`);
            }
          }}
        />
        <MainAvata className={"name"}>
          <Name>
            {data.user?.name}
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
            {data.user.last_seen_at ? (
              <>
                <Dot />
                <FormattedMessage id="offStatus" defaultMessage="Offline" />
              </>
            ) : (
              <>
                <Dot className={"active"} />
                <FormattedMessage id="onStatus" defaultMessage="onStatus" />
              </>
            )}
          </Name>
        </MainAvata>
      </MainAvata>
      <MainAvata className={"border"}>
        <MainAvata className={"sub"}>
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
        </MainAvata>
        <MainAvata className={"sub subRate"}>
          <Name className={"subInfo rate"}>
            {"(" + parseFloat(data.user?.rating).toFixed(1) + ")"}
          </Name>
          <ContainerImage className={"star"}>
            <StarRatings
              rating={data.user?.rating}
              starDimension="20px"
              starSpacing="5px"
              starRatedColor={"#ffc107"}
            />
          </ContainerImage>
        </MainAvata>
      </MainAvata>
      <TopContainer></TopContainer>
      <MainAvata className={"border"}>
        <ActionButton className={"chat"}>
          <Button
            type="button"
            onClick={onChat}
            size="medium"
            loading={chatLoading}
            style={{ width: "100%" }}
          >
            <Chat />
            <FormattedMessage id="chat" defaultMessage="Message" />
          </Button>
        </ActionButton>
      </MainAvata>
      <MainAvata className={"border"}>
        <ActionButton className={"chat"}>
          <Money />
          <Button
            type="button"
            onClick={onBargain}
            size="medium"
            loading={bargainLoading}
            style={{ width: "100%" }}
          >
            <Money />
            <FormattedMessage id="bargain" defaultMessage="Trả giá" />
          </Button>
        </ActionButton>
      </MainAvata>
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
              <TextFormat>{data.user?.phone_number}</TextFormat>
            ) : (
              <TextFormat onClick={() => router.push("/login")}>
                {data.user?.phone_number.replace(/^\d{1,7}/, (x) =>
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
