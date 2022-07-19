import { closeModal } from "@redq/reuse-modal";
import { Cooking } from "assets/icons/Cooking";
import { MenuDown } from "assets/icons/MenuDown";
import { PostFormContext } from "contexts/post-form/post-form.context";
import React, { useContext, useState } from "react";
import * as Icons from "assets/icons/category-icons";
import {
  Category,
  ContainerCategory,
  ParentIcon,
} from "./select-category.style";

type SelectCategoryProps = {
  fields?: any[];
};

const SelectCategory: React.FC<SelectCategoryProps> = ({ fields }) => {
  const [show, setShow] = useState(1);
  const [isShow, setIsShow] = useState(false);
  const { state, dispatch } = useContext(PostFormContext);
  var categories = [];
  var isError = "Please choose category type";

  if (state.fieldId) {
    categories = fields?.filter((item) => item.id === state.fieldId)[0]
      .children;
    isError = "";
  }

  function onLick(category) {
    setShow(category.id);
    setIsShow(!isShow);

    let value = category.translates[0].title;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "categoryTitle" },
    });

    value = category.id;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "categoryId" },
    });

    value = category.slug;
    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value, field: "categorySlug" },
    });

    if (category.children && category.children.length == 0) {
      closeModal();
    }
  }

  function CatList(category) {
    return (
      <>
        <ContainerCategory className={"getSubCat"}>
          {category.children &&
            typeof category.children !== "undefined" &&
            category.children.map((cat) => (
              <Category
                className={"getSub"}
                key={cat.id}
                onClick={() => onLick(cat)}
              >
                {cat.translates[0].title}
              </Category>
            ))}
          <div>{isError}</div>
        </ContainerCategory>
      </>
    );
  }

  return (
    <>
      <ContainerCategory>
        {categories &&
          categories.map(function catelog(category) {
            const Icon = Icons[category.icon] || Icons["OtherVehicle"];
            return (
              <div key={category.id} className={"hasIcon"}>
                <Icon />
                <Category
                  key={category.id}
                  className={isShow && show == category.id ? "active" : null}
                  onClick={() => onLick(category)}
                >
                  {category.translates[0].title}
                  {typeof category.children !== "undefined" &&
                  category.children.length > 0 ? (
                    <ParentIcon>
                      <MenuDown />
                    </ParentIcon>
                  ) : null}
                </Category>
                {isShow && show == category.id ? CatList(category) : null}
              </div>
            );
          })}
      </ContainerCategory>
    </>
  );
};

export default SelectCategory;
