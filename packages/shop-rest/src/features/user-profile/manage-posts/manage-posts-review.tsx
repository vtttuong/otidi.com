import { SortAZ } from "assets/icons/SortAZ";
import axios from "axios";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";
import StarRatings from "react-star-ratings";
import { getCookie } from "utils/session";
import { Box } from "./manage-post.style";
import {
  getReviews,
  createReview,
  deleteReview,
  editReview,
} from "utils/api/user";
import { Reply } from "assets/icons/Reply";
import { Remove } from "assets/icons/Remove";
import { Edit } from "assets/icons/Edit";
import Spinner from "components/spinner";
import { alignItems, justifyContent } from "styled-system";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  userId?: number;
  data?: any;
  onAddReview?: () => void;
};

const ManagePostReview: React.FC<ManagePostProps> = ({
  deviceType,
  userId,
  data,
  onAddReview,
}) => {
  const [errorReview, setErrorReview] = React.useState("");
  const [addingLoading, setAddingLoading] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const router = useRouter();
  const token = getCookie("access_token");

  const handleSubmit = async () => {
    if (token == null) {
      setErrorReview("errorLoginReview");
      return;
    }
    if (review.trim().length === 0) {
      setErrorReview("errorReview");
      return;
    }

    if (userId == getCookie("userId")) {
      setErrorReview("errorBlockReview");
      return;
    } else {
      setAddingLoading(true);
      setErrorReview("");

      const reviewObject = {
        user_id: userId,
        star: rating,
        content: review,
      };
      const { result, error } = await createReview(token, reviewObject);
      //call api
      if (result) {
        setReview("");
        setRating(0);
        setAddingLoading(false);
        onAddReview();
      } else {
        setErrorReview("addReviewOneTimeError");
        setAddingLoading(false);
      }

      return;
    }
  };

  // remove parent node
  const removeMyReview = async (id) => {
    setRemovingLoading(true);
    const { result, error } = await deleteReview(token, id);
    if (result) {
      setRemovingLoading(false);
      onAddReview();
    }
  };
  // edit review parent

  return (
    <Box>
      {data.length != 0 && data
        ? data.map((d) => (
            <div key={d.id} className="parent-node">
              <div className="td-img">
                <Image
                  url={d.reviewer.avatar}
                  className="avatar-in-table"
                  style={{ position: "relative", marginRight: "10px" }}
                  alt={d.star}
                />

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
              <div className="td" style={{ flex: 1 }}>
                <StarRatings
                  rating={d.star}
                  starDimension="20px"
                  starSpacing="3px"
                  starRatedColor={"#ffc107"}
                />
                <p>{d.content}</p>
              </div>

              {/* <div className="td" style={{ maxWidth: 500 }}>
                {d.description}
              </div> */}
              {/* check me to edit */}
              {Number(getCookie("userId")) == d.reviewer_id ? (
                <div className="td" style={{ maxWidth: 100 }}>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => removeMyReview(d.id)}
                  >
                    {removingLoading ? <Spinner /> : <Remove />}
                  </span>
                </div>
              ) : null}
            </div>
          ))
        : null}

      {userId != Number(getCookie("userId")) ? (
        <form style={{ paddingTop: 10, borderTop: "1px solid #dae0df" }}>
          <div style={{ fontWeight: 600, margin: "20px 0" }}>
            <label>
              Review:
              <br />
              <textarea
                rows={4}
                cols={50}
                value={review}
                style={{ marginTop: "10px 0" }}
                onChange={(e) => setReview(e.target.value)}
              />
            </label>
          </div>

          <div style={{ fontWeight: 600, marginBottom: "20px" }}>
            <label>
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
          <div
            style={{
              color: "white",
              border: 0,
              width: "100px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#009e7f",
              padding: "5px 10px",
              borderRadius: 5,
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            {addingLoading ? <Spinner /> : "Submit"}
          </div>
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
