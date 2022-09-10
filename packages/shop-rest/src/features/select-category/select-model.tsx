import { closeModal } from "@redq/reuse-modal";
import { Cooking } from "assets/icons/Cooking";
import { MenuDown } from "assets/icons/MenuDown";
import { PostFormContext } from "contexts/post-form/post-form.context";
import React, { useContext, useEffect, useState } from "react";
import * as Icons from "assets/icons/category-icons";
import { Category, ContainerCategory, ParentIcon } from "./select-model.style";

type SelectModel = {
  brands?: any[];
};

const SelectModel: React.FC<SelectModel> = ({ brands }) => {
  const { state, dispatch } = useContext(PostFormContext);
  var models = [];

  if (state.brandId) {
    models = brands?.filter((item) => item.id === state.brandId)[0]
      ?.brand_models;
  }

  function onLick(model) {
    let value = model.name;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "modelName" },
    });

    value = model.id;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "modelId" },
    });

    closeModal();
  }

  return (
    <>
      <ContainerCategory>
        {models &&
          models.map(function catelog(model) {
            const Icon = Icons[model.icon] || Icons["OtherVehicle"];
            return (
              <div key={model.id} className={"hasIcon"}>
                <Icon />
                <Category
                  key={model.id}
                  className={
                    state.modelId === model.id && state.modelName === model.name
                      ? "active"
                      : null
                  }
                  onClick={() => onLick(model)}
                >
                  {model.name}
                </Category>
              </div>
            );
          })}
      </ContainerCategory>
    </>
  );
};

export default SelectModel;
