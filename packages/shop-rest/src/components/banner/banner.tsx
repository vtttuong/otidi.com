import React, { useCallback } from "react";
import { Box, Image, Content } from "./banner.style";

import { Waypoint } from "react-waypoint";
import { useAppDispatch } from "contexts/app/app.provider";
import carImage from "assets/images/banner/car.jpg";

export const Banner = () => {
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

  return (
    <Box display={["none", "none", "flex"]}>
      <Image backgroundImage={`url(${carImage})`} />
      <Content>
        {/* <Title>{"ALLO"}</Title>
        <Description>ALLLOO</Description> */}

        {/* {router.query.type !== "vehicle" ? (
          <>
            <Title>{"ALLO"}</Title>
            <Description>ALLLOO</Description>
            <SearchWrapper>
              <Search
                className="banner-search"
                shadow="0 21px 36px rgba(0,0,0,0.05)"
              />
            </SearchWrapper>
          </>
        ) : null} */}
        <Waypoint
          onEnter={removeSticky}
          onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
      </Content>
    </Box>
  );
};
