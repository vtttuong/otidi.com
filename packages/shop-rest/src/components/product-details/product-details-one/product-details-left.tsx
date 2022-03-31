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
import ProductDetailsLeftDf from "./product-details-left-df";
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
  getProductBySlug,
  getUserLike,
  getUserSave,
  onLike,
  onSave,
  onUnLike,
  onUnSave,
  report,
} from "utils/api/product";
import { CURRENCY } from "utils/constant";
import { getCookie } from "utils/session";
// import { useAlert } from "react-alert";
import {
  BackButton,
  Detail,
  H2Text,
  MetaItem,
  MetaSingle,
  ProductDescription,
  ProductInfo,
  ProductMeta,
  ProductPreview,
  ProductPrice,
  ProductPriceWrapper,
  ProductTitle,
  ProductTitlePriceWrapper,
  SalePrice,
  Span,
  SubDetail,
} from "./product-details-one.style";

type ProductDetailsProps = {
  slug: string;
  userId: number;
};

const ProductDetailsLeft: React.FunctionComponent<ProductDetailsProps> = ({
  slug,
  userId,
}) => {
  const { isRtl } = useLocale();
  const [product, setProduct] = React.useState<any>({});
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
    getProduct();
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

  const getProduct = async () => {
    const token = getCookie("access_token");
    const product = await getProductBySlug(token, slug);
    setProduct(product);
    onCheckLike(product);
    setLikeCount(product.likes_count);
    onCheckSave(product);
    setSaveCount(product.saves_count);
    getUserLiked(product.id);
    getUserSaved(product.id);
  };

  const onCheckLike = (product) => {
    setLiked(false);
    product.likes?.map((like) => {
      if (like.user_id == userId) {
        setLiked(true);
        return;
      }
    });
  };
  const onCheckSave = (product) => {
    setSuccessSave(false);
    product.saves?.map((save) => {
      if (save.user_id == userId) {
        setSuccessSave(true);
        return;
      }
    });
  };

  const onReportClick = async (e: any, f: any) => {
    if (e && f.length != 0) {
      const body = { error: e, content: f, post_id: product.id };
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
          await onSave(token, product.id);
        } else {
          setSaveCount(saveCount - 1);
          setSuccessSave(false);
          await onUnSave(token, product.id);
        }
      }
      getUserSaved(product.id);
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
        await onLike(token, product.id);
      } else {
        setLiked(false);
        setLikeCount(likeCount - 1);
        await onUnLike(token, product.id);
      }
      getUserLiked(product.id);
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
  if (!product.id) {
    return <ProductDetailsLeftDf />;
  }
  return (
    <>
      <ProductPreview>
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

        <CarouselWithCustomDots
          items={product.gallery}
          deviceType={"desktop"}
        />

        <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
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
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPriceWrapper>
              {product.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {parseInt(product.price).toLocaleString()}
                </SalePrice>
              ) : null}
            </ProductPriceWrapper>
          </ProductTitlePriceWrapper>
          <ProductPrice>
            <div style={{ display: "block", marginBottom: 33 }}>
              <span style={{ fontSize: 20, fontWeight: 600 }}>
                {product.salePrice
                  ? parseInt(product.salePrice).toLocaleString()
                  : parseInt(product.price).toLocaleString()}
              </span>
              <span style={{ marginLeft: 10 }}>{product.unit}</span>
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
          </ProductPrice>

          <Detail className={"detail"}>
            <H2Text>
              <FormattedMessage
                id="detailProduct"
                defaultMessage="Detail product"
              />
            </H2Text>

            {product.additional_info &&
              Object.keys(product.additional_info).map(function (key) {
                if (key === "productStatus") {
                  return (
                    <SubDetail key={product.additional_info[key]}>
                      <Span className="title">
                        <FormattedMessage id={key} />
                      </Span>
                      {product.additional_info[key] === "old" ? (
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

                if (product.additional_info[key] == null) {
                  return;
                }

                return (
                  <SubDetail key={key}>
                    <Span className="title">
                      <FormattedMessage id={key} />
                    </Span>
                    <Span>{product.additional_info[key]}</Span>
                  </SubDetail>
                );
              })}
          </Detail>

          <ProductDescription>
            <H2Text>
              <FormattedMessage
                id="descriptionProduct"
                defaultMessage="Description"
              />
            </H2Text>
            <p style={{ whiteSpace: "pre-line", margin: "10px 0" }}>
              {product.description}
            </p>
          </ProductDescription>

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
          <ProductMeta>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  href={`/${product.type.toLowerCase()}?category=${item.slug}`}
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
          </ProductMeta>
        </ProductInfo>
      </ProductPreview>
      {reportSuccess ? (
        <Notice status="success" content="Report success !" />
      ) : null}
    </>
  );
};

export default ProductDetailsLeft;
