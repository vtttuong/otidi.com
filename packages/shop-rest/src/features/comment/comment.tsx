import { Like } from "assets/icons/Like";
import { Star } from "assets/icons/Star";
import React from "react";
import {
  Avatar,
  CenterContainerSub,
  CMBody,
  ContainerImage,
  P,
} from "./comment.style";

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onShare?: (e: any) => void;
  onSave?: (e: any) => void;
};

const CommentPr: React.FC<CartPropsType> = ({
  style,
  className,
  onSave,
  onShare,
}) => {
  return (
    <CMBody>
      <Avatar src="https://cf.shopee.vn/file/a24239563cb61a309ad62d7283602795_tn" />
      <CMBody className={"col"} style={style}>
        <P>{"Ngo anh Vy"}</P>
        <ContainerImage>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </ContainerImage>
        <P>{"Sản phẩm đúng với quảng cáo, giao hàng nhanh"}</P>
        <ContainerImage>
          <CenterContainerSub src="https://cf.shopee.vn/file/05bbf7a62606d75947fa48e92f55ab03_tn"></CenterContainerSub>
          <CenterContainerSub src="https://cf.shopee.vn/file/05bbf7a62606d75947fa48e92f55ab03_tn"></CenterContainerSub>
          <CenterContainerSub src="https://cf.shopee.vn/file/05bbf7a62606d75947fa48e92f55ab03_tn"></CenterContainerSub>
        </ContainerImage>
        <P className={"time"}>{"2020-10-09 16:22"}</P>
        <ContainerImage>
          <Like />
          <P className={"number"}>{"3"}</P>
        </ContainerImage>
      </CMBody>
    </CMBody>
  );
};

export default CommentPr;
