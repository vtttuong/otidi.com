import { Box, BoxContent, BoxTitle, BoxTitleWrapper } from "components/Box/Box";
import Chart from "components/Charts/Chart";
import React from "react";

const RadialBarChart = ({
  widgetTitle,
  series,
  colors,
  labels,
  helperText,
}: any) => {
  const options = {
    series: series,
    options: {
      chart: {
        height: 300,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: colors,
      labels: labels,
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 1,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  return (
    <Box>
      <BoxTitleWrapper>
        <BoxTitle title={widgetTitle} />
      </BoxTitleWrapper>

      <BoxContent
        className={"radialBar-apexcharts"}
        style={{ display: "block" }}
      >
        <Chart
          options={options.options}
          series={options.series}
          type="radialBar"
          width="100%"
        />
      </BoxContent>
    </Box>
  );
};

export default RadialBarChart;
