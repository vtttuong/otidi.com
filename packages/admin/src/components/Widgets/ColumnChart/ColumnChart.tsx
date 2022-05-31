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
const BarChart = ({
  widgetTitle,
  series,
  colors,
  prefix,
  totalValue,
  text,
  position,
  percentage,
  categories,
}: any) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "65%",
          endingShape: "flat",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      // responsive: [
      //   {
      //     breakpoint: 720,
      //     options: {
      //       plotOptions: {
      //         bar: {
      //           horizontal: true
      //         }
      //       }
      //     }
      //   }
      // ],
      grid: {
        borderColor: "#F7F7F7",
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
        categories: categories,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: "#161F6A",
            fontSize: "14px",
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: "Total",
        data: series,
      },
    ],
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
              {prefix || "Total: "}
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
          type="bar"
        />
      </BoxContent>
    </Box>
  );
};

export default BarChart;
