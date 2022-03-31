import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import { Textarea } from "components/Textarea/Textarea";
import UploaderForApprove from "components/UploaderForApprove/UploaderForApprove";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
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
import { Wrapper } from "./ProductDetail.style";

type Props = any;

const AddProduct: React.FC<Props> = () => {
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const data = useDrawerState("data");
  const token = localStorage.getItem("secondhand_token");
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });

  const [description, setDescription] = useState(data.description);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async () => {
    setLoading(true);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status:
          data.status === "approving" || data.status === "deactive"
            ? "approved"
            : "deactive",
      }),
    };

    const res = await fetch(
      process.env.REACT_APP_LARAVEL_API_URL + `/api/admin/v1/posts/${data.id}`,
      options
    );
    const post = await res.json();

    if (res.ok) {
      dispatch({
        type: "SAVE_APPROVE_POST_ID",
        data: post.id,
      });

      closeDrawer();
      alert.success("Approve post successfully");
    }
  };
  if (data.additional_info) {
    var addInfo = Object.keys(data.additional_info).map((key) => [
      key,
      data.additional_info[key],
    ]);
  }

  const textButton = () => {
    if (data.status === "approving") {
      return "Approve";
    } else if (data.status === "deactive") {
      return "Unblock";
    } else {
      return "Block";
    }
  };

  return (
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
            <div {...props} style={{ ...props.style, overflowX: "hidden" }} />
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
            <Col lg={4}>
              {data.reports ? (
                <div>
                  <DrawerTitle>All reports: {data.reports.length}</DrawerTitle>
                </div>
              ) : null}
              {data.reports && data.reports.length !== 0
                ? data.reports.map((i) => (
                    <Wrapper className="error-box">
                      <p>{i.error}</p>
                      <p>{i.content}</p>
                    </Wrapper>
                  ))
                : null}
            </Col>
            <Col lg={8}>
              <DrawerBox>
                <UploaderForApprove
                  onChange={handleUploader}
                  images={data.gallery}
                />
              </DrawerBox>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="name"
                    value={data.title}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>
                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="text"
                    name="price"
                    value={numberWithCommas(data.price)}
                  />
                </FormFields>
                
                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Input type="text" name="type" value={data.category.type} />
                </FormFields>
                <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Input type="text" name="type" value={data.category.label} />
                </FormFields>
                <FormFields>
                  <FormLabel>Expire</FormLabel>
                  <Input
                    type="text"
                    name="expire_date"
                    value={moment(data.expire_date).format("YYYY-MM-DD")}
                  />
                </FormFields>
                <Row>
                  {addInfo
                    ? addInfo.map((i) => (
                        <Col key={i[1]} md={6} className="addInfo">
                          <FormFields>
                            <FormLabel>{i[0]}</FormLabel>
                            <Input type="text" name={i[1]} value={i[1]} />
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
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            onClick={onSubmit}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
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
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;
