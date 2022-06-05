import {CloseIcon} from "assets/icons/CloseIcon";
import Button, {KIND} from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import {Col, Row} from "components/FlexBox/FlexBox";
import {FormFields, FormLabel} from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import {useDrawerDispatch, useDrawerState} from "context/DrawerContext";
import {isLoaded} from "google-maps";
import React, {useCallback, useEffect, useState} from "react";
import {useAlert} from "react-alert";
import {Scrollbars} from "react-custom-scrollbars";
import {useForm} from "react-hook-form";
import {addBrand, updateBrand} from "service/use-brands";

import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
  ModelsWrapper,
  ModelInputWrapper,
  CloseIconWrapper,
} from "../DrawerItems/DrawerItems.style";
import "./index.css";

type Props = any;

//model: {id: 1, name: 'LX 600', brand_id: 1, deleted_at: null, created_at: '2022-06-01T22:02:48+07:00', …}

const AddBrand: React.FC<Props> = (props) => {
  const data = useDrawerState("data");

  const alert = useAlert();
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
    dispatch,
  ]);
  const {register, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState(
    data && data["brand_models"]
      ? data["brand_models"].map((model) => ({
          id: model.id,
          name: model.name,
        }))
      : []
  );
  const [name, setName] = useState(data && data["name"] ? data["name"] : "");

  const handleAddModelInput = () => {
    if (
      models.length === 0 ||
      Object.keys(models[models.length - 1]).length !== 0
    ) {
      setModels((prev) => [...prev, {}]);
    }
  };

  const handleRemoveModel = (index) => {
    setModels((prev) => prev.filter((item, idx) => idx !== index));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleAddModel = (event, index) => {
    const value = event.target.value;

    setModels((prev) => {
      const existsModel = models[index];
      let newModels = [...prev];
      newModels[index] = {...existsModel, name: value};
      return newModels;
    });
  };

  const onSubmit = async (formData) => {
    setLoading(true);

    const brand = {
      ...data,
      name: formData.name,
      logo: formData.logo,
      models: models,
    };
    const datas = brand.id ? await updateBrand(brand) : await addBrand(brand);

    if (!datas.success) {
      const result = datas.error;
      const keys = Object.values(result);
      keys.map((i) => alert.error(i));
    } else {
      dispatch({
        type: "SAVE_SAVED_BRAND",
        data: brand,
      });
      dispatch({
        type: "SAVE_ID",
        data: datas.data.id,
      });
      closeDrawer();
      alert.success("Save brand successfully");
    }
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Brand</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{height: "100%"}}>
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
              <FieldDetails>
                Add your brand information and its model(s) from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Brand Name</FormLabel>
                  <Input
                    onChange={handleNameChange}
                    inputRef={register({required: true, maxLength: 20})}
                    name="name"
                    value={name}
                  />
                </FormFields>
                {!data && (
                  <FormFields>
                    <FormLabel>Logo</FormLabel>
                    <Input
                      type="file"
                      inputRef={register({required: true})}
                      name="logo"
                    />
                  </FormFields>
                )}
                <ModelsWrapper>
                  {models.map((model, i) => (
                    <ModelInputWrapper key={i}>
                      <FormFields>
                        <FormLabel>{`Model ${i + 1}`}</FormLabel>
                        <Input
                          inputRef={register({required: true, maxLength: 20})}
                          onChange={(e) => handleAddModel(e, i)}
                          name="model"
                          value={
                            Object.keys(model).length !== 0 ? model.name : ""
                          }
                        />
                      </FormFields>
                      <CloseIconWrapper onClick={() => handleRemoveModel(i)}>
                        <CloseIcon width="10px" height="10px"></CloseIcon>
                      </CloseIconWrapper>
                    </ModelInputWrapper>
                  ))}
                </ModelsWrapper>

                <Button
                  disabled={loading}
                  type="button"
                  onClick={handleAddModelInput}
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
                  Add model
                </Button>
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
            type="submit"
            isLoading={loading}
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
            Save brand
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddBrand;
