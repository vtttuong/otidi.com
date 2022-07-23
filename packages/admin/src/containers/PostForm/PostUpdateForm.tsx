import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import { Textarea } from "components/Textarea/Textarea";
import UploaderForApprove from "components/UploaderForApprove/UploaderForApprove";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { numberWithCommas } from "utils/format-number";
import moment from "moment";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  Form,
} from "../DrawerItems/DrawerItems.style";
import { Wrapper } from "./PostDetail.style";
import { getReports, usePost } from "service/use-posts";
import { CURRENCY } from "settings/constants";

type Props = any;

const UpdatePost: React.FC<Props> = () => {
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const postId = useDrawerState("data");
  const token = localStorage.getItem("secondhand_token");
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { post, postLoading, error } = usePost(postId);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: post,
  });

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [rLoading, setRLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [reports, setReports] = useState(null);

  React.useEffect(() => {
    register({ name: "type" });
    register({ name: "categories" });
    register({ name: "image" });
    register({ name: "description" });
    register({ name: "expire_date" });
  }, [register]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };

  const handleUploader = (files) => {
    setValue("image", files[0].path);
  };

  const viewReport = async () => {
    setRLoading(true);
    const result = await getReports(post.id);
    if (result && result.success) {
      setReports(result.data);
    }
    setRLoading(false);
  };

  const onSubmit = async () => {
    setLoading(true);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "active",
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_LARAVEL_API_URL_ADMIN}/posts/${post.id}`,
      options
    );
    const postResponse = await res.json();

    if (res.ok && postResponse.success) {
      dispatch({
        type: "SAVE_APPROVE_POST_ID",
        data: postResponse.data.id,
      });

      alert.success("Approve post successfully");
      closeDrawer();
    }
  };

  useEffect(() => {
    if (post && post.detail) {
      setDetails(
        Object.keys(post.detail)
          .filter((key) => key !== "id" && key !== "post_id")
          .map((key) => {
            if (
              (key === "deleted_at" ||
                key === "created_at" ||
                key === "updated_at") &&
              post.detail[key]
            ) {
              return [
                key,
                moment(post.detail[key]).format("YYYY-MM-DD HH:mm:ss"),
              ];
            } else {
              return [key, post.detail[key] || ""];
            }
          })
      );
    }
  }, [post]);

  const textButton = () => {
    if (post.status === "waiting") {
      return "Approve";
    } else if (post.status === "deactive") {
      return "Unblock";
    } else {
      return "Block";
    }
  };

  return (
    <>
      {post && (
        <>
          <DrawerTitleWrapper>
            <DrawerTitle>Detail Post</DrawerTitle>
          </DrawerTitleWrapper>

          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ height: "100%" }}
            noValidate
          >
            <Scrollbars
              autoHide
              renderView={(props) => (
                <div
                  {...props}
                  style={{ ...props.style, overflowX: "hidden" }}
                />
              )}
              renderTrackHorizontal={(props) => (
                <div
                  {...props}
                  style={{ display: "none" }}
                  className="track-horizontal"
                />
              )}
            >
              <Row>
                <Col lg={4} style={{ marginBottom: "20px" }}>
                  {reports ? (
                    reports.length !== 0 ? (
                      <div>
                        <DrawerTitle>All reports: {reports.length}</DrawerTitle>
                      </div>
                    ) : (
                      <p>There is no any report</p>
                    )
                  ) : null}
                  {reports && reports.length !== 0
                    ? reports.map((i) => (
                        <Wrapper className="error-box">
                          <p>{i.phone_number}</p>
                          <p>{i.type}</p>
                        </Wrapper>
                      ))
                    : null}
                </Col>
                <Col lg={8}>
                  <DrawerBox>
                    <UploaderForApprove
                      onChange={handleUploader}
                      images={post.images}
                    />
                  </DrawerBox>
                  <DrawerBox>
                    <FormFields>
                      <FormLabel>Title</FormLabel>
                      <Input
                        disabled={true}
                        inputRef={register({ required: true, maxLength: 20 })}
                        name="name"
                        value={post.title}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        disabled={true}
                        defaultValue={post.description}
                        value={post.description}
                        onChange={handleDescriptionChange}
                      />
                    </FormFields>
                    {/* <FormFields>
                      <FormLabel>Unit</FormLabel>
                      <Input type="text" inputRef={register} name="unit" />
                    </FormFields> */}
                    <FormFields>
                      <FormLabel>Price</FormLabel>
                      <Input
                        disabled={true}
                        type="text"
                        name="price"
                        value={`${numberWithCommas(
                          post.original_price
                        )} ${CURRENCY}`}
                      />
                    </FormFields>

                    {/* <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Input type="text" name="type" value={post.category.type} />
                </FormFields> */}
                    {/* <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Input type="text" name="type" value={post.category.label} />
                </FormFields> */}
                    {/* <FormFields>
                      <FormLabel>Expire</FormLabel>
                      <Input
                        type="text"
                        name="expire_date"
                        value={moment(post.expire_date).format("YYYY-MM-DD")}
                      />
                    </FormFields> */}
                    <Row>
                      {details
                        ? details.map((i) => (
                            <Col key={i[0]} md={6} className="addInfo">
                              <FormFields>
                                <FormLabel>{i[0]}</FormLabel>
                                <Input
                                  disabled={true}
                                  type="text"
                                  name={i[1]}
                                  value={i[1]}
                                />
                              </FormFields>
                            </Col>
                          ))
                        : null}
                      {/* <AdditionInfo /> */}
                    </Row>
                  </DrawerBox>
                </Col>
              </Row>
            </Scrollbars>

            <ButtonGroup>
              <Button
                kind={KIND.minimal}
                onClick={closeDrawer}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "33%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      marginRight: "10px",
                      color: $theme.colors.red400,
                    }),
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                isLoading={rLoading}
                onClick={viewReport}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "33%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      marginRight: "10px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    }),
                  },
                }}
              >
                View Report
              </Button>
              {post.status === "waiting" && (
                <Button
                  type="submit"
                  onClick={onSubmit}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        width: "33%",
                        borderTopLeftRadius: "3px",
                        borderTopRightRadius: "3px",
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px",
                      }),
                    },
                  }}
                  isLoading={loading}
                >
                  {textButton()}
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </>
      )}
    </>
  );
};

export default UpdatePost;
