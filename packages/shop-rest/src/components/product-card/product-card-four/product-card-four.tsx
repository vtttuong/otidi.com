// post card for food
import { Edit } from "assets/icons/Edit";
import { Eye } from "assets/icons/Eye";
import { Like } from "assets/icons/Like";
import Image from "components/image/image";
import Notice from "components/notice/notice";
import PopoverNotify from "components/popover-notify/popover-post";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { getCookie } from "utils/session";
import Countdown from "react-countdown";
import moment from "moment";
import AddressIcon from "../../../assets/images/location.png";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";
import {
  BoxAvatar,
  BuyLabel,
  Category,
  DeliveryOpt,
  Duration,
  FoodCardWrapper,
  FoodImageWrapper,
  PostInfo,
  PostMeta,
  SellLabel,
  SellLabelTop,
} from "../product-card.style";

type CardProps = {
  name?: string;
  image?: any;
  address?: string;
  price?: string;
  unit?: string;
  isFree?: boolean;
  createdAt?: string;
  typeOfPost?: string;
  data?: any;
  postId?: number;
  prioriry?: boolean;
  isBook?: boolean;
  isMarked?: boolean;
  saveNews?: boolean;
  currentUser?: boolean;
  onClick?: (e: any) => void;
  onClickEdit?: (e: any) => void;
  onDeletePost?: (e: any) => void;
  onMark?: (e: any) => void;
  onPush?: (e: any) => void;
};

const PostCard: React.FC<CardProps> = ({
  name,
  image,
  postId,
  isMarked,
  onDeletePost,
  onMark,
  onPush,
  address,
  price,
  unit,
  isFree,
  createdAt,
  typeOfPost,
  data,
  prioriry,
  currentUser,
  saveNews,
  onClick,
  onClickEdit,
  isBook,
  ...props
}) => {
  let formatTime = formatRelativeTime(createdAt);
  const router = useRouter();
  // const [package, setPackage] = React.useState([])
  const handler = <span>...</span>;
  const content = (
    <div className="action">
      {data && data.status == "approving" ? null : (
        <p
          style={{
            fontWeight: 600,
          }}
          onClick={onMark}
        >
          Mark bought
        </p>
      )}
      {data && data.status == "active" && !data.is_priority ? (
        <p
          style={{
            fontWeight: 600,
          }}
          onClick={onPush}
        >
          Sell faster
        </p>
      ) : null}
      <p
        style={{
          fontWeight: 600,
        }}
        onClick={onDeletePost}
      >
        Delete
      </p>
    </div>
  );
  const Completionist = () => <span className="schedule">pushing...</span>;

  const renderer = ({ hours, minutes, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="schedule">
          {"Còn "} {hours}h:{minutes}m
        </span>
      );
    }
  };
  var a: number;
  var b: number;
  var c: number;
  if (data && data.post_pushes) {
    const scheduleTime = data.post_pushes[0]?.schedule;
    const mNow = new Date().getMinutes();
    const hNow = new Date().getHours();
    let mSchedule = moment(scheduleTime, "HH:mm:ss").minutes();
    let hSchedule = moment(scheduleTime, "HH:mm:ss").hours();

    if (mSchedule - mNow >= 0) {
      a = (mSchedule - mNow) * 60000;
      if (hSchedule - hNow >= 0) {
        b = (hSchedule - hNow) * 3600000;
      } else {
        b = (24 + (hSchedule - hNow)) * 3600000;
      }
      c = a + b;
    } else {
      a = (60 + (mSchedule - mNow)) * 60000;
      if (hSchedule - hNow >= 0) {
        b = (hSchedule - hNow) * 3600000;
      } else {
        b = (24 + (hSchedule - hNow)) * 3600000;
      }
      c = a + b - 3600000;
    }
  }
  return (
    <FoodCardWrapper className="food-card">
      <FoodImageWrapper onClick={onClick}>
        <Image
          url={image}
          className="post-image"
          style={{ position: "relative" }}
          alt={name}
        />
        {data &&
        data.post_pushes?.length !== 0 &&
        data.is_priority === false &&
        currentUser ? (
          <Countdown date={Date.now() + c} renderer={renderer} />
        ) : null}
        {typeOfPost == "sell" ? (
          <SellLabel>
            <FormattedMessage id="sellPost" defaultMessage="Sell" />
          </SellLabel>
        ) : (
          <BuyLabel>
            <FormattedMessage id="buyPost" defaultMessage="Sell" />
          </BuyLabel>
        )}
        {prioriry == true ? (
          <SellLabelTop className="main-content">
            <FormattedMessage id="topPost" defaultMessage="Top post" />
          </SellLabelTop>
        ) : null}
      </FoodImageWrapper>
      <PostInfo
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <h3
          className={
            currentUser == true && !saveNews
              ? "post-title current-user"
              : "post-title"
          }
        >
          {name}
        </h3>
        {currentUser == true && !saveNews ? (
          <span
            style={{
              position: "absolute",
              right: 8,
              top: 12,
              cursor: "pointer",
              zIndex: 150,
            }}
            onClick={onClickEdit}
          >
            {" "}
            <Edit />
          </span>
        ) : null}
        <Category style={{ marginBottom: 20, display: "inline-block" }}>
          <img src={AddressIcon} alt={"address"} />
          {address}
        </Category>

        <PostMeta onClick={onClick} style={{ marginTop: "auto" }}>
          <DeliveryOpt>
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => <div>{value}</div>}
            />
            <span>{unit}</span>
            {/*<FormattedMessage id='deliveryText' defaultMessage='Delivery' />*/}
          </DeliveryOpt>
          <Duration>
            {formatTime.time}
            <FormattedMessage id={formatTime.unit} />
          </Duration>
        </PostMeta>
        <BoxAvatar className={"all"}>
          <Image
            url={data?.user?.avatar}
            className="post-image top"
            style={{ position: "relative", objectFit: "cover" }}
            alt={name}
            onClick={() => {
              let userId = getCookie("userId");
              if (userId == data.user.id) {
                router.push("/profile");
              } else {
                router.push("/profile/[id]", `/profile/${data.user.id}`);
              }
            }}
          />
          <span style={{ marginTop: 5 }}>
            <Like />
            <b style={{ position: "relative", top: -2.5 }}>{data?.views}</b>
          </span>
          <span
            style={{ marginLeft: 20, position: "relative", top: -2.5 }}
            className="view"
          >
            <Eye />
            <b style={{ position: "relative", top: -5 }}>{data?.views}</b>
          </span>
          {currentUser && !saveNews ? (
            <PopoverNotify
              handler={handler}
              content={content}
              className="notificationTab"
            />
          ) : null}
        </BoxAvatar>
        {isBook ? (
          <Notice status={"success"} content={"Delete success!"} />
        ) : null}
        {isMarked ? (
          <Notice
            status={"success"}
            content={
              <FormattedMessage
                id="markSuccess"
                defaultMessage="Đã đánh dấu đã bán !"
              />
            }
          />
        ) : null}
      </PostInfo>
    </FoodCardWrapper>
  );
};

export default PostCard;
