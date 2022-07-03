import { CartIcon } from "assets/icons/CartIcon";
import { Follow } from "assets/icons/Follow";
import { ID } from "assets/icons/ID";
import { MapMarker } from "assets/icons/MapMarker";
import { NotVerified } from "assets/icons/notVerified";
import { PencilIcon } from "assets/icons/PencilIcon";
import { PhoneIcon } from "assets/icons/Phone";
import { SkypeIcon } from "assets/icons/skype-brands";
import { UserAvatar } from "assets/icons/UserAvatar";
import { Verified } from "assets/icons/verified";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";
import { CalendarCheck } from "../../../assets/icons/CalendarCheck";
import { Check2Circle } from "../../../assets/icons/Check2Circle";
import { DollarIcon } from "../../../assets/icons/DollarIcon";
import { Envelope } from "../../../assets/icons/Envelope";
import { Facebook } from "../../../assets/icons/Facebook";

import {
  ButtonFollow,
  Col,
  ContentHeaderWrapper,
  GroupButtons,
  ItemRate,
  Row,
} from "./contentHeader.style";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  profileOther?: boolean;
  onRate?: any;
  onFollow?: any;
  token?: string;
  userId?: number;
  onChangeFollow?: (type: string) => void;
};

const ContenHeader: React.FC<Props> = ({
  data,
  profileOther,
  onRate,
  userId,
  token,
  onChangeFollow,
}) => {
  const router = useRouter();
  const [following, setFollowing] = useState(false);
  const [vefifyAccount, setVefifyAccount] = useState(false);
  let time = moment(data.created_at, ["YYYY", moment.ISO_8601]);
  let createdAt = time.date() + "/" + time.month() + "/" + time.year();
  const mailTo = "mailto:" + data.email;
  const skypeTo = "tel://" + data.skype;
  const facebookTo = data.facebook;
  const verifyEmail = data.email_verified_at ? true : false;
  const verifyPhone = data.phone_verified_at ? true : false;
  const verifyId = data.identity_verified_at ? true : false;

  const onFollow = async () => {
    if (token == undefined) {
      router.push("/login");
      return;
    } else {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      };
      if (following == false) {
        setFollowing(true);

        const res = await fetch(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL +
            `/api/client/v1/users/${data.id}/follow`,
          options
        );
      } else {
        setFollowing(false);

        const res = await fetch(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL +
            `/api/client/v1/users/${data.id}/unfollow`,
          options
        );
      }
    }
  };
  const verify = () => {
    if (
      data.email_verified_at &&
      data.phone_verified_at &&
      data.identity_verified_at
    ) {
      setVefifyAccount(true);
    } else {
      setVefifyAccount(false);
    }
  };
  React.useEffect(() => {
    if (data.followers.length != 0) {
      data.followers.map((follower) => {
        if (follower.follower_id == userId) {
          setFollowing(true);
          return;
        }
      });
    }
    verify();
  }, []);

  return (
    <>
      <ContentHeaderWrapper>
        <Row className="header-profile">
          <Col className="col" xs={12} sm={6} md={6} lg={5}>
            <div style={{ padding: "15px 0px 15px 15px" }}>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                  }}
                >
                  <img
                    className="avatar-image"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                    src={
                      data.avatar
                        ? data.avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt="img"
                  />
                </div>
                <div style={{ marginLeft: 10, flex: "1" }}>
                  <div
                    style={{
                      color: "#009E7F",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginTop: -14,
                    }}
                  >
                    {data.name}
                    {vefifyAccount ? (
                      <Verified
                        style={{ top: 7, position: "relative", left: 10 }}
                      />
                    ) : (
                      <NotVerified
                        style={{ top: 7, position: "relative", left: 10 }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#656565",
                      marginTop: 5,
                      fontWeight: 700,
                    }}
                  >
                    {data.email}
                    {vefifyAccount ? (
                      <>
                        <br />
                        <span
                          style={{
                            color: "#1958b9",
                            marginTop: 4,
                            display: "inline-block",
                          }}
                        >
                          <FormattedMessage id="verifiedAccount" />
                        </span>
                      </>
                    ) : (
                      <>
                        <br />
                        <span
                          style={{
                            color: "orange",
                            marginTop: 4,
                            display: "inline-block",
                          }}
                        >
                          <FormattedMessage
                            id="verifyAccount"
                            defaultMessage="Xac thuc tai khoan"
                          />
                        </span>
                      </>
                    )}
                  </div>
                  <GroupButtons>
                    <span
                      className={verifyPhone ? "active" : "deactive"}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        color: "white",
                        marginRight: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      <b>
                        {verifyPhone ? "Đã xác thực Sđt" : "Chưa xác thực Sđt"}
                      </b>
                      <PhoneIcon />
                    </span>
                    <span
                      className={verifyId ? "active" : "deactive"}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        color: "white",
                        marginRight: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      <ID />
                      <b>
                        {verifyId ? "Đã xác thực Cmnd" : "Chưa xác thực Cmnd"}
                      </b>
                    </span>
                    <a
                      className={verifyEmail ? "active" : "deactive"}
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        color: "white",
                        marginRight: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                      href={mailTo}
                    >
                      <b>
                        {verifyEmail
                          ? "Đã xác thực Email"
                          : "Chưa xác thực Email"}
                      </b>
                      <Envelope />
                    </a>
                    <span></span>

                    <span
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        backgroundColor: "#009E7F",
                        color: "white",
                        marginRight: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                    >
                      <MapMarker />
                    </span>

                    <a
                      style={{
                        cursor: "pointer",
                        padding: "10px",
                        backgroundColor: "#009E7F",
                        color: "white",
                        marginRight: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                      className={facebookTo?.length > 5 ? "active" : ""}
                      href={facebookTo}
                    >
                      <Facebook />
                    </a>

                    {!profileOther ? (
                      <Link href="/profile/setting-profile">
                        <div
                          className="button-edit"
                          style={{
                            cursor: "pointer",
                            padding: "10px",
                            backgroundColor: "#009E7F",
                            color: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            width: "95px",
                            height: "30px",
                            fontSize: 13,
                            borderRadius: "5px",
                          }}
                        >
                          <PencilIcon
                            width="10px"
                            height="10px"
                            style={{ marginRight: 6 }}
                          />
                          <FormattedMessage
                            id="Update-Button"
                            defaultMessage="Update"
                          />
                        </div>
                      </Link>
                    ) : null}
                  </GroupButtons>
                </div>
              </div>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#6e6e6e",
                  fontSize: 13,
                  marginTop: 20,
                }}
              >
                <CalendarCheck width="20px" height="20px" /> &nbsp;
                <FormattedMessage id="Join" defaultMessage="Join" /> {createdAt}
              </p>
            </div>
          </Col>

          <Col xs={12} sm={6} md={6} lg={4} className="col">
            <div className="wrap-middle-header">
              <div className="wrap-item-header" style={{ cursor: "pointer" }}>
                <div className="like-icon" style={{ color: "#00A2FF" }}>
                  <UserAvatar width="20px" height="20px" />
                </div>
                <div
                  className="content-like"
                  onClick={() => onChangeFollow("following")}
                >
                  <b style={{ fontSize: 16 }}>{data.following_count}</b>
                  <div>
                    <FormattedMessage
                      id="following"
                      defaultMessage="Following"
                    />
                  </div>
                </div>
              </div>

              <div
                className="wrap-item-header"
                style={{ borderRight: "none", cursor: "pointer" }}
                onClick={() => onChangeFollow("followed")}
              >
                <div className="like-icon" style={{ color: "#00BBB5" }}>
                  <UserAvatar width="20px" height="20px" />
                </div>
                <div className="content-like">
                  <b style={{ fontSize: 16 }}>{data.follower_count}</b>
                  <div>
                    <FormattedMessage id="followed" defaultMessage="Followed" />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "block", marginTop: 10, paddingLeft: 15 }}>
              {"(" + parseFloat(data.rating).toFixed(1) + ") "}
              <StarRatings
                rating={data.rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor={"#ffc107"}
              />
              <ItemRate onClick={onRate}>
                {"("}
                {data.reviews_count}{" "}
                <FormattedMessage id="rate" defaultMessage="Rate" />
                {")"}
              </ItemRate>
            </div>
          </Col>

          <Col xs={12} sm={5} md={5} lg={3} style={{ paddingBottom: "30px" }}>
            <div className="wrap-end-header">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="type-account"
              >
                <div className="icon-check">
                  <Check2Circle />
                </div>
                <div className="text-account">
                  <FormattedMessage id="account" defaultMessage="account" />:
                  &nbsp;
                  <span style={{ color: "#FF851B" }}>
                    <FormattedMessage
                      id={data.level.name}
                      defaultMessage="Normal"
                    />
                  </span>
                </div>
              </div>

              {profileOther && profileOther == true ? (
                <ButtonFollow
                  onClick={onFollow}
                  className={following ? "following" : "follow"}
                >
                  <Follow />

                  {following ? (
                    <FormattedMessage
                      id="following"
                      defaultMessage="Folowing"
                    />
                  ) : (
                    <FormattedMessage id="follow" defaultMessage="Folow" />
                  )}
                </ButtonFollow>
              ) : (
                <>
                  <div className="wrap-action">
                    <div
                      className="action-item"
                      style={{
                        backgroundColor: "#FF851B",
                        marginRight: 5,
                        height: 40,
                        borderRadius: 7,
                        padding: "10px 20px",
                        width: 210,
                      }}
                    >
                      <UserAvatar width="15px" height="15px" />
                      <FormattedMessage
                        id="upgradeAccount"
                        defaultMessage="Upgrade account"
                      />
                    </div>
                    <div
                      className="action-item"
                      style={{
                        backgroundColor: "#45C9F5",
                        height: 40,
                        borderRadius: 7,
                        padding: "10px 20px",
                        width: 210,
                      }}
                    >
                      <CartIcon
                        width="15px"
                        height="15px"
                        style={{
                          marginRight: 5,
                        }}
                      />
                      <FormattedMessage
                        id="storageManagement"
                        defaultMessage="Storage management"
                      />
                    </div>
                    <div
                      className="action-item"
                      style={{
                        width: 210,
                        backgroundColor: "#0073B7",
                        height: 40,
                        borderRadius: 7,
                        padding: "10px 20px",
                      }}
                    >
                      <DollarIcon />
                      <FormattedMessage
                        id="purchaseOfService"
                        defaultMessage="Purchase of service"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </ContentHeaderWrapper>
    </>
  );
};

export default ContenHeader;
