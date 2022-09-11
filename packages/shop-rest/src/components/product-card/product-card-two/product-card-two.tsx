// post card for book
import React from "react";
import { FormattedMessage } from "react-intl";
import Image from "components/image/image";
import {
  BookCardWrapper,
  BookImageWrapper,
  BookInfo,
  PostName,
  AuthorInfo,
  SellLabel,
} from "../product-card.style";

type PostCardProps = {
  title: string;
  image: any;
  name?: string;
  discountInPercent?: number;
  data: any;
  onClick?: (e: any) => void;
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
  name,
  discountInPercent,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  onClick,
  ...props
}) => {
  return (
    <BookCardWrapper onClick={onClick} className="book-card">
      <BookImageWrapper>
        <Image
          url={image}
          className="post-image"
          style={{ position: "relative" }}
          alt={title}
        />
        {discountInPercent ? <SellLabel>{discountInPercent}%</SellLabel> : null}
      </BookImageWrapper>
      <BookInfo>
        <PostName>{title}</PostName>
        <AuthorInfo>
          <FormattedMessage id="intlTextBy" defaultMessage="by" /> {name}
        </AuthorInfo>
      </BookInfo>
    </BookCardWrapper>
  );
};

export default PostCard;
