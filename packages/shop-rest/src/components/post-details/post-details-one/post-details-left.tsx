import { closeModal, openModal } from "@redq/reuse-modal";
import { Heart } from "assets/icons/Heart";
import { HeartActive } from "assets/icons/HeartActive";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import { Report } from "assets/icons/Report";
import { Button } from "components/button/button";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import Notice from "components/notice/notice";
import { useLocale } from "contexts/language/language.provider";
import ReportModal from "features/filter-modal/report";
import Like from "features/filter-modal/userLike";
import ListSocial from "features/list-social/list-social";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostDetailsLeftDf from "./post-details-left-df";
import { FormattedMessage } from "react-intl";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import {
  getPostBySlug,
  getUserLike,
  getUserSave,
  onLike,
  onSave,
  onUnLike,
  onUnSave,
  report,
} from "utils/api/post";
import { CURRENCY } from "utils/constant";
import { getCookie } from "utils/session";
// import { useAlert } from "react-alert";
import {
  BackButton,
  Detail,
  H4Text,
  MetaItem,
  MetaSingle,
  PostDescription,
  PostInfo,
  PostMeta,
  PostPreview,
  PostPrice,
  PostPriceWrapper,
  PostTitle,
  PostTitlePriceWrapper,
  SalePrice,
  Span,
  SubDetail,
} from "./post-details-one.style";
import { formatMoney } from "utils/formatNumber";

type PostDetailsProps = {
  data: any;
  userId: number;
};

const PostDetailsLeft: React.FunctionComponent<PostDetailsProps> = ({
  data,
  userId,
}) => {
  const { isRtl } = useLocale();
  const [post, setPost] = React.useState<any>({});
  const [reportSuccess, setReportSuccess] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [dataLike, setDataLike] = React.useState([]);
  const [dataSave, setDataSave] = React.useState([]);
  const [saveCount, setSaveCount] = React.useState<number>(0);
  const [likeCount, setLikeCount] = React.useState<number>(0);
  const [successSave, setSuccessSave] = React.useState(false);
  const [locationHref, setLocationHref] = React.useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  console.log(locationHref);

  useEffect(() => {
    getPost();
    setLocationHref(window.location.href);
  }, [data]);

  useEffect(() => {
    onCheckLike();
  }, [dataLike]);

  const getUserLiked = async (id) => {
    const datas = await getUserLike(id);
    setDataLike(datas);
  };
  const getUserSaved = async (id) => {
    // const datas = await getUserSave(id);
    // setDataSave(datas);
  };

  const getPost = async () => {
    const token = getCookie("access_token");
    // const post = await getPostBySlug(token, slug);
    setPost(data);
    setLikeCount(data.likes_count);
    onCheckSave(data);
    setSaveCount(data.saves_count);
    getUserLiked(data.id);
    getUserSaved(data.id);
  };

  const onCheckLike = () => {
    setLiked(false);
    dataLike?.map((like) => {
      if (like.user.id == userId) {
        setLiked(true);
        return;
      }
    });
  };

  const onCheckSave = (post) => {
    setSuccessSave(false);
    // post.saves?.map((save) => {
    //   if (save.user_id == userId) {
    //     setSuccessSave(true);
    //     return;
    //   }
    // });
  };

  const onReportClick = async (type: string, phone_number: string) => {
    const body = { type: type, phone_number: phone_number };
    const { result, error } = await report(post.id, body);

    if (result) {
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
      }, 2000);
    } else {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    closeModal();
  };

  const onReport = () => {
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
        width: "auto",
        height: "auto",
      },
      componentProps: { onReport: onReportClick },
    });
  };

  const onSaves = async () => {
    try {
      const token = getCookie("access_token");

      if (token == undefined) {
        router.push("/login");
      } else {
        if (successSave == false) {
          setSaveCount(saveCount + 1);
          setSuccessSave(true);
          await onSave(token, post.id);
        } else {
          setSaveCount(saveCount - 1);
          setSuccessSave(false);
          await onUnSave(token, post.id);
        }
      }
      getUserSaved(post.id);
    } catch (e) {
      alert(e);
    }
  };

  const onLikes = async () => {
    const token = getCookie("access_token");

    if (!token) {
      router.push("/login");
    } else {
      if (!liked) {
        const { result } = await onLike(token, post.id);
        if (result) {
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      } else {
        const { result } = await onUnLike(token, post.id);
        if (result) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        }
      }
      getUserLiked(post.id);
    }
  };

  const onViewLike = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: Like,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal-like",
        width: "500px",
        maxHeight: "600px",
        height: "auto",
        background: "#fff",
      },
      componentProps: { onFollowOther: onFollowOther, dataLike: dataLike },
    });
  };

  const onViewSave = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: Like,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal-like",
        width: "500px",
        maxHeight: "600px",
        height: "auto",
        background: "#fff",
      },
      componentProps: { onFollowOther: onFollowOther, dataLike: dataSave },
    });
  };
  const onFollowOther = (id) => {
    alert(id);
  };

  let price = post.discount_price;

  let price_after_tax = post.price_after_tax
    ? post.price_after_tax
    : post.discount_price;

  if (!post.id) {
    return <PostDetailsLeftDf />;
  }
  return (
    <>
      <PostPreview>
        <BackButton className="back">
          <Button
            type="button"
            size="small"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #f1f1f1",
              color: "#77798c",
            }}
            onClick={Router.back}
          >
            <LongArrowLeft style={{ marginRight: 5 }} />
            <FormattedMessage id="backBtn" defaultMessage="Back" />
          </Button>
        </BackButton>

        <CarouselWithCustomDots items={post.images} deviceType={"desktop"} />

        <PostInfo dir={isRtl ? "rtl" : "ltr"}>
          <Detail className={"social"}>
            <ListSocial
              liked={liked}
              likes={likeCount}
              onLike={onLikes}
              onViewLike={onViewLike}
            />
            <BackButton className={"reportItem"} onClick={onReport}>
              <div
                style={{
                  width: 100,
                  position: "absolute",
                  right: 10,
                  top: -3,
                  padding: 10,
                  borderRadius: 10,
                  border: " 1px solid #28a745",
                }}
              >
                <Report />
                <FormattedMessage id="report" defaultMessage="Report" />
              </div>
            </BackButton>
          </Detail>
          <PostTitlePriceWrapper>
            <PostTitle>{post.title}</PostTitle>
            {/* <PostPriceWrapper>
              {post.discount_price ? (
                <SalePrice>
                  {parseInt(post.original_price).toLocaleString()}
                  {CURRENCY}
                </SalePrice>
              ) : null}
            </PostPriceWrapper> */}
          </PostTitlePriceWrapper>
          <PostPrice>
            <div style={{ display: "block", marginBottom: 33 }}>
              <div>
                <span style={{ display: "inline-block", width: "115px" }}>
                  Giá:{" "}
                </span>
                <span style={{ fontSize: 20, fontWeight: 600 }}>
                  {formatMoney(price).value + " "}
                  <FormattedMessage
                    id={formatMoney(price).unit}
                    defaultMessage={formatMoney(price).unit}
                  />
                </span>
              </div>
              <div>
                <span style={{ display: "inline-block", width: "115px" }}>
                  Giá sau thuế:{" "}
                </span>
                <span style={{ fontSize: 20, fontWeight: 600 }}>
                  {formatMoney(price_after_tax).value + " "}
                  <FormattedMessage
                    id={formatMoney(price_after_tax).unit}
                    defaultMessage={formatMoney(price_after_tax).unit}
                  />
                </span>
              </div>
              {/* <BackButton className={"saveIcon"}>
                <div
                  style={{
                    width: 50,
                    position: "absolute",
                    right: 10,
                    padding: 6,
                    paddingLeft: 40,
                  }}
                >
                  <p onClick={onSaves}>
                    {successSave == true ? <HeartActive /> : <Heart />}
                  </p>
                  <span
                    style={{
                      position: "absolute",
                      fontSize: 13,
                      width: 50,
                      top: 22,
                      right: 16,
                      color: "#000",
                    }}
                    onClick={onViewSave}
                  >
                    {saveCount}{" "}
                    <FormattedMessage id="saved" defaultMessage="Save" />
                  </span>
                </div>
              </BackButton> */}
            </div>
          </PostPrice>

          <Detail className={"detail"}>
            <H4Text>
              <FormattedMessage id="detailPost" defaultMessage="Detail post" />
            </H4Text>

            <div style={{ padding: "0 10px" }}>
              {post.detail &&
                Object.keys(post.detail).map(function (key) {
                  if (
                    post.detail[key] == null ||
                    key === "post_id" ||
                    key === "id" ||
                    key === "updated_at" ||
                    key === "created_at" ||
                    key === "deleted_at"
                  ) {
                    return;
                  }

                  return (
                    <SubDetail key={key}>
                      <Span className="title">
                        <FormattedMessage id={key} />
                      </Span>
                      <Span>
                        {/[0-9]+/i.test(post.detail[key]) ? (
                          post.detail[key]
                        ) : (
                          <FormattedMessage
                            id={post.detail[key]}
                            defaultMessage={post.detail[key]}
                          />
                        )}
                      </Span>
                    </SubDetail>
                  );
                })}
            </div>
          </Detail>

          <PostDescription>
            <H4Text>
              <FormattedMessage
                id="descriptionPost"
                defaultMessage="Description"
              />
            </H4Text>
            <p style={{ whiteSpace: "pre-line", margin: "10px 0" }}>
              {post.description}
            </p>
          </PostDescription>

          <Detail className={"comment social-share"}>
            <H4Text style={{ marginBottom: "15px" }}>
              <FormattedMessage id="shareToSocial" />
            </H4Text>
            {/* <CommentPr /> */}
            <FacebookShareButton url={locationHref}>
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <FacebookMessengerShareButton
              url={locationHref}
              appId={"1806375959407950"}
              redirectUri=""
              to=""
            >
              <FacebookMessengerIcon size={40} round={true} />
            </FacebookMessengerShareButton>

            <TelegramShareButton url={locationHref}>
              <TelegramIcon size={40} round={true} />
            </TelegramShareButton>

            <TwitterShareButton url={locationHref}>
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={locationHref}>
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
          </Detail>
          <PostMeta>
            <MetaSingle>
              {post?.categories?.map((item: any) => (
                <Link
                  href={`/${post.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  {
                    <a>
                      <MetaItem>{item.title}</MetaItem>
                    </a>
                  }
                </Link>
              ))}
            </MetaSingle>
          </PostMeta>
        </PostInfo>
      </PostPreview>
      {reportSuccess ? (
        <Notice status="success" content="Report success !" />
      ) : null}
      {error ? <Notice status="error" content={error} /> : null}
    </>
  );
};

export default PostDetailsLeft;
