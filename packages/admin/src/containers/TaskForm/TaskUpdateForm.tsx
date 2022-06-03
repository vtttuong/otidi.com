import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { updateTask } from "service/use-tasks";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";

type Props = any;

const EditTask: React.FC<Props> = (props) => {
  const data = useDrawerState("data");
  const [dfDescription, setDescription] = useState(
    data.translate[0].description
  );
  const [defaultName, setName] = useState(data.translate[0].name);
  const [dfExchangePoint, setExchange] = useState(data.exchange_point);
  const [dfMaxExcute, setMaxExcute] = useState(data.max_number_excute);
  const [perUnit, setPerUnit] = useState(data.per_unit);
  const [link, setLink] = useState(data.redirect_link);
  const dispatch = useDrawerDispatch();
  const alert = useAlert();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (dataVc) => {
    setLoading(true);
    await updateTask(data.id, dataVc);
    dispatch({
      type: "SAVE_ID",
      data: 4,
    });
    closeDrawer();
    alert.success("Update success!");
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Edit Task</DrawerTitle>
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
                Edit your Task description and necessary informations from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Task Name</FormLabel>
                  <Input
                    inputRef={register}
                    name="name"
                    value={defaultName}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Task Description</FormLabel>
                  <Input
                    inputRef={register}
                    name="description"
                    value={dfDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Exchange point</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="exchange_point"
                    value={dfExchangePoint}
                    onChange={(e) => setExchange(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Max_number_excute</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="max_number_excute"
                    value={dfMaxExcute}
                    onChange={(e) => setMaxExcute(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel> Per_unit</FormLabel>
                  <Input
                    type="text"
                    inputRef={register({ required: true })}
                    name="per_unit"
                    value={perUnit}
                    onChange={(e) => setPerUnit(e.target.value)}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Redirect_link</FormLabel>
                  <Input
                    type="text"
                    inputRef={register}
                    name="redirect_link"
                    value={link || "/"}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Locale</FormLabel>
                  <Input
                    type="text"
                    inputRef={register}
                    name="locale"
                    value={data.translate[0].locale}
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
            Update task
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default EditTask;