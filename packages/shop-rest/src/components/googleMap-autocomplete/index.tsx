import { observer } from "mobx-react";
import React, { useContext } from "react";
import { PostFormContext } from "../../contexts/post-form/post-form.context";
/// <reference types="@types/googlemaps" />

interface ComponentProps {
  className?: string;
  componentId: string;
  handleChangePlace: any;
  field: string;
  setFieldValue: any;
  defaultValue?: string;
}

const GoogleMapAutocomplete = (props: ComponentProps) => {
  const {
    className,
    componentId,
    handleChangePlace,
    field,
    setFieldValue,
    defaultValue,
  } = props;

  const { state, dispatch } = useContext(PostFormContext);

  const handleChange = (e) => {
    const { value, name } = e.target;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: name },
    });
  };

  React.useEffect(() => {
    const input = document.getElementById(componentId) as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      types: ["address"],
      componentRestrictions: { country: "vn" },
    });
    autocomplete.setFields([
      "address_components",
      "formatted_address",
      "geometry",
    ]);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      handleChangePlace(place, field, setFieldValue);
    });
  }, [componentId, field, handleChangePlace, setFieldValue]);

  return (
    <>
      <div className={`search-location-input ${className ? className : ""}`}>
        <input
          id={componentId}
          placeholder="Enter your location" // Translate
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default observer(GoogleMapAutocomplete);
