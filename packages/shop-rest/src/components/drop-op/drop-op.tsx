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
    width: 50,
    height: 50,
    top: 4,
    right: -5,
  }),
};

const SelectItem: React.FC<any> = ({ options }) => {
  if (options.length == 0) {
    return;
  }
  const { state, dispatch } = useContext(PostFormContext);
  const defaultItem = {
    key: options[state.indexCategory].key,
    value: options[state.indexCategory].value,
    label: options[state.indexCategory].label,
  };

  const [valueCategory, setValueCategory] = React.useState(defaultItem);

  const handleChange = (data) => {
    const { key, value } = data;
    setValueCategory(data);
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "fieldId" },
    });

    const index = options.findIndex((option) => option.value === value);
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: index, field: "indexCategory" },
    });
  };
  return (
    <div style={{ minWidth: "100%" }}>
      <Select
        instanceId={options[state.indexCategory].value}
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
