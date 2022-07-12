import { PostFormContext } from "contexts/post-form/post-form.context";
import React, { useContext } from "react";
import Select from "react-select";

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
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
    width: "50px",
    height: "50px",
    top: 4,
    right: -5,
  }),

  menuList: () => ({
    maxHeight: "200px",
    overflow: "auto",
  }),
};

const SelectItem: React.FC<any> = ({ options }) => {
  if (options.length == 0) {
    return <></>;
  }
  const { state, dispatch } = useContext(PostFormContext);

  const defaultItem = {
    key: options[state.indexBrand].key,
    value: options[state.indexBrand].value,
    label: options[state.indexBrand].label,
  };

  const [valueCategory, setValueCategory] = React.useState(defaultItem);

  const handleChange = (data) => {
    const { key, value } = data;
    setValueCategory(data);

    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "brandId" },
    });

    const index = options.findIndex((option) => option.value === value);
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: index, field: "indexBrand" },
    });
  };
  return (
    <div style={{ minWidth: "100%" }}>
      <Select
        instanceId={options[state.indexBrand].value}
        classNamePrefix="filter"
        styles={customStyles}
        options={options}
        onChange={(data) => handleChange(data)}
        defaultValue={defaultItem}
        value={valueCategory}
      />
    </div>
  );
};

export default SelectItem;
