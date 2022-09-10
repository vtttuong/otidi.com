import React, { useContext, useEffect, useState } from "react";
import { PostFormContext } from "contexts/post-form/post-form.context";
import countryList from "react-select-country-list";
import FormWrapper, {
  Col,
  Row,
  CustomStyles,
  Require,
  ButtonCategory,
  Error,
} from "./post-form.style";
import { Label } from "components/forms/label";
import { FormattedMessage } from "react-intl";
import { Input } from "components/forms/input";
import Select from "react-select";
import SelectModel from "features/select-category/select-model";
import { openModal } from "@redq/reuse-modal";
import SelectBrand from "components/drop-op/drop-op";
import { SelectCat } from "assets/icons/SelectCat";
import CountrySelector from "./select-country";
import {
  fuelOptions,
  gearOptions,
  originOptions,
  statusOptions,
} from "./options";
import { numberWithCommas } from "utils/formatNumber";

const CarAdditionalInfo = ({ brands }) => {
  const { state, dispatch } = useContext(PostFormContext);
  const [first, setFirst] = useState(true);
  const [models, setModels] = useState(
    brands?.filter((item) => item.id === state.brandId)[0]?.brand_models
  );

  useEffect(() => {
    if (!first) {
      dispatch({
        type: "HANDLE_ON_SELECT_CHANGE",
        payload: { value: null, field: "modelName" },
      });

      dispatch({
        type: "HANDLE_ON_SELECT_CHANGE",
        payload: { value: 0, field: "modelId" },
      });

      setModels(
        brands?.filter((item) => item.id === state.brandId)[0]?.brand_models
      );
    }
    setFirst(false);
  }, [state.brandId]);

  const currentYear = new Date().getFullYear();
  const yearOptions = [];

  for (let i = currentYear; i >= 2000; i--) {
    yearOptions.push({
      value: i,
      label: i,
    });
  }

  return (
    <div>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="brand" defaultMessage="Select Brand" />
            <Require>*</Require>
          </Label>
          <SelectBrand
            options={brands.map((b) => ({
              key: b.id,
              value: b.id,
              label: b.name,
            }))}
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="model" defaultMessage="Select Model" />
            <Require>*</Require>
          </Label>

          <ButtonCategory
            className={"button-select-category"}
            onClick={() => {
              if (state.brandId !== undefined) {
                openModal({
                  show: true,
                  overlayClassName: "quick-view-overlay",
                  closeOnClickOutside: true,
                  component: SelectModel,
                  closeComponent: "",
                  config: {
                    enableResizing: false,
                    disableDragging: true,
                    className: "quick-view-modal",
                    width: "320px",
                    height: "auto",
                  },
                  componentProps: { brands: brands },
                });
              }
            }}
          >
            {state.modelId ? (
              models.filter((m) => m.id == state.modelId)[0].name
            ) : (
              <SelectCat />
            )}
            {!state.modelId || state.modelId === "" || state.modelId === 0 ? (
              <Error>
                <FormattedMessage id={"errorModel"} />
              </Error>
            ) : null}
          </ButtonCategory>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="fuel" />
          </Label>
          <Select
            classNamePrefix="filter"
            styles={CustomStyles}
            options={fuelOptions}
            defaultValue={fuelOptions[0]}
            value={
              fuelOptions.filter(
                (opt) => opt.value === state.additionalInfo.fuel
              )[0]
            }
            onChange={(data) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: { value: data.value, field: "fuel" },
              });
            }}
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="gear" />
          </Label>
          <Select
            classNamePrefix="filter"
            styles={CustomStyles}
            options={gearOptions}
            defaultValue={gearOptions[0]}
            value={
              gearOptions.filter(
                (opt) => opt.value === state.additionalInfo.gear
              )[0]
            }
            onChange={(data) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: { value: data.value, field: "gear" },
              });
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="releasedYear" />
          </Label>
          <Select
            classNamePrefix="filter"
            styles={CustomStyles}
            options={yearOptions}
            defaultValue={yearOptions[0]}
            value={
              yearOptions.filter(
                (opt) => opt.value === state.additionalInfo.released_year
              )[0]
            }
            onChange={(data) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: { value: data.value, field: "released_year" },
              });
            }}
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="postStatus" defaultMessage={"Post Status"} />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              classNamePrefix="filter"
              styles={CustomStyles}
              options={statusOptions}
              defaultValue={statusOptions[0]}
              value={statusOptions.find(
                (opt) => opt.value === state.additionalInfo.status
              )}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                  payload: { value: data.value, field: "status" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="origin" />
            <Require>*</Require>
          </Label>

          <Select
            classNamePrefix="filter"
            styles={CustomStyles}
            options={originOptions}
            defaultValue={originOptions[0]}
            value={
              originOptions.filter(
                (opt) => opt.value === state.additionalInfo.origin
              )[0]
            }
            onChange={(data) => {
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: { value: data.value, field: "origin" },
              });
            }}
          />
        </Col>

        <Col xs={12} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="kilometersGone" />
            <Require>*</Require>
          </Label>
          <Input
            step="1"
            type="number"
            label="kilometers"
            name="kilometers"
            value={state.additionalInfo.kilometers}
            onChange={(e) => {
              let inputValue = e.target.value.replace(/[^0-9]/g, "");
              if (parseInt(inputValue) > 16000000) {
                inputValue = 16000000;
              }
              dispatch({
                type: "HANDLE_ON_CHANGE_ADDITIONAL_DATA",
                payload: {
                  value: inputValue,
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

const FormAdditional: React.FC<any> = ({ brands }) => {
  return (
    <div style={{ minWidth: "100%" }}>
      <CarAdditionalInfo brands={brands} />
    </div>
  );
};

export default FormAdditional;
