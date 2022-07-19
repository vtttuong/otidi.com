import React, { useState } from "react";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";
import "flag-icon-css/css/flag-icons.min.css";

export function CountryFlag(props) {
  return (
    <span
      className={"flag-icon flag-icon-" + props.code}
      style={{ fontSize: "28px", marginRight: "5px" }}
    />
  );
}

export const CountryFlagSelectOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CountryFlag code={props.value.toLowerCase()} />
        <span style={{ display: "inline-block", marginLeft: "8px" }}>
          {props.label}
        </span>
      </div>
    </components.Option>
  );
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
  const code = (props.hasValue && props.getValue()[0].value) || false;

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      {(code && <CountryFlag code={code.toLowerCase()} />) || null}
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    </div>
  );
};

const styles = {
  control: () => ({
    border: "1px solid #f1f1f1",
    borderRadius: 7,
    padding: 6,
    background: "#F7F7F7",

    "&:hover": {
      borderColor: "#009E7F",
    },
  }),

  indicatorsContainer: () => ({
    position: "absolute",
    width: 50,
    height: 50,
    top: 4,
    right: -5,
  }),
};

type Props = {
  onSelectCountry?: any;
  defaultValue?: any;
};
const CountrySelector: React.FC<Props> = ({
  onSelectCountry,
  defaultValue,
}) => {
  const [options, setOptions] = useState(countryList().getData());
  const [value, setValue] = useState(defaultValue);

  const changeHandler = (value) => {
    setValue(value);
    onSelectCountry(value);
  };

  return (
    <Select
      styles={styles}
      options={options}
      value={value}
      onChange={changeHandler}
      components={{
        Option: CountryFlagSelectOption,
        ValueContainer: CountryFlagValueContainer,
      }}
    />
  );
};

export default CountrySelector;
