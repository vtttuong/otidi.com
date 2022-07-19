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
import { getMyText } from "utils/api/profile";
import { AuthContext } from "contexts/auth/auth.context";
import { getCookie } from "utils/session";
import ShowHistory from "components/show-history-keywords/showhistory";
const CategoryIconNav = dynamic(() => import("components/type-nav/type-nav"));
const SpringModal = dynamic(
  () => import("components/spring-modal/spring-modal")
);

interface Props {
  intlTitleId: string;
}

export const MobileBanner: React.FC<Props> = ({ intlTitleId }) => {
  const [isOpen, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [isShowHistory, setIsShowHistory] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [texts, setTexts] = React.useState([]);

  const dispatch = useAppDispatch();
  const {
    authState: { isAuthenticated },
  } = React.useContext<any>(AuthContext);

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

  useEffect(() => {
    // Always do navigations after the first render
    getSearchText();
  }, [isAuthenticated, update]);

  const getSearchText = async () => {
    const token = getCookie("access_token");

    if (token != null) {
      const text = await getMyText(token);
      setTexts(text);
    }
  };

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
            "OKEE"
          </Button> */}
        </ContentRow>

        <SearchWrapper ref={ref}>
          <Search
            minimal={true}
            className="headerSearch"
            onClick={() => setIsComponentVisible(true)}
          />
          {isComponentVisible && (
            <ShowHistory
              texts={texts}
              closeSearch={() => setOpen(false)}
              isAuthenticated={isAuthenticated}
              getSearchText={getSearchText}
            />
          )}
        </SearchWrapper>
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
      {/* <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        <CategoryIconNav />
      </SpringModal> */}
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
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
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
