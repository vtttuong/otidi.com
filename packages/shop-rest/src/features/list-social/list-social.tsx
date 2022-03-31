import { LikedPost } from "assets/icons/LikedPost";
import { LikePost } from "assets/icons/LikePost";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ActionButton, Title, TopContainer } from "./list-social.style";

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onShare?: (e: any) => void;
  onViewLike?: (e: any) => void;
  onLike?: (e: any) => void;
  likes: number;
  liked?: boolean;
};

const ListSocial: React.FC<CartPropsType> = ({
  style,
  className,
  liked,
  onLike,
  onShare,
  onViewLike,
  likes,
}) => {
  return (
    <TopContainer>
      <ActionButton >
        <p onClick={onLike}>
          {liked ? <LikedPost /> : <LikePost />}
        </p>
        <Title onClick={onViewLike}>
          {likes} <FormattedMessage id="nav.save" defaultMessage="likes" />
        </Title>
      </ActionButton>
    </TopContainer>
  );
};

export default ListSocial;
