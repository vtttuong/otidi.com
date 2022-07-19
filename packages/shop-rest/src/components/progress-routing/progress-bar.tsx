import { useNProgress } from "@tanem/react-nprogress";
import { useAppState } from "contexts/app/app.provider";
import React from "react";
import {
  ProgressBarWrapper,
  ProgressBar,
  ProgressMeter,
} from "./progress-bar.style";

const ProgressBox = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <>
      <ProgressBarWrapper isFinished={isFinished}>
        <ProgressBar>
          <ProgressMeter
            style={{
              transition: `all ${animationDuration}ms linear`,
              width: ` ${isFinished ? "0" : progress * 100}%`,
            }}
          />
        </ProgressBar>
      </ProgressBarWrapper>
    </>
  );
};

export default ProgressBox;
