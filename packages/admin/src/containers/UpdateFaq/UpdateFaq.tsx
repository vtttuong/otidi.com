/* eslint-disable @typescript-eslint/no-unused-vars */
import Button, {KIND} from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import {Col, Row} from "components/FlexBox/FlexBox";
import {FormFields, FormLabel} from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import {Textarea} from "components/Textarea/Textarea";
import {assert} from "console";
import {useDrawerDispatch, useDrawerState} from "context/DrawerContext";
import React, {useCallback} from "react";
import {useAlert} from "react-alert";
import {Scrollbars} from "react-custom-scrollbars";
import {useForm} from "react-hook-form";
import {updateFaq} from "service/use-faqs";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";

type Props = any;

const UpdateFaq: React.FC<Props> = (props) => {
  const alert = useAlert();
  const data = useDrawerState("data");

  const dispatch = useDrawerDispatch();

  const [dfTitle, setTitle] = React.useState(data.title);
  const [loading, setLoading] = React.useState(false);
  const [valueArea, setValueArea] = React.useState(data.content);
  const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
    dispatch,
  ]);

  const {register} = useForm();
  React.useEffect(() => {
    register({name: "category"});
  }, [register]);

  const onSubmit = async () => {
    const newFaq = {
      title: dfTitle,
      content: valueArea,
    };

    const result = await updateFaq(data.id, newFaq);
    if (!result) {
      alert.error("Update FAQ failed");
    } else {
      dispatch({
        type: "SAVE_ID",
        data: 1,
      });
      closeDrawer();
      alert.success("Update FAQ successfully");
    }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle> Edit Faq</DrawerTitle>
      </DrawerTitleWrapper>

      <Form style={{height: "100%"}}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{...props.style, overflowX: "hidden"}} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{display: "none"}}
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
                    inputRef={register({required: true})}
                    name="title"
                    value={dfTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Content</FormLabel>
                  <Textarea
                    type="text"
                    inputRef={register({required: true})}
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
                style: ({$theme}) => ({
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
            isLoading={loading}
            onClick={onSubmit}
            overrides={{
              BaseButton: {
                style: ({$theme}) => ({
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
