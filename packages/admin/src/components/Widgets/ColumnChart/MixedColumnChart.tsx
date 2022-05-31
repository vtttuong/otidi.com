import { ArrowDown } from "assets/icons/ArrowDown";
import { ArrowUp } from "assets/icons/ArrowUp";
import { Box, BoxContent, BoxTitle, BoxTitleWrapper } from "components/Box/Box";
import Chart from "components/Charts/Chart";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import React from "react";
import {
  Content,
  ContentWrapper,
  LabelText,
  SeriesText,
} from "./ColumnChart.style";
const MixChart = ({
  widgetTitle,
  series,
  colors,
  prefix,
  totalValue,
  text,
  position,
  percentage,
  categories,
  textCol,
}: any) => {
  const options = {
    series: [
      {
        name: textCol[0],
        type: "column",
        data: series[0],
      },
      {
        name: textCol[1],
        type: "line",
        data: series[1],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: [0, 2],
      },
      title: {
        text: "Posts Statictis",
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: categories,
      xaxis: {
        type: "string",
      },
      yaxis: [
        {
          title: {
            text: textCol[0],
          },
        },
        {
          opposite: true,
          title: {
            text: textCol[1],
          },
        },
      ],
    },
  };

  if (series.length === 0) {
    return (
      <div className="box-relative-no">
        <div className="load-wrapp">
          <div className="load-1">
            <InLineLoader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Box>
      <BoxTitleWrapper>
        <ContentWrapper className="header-revenue-year select-cat">
          <BoxTitle title={widgetTitle} />

          <Content>
            <SeriesText>
              {prefix}
              {totalValue}
            </SeriesText>
            <LabelText>
              {position === "up" ? (
                <span style={{ color: "#00C58D" }}>
                  <ArrowUp />
                </span>
              ) : position === "down" ? (
                <span style={{ color: "#fc4a71" }}>
                  {" "}
                  <ArrowDown />
                </span>
              ) : (
                ""
              )}
              <span style={{ marginLeft: 5 }}>
                <span style={{ color: "#00C58D" }}>{percentage}</span>
                &nbsp;
                {text}
              </span>
            </LabelText>
          </Content>
        </ContentWrapper>
      </BoxTitleWrapper>

      <BoxContent style={{ display: "block" }}>
        <Chart
          options={options.options}
          series={options.series}
          height="350"
          width="100%"
          type="line"
        />
      </BoxContent>
    </Box>
  );
};

export default MixChart;
