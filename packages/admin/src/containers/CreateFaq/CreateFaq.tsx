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

type Props = any;

const AddFaq: React.FC<Props> = (props) => {
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const [loading, setLoading] = React.useState(false);
  const [valueArea, setValueArea] = React.useState("");
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { register, handleSubmit } = useForm();
  // React.useEffect(() => {
  //   register({name: "category"});
  // }, [register]);

  const onSubmit = async (data) => {
    setLoading(true);
    const newFaq = {
      title: data.title,
      content: valueArea,
    };

    const result = await addFaq(newFaq);

    if (result && result.success) {
      dispatch({
        type: "SAVE_ID",
        data: 1,
      });
      closeDrawer();
      alert.success("Create FAQ successfully");
    } else {
      setLoading(false);
      Object.keys(result.data).forEach((key) => {
        alert.error(result.data[key][0]);
      });
    }
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
                    name="content"
                    inputRef={register({ required: true })}
                    defaultValue=""
                    value={valueArea}
                    onChange={(e) => setValueArea(e.target.value)}
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
            Create Faq
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddFaq;
