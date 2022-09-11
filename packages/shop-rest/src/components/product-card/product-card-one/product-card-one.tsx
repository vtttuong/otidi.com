// post card for general
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Image from "components/image/image";
import { Button } from "components/button/button";
import {
  PostCardWrapper,
  PostImageWrapper,
  PostInfo,
  SellLabel,
  ButtonText,
} from "../product-card.style";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { cartAnimation } from "utils/cart-animation";
import { FormattedMessage } from "react-intl";
import { CartIcon } from "assets/icons/CartIcon";
import { useModal } from "contexts/modal/use-modal";
const QuickViewMobile = dynamic(
  () => import("features/quick-view/quick-view-mobile")
);
type PostCardProps = {
  title: string;
  image: any;
  weight: string;
  currency: string;
  description: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartPosts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const PostCard: React.FC<PostCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartPosts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  ...props
}) => {
  const router = useRouter();
  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        modalProps={data}
        hideModal={hideModal}
        deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        const { pathname, query, asPath } = router;
        const as = asPath;
        router.push(
          {
            pathname,
            query,
          },
          as,
          {
            shallow: true,
          }
        );
      },
    }
  );
  const { addItem, removeItem, getItem, isInCart, items } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    if (!isInCart(data.id)) {
      cartAnimation(e);
    }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  const handleQuickViewModal = () => {
    const { pathname, query } = router;
    const as = `/post/${data.slug}`;
    if (pathname === "/post/[slug]") {
      router.push(pathname, as);
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      return;
    }
    showModal();
    router.push(
      {
        pathname,
        query,
      },
      {
        pathname: as,
      },
      {
        shallow: true,
      }
    );
  };
  return (
    <PostCardWrapper onClick={handleQuickViewModal} className="post-card">
      <PostImageWrapper>
        <Image
          url={image}
          className="post-image"
          style={{ position: "relative" }}
          alt={title}
        />
        {discountInPercent ? <SellLabel>{discountInPercent}%</SellLabel> : null}
      </PostImageWrapper>
      <PostInfo>
        <h3 className="post-title">{title}</h3>
        <span className="post-weight">{weight}</span>
        <div className="post-meta">
          <div className="postPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
                {price}
              </span>
            ) : null}

            <span className="post-price">
              {currency}
              {salePrice ? salePrice : price}
            </span>
          </div>

          {!isInCart(data.id) ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
              onClick={handleAddClick}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={getItem(data.id).quantity}
              onDecrement={handleRemoveClick}
              onIncrement={handleAddClick}
              className="card-counter"
            />
          )}
        </div>
      </PostInfo>
    </PostCardWrapper>
  );
};

export default PostCard;
