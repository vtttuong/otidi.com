import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import {
  Box,
  Image,
  Content,
  Title,
  Description,
  SearchWrapper,
} from "./banner.style";

import { Waypoint } from "react-waypoint";
import { useAppDispatch } from "contexts/app/app.provider";
import Search from "features/search/search";
import { useRouter } from "next/router";

interface Props {
  imageUrl: string;
  intlTitleId: string;
  intlDescriptionId: string;
}

export const Banner: React.FC<Props> = ({
  imageUrl,
  intlTitleId,
  intlDescriptionId,
}) => {
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
  const router = useRouter();

  return (
    <Box display={["none", "none", "flex"]}>
      <Image backgroundImage={`url(${imageUrl})`} />
      <Content>
        {router.query.type !== "vehicle" ? (
          <>
            <Title>{intlTitleId}</Title>
            <Description>{intlDescriptionId}</Description>
            <SearchWrapper>
              <Search
                className="banner-search"
                shadow="0 21px 36px rgba(0,0,0,0.05)"
              />
            </SearchWrapper>
          </>
        ) : null}
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
    </Box>
  );
};
