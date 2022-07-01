import React from "react";
import Router from "next/router";
// import { closeModal } from '@redq/reuse-modal';
import { Button } from "components/button/button";
import {
  QuickViewWrapper,
  PostDetailsWrapper,
  PostPreview,
  DiscountPercent,
  PostInfoWrapper,
  PostInfo,
  PostTitlePriceWrapper,
  PostTitle,
  PostWeight,
  PostDescription,
  ButtonText,
  PostMeta,
  PostCartWrapper,
  PostPriceWrapper,
  PostPrice,
  SalePrice,
  PostCartBtn,
  MetaSingle,
  MetaItem,
  ModalClose,
} from "./quick-view.style";
import { CloseIcon } from "assets/icons/CloseIcon";
import { CartIcon } from "assets/icons/CartIcon";
import { CURRENCY } from "utils/constant";

import ReadMore from "components/truncate/truncate";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { useLocale } from "contexts/language/language.provider";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { FormattedMessage } from "react-intl";

type QuickViewProps = {
  modalProps: any;
  onModalClose?: any;
  hideModal: () => void;
  deviceType: any;
};

const QuickViewMobile: React.FunctionComponent<QuickViewProps> = ({
  modalProps,
  onModalClose,
  hideModal,
  deviceType,
}) => {
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const {
    id,
    type,
    title,
    unit,
    price,
    discountInPercent,
    salePrice,
    description,
    gallery,
    categories,
  } = modalProps;

  const { isRtl } = useLocale();

  const handleAddClick = (e: any) => {
    e.stopPropagation();
    addItem(modalProps);
  };

  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItem(modalProps);
  };
  function onCategoryClick(slug) {
    Router.push({
      pathname: `/${type.toLowerCase()}`,
      query: { category: slug },
    }).then(() => window.scrollTo(0, 0));
    hideModal();
  }

  return (
    <>
      {/* <ModalClose onClick={onModalClose}>
        <CloseIcon />
      </ModalClose> */}
      <QuickViewWrapper className="quick-view-mobile-wrapper">
        <PostDetailsWrapper className="post-card" dir="ltr">
          {!isRtl && (
            <PostPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </PostPreview>
          )}
          <PostInfoWrapper dir={isRtl ? "rtl" : "ltr"}>
            <PostInfo>
              <PostTitlePriceWrapper>
                <PostTitle>{title}</PostTitle>
              </PostTitlePriceWrapper>

              <PostWeight>{unit}</PostWeight>
              <PostDescription>
                <ReadMore character={600}>{description}</ReadMore>
              </PostDescription>

              <PostMeta>
                <MetaSingle>
                  {categories
                    ? categories.map((item: any) => (
                        <MetaItem
                          onClick={() => onCategoryClick(item.slug)}
                          key={item.id}
                        >
                          {item.title}
                        </MetaItem>
                      ))
                    : ""}
                </MetaSingle>
              </PostMeta>

              <PostCartWrapper>
                <PostPriceWrapper>
                  <PostPrice>
                    {CURRENCY}
                    {salePrice ? salePrice : price}
                  </PostPrice>

                  {discountInPercent ? (
                    <SalePrice>
                      {CURRENCY}
                      {price}
                    </SalePrice>
                  ) : null}
                </PostPriceWrapper>

                <PostCartBtn>
                  {!isInCart(id) ? (
                    <Button
                      className="cart-button"
                      variant="secondary"
                      borderRadius={100}
                      onClick={handleAddClick}
                    >
                      <CartIcon mr={2} />
                      <ButtonText>
                        <FormattedMessage
                          id="addCartButton"
                          defaultMessage="Cart"
                        />
                      </ButtonText>
                    </Button>
                  ) : (
                    <Counter
                      value={getItem(id).quantity}
                      onDecrement={handleRemoveClick}
                      onIncrement={handleAddClick}
                    />
                  )}
                </PostCartBtn>
              </PostCartWrapper>
            </PostInfo>
          </PostInfoWrapper>

          {isRtl && (
            <PostPreview>
              <CarouselWithCustomDots items={gallery} deviceType={deviceType} />
              {!!discountInPercent && (
                <DiscountPercent>{discountInPercent}%</DiscountPercent>
              )}
            </PostPreview>
          )}
        </PostDetailsWrapper>
      </QuickViewWrapper>
    </>
  );
};

export default QuickViewMobile;
