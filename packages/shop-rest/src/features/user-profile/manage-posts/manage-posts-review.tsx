import { SortAZ } from "assets/icons/SortAZ";
import axios from "axios";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Table from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";
import { getCookie } from "utils/session";
import { Box } from "./manage-post.style";
import {
  getReviews,
  creatReviewChild,
  deleteReview,
  editReview,
} from "utils/api/user";
import { Reply } from "assets/icons/Reply";
import { Remove } from "assets/icons/Remove";
import { Edit } from "assets/icons/Edit";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  userId?: number;
};

const ManagePostReview: React.FC<ManagePostProps> = ({
  deviceType,
  userId,
}) => {
  const [errorReview, setErrorReview] = React.useState("");
  const [data, SetData] = React.useState([]);
  const [dataChild, SetDataChild] = React.useState([]);
  const [parent, setParent] = React.useState(0);
  const [reviewChild, setReviewChild] = React.useState("");
  const [reviewEdit, setReviewEdit] = React.useState("");
  const [ratingChild, setRatingChild] = React.useState(0);
  const [ratingEdit, setRatingEdit] = React.useState(0);
  const [editParentId, setEditParent] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const router = useRouter();
  const token = getCookie("access_token");

  const handleSubmit = () => {
    if (token == null) {
      setErrorReview("errorLoginReview");
      return;
    }
    if (review.length == 0) {
      setErrorReview("errorReview");
      return;
    }
    if (userId == getCookie("userId")) {
      setErrorReview("errorBlockReview");
      return;
    } else {
      setErrorReview("");
      handleChange(event);
      setReview("");
      setRating(0);
      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": `application/json`,
        },
      };
      let body = JSON.stringify({
        user_id: userId,
        star: rating,
        description: review,
      });

      //call api
      axios
        .post(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL +
            "/api/client/v1/users/review",
          body,
          configs
        )
        .then((response) => {
          if (response.status == 200 && response.data == true) {
            getRootReviews();
          }
        });
      return;
    }
  };
  const handleSubmitChild = async () => {
    if (userId == getCookie("userId")) {
      setErrorReview("errorBlockReview");
      return;
    } else {
      setErrorReview("");
      //fetch review

      handleChange(event);

      const object = {
        parent_id: parent,
        user_id: userId,
        star: ratingChild,
        description: reviewChild,
      };

      await creatReviewChild(token, object);
      setReviewChild("");
      setRatingChild(0);
      const param = "&parent_id=" + parent;
      let data = await getReviews(userId, param);
      data = data.reverse();
      SetDataChild(data);
      return;
    }
  };
  const handleSubmitEdit = async () => {
    var editRoot = 0;
    var editChild = 0;
    dataChild.map((i) => {
      if (i.id == editParentId) {
        i.description = reviewEdit;
        i.star = ratingEdit;
        editChild = 1;
      }
    });
    data.map((i) => {
      if (i.id == editParentId) {
        i.description = reviewEdit;
        i.star = ratingEdit;
        editRoot = 1;
      }
    });
    if (editChild == 1) {
      SetDataChild(dataChild);
    }
    if (editRoot == 1) {
      SetData(data);
    }

    handleChange(event);

    const object = {
      star: ratingEdit,
      description: reviewEdit,
    };
    await editReview(token, editParentId, object);
    setShow(false);
    return;
  };
  const handleChange = (event: any) => {
    let data = event.target ? event.target.value : "";
    setReview(data);
  };
  const handleChangeChild = (event: any) => {
    let data = event.target ? event.target.value : "";
    setReviewChild(data);
  };
  const handleChangeReview = (event: any) => {
    let data = event.target ? event.target.value : "";
    setReviewEdit(data);
  };

  const getRootReviews = async () => {
    const data = await getReviews(userId, "&root_only=1");
    SetData(data);
  };
  const onParent = async (id) => {
    if (id == parent) {
      setParent(0);
      return;
    }
    setParent(id);
    const param = "&parent_id=" + id;
    let data = await getReviews(userId, param);
    data = data.reverse();
    SetDataChild(data);
  };
  // remove parent node
  const removeParent = async (id) => {
    await deleteReview(token, id);
    const newArray = data.filter(function (obj) {
      return obj.id !== id;
    });
    const newArrayChild = dataChild.filter(function (obj) {
      return obj.id !== id;
    });
    SetData(newArray);
    SetDataChild(newArrayChild);
  };
  // edit review parent
  const editParent = (id) => {
    setShow(true);
    setEditParent(id);
  };

  React.useEffect(() => {
    getRootReviews();
  }, []);
  return (
    <Box>
      {data.length != 0 && data
        ? data.map((d) => (
            <>
              <div key={d.created_at} className="parent-node">
                <div className="td-img">
                  <Image
                    url={d.reviewer.avatar_img_url}
                    className="avatar-in-table"
                    style={{ position: "relative" }}
                    alt={d.star}
                  />
                  <span onClick={() => onParent(d.id)}>
                    <Reply />
                    <b style={{ cursor: "pointer" }}>
                      {d.replies_count > 0
                        ? " Xem tất cả " + d.replies_count + " phản hồi"
                        : null}
                    </b>
                  </span>

                  <div
                    className="td-profile"
                    onClick={() => {
                      router.push(
                        Number(getCookie("userId")) != d.reviewer_id
                          ? `/profile/${d.reviewer_id}`
                          : "/profile"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{d.reviewer.name}</span>
                    <p>{moment(d.created_at).format("LLL")}</p>
                  </div>
                </div>
                <div className="td">
                  <StarRatings
                    rating={d.star}
                    starDimension="20px"
                    starSpacing="5px"
                    starRatedColor={"#ffc107"}
                  />
                </div>

                <div className="td" style={{ maxWidth: 500 }}>
                  {d.description}
                </div>
                {/* check me to edit */}
                {Number(getCookie("userId")) == d.reviewer.id ? (
                  <div className="td" style={{ maxWidth: 100 }}>
                    <span onClick={() => removeParent(d.id)}>
                      <Remove />
                    </span>
                    <span
                      onClick={() => editParent(d.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <Edit />
                    </span>
                  </div>
                ) : null}
              </div>
              {/* edit review */}
              {d.id === editParentId && show ? (
                <form
                  style={{
                    paddingTop: 10,
                    marginBottom: 20,
                    borderTop: "1px solid #dae0df",
                  }}
                >
                  <div>
                    <label style={{ fontWeight: 600 }}>
                      Edit Review:
                      <br />
                      <textarea
                        rows={3}
                        cols={30}
                        value={reviewEdit}
                        style={{
                          border: "1px solid #009e7f",
                          marginTop: 10,
                        }}
                        onChange={handleChangeReview}
                      />
                    </label>
                  </div>

                  <div>
                    <label style={{ fontWeight: 600 }}>
                      Rating:
                      <br />
                      <StarRatings
                        starHoverColor={"#ffc107"}
                        rating={ratingEdit}
                        starDimension="20px"
                        starSpacing="5px"
                        starRatedColor={"#ffc107"}
                        changeRating={(rating) => setRatingEdit(rating)}
                      />
                    </label>
                  </div>
                  <span
                    style={{
                      color: "white",
                      border: 0,
                      background: "#009e7f",
                      padding: "5px 10px",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                    onClick={handleSubmitEdit}
                  >
                    {"Submit"}
                  </span>
                  {errorReview ? (
                    <p style={{ color: "red", marginTop: 10 }}>
                      <FormattedMessage
                        id={errorReview}
                        defaultMessage="Please login!"
                      />
                    </p>
                  ) : null}
                </form>
              ) : null}
              {/* check sub reply */}
              {d.id === parent ? (
                <div className="child">
                  <div>
                    {dataChild.map((child) => (
                      <>
                        <div className="reviewer">
                          <Image
                            url={child.reviewer.avatar_img_url}
                            className="avatar-in-table"
                            style={{ position: "relative" }}
                            alt={child.star}
                          />
                          <td
                            onClick={() => {
                              router.push(
                                Number(getCookie("userId")) != child.reviewer_id
                                  ? `/profile/${child.reviewer_id}`
                                  : "/profile"
                              );
                            }}
                            style={{ cursor: "pointer", padding: "0 7px" }}
                          >
                            {child.reviewer.name}
                            <p>{moment(child.created_at).format("LLL")}</p>
                          </td>
                          {Number(getCookie("userId")) == child.reviewer.id ? (
                            <div className="td" style={{ maxWidth: 100 }}>
                              <span onClick={() => removeParent(child.id)}>
                                <Remove />
                              </span>
                              <span
                                onClick={() => editParent(child.id)}
                                style={{ marginLeft: 10 }}
                              >
                                <Edit />
                              </span>
                            </div>
                          ) : null}
                        </div>

                        <td>
                          <StarRatings
                            rating={child.star}
                            starDimension="20px"
                            starSpacing="5px"
                            starRatedColor={"#ffc107"}
                          />
                        </td>

                        <td style={{ maxWidth: 200 }}>{child.description}</td>
                        {/* edit review */}
                        {child.id == editParentId && show ? (
                          <form
                            style={{
                              paddingTop: 10,
                              marginBottom: 20,
                              borderTop: "1px solid #dae0df",
                            }}
                          >
                            <div>
                              <label style={{ fontWeight: 600 }}>
                                Edit Review:
                                <br />
                                <textarea
                                  rows={3}
                                  cols={30}
                                  value={reviewEdit}
                                  style={{
                                    border: "1px solid #009e7f",
                                    marginTop: 10,
                                  }}
                                  onChange={handleChangeReview}
                                />
                              </label>
                            </div>

                            <div>
                              <label style={{ fontWeight: 600 }}>
                                Rating:
                                <br />
                                <StarRatings
                                  starHoverColor={"#ffc107"}
                                  rating={ratingEdit}
                                  starDimension="20px"
                                  starSpacing="5px"
                                  starRatedColor={"#ffc107"}
                                  changeRating={(rating) =>
                                    setRatingEdit(rating)
                                  }
                                />
                              </label>
                            </div>
                            <span
                              style={{
                                color: "white",
                                border: 0,
                                background: "#009e7f",
                                padding: "5px 10px",
                                borderRadius: 5,
                                cursor: "pointer",
                              }}
                              onClick={handleSubmitEdit}
                            >
                              {"Submit"}
                            </span>
                            {errorReview ? (
                              <p style={{ color: "red", marginTop: 10 }}>
                                <FormattedMessage
                                  id={errorReview}
                                  defaultMessage="Please login!"
                                />
                              </p>
                            ) : null}
                          </form>
                        ) : null}
                      </>
                    ))}
                    {token ? (
                      <form
                        style={{
                          paddingTop: 10,
                          marginBottom: 20,
                          borderTop: "1px solid #dae0df",
                        }}
                      >
                        <div>
                          <label style={{ fontWeight: 600 }}>
                            Review:
                            <br />
                            <textarea
                              rows={3}
                              cols={30}
                              value={reviewChild}
                              style={{
                                border: "1px solid #009e7f",
                                marginTop: 10,
                              }}
                              onChange={handleChangeChild}
                            />
                          </label>
                        </div>

                        <div>
                          <label style={{ fontWeight: 600 }}>
                            Rating:
                            <br />
                            <StarRatings
                              starHoverColor={"#ffc107"}
                              rating={ratingChild}
                              starDimension="20px"
                              starSpacing="5px"
                              starRatedColor={"#ffc107"}
                              changeRating={(rating) => setRatingChild(rating)}
                            />
                          </label>
                        </div>
                        <span
                          style={{
                            color: "white",
                            border: 0,
                            background: "#009e7f",
                            padding: "5px 10px",
                            borderRadius: 5,
                            cursor: "pointer",
                          }}
                          onClick={handleSubmitChild}
                        >
                          {"Submit"}
                        </span>
                        {errorReview ? (
                          <p style={{ color: "red", marginTop: 10 }}>
                            <FormattedMessage
                              id={errorReview}
                              defaultMessage="Please login!"
                            />
                          </p>
                        ) : null}
                      </form>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          ))
        : null}

      {userId != Number(getCookie("userId")) ? (
        <form style={{ paddingTop: 10, borderTop: "1px solid #dae0df" }}>
          <div>
            <label style={{ fontWeight: 600 }}>
              Review:
              <br />
              <textarea
                rows={4}
                cols={50}
                value={review}
                style={{ border: "1px solid #009e7f", marginTop: 10 }}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label style={{ fontWeight: 600 }}>
              Rating:
              <br />
              <StarRatings
                starHoverColor={"#ffc107"}
                rating={rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor={"#ffc107"}
                changeRating={(rating) => setRating(rating)}
              />
            </label>
          </div>
          <span
            style={{
              color: "white",
              border: 0,
              background: "#009e7f",
              padding: "5px 10px",
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            {"Submit"}
          </span>
          {errorReview ? (
            <p style={{ color: "red", marginTop: 10 }}>
              <FormattedMessage
                id={errorReview}
                defaultMessage="Please login!"
              />
            </p>
          ) : null}
        </form>
      ) : null}
    </Box>
  );
};

export default ManagePostReview;
