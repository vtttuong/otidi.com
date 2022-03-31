import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { useForm } from "react-hook-form";
import { addCategory } from "service/use-category";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";
import "./index.css";

type Props = any;

const AddCategory: React.FC<Props> = (props) => {
  const data = useDrawerState("data");
  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  var pId = null;
  const onChange = (currentNode) => {
    pId = currentNode.id;
  };

  const onSubmit = async (data) => {
    let Pid = pId;
    setLoading(true);

    const newCategory = {
      title_en: data.title_en,
      title_vi: data.title_vi,
      icon: data.icon,
      parent_id: Pid,
    };

    dispatch({
      type: "SAVE_CREATED_CATEGORY",
      data: newCategory,
    });

    const datas = await addCategory(newCategory);
    if (datas.error) {
      const result = datas.error;
      const keys = Object.values(result);
      keys.map((i) => alert.error(i));
    } else {
      dispatch({
        type: "SAVE_ID",
        data: 2,
      });
      closeDrawer();
      alert.success("Add category successfully");
    }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Category</DrawerTitle>
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
                Add your category description and necessary informations from
                here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Parent Name</FormLabel>{" "}
                  <DropdownTreeSelect
                    data={data}
                    onChange={onChange}
                    keepTreeOnSearch={true}
                    showDropdown="always"
                    className="mdl-demo"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Title En</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="title_en"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Title Vi</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="title_vi"
                  />
                </FormFields>
                <FormFields>
                  <FormLabel>Icon</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="icon"
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
            Create Category
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCategory;
