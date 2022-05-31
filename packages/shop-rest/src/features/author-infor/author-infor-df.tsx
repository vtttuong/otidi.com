import { Chat } from "assets/icons/Chat";
import { Follow } from "assets/icons/Follow";
import { Money } from "assets/icons/Money";
import { NotVerified } from "assets/icons/notVerified";
import { Button } from "components/button/button";
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

const AuthoInforDf: React.FC<{}> = () => {
  const defaultOptions = { scrollwheel: false };
  const [data, setData] = useState<any>({ user: { avatar_url: "user.png" } });
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
      defaultCenter={{ lat: 10.7738735, lng: 106.6593732 }}
      defaultOptions={defaultOptions}
    >
      <Marker position={{ lat: 10.7738735, lng: 106.6593732 }} />
    </GoogleMap>
  );

  const MapComponent = mapEnvironment(MapLayout);

  return (
    <InfoBody className={"profile-post default"}>
      <MainAvata className={"border"}>
        <Avata src={data.user?.avatar_img_url} />
        <MainAvata className={"name"}>
          <Name className="df">
            Nguyen Tran Anh Tu
            <NotVerified
              style={{
                top: 5,
                position: "relative",
                left: 27,
              }}
            />
          </Name>
          <Name className={"status"}>
            <Dot />
            <span
              style={{
                background: "#cac6c6",
                width: "100%",
                color: "transparent",
              }}
            >
              khong hoat dong nua hay check
            </span>
          </Name>
        </MainAvata>
      </MainAvata>
      <MainAvata className={"border"}>
        <MainAvata className={"sub"}>
          <ActionButton className={"follow"}>
            <Follow />
            <>
              <Title>
                <FormattedMessage id={"follow"} />
              </Title>
            </>
          </ActionButton>
        </MainAvata>
        <MainAvata className={"sub subRate"}>
          <Name className={"subInfo rate"}>{"(...)"}</Name>
          <ContainerImage className={"star"}>
            <StarRatings
              rating={0}
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
          <Button type="button" size="medium" style={{ width: "100%" }}>
            <Chat />
            <FormattedMessage id="chat" defaultMessage="Message" />
          </Button>
        </ActionButton>
      </MainAvata>
      <MainAvata className={"border"}>
        <ActionButton className={"chat"}>
          <Money />
          <Button type="button" size="medium" style={{ width: "100%" }}>
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
            <TextFormat>{".............................."}</TextFormat>
          </Title>
        </CenterContainerSub>

        <CenterContainerSub>
          <Title className={"info"}>
            <FormattedMessage id="phone" defaultMessage="Phone:" />
          </Title>
          <Title className={"infosub"}>
            <TextFormat>{"...................."}</TextFormat>
          </Title>
        </CenterContainerSub>
      </CenterContainer>
    </InfoBody>
  );
};

export default AuthoInforDf;
