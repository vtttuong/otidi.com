import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { Textarea } from "components/Textarea/Textarea";
import { useDrawerDispatch } from "context/DrawerContext";
import React, { useCallback } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { addFaq } from "service/use-faqs";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";

const options = [
  { value: "vi", name: "Vi", id: "1" },
  { value: "en", name: "En", id: "2" },
];
type Props = any;

const AddFaq: React.FC<Props> = (props) => {
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const [locate, setLocate] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [valueArea, setValueArea] = React.useState("");
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { register, handleSubmit } = useForm();
  React.useEffect(() => {
    register({ name: "category" });
  }, [register]);

  const onSubmit = async (data) => {
    const newFaq = {
      title: data.title,
      content: valueArea,
      locale: locate[0].value,
    };

    const result = await addFaq(newFaq);

    if (result?.error) {
      const keys = Object.values(result.error);
      // eslint-disable-next-line array-callback-return
      keys.map((i) => {
        setLoading(false);
      });
    } else {
      dispatch({
        type: "SAVE_ID",
        data: 1,
      });
      closeDrawer();
      alert.success("Create FAQ successfully");
    }
  };

  const handleChange = ({ value }) => {
    setLocate(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Faq</DrawerTitle>
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
              <FieldDetails>Add informations of faq from here</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel> Title</FormLabel>
                  <Input inputRef={register({ required: true })} name="title" />
                </FormFields>

                <FormFields>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    type="text"
                    inputRef={register({ required: true })}
                    defaultValue=""
                    value={valueArea}
                    onChange={(e) => setValueArea(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Locate</FormLabel>
                  <Select
                    options={options}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Ex: Choose locate"
                    value={locate}
                    searchable={false}
                    onChange={handleChange}
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
            loading={loading}
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
            Create Faq
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddFaq;
