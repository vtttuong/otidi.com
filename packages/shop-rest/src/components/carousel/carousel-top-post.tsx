import React from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { ArrowNext } from "assets/icons/ArrowNext";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import { useLocale } from "contexts/language/language.provider";
import FoodCard from "../post-card/post-card-four/post-card-four-top";
import { useRouter } from "next/router";
import NoResultFound from "components/no-result/no-result";
import Placeholder from "components/placeholder/placeholder";
import dynamic from "next/dynamic";
const ErrorMessage = dynamic(
  () => import("components/error-message/error-message")
);
import {
  LoaderItem,
  LoaderWrapper,
} from "../post-grid/post-list/post-list.style";
import { useRecommendPosts, useTopPosts } from "data/use-posts";
const ButtonPrev = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonGroupWrapper = styled("div")``;

const PrevButton = ({ onClick, children }: any) => {
  return (
    <ButtonPrev
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="prevButton"
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }: any) => {
  return (
    <ButtonNext
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="nextButton"
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous }: any) => {
  const { isRtl }: any = useLocale();

  return (
    <ButtonGroupWrapper>
      {isRtl ? (
        <>
          <NextButton onClick={() => next()} className="rtl">
            <ArrowPrev />
          </NextButton>
          <PrevButton onClick={() => previous()}>
            <ArrowNext />
          </PrevButton>
        </>
      ) : (
        <>
          <PrevButton onClick={() => previous()}>
            <ArrowPrev />
          </PrevButton>
          <NextButton onClick={() => next()}>
            <ArrowNext />
          </NextButton>
        </>
      )}

      {/* if prop isRtl true swap prev and next btn */}
    </ButtonGroupWrapper>
  );
};

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  isRtl?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  itemClass?: string;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  deviceType: { mobile, tablet, desktop },
  component,
  autoPlay = true,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  itemClass,
  isRtl,

  ...props
}: Props) {
  const { query } = useRouter();
  const router = useRouter();
  const { data, error } = useTopPosts();

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="4" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }
  return (
    <div dir="ltr">
      <Carousel
        arrows={false}
        responsive={responsive}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass="container-with-dots"
        itemClass={itemClass}
        autoPlay={autoPlay}
        autoPlaySpeed={3000}
        renderButtonGroupOutside={true}
        additionalTransfrom={0}
        customButtonGroup={<ButtonGroup />}
        {...props}
        // use dir ltr when rtl true
      >
        {data &&
          data.map((item: any, index: number) => {
            if (component) return component(item);
            return (
              <div
                style={{ padding: "0 15px", overflow: "hidden" }}
                key={index}
              >
                <FoodCard
                  name={item.name}
                  image={item.main_image.url}
                  address={item.user.address}
                  createdAt={item.created_at}
                  price={item.price}
                  unit={item.unit}
                  isFree={false}
                  data={item}
                  prioriry={item.is_priority}
                  avatar={item.user.avatar}
                  user_name={item.user.name}
                  onClick={() => {
                    router.push(`/posts/${item.slug}`);
                  }}
                />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}
