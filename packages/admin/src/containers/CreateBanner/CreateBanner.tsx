import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import Uploader from "components/UploaderBanner/UploaderBanner";
import { useDrawerDispatch } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
// import { addBanner } from "service/use-banner";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";
import axios from "axios";

const categoryTypeOptions = [
  { value: "vehicle", name: "Vehicle", id: "1" },
  { value: "electronic", name: "Electronic", id: "3" },
  { value: "technology", name: "Technology", id: "5" },
  { value: "fashion", name: "Fashion", id: "7" },
  { value: "furniture", name: "Furniture", id: "9" },
  { value: "sport_relax", name: "Sport & relax", id: "11" },
  { value: "office", name: "Office", id: "13" },
  { value: "animal", name: "Animal", id: "15" },
  { value: "others", name: "Others", id: "16" },
];

type Props = any;

const AddBanner: React.FC<Props> = (props) => {
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register } = useForm();
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const onSubmit = () => {
    setLoading(true);
    const token = localStorage.getItem("secondhand_token");

    var formData = new FormData();
    formData.set("image", image);

    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(
        process.env.REACT_APP_LARAVEL_API_URL_ADMIN + "/banners",
        formData,
        configs
      )
      .then((response) => response.data)
      .then((data) => {
        {
          setLoading(false);
          if (!data.success) {
            const result = data.data;
            const keys = Object.values(result);
            // eslint-disable-next-line array-callback-return
            keys.map((i) => {
              alert.error(i[0]);
              setLoading(false);
            });
          } else {
            dispatch({
              type: "SAVE_ID",
              data: "2",
            });
            closeDrawer();
            alert.success("Add banner successfully");
          }
        }
      });
  };

  async function handleSelectCategory({ value }) {
    setCategoryOption(value);
    if (value.length) {
      setCategory(value[0].value);
    } else {
      setCategory("en");
    }
  }
  const handleUploader = (files) => {
    setImage(files[0]);
  };
  const handleChangeInput = (e) => {
    const { value, name } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "subtitle") {
      setSubTitle(value);
    }
  };
  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Banner</DrawerTitle>
      </DrawerTitleWrapper>

      <Form style={{ height: "100%" }}>
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
              <FieldDetails>Upload your Banner image here</FieldDetails>
            </Col>
            <Col lg={8}>
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
                <Uploader onChange={handleUploader} />
              </DrawerBox>
            </Col>
          </Row>

          {/* <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your banner description and necessary informations from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Type</FormLabel>
                  <Select
                    options={categoryTypeOptions}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Ex: Vehicle"
                    value={categoryOption}
                    searchable={false}
                    onChange={handleSelectCategory}
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
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
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
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Title</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    value={title}
                    name="title"
                    onChange={handleChangeInput}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Content</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    value={subTitle}
                    name="subtitle"
                    onChange={handleChangeInput}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row> */}
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
            type="button"
            disabled={loading}
            onClick={onSubmit}
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
            Create Banner
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddBanner;
