/* eslint-disable array-callback-return */
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import axios from "axios";
import Uploader from "components/Uploader/Uploader";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const optionsType = [
  { value: "1", name: "Normal", id: "1" },
  { value: "2", name: "Copper", id: "2" },
  { value: "3", name: "Silver", id: "3" },
  { value: "4", name: "Gold", id: "4" },
];
const userType = [
  { value: "exchangeable", label: "Exchangeable", id: "1" },
  { value: "personal", label: "Personal", id: "2" },
];
type Props = any;

const AddCampaing: React.FC<Props> = (props) => {
  const token = localStorage.getItem("secondhand_token");
  const [type, setType] = useState([]);
  const [image, setImage] = useState<any>({});
  const [tag, setTag] = useState([]);
  const [level, setLevel] = useState([]);
  const dispatch = useDrawerDispatch();
  const alert = useAlert();
  const maxId = useDrawerState("data");
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const handleMultiChange = ({ value }) => {
    setValue("categories", value);
    setTag(value);
    let newTag = [];
    value.map((i) => {
      newTag.push(parseInt(i.value));
    });
    setLevel(newTag);
  };
  
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    register({ name: "category" });
  }, [register]);

  const onSubmit = async (data) => {
    setLoading(true);

    const newVoucher = {
      id: maxId + 1,
      name: data.name,
      level_ids: level,
      discount: data.discount,
      using: 0,
      total: data.total,
      expired: data.expired,
      type: type[0].value,
      image: image[0].path,
    }

    dispatch({
      type: "SAVE_CREATED_VOUCHER",
      data: newVoucher,
    });

    const formData: any = new FormData();
    formData.set("name", data.name);

    if (level.length > 0) {
      level.forEach((l) => {
        formData.append("level_ids[]", l);
      });
    }
    formData.set("discount", data.discount);
    formData.set("total", data.total);
    formData.set("expired", data.expired);
    if (type[0].value === "exchangeable") {
      formData.set("exchange_point", data.exchange_point);
    }
    formData.set("image", image[0]);
    if (type.length === 0) {
      alert.error("Please choose type");
      setLoading(false);
      return;
    }
    formData.set("type", type[0].value);
    addVoucher(formData);
  };

  const addVoucher = (formData: any) => {
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(baseUrl + `/api/admin/v1/vouchers`, formData, configs)
      .then((response) => {
        if (response.status === 200 && response.data.error) {
          const result = response.data.error;
          const keys = Object.values(result);
          keys.map((i) => {
            alert.error(i);
            setLoading(false);
          });
        } else {
          dispatch({
            type: "SAVE_ID",
            data: 2,
          });
          closeDrawer();
          alert.success("Add voucher successfully");
        }
      });
  };

  const handleSort = ({ value }) => {
    setType(value);
    if (value.length) {
    }
  };
  const handleUploader = (files) => {
    setImage(files);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Voucher</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
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
              <FieldDetails>
                Add your Voucher description and necessary informations from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Voucher Name</FormLabel>
                  <Input inputRef={register} name="name" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="discount"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={userType}
                    labelKey="label"
                    valueKey="value"
                    placeholder="User type"
                    value={type}
                    onChange={handleSort}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                    // multi
                  />
                </FormFields>
                <Col md={3}></Col>
                <FormFields>
                  <FormLabel>Number of Coupon</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="total"
                  />
                </FormFields>
                {type.length !== 0 && type[0].value !== "exchangeable" ? (
                  <FormFields>
                    <FormLabel>Type Member</FormLabel>
                    <Select
                      options={optionsType}
                      labelKey="name"
                      valueKey="value"
                      placeholder="Type"
                      value={tag}
                      onChange={handleMultiChange}
                      overrides={{
                        Placeholder: {
                          style: ({ $theme }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $theme.colors.textNormal,
                            };
                          },
                        },
                        DropdownListItem: {
                          style: ({ $theme }) => {
                            return {
                              ...$theme.typography.fontBold14,
                              color: $theme.colors.textNormal,
                            };
                          },
                        },
                        Popover: {
                          props: {
                            overrides: {
                              Body: {
                                style: { zIndex: 5 },
                              },
                            },
                          },
                        },
                      }}
                      multi
                    />
                  </FormFields>
                ) : null}

                <FormFields>
                  <FormLabel>Date Expired</FormLabel>
                  <Input type="date" inputRef={register} name="expired" />
                </FormFields>
                {type.length !== 0 && type[0].value === "exchangeable" ? (
                  <FormFields>
                    <FormLabel>Exchange point</FormLabel>
                    <Input
                      type="number"
                      inputRef={register({ required: true })}
                      name="exchange_point"
                    />
                  </FormFields>
                ) : null}
                <FormFields>
                  <FormLabel>Image</FormLabel>
                  <Uploader onChange={handleUploader} />
                </FormFields>
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
            isLoading={loading}
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
          >
            Create Voucher
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCampaing;