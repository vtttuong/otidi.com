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
import React, { useEffect } from "react";
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
  H2Text,
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

type PostDetailsProps = {
  slug: string;
  userId: number;
};

const PostDetailsLeft: React.FunctionComponent<PostDetailsProps> = ({
  slug,
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
  const router = useRouter();

  useEffect(() => {
    getPost();
    setLocationHref(window.location.href);
  }, [locationHref, slug]);

  const getUserLiked = async (id) => {
    const datas = await getUserLike(id);
    setDataLike(datas);
  };
  const getUserSaved = async (id) => {
    const datas = await getUserSave(id);
    setDataSave(datas);
  };

  const getPost = async () => {
    const token = getCookie("access_token");
    const post = await getPostBySlug(token, slug);
    setPost(post);
    onCheckLike(post);
    setLikeCount(post.likes_count);
    onCheckSave(post);
    setSaveCount(post.saves_count);
    getUserLiked(post.id);
    getUserSaved(post.id);
  };

  const onCheckLike = (post) => {
    setLiked(false);
    post.likes?.map((like) => {
      if (like.user_id == userId) {
        setLiked(true);
        return;
      }
    });
  };
  const onCheckSave = (post) => {
    setSuccessSave(false);
    post.saves?.map((save) => {
      if (save.user_id == userId) {
        setSuccessSave(true);
        return;
      }
    });
  };

  const onReportClick = async (e: any, f: any) => {
    if (e && f.length != 0) {
      const body = { error: e, content: f, post_id: post.id };
      const resultReport = await report(JSON.stringify(body));
      if (resultReport) {
        closeModal();
        setReportSuccess(true);
        setTimeout(() => {
          setReportSuccess(false);
        }, 2000);
      }
    }
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

    if (token == undefined) {
      router.push("/login");
    } else {
      if (liked == false) {
        setLiked(true);
        setLikeCount(likeCount + 1);
        await onLike(token, post.id);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
        await onUnLike(token, post.id);
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

        <CarouselWithCustomDots items={post.gallery} deviceType={"desktop"} />

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
            <PostPriceWrapper>
              {post.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {parseInt(post.price).toLocaleString()}
                </SalePrice>
              ) : null}
            </PostPriceWrapper>
          </PostTitlePriceWrapper>
          <PostPrice>
            <div style={{ display: "block", marginBottom: 33 }}>
              <span style={{ fontSize: 20, fontWeight: 600 }}>
                {post.salePrice
                  ? parseInt(post.salePrice).toLocaleString()
                  : parseInt(post.price).toLocaleString()}
              </span>
              <span style={{ marginLeft: 10 }}>{post.unit}</span>
              <BackButton className={"saveIcon"}>
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
              </BackButton>
            </div>
          </PostPrice>

          <Detail className={"detail"}>
            <H2Text>
              <FormattedMessage id="detailPost" defaultMessage="Detail post" />
            </H2Text>

            {post.additional_info &&
              Object.keys(post.additional_info).map(function (key) {
                if (key === "postStatus") {
                  return (
                    <SubDetail key={post.additional_info[key]}>
                      <Span className="title">
                        <FormattedMessage id={key} />
                      </Span>
                      {post.additional_info[key] === "old" ? (
                        <span style={{ opacity: 0.5 }}>
                          <FormattedMessage
                            id="usedStatus"
                            defaultMessage="Old"
                          />
                        </span>
                      ) : (
                        <span style={{ opacity: 0.5 }}>
                          <FormattedMessage
                            id="newStatus"
                            defaultMessage="New"
                          />
                        </span>
                      )}
                    </SubDetail>
                  );
                }

                if (post.additional_info[key] == null) {
                  return;
                }

                return (
                  <SubDetail key={key}>
                    <Span className="title">
                      <FormattedMessage id={key} />
                    </Span>
                    <Span>{post.additional_info[key]}</Span>
                  </SubDetail>
                );
              })}
          </Detail>

          <PostDescription>
            <H2Text>
              <FormattedMessage
                id="descriptionPost"
                defaultMessage="Description"
              />
            </H2Text>
            <p style={{ whiteSpace: "pre-line", margin: "10px 0" }}>
              {post.description}
            </p>
          </PostDescription>

          <Detail className={"comment social-share"}>
            <H2Text>
              <FormattedMessage id="shareToSocial" />
            </H2Text>
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
    </>
  );
};

export default PostDetailsLeft;