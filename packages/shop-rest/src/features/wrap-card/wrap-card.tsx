import { useRouter } from "next/router";
import React from "react";
import ProductCard from "../../components/product-card/product-card-four/product-card-four";
import { ItemCard } from "../user-profile/user-profile.style";
import { openModal, closeModal } from "@redq/reuse-modal";
import ReportModal from "features/filter-modal/warningModal";
import { deletePost, markPost } from "utils/api/product";
type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  profileOther?: boolean;
  token?: string;
  currentUser?: boolean;
  saveNews?: boolean;
  pushNews?: boolean;
  onDeletePost?: (e: any) => void;
  onMarkedPost?: (e: any) => void;
  onPush?: (e: any) => void;
};

const WrapCard: React.FC<Props> = ({
  saveNews,
  pushNews,
  data,
  profileOther,
  currentUser,
  onDeletePost,
  onPush,
  onMarkedPost,
}) => {
  const router = useRouter();
  const [isBooked, setIsBooked] = React.useState(false);
  const [pushN, setPush] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  if (pushNews) {
    data.map((d) => (d.is_priority == true ? pushN.push(d) : null));
  }

  React.useEffect(() => {
    if (pushNews) {
      data.map((d) => (d.is_priority == true ? pushN.push(d) : null));
      setPush(pushN);
    }
  }, [data]);

  const onDeletePostX = async (id) => {
    setIsSuccess(false);
    await deletePost(id);
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    setIsBooked(!isBooked);
    setIsSuccess(true);
  };

  const onMarkPost = async (id) => {
    setIsSuccess(false);
    await markPost(id);
    onMarkedPost(id);
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    setIsBooked(!isBooked);
    setIsSuccess(true);
  };

  const openWarning = () => {
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
        width: "500px",
        height: "auto",
      },
      componentProps: { titleId: "Post  is waiting approve! Try again." },
    });
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} className="lolol">
      {data && data.length != 0 && pushNews != true ? (
        data.map((d) => (
          <ItemCard
            key={saveNews ? d.post : d.id}
            className={profileOther == true ? "other" : ""}
          >
            <ProductCard
              name={saveNews ? d.post?.title : d.title}
              image={saveNews ? d.post?.main_img_url : d.main_img_url}
              address={saveNews ? d.post?.address : d.address}
              price={saveNews ? d.post?.price : d.price}
              unit={saveNews ? d.post?.unit : d.unit}
              prioriry={saveNews ? d.post?.is_priority : d.is_priority}
              createdAt={saveNews ? d.post?.created_at : d.created_at}
              data={saveNews ? d.post : d}
              currentUser={currentUser}
              typeOfPost={saveNews ? d.post.type : d.type}
              saveNews={saveNews}
              postId={d.id}
              onClick={() => {
                d.status == "approving"
                  ? openWarning()
                  : router.push(
                      "/[type]/[slug]",
                      `/${saveNews ? d.post.category_type : d.category_type}/${
                        saveNews ? d.post.slug : d.slug
                      }`
                    );
              }}
              onClickEdit={() => {
                router.push(
                  "/post/edit/[slug]",
                  `/post/edit/${saveNews ? d.post.slug : d.slug}`
                );
              }}
              isBook={isSuccess}
              isMarked={isSuccess}
              onDeletePost={() => onDeletePostX(d.id)}
              onMark={() => onMarkPost(d.id)}
              onPush={() => onPush(d.id)}
            />
          </ItemCard>
        ))
      ) : !pushN ? (
        <p>No data</p>
      ) : null}
      {pushN && pushN.length != 0 && pushNews == true
        ? pushN.map((d) => (
            <ItemCard
              key={d.id}
              className={profileOther == true ? "other" : ""}
            >
              <ProductCard
                name={d.title}
                image={d.image}
                address={d.address}
                price={d.price}
                unit={d.unit}
                createdAt={d.created_at}
                data={d}
                currentUser={currentUser}
                postId={d.id}
                prioriry={true}
                onClick={() => {
                  router.push(
                    "/[type]/[slug]",
                    `/${d.category_type}/${d.slug}`
                  );
                }}
                onClickEdit={() => {
                  router.push("/post/edit/[slug]", `/post/edit/${d.slug}`);
                }}
                onDeletePost={onDeletePost}
              />
            </ItemCard>
          ))
        : null}
    </div>
  );
};

export default WrapCard;