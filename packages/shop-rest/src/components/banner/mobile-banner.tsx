import React, { useCallback, useState, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import ReactDOM from "react-dom";
import {
  Box,
  Image,
  Content,
  Title,
  ContentRow,
  Description,
  SearchWrapper,
  BtnRemove,
  BoxSave,
  SearchSaveItem,
  SearchSave,
} from "./banner.style";
import dynamic from "next/dynamic";
import { Waypoint } from "react-waypoint";
import { Button } from "components/button/button";
import { useAppDispatch } from "contexts/app/app.provider";
import Search from "features/search/search";
import { Clock } from "assets/icons/Clock";
import { Saved } from "assets/icons/Saved";
const CategoryIconNav = dynamic(() => import("components/type-nav/type-nav"));
const SpringModal = dynamic(
  () => import("components/spring-modal/spring-modal")
);

interface Props {
  intlTitleId: string;
}

export const MobileBanner: React.FC<Props> = ({ intlTitleId }) => {
  const [isOpen, setOpen] = useState(false);
  const [isShowHistory, setIsShowHistory] = React.useState(false);
  const dispatch = useAppDispatch();
  const setSticky = useCallback(() => dispatch({ type: "SET_STICKY" }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: "REMOVE_STICKY" }), [
    dispatch,
  ]);
  const onWaypointPositionChange = ({ currentPosition }) => {
    if (!currentPosition || currentPosition === "above") {
      setSticky();
    }
  };
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  return (
    <Box display={["flex", "flex", "none"]}>
      <Content>
        <ContentRow>
          <Description>
            <FormattedMessage
              id={intlTitleId}
              defaultMessage="Set Your Title Through Language File"
              values={{ minute: 90 }}
            />
          </Description>

          {/* <Button
            variant="text"
            onClick={() => setOpen(true)}
            style={{ textTransform: "capitalize" }}
          >
            {type}
          </Button> */}
        </ContentRow>

        <SearchWrapper>
          <Search
            minimal={true}
            className="headerSearch"
            onClick={() => setIsComponentVisible(true)}
          />
          {isComponentVisible && <ShowHistory intlTitleId={intlTitleId} />}
        </SearchWrapper>
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <CategoryIconNav />
      </SpringModal>
    </Box>
  );
};

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    setIsComponentVisible(false);
  };

  const handleClickOutside = (event) => {
    setIsComponentVisible(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

const ShowHistory: React.FC<Props> = () => {
  let itemSaved = [
    { title: "Maý giặt", id: 1 },
    { title: "Ô tô mitsubishi", id: 2 },
    { title: "Cây gậy tình yêu", id: 3 },
    { title: "Hotel", id: 4 },
    { title: "Iphone 15", id: 5 },
  ];
  return (
    <>
      <BoxSave className={"save"}>
        <SearchSave className={"first"}>
          <BoxSave className={"title saved"}>
            <Saved />
            {"Tin Da luu !"}
            <BtnRemove
              onClick={() => {
                /*todo*/
              }}
            >
              {"Remove"}
            </BtnRemove>
          </BoxSave>
          {itemSaved &&
            itemSaved.map((item) => {
              return (
                <SearchSaveItem key={item.id}>{item.title}</SearchSaveItem>
              );
            })}
        </SearchSave>

        <SearchSave>
          <BoxSave className={"title"}>
            <Clock />
            {"Tim kiem gan day !"}
            <BtnRemove
              onClick={() => {
                /*todo*/
              }}
            >
              {"Remove"}
            </BtnRemove>
          </BoxSave>
          {itemSaved &&
            itemSaved.map((item) => {
              return (
                <SearchSaveItem key={item.id}>{item.title}</SearchSaveItem>
              );
            })}
        </SearchSave>
      </BoxSave>
    </>
  );
};
