/* eslint-disable @typescript-eslint/no-unused-vars */
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { Textarea } from "components/Textarea/Textarea";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { updateFaq } from "service/use-faqs";
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

const UpdateFaq: React.FC<Props> = (props) => {
  const alert = useAlert();
  const data = useDrawerState("data");

  const dfLocate = [];
  // eslint-disable-next-line array-callback-return
  options.map((i) => {
    if (i.value === data.locale) dfLocate.push(i);
  });
  const dispatch = useDrawerDispatch();
  const [locate, setLocate] = React.useState(dfLocate);

  const [dfTitle, setTitle] = React.useState(data.title);
  const [loading, setLoading] = React.useState(false);
  const [valueArea, setValueArea] = React.useState(data.content);
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { register } = useForm();
  React.useEffect(() => {
    register({ name: "category" });
  }, [register]);

  const onSubmit = async () => {
    const newFaq = {
      title: dfTitle,
      content: valueArea,
      locale: locate[0].value,
    };

    await updateFaq(data.id, newFaq);

    dispatch({
      type: "SAVE_ID",
      data: 1,
    });
    closeDrawer();
    alert.success("Update FAQ successfully");
  };

  const handleChange = ({ value }) => {
    setLocate(value);
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle> Edit Faq</DrawerTitle>
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
              <FieldDetails>Edit informations of faq from here</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel> Title</FormLabel>
                  <Input
                    inputRef={register({ required: true })}
                    name="title"
                    value={dfTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    type="text"
                    inputRef={register({ required: true })}
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
            type="button"
            loading={loading}
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
          >
            Update Faq
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default UpdateFaq;
