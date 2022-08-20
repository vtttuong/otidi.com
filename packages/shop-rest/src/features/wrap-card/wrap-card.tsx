import { useRouter } from "next/router";
import React from "react";
import PostCard from "../../components/post-card/post-card-four/post-card-four";
import { ItemCard } from "../user-profile/user-profile.style";
import { openModal, closeModal } from "@redq/reuse-modal";
import ReportModal from "features/filter-modal/warningModal";
import { deletePost, markPost } from "utils/api/post";
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
  onUpdatePackage?: (e: any) => void;
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
  onUpdatePackage,
}) => {
  const router = useRouter();
  const [isBooked, setIsBooked] = React.useState(false);
  const [pushN, setPush] = React.useState([]);
  const [isMarkedSuccess, setIsMarkedSuccess] = React.useState(false);
  const [isDeletedSuccess, setIsDeletedSuccess] = React.useState(false);
  if (pushNews) {
    data.map((d) => (d.advertise ? pushN.push(d) : null));
  }

  React.useEffect(() => {
    if (pushNews) {
      data.map((d) => (d.advertise == true ? pushN.push(d) : null));
      setPush(pushN);
    }
  }, [data]);

  const onDeletePostX = async (id) => {
    setIsDeletedSuccess(false);
    const { result } = await deletePost(id);

    if (result) {
      const index = data.findIndex((item) => item.id === id);

      data.splice(index, 1);
      setIsBooked(!isBooked);
      setIsDeletedSuccess(true);
    }
  };

  const onMarkPost = async (id) => {
    setIsMarkedSuccess(false);
    const { result } = await markPost(id);
    if (result) {
      onMarkedPost(id);
      const index = data.findIndex((item) => item.id === id);
      data.splice(index, 1);
      setIsBooked(!isBooked);
      setIsMarkedSuccess(true);
    }
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
      componentProps: { titleId: "waitingWarning" },
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
            <PostCard
              name={saveNews ? d.post?.title : d.title}
              image={saveNews ? d.post?.main_image?.url : d.main_image?.url}
              address={saveNews ? d.post?.address : d.address}
              price={saveNews ? d.post?.price : d.price}
              unit={saveNews ? d.post?.unit : d.unit}
              prioriry={saveNews ? d.post?.advertise : d.advertise}
              createdAt={saveNews ? d.post?.created_at : d.created_at}
              data={saveNews ? d.post : d}
              currentUser={currentUser}
              saveNews={saveNews}
              postId={d.id}
              onClick={() => {
                d.status == "waiting"
                  ? openWarning()
                  : router.push(
                      "/posts/[id]",
                      `/posts/${saveNews ? d.post.id : d.id}`
                    );
              }}
              onClickEdit={() => {
                router.push(
                  "/post/edit/[id]",
                  `/post/edit/${saveNews ? d.post.id : d.id}`
                );
              }}
              isBook={isBooked}
              isDeleted={isDeletedSuccess}
              isMarked={isMarkedSuccess}
              onDeletePost={() => onDeletePostX(d.id)}
              onMark={() => onMarkPost(d.id)}
              onPush={() => onPush(d.id)}
              onUpdatePackage={() => onUpdatePackage(d.advertise.id)}
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
              <PostCard
                name={d.name}
                image={d.main_image.url}
                address={d.address}
                price={d.price}
                unit={d.unit}
                createdAt={d.created_at}
                data={d}
                currentUser={currentUser}
                postId={d.id}
                prioriry={true}
                isBook={isBooked}
                isDeleted={isDeletedSuccess}
                isMarked={isMarkedSuccess}
                onClick={() => {
                  router.push(
                    "/posts/[id]",
                    `/posts/${saveNews ? d.post.id : d.id}`
                  );
                }}
                onClickEdit={() => {
                  router.push("/post/edit/[id]", `/post/edit/${d.id}`);
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
