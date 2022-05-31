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
  const using = data.using;
  const typeVoucher = data.type;

  let levelIds = [];
  data.levels.map(level => {
    levelIds.push(level.id);
  });

  const [tag, setTag] = useState(data.levels);
  const [image, setImage] = useState<any>({});
  const [exchange, setExchange] = useState(data.exchange_point);
  const [defaultName, setName] = useState(data.name);
  const [defaulDiscount, setDiscount] = useState(data.discount);
  const [defaultTotal, setTotal] = useState(data.total);
  const [expired, setExpired] = useState(data.expired);
  const [level, setLevel] = useState([]);
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

  const onSubmit = async (data) => {
    setLoading(true);

    const updatedVoucher = {
      id: voucherId,
      name: data.name,
      levels: level.length ? level : levelIds,
      discount: data.discount,
      using: using,
      total: data.total,
      expired: data.expired,
      type: typeVoucher,
      image: image.path ? image.path : imageUrl,
      exchange_point: exchange,
    }

    dispatch({
      type: "SAVE_UPDATED_VOUCHER",
      data: updatedVoucher,
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

    if (image.path) {
      formData.set("image", image);
    }
    if (type.length === 0) {
      alert.error("Please choose type");
      setLoading(false);
      return;
    }
    formData.set("type", type[0].value);
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
      .post(baseUrl + `/api/admin/v1/vouchers/${data.id}`, formData, configs)
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
          alert.success("Update voucher successfully");
        }
      });
  };
  const handleUploader = (files) => {
    setImage(files[0]);
  };
  const handleSort = ({ value }) => {
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
                    inputRef={register}
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
                    value={defaulDiscount}
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
                      inputRef={register}
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
                    inputRef={register}
                    name="expired"
                    value={expired}
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
