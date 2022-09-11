import GoogleMapAutocomplete from "components/googleMap-autocomplete";
import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import { PostFormContext } from "contexts/post-form/post-form.context";

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues: any;
  handleSubmitForm?: any;
}

const QuickForm = (props: ComponentProps) => {
  const { state, dispatch } = useContext(PostFormContext);
  const { style, className, children, initialValues, handleSubmitForm } = props;
  const defaultCenter = { lat: state.latitude, lng: state.longitude };

  const defaultOptions = { scrollwheel: true };
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  const mapEnvironment = compose(
    withProps({
      googleMapURL,
      loadingElement: <div style={{ height: "100%" }} />,
      containerElement: <div style={{ height: "280px", width: "100%" }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  );

  const MapLayout = (props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
    >
      <Marker position={defaultCenter} />
    </GoogleMap>
  );

  const MapComponent = mapEnvironment(MapLayout);

  /*
   * Validation
   */
  const schema = yup.object({
    pickupAddress: yup.array().notRequired(),
    pickupAddressText: yup.string().required("VALIDATE_REQUIRED"),
  });

  const handleChangePlace = async (
    data: any,
    field: string,
    setFieldValue: any
  ) => {
    setFieldValue(field, data?.formatted_address, false);
    if (field === "pickupAddressText") {
      setFieldValue(
        "pickupAddress",
        [data.geometry?.location?.lat(), data.geometry?.location?.lng()],
        false
      );
    }
    data?.address_components.map((value: any) => {
      if (value.types[0] === "administrative_area_level_1") {
        setFieldValue("pickupCity", value.short_name, false);
      }
    });
    let lat = await data.geometry.location.lat();
    let long = await data.geometry.location.lng();
    let address = await data.formatted_address;

    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: address, field: "address" },
    });
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: lat, field: "latitude" },
    });
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: long, field: "longitude" },
    });
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          setFieldValue,
        }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-order form-quick-order ${
              className ? className : ""
            }`}
            style={style}
          >
            <Form.Row className="service-type">
              <Container fluid style={{ padding: 0 }}>
                <Row>
                  <Form.Group
                    as={Col}
                    xs="12"
                    controlId="pickupAddressText"
                    className="pickupAddressText"
                  >
                    <GoogleMapAutocomplete
                      handleChangePlace={handleChangePlace}
                      field="pickupAddressText"
                      setFieldValue={setFieldValue}
                      componentId="pickupAddressText3"
                      defaultValue={state.address ? state.address : ""}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.pickupAddressText}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Container>
            </Form.Row>

            <Row style={{ margin: "-4px" }}>
              <MapComponent />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(QuickForm);
