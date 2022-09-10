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
} from "../post-card.style";
import { CURRENCY } from "utils/constant";
import { formatMoney } from "utils/formatNumber";

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
  isDeleted?: boolean;
  isMarked?: boolean;
  saveNews?: boolean;
  currentUser?: boolean;
  onClick?: (e: any) => void;
  onClickEdit?: (e: any) => void;
  onDeletePost?: (e: any) => void;
  onMark?: (e: any) => void;
  onPush?: (e: any) => void;
  onUpdatePackage?: (e: any) => void;
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
  isDeleted,
  onUpdatePackage,
  ...props
}) => {
  let formatTime = formatRelativeTime(createdAt);
  const router = useRouter();
  // const [package, setPackage] = React.useState([])
  const handler = <span>...</span>;
  const content = (
    <div className="action">
      {data && (data.status == "waiting" || data.status == "sold") ? null : (
        <p
          style={{
            fontWeight: 600,
          }}
          onClick={onMark}
        >
          <FormattedMessage
            id="post.markAsSold"
            defaultMessage="Mark as sold"
          />
        </p>
      )}
      {data && data.status == "active" && !data.advertise ? (
        <p
          style={{
            fontWeight: 600,
          }}
          onClick={onPush}
        >
          <FormattedMessage id="post.push" defaultMessage="Sell faster" />
        </p>
      ) : null}

      {data && data.status == "active" && data.advertise ? (
        <p
          style={{
            fontWeight: 600,
          }}
          onClick={onUpdatePackage}
        >
          <FormattedMessage
            id="post.pushUpdate"
            defaultMessage=" Change push start time"
          />
        </p>
      ) : null}
      <p
        style={{
          fontWeight: 600,
        }}
        onClick={onDeletePost}
      >
        <FormattedMessage id="post.delete" defaultMessage="Delete" />
      </p>
    </div>
  );
  const Completionist = () => <span className="schedule">Push end</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="schedule">
          {"Còn "} {days}d:{hours}h:{minutes}m:{seconds}s
        </span>
      );
    }
  };

  const { value, unit } = formatMoney(
    data.discount_price || data.price_after_tax
  );
  return (
    <FoodCardWrapper onClick={onClick} className="food-card">
      <FoodImageWrapper>
        <Image
          url={image}
          className="post-image"
          style={{ position: "relative" }}
          alt={name}
        />
        {data && data.advertise && currentUser ? (
          <>
            {Date.now() > new Date(data.advertise.start_time).getTime() ? (
              <Countdown
                daysInHours={true}
                date={new Date(data.advertise.end_time).getTime()}
                renderer={renderer}
              />
            ) : (
              <span className="schedule">Waiting to push</span>
            )}
          </>
        ) : null}

        {data.advertise ? (
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
        {currentUser == true && !saveNews && data.status == "active" ? (
          <span
            style={{
              position: "absolute",
              right: 8,
              top: 12,
              cursor: "pointer",
              zIndex: 5,
            }}
            onClick={onClickEdit}
          >
            {" "}
            <Edit />
          </span>
        ) : null}

        <PostMeta onClick={onClick} style={{ marginTop: "auto" }}>
          <DeliveryOpt>
            {/* <NumberFormat
              value={data.discount_price || data.price_after_tax}
              displayType={"text"}
              thousandSeparator={true}
              suffix={CURRENCY}
              renderText={(value) => <div>{value}</div>}
            /> */}
            <div className="price">
              {value + " "}
              <FormattedMessage id={unit} defaultMessage={unit} />
            </div>
            {/* <span>{CURRENCY}</span> */}
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
          <span>
            <Like />
            <p style={{ position: "relative" }}>{data?.likes_count}</p>
          </span>
          <span
            style={{ marginLeft: 20, position: "relative" }}
            className="view"
          >
            <Eye />
            <p style={{ position: "relative" }}>{data?.views}</p>
          </span>
          {currentUser && !saveNews ? (
            <PopoverNotify
              handler={handler}
              content={content}
              className="notificationTab"
            />
          ) : null}
        </BoxAvatar>
        {isDeleted ? (
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
