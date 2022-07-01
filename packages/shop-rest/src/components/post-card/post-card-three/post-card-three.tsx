// post card for furniture
import dynamic from "next/dynamic";
import React from "react";
import Image from "components/image/image";
import {
  PostName,
  SellLabel,
  PostCardWrapper,
  PostImageWrapper,
  PostInfo,
} from "../post-card.style";
import { useModal } from "contexts/modal/use-modal";
import { useRouter } from "next/router";
const QuickViewMobile = dynamic(
  () => import("features/quick-view/quick-view-mobile")
);
type PostCardProps = {
  title: string;
  image: any;
  discountInPercent?: number;
  data: any;
  deviceType: any;
};

const PostCard: React.FC<PostCardProps> = ({
  title,
  image,
  discountInPercent,
  data,
  deviceType,
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
    <PostCardWrapper onClick={handleQuickViewModal} className="furniture-card">
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
        <PostName>{title}</PostName>
      </PostInfo>
    </PostCardWrapper>
  );
};

export default PostCard;
