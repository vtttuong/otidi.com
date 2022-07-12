import React, { useContext } from "react";
import { PostFormContext } from "contexts/post-form/post-form.context";
import FormWrapper, { Col, Row, CustomStyles } from "./post-form.style";
import { Label } from "components/forms/label";
import { FormattedMessage } from "react-intl";
import { Input } from "components/forms/input";
import Select from "react-select";
import { postStatus } from "features/post-form/post-form-update";

const CategoryIdEnum = {
  CAR: "car",
  MOTORCYCLE: "motorcycle",
  BIKE: "bike",
  ELECTRIC_MOTORCYCLE: "electric-motorcycle",
  VEHICLE_OTHERS: "vehicle_others",
  REFRIGERATOR: "refrigerator",
  WASHING_MACHINE: "washing-machine",
  AIR_CONDITIONAL: "air-conditional",
  SMART_PHONE: "smart-phone",
  TABLET: "tablet",
  LAPTOP: "laptop",
  DESKTOP_COMPUTER: "desktop-computer",
};

const MotorcycleAdditionalInfo = () => {
  const { state, dispatch } = useContext(PostFormContext);
  return (
    <div>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="automaker" />
          </Label>
          <Input
            type="text"
            label="automaker"
            name="automaker"
            value={
              state.additionalInfo.automaker
                ? state.additionalInfo.automaker
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="vehicles" />
          </Label>
          <Input
            type="text"
            label="Vehicles"
            name="vehicles"
            value={
              state.additionalInfo.vehicles ? state.additionalInfo.vehicles : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="registerAt" />
          </Label>
          <Input
            type="date"
            label="registerAt"
            name="registerAt"
            value={state.additionalInfo.registerAt}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={postStatus}
              defaultValue={postStatus[0]}
              value={postStatus[state.indexOptionStatus]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "postStatus" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionStatus" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="rangeOfVehicle" />
          </Label>
          <Input
            type="text"
            label="rangeOfVehicle"
            name="rangeOfVehicle"
            value={
              state.additionalInfo.rangeOfVehicle
                ? state.additionalInfo.rangeOfVehicle
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="capacity" />
          </Label>
          <Input
            type="text"
            label="Capacity"
            name="capacity"
            value={
              state.additionalInfo.capacity ? state.additionalInfo.capacity : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="kilometersGone" />
          </Label>
          <Input
            type="number"
            label="kilometersGone"
            name="kilometersGone"
            value={
              state.additionalInfo.kilometersGone
                ? state.additionalInfo.kilometersGone
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="isWarranty" defaultMessage={"Warranty"} />
          </Label>
          <Input
            type="text"
            label="Warranty"
            name="isWarranty"
            value={
              state.additionalInfo.isWarranty
                ? state.additionalInfo.isWarranty
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>
    </div>
  );
};

const CarAdditionalInfo = () => {
  const { state, dispatch } = useContext(PostFormContext);
  return (
    <div>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="automaker" />
          </Label>
          <Input
            type="text"
            label="automaker"
            name="automaker"
            value={state.additionalInfo.automaker}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="vehicles" />
          </Label>
          <Input
            type="text"
            label="Vehicles"
            name="vehicles"
            value={state.additionalInfo.vehicles}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="registerAt" />
          </Label>
          <Input
            type="date"
            label="registerAt"
            name="registerAt"
            value={state.additionalInfo.registerAt}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={postStatus}
              defaultValue={postStatus[0]}
              value={postStatus[state.indexOptionStatus]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "postStatus" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionStatus" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="rangeOfVehicle" />
          </Label>
          <Input
            type="text"
            label="rangeOfVehicle"
            name="rangeOfVehicle"
            value={state.additionalInfo.rangeOfVehicle}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="origin" />
          </Label>
          <Input
            type="text"
            label="Origin"
            name="origin"
            value={state.additionalInfo.origin}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="kilometersGone" />
          </Label>
          <Input
            type="number"
            label="kilometersGone"
            name="kilometersGone"
            value={state.additionalInfo.kilometersGone}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="designs" />
          </Label>
          <Input
            type="text"
            label="Designs"
            name="designs"
            value={state.additionalInfo.designs}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="isWarranty" />
          </Label>
          <Input
            type="text"
            label="Warranty"
            name="isWarranty"
            value={state.additionalInfo.isWarranty}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>
    </div>
  );
};

const BikeAdditionalInfo = () => {
  const { state, dispatch } = useContext(PostFormContext);
  return (
    <div>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="Brand" />
          </Label>
          <Input
            type="text"
            label="Brand"
            name="brand"
            value={state.additionalInfo.brand}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="Color" />
          </Label>
          <Input
            type="text"
            label="Color"
            name="color"
            value={state.additionalInfo.color}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="origin" />
          </Label>
          <Input
            type="text"
            label="Origin"
            name="origin"
            value={state.additionalInfo.origin}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={postStatus}
              defaultValue={postStatus[0]}
              value={postStatus[state.indexOptionStatus]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "postStatus" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionStatus" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="dimensions" />
          </Label>
          <Input
            type="text"
            label="dimensions"
            name="dimensions"
            value={state.additionalInfo.dimensions}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="materialOfFrame" />
          </Label>
          <Input
            type="text"
            label="Material"
            name="material"
            value={state.additionalInfo.material}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="isWarranty" />
          </Label>
          <Input
            type="text"
            label="Warranty"
            name="isWarranty"
            value={state.additionalInfo.isWarranty}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>
    </div>
  );
};

const OtherVehicleAdditionalInfo = () => {
  return (
    <div>
      <h1>FashionAdditionalInfo</h1>
    </div>
  );
};

const RefrigeratorAdditionalInfo = () => {
  const { state, dispatch } = useContext(PostFormContext);
  return (
    <div>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="Brand" />
          </Label>
          <Input
            type="text"
            label="Brand"
            name="brand"
            value={state.additionalInfo?.brand}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={postStatus}
              defaultValue={postStatus[0]}
              value={postStatus[state.indexOptionStatus]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "postStatus" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionStatus" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="capacity" />
          </Label>
          <Input
            type="text"
            label="Capacity"
            name="capacity"
            value={
              state.additionalInfo?.capacity
                ? state.additionalInfo?.capacity
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="isWarranty" defaultMessage={"Warranty"} />
          </Label>
          <Input
            type="text"
            label="Warranty"
            name="isWarranty"
            value={
              state.additionalInfo?.isWarranty
                ? state.additionalInfo?.isWarranty
                : ""
            }
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>
    </div>
  );
};

const DefaultAdditionalInfo = () => {
  const { state, dispatch } = useContext(PostFormContext);
  return (
    <div>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="Brand" />
          </Label>
          <Input
            type="text"
            label="Brand"
            name="brand"
            value={state.additionalInfo.brand}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="Color" />
          </Label>
          <Input
            type="text"
            label="Color"
            name="color"
            value={state.additionalInfo.color}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="origin" />
          </Label>
          <Input
            type="text"
            label="Origin"
            name="origin"
            value={state.additionalInfo.origin}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={postStatus}
              defaultValue={postStatus[0]}
              value={postStatus[state.indexOptionStatus]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "postStatus" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionStatus" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="materialOfClothes" />
          </Label>
          <Input
            type="text"
            label="Material"
            name="materialOfClothes"
            value={state.additionalInfo.materialOfClothes}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="isShipping" />
          </Label>
          <Input
            type="text"
            label="isShipping"
            name="isShipping"
            value={state.additionalInfo.isShipping}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: e.target.value,
                  field: e.target.name,
                  key: "additionalInfo",
                },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>
    </div>
  );
};

const switchRender = (categorySlug) => {
  switch (categorySlug) {
    case CategoryIdEnum.CAR:
      return <CarAdditionalInfo />;
    case CategoryIdEnum.MOTORCYCLE:
      return <MotorcycleAdditionalInfo />;
    case CategoryIdEnum.BIKE:
      return <BikeAdditionalInfo />;
    case CategoryIdEnum.ELECTRIC_MOTORCYCLE:
      return <BikeAdditionalInfo />;
    case CategoryIdEnum.VEHICLE_OTHERS:
      return <OtherVehicleAdditionalInfo />;
    case CategoryIdEnum.REFRIGERATOR:
      return <RefrigeratorAdditionalInfo />;
    default:
      return <DefaultAdditionalInfo />;
  }
};

const FormAdditional: React.FC<any> = ({ categorySlug }) => {
  return <div style={{ minWidth: "100%" }}>{switchRender(categorySlug)}</div>;
};

export default FormAdditional;
