/* eslint-disable array-callback-return */
import axios from "axios";
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import UploaderBanner from "components/UploaderBanner/UploaderBanner";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";
import moment from "moment";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

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

const EditCampaing: React.FC<Props> = (props) => {
  const data = useDrawerState("data");
  const dfType = [];
  userType.map((t) => {
    if (t.value === data.type) {
      dfType.push(t);
      return;
    }
  });
  const token = localStorage.getItem("secondhand_token");
  const voucherId = data.id;
  const imageUrl = data.image;
  const used = data.used;
  const typeVoucher = data.type;

  let levelIds = [];
  data.levels.map((level) => {
    levelIds.push(level.id);
  });

  const [tag, setTag] = useState(
    data.levels.map((level) => optionsType[level.id - 1])
  );

  const [image, setImage] = useState<any>({});
  const [exchange, setExchange] = useState(data.reward_point);
  const [defaultName, setName] = useState(data.name);
  const [defaultDiscount, setDiscount] = useState(data.value);
  const [defaultTotal, setTotal] = useState(data.total);
  const [expired, setExpired] = useState(data.end_at);
  const [level, setLevel] = useState(levelIds);
  const [type, setType] = useState(dfType);

  const dispatch = useDrawerDispatch();
  const alert = useAlert();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const handleMultiChange = ({ value }) => {
    setValue("categories", value);
    setTag(value);
    let newTag = [];
    value.map((i) => {
      newTag.push(i.value ? parseInt(i.value) : i.id);
    });
    setLevel(newTag);
  };

  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    register({ name: "category" });
  }, [register]);

  const onSubmit = async (fData) => {
    setLoading(true);

    if (fData.discount <= 0 || fData.discount > 100) {
      alert.error("Invalid discount percent");
      setLoading(false);
      return;
    }

    if (type.length === 0) {
      alert.error("Please choose type");
      setLoading(false);
      return;
    }

    const updatedVoucher = {
      id: voucherId,
      name: fData.name,
      levels: level.length ? level : levelIds,
      value: fData.discount,
      used: used,
      total: fData.total,
      start_at: data.start_at,
      end_at: fData.end_at,
      type: typeVoucher,
      image: image.path ? image.path : imageUrl,
      reward_point: exchange,
    };

    dispatch({
      type: "SAVE_UPDATED_VOUCHER",
      data: updatedVoucher,
    });

    const formData: any = new FormData();
    formData.append("name", fData.name);

    if (level.length > 0) {
      level.forEach((l) => {
        formData.append("level_ids[]", l);
      });
    }
    formData.append("value", fData.discount);
    formData.append("total", fData.total);
    formData.append(
      "start_at",
      moment(data.start_at).format("YYYY-MM-DD HH:mm")
    );
    formData.append("end_at", moment(fData.expired).format("YYYY-MM-DD HH:mm"));
    if (type[0].value === "exchangeable") {
      formData.append("reward_point", fData.exchange_point);
    }

    if (image.path) {
      formData.append("image", image);
    }

    formData.append("type", type[0].value);
    updateVoucher(formData);
  };

  const updateVoucher = (formData: any) => {
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(baseUrl + `/vouchers/${data.id}`, formData, configs)
      .then((response) => {
        if (response.status === 200 && !response.data.success) {
          const result = response.data.data;

          const keys = Object.values(result);
          keys.map((i) => {
            Array.isArray(i) &&
              i.map((err) => {
                alert.error(i);
                setLoading(false);
              });
          });
        } else {
          dispatch({
            type: "SAVE_ID",
            data: 2,
          });
          closeDrawer();
          alert.success("Update voucher successfully");
        }
      });
  };
  const handleUploader = (files) => {
    setImage(files[0]);
  };
  const handleSelectType = ({ value }) => {
    setType(value);
    if (value.length) {
    }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Update Voucher</DrawerTitle>
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
                Update your Voucher description and necessary informations from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <DrawerBox
                  overrides={{
                    Block: {
                      style: {
                        width: "100%",
                        height: "auto",
                        padding: "30px",
                        borderRadius: "3px",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    },
                  }}
                >
                  <UploaderBanner
                    onChange={handleUploader}
                    imageURL={data.image}
                  />
                </DrawerBox>

                <FormFields>
                  <FormLabel>Voucher Name</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="name"
                    value={defaultName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="discount"
                    value={defaultDiscount}
                    onChange={(e) => setDiscount(e.target.value)}
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
                    onChange={handleSelectType}
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

                <FormFields>
                  <FormLabel>Number of Coupon</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="total"
                    value={defaultTotal}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </FormFields>
                {data.type === "personal" ? (
                  <FormFields>
                    <FormLabel>Type Member</FormLabel>
                    <Select
                      options={optionsType}
                      labelKey="name"
                      valueKey="value"
                      placeholder={tag}
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

                {data.type !== "personal" ? (
                  <FormFields>
                    <FormLabel>Exchange point</FormLabel>
                    <Input
                      type="number"
                      inputRef={register({ required: true })}
                      name="exchange_point"
                      value={exchange}
                      onChange={(e) => setExchange(e.target.value)}
                    />
                  </FormFields>
                ) : null}
                <FormFields>
                  <FormLabel>Date Expired</FormLabel>
                  <Input
                    type="date"
                    inputRef={register({ required: true })}
                    name="expired"
                    value={expired.substr(0, 10)}
                    onChange={(e) => setExpired(e.target.value)}
                  />
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
            Update Voucher
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default EditCampaing;
