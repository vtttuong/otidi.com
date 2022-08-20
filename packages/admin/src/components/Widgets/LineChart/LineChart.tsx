import { Box, BoxContent, BoxTitle, BoxTitleWrapper } from "components/Box/Box";
import Chart from "components/Charts/Chart";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import timeOptions from "feature/time-options";
import { withStyle } from "baseui";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const LineChart = ({
  widgetTitle,
  series,
  color,
  categories,
  seriesName = "",
  dateRange,
  onChangeDateRange,
  timeOption,
  onChangeTimeType,
  postStatistics,
}: any) => {
  const options = {
    options: {
      chart: {
        type: "line",
        dropShadow: {
          enabled: true,
          color: color,
          top: 18,
          left: 0,
          blur: 3.5,
          opacity: 0.15,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 7,
        curve: "smooth",
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          width: 5,
          tickWidth: 0,
          position: "back",
          opacity: 1,
          stroke: {
            color: "#b6b6b6",
            width: 0,
            dashArray: 0,
          },
          fill: {
            type: "solid",
            color: "#F2F3FC",
          },
        },
        tooltip: {
          enabled: false,
        },
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
      grid: {
        borderColor: "#F7F7F7",
      },
      colors: color,
      markers: {
        size: 0,
        opacity: 1,
        colors: color,
        strokeColor: "#fff",
        strokeWidth: 4,
        hover: {
          size: 8,
        },
      },
    },
    series: [
      {
        name: seriesName,
        data: series,
      },
    ],
  };

  // const categorySelectOptions = [
  //   { value: "vehicle", label: "Vehicle" },
  //   { value: "electronic", label: "Electronic" },
  //   { value: "technology", label: "Technology" },
  //   { value: "fashion", label: "Fashion" },
  //   { value: "furniture", label: "Furniture" },
  //   { value: "sport_relax", label: "Sport & relax" },
  //   { value: "office", label: "Office" },
  //   { value: "others", label: "Others" },
  // ];

  return (
    <Box>
      <BoxTitleWrapper>
        <Row>
          <Col xs={12} md={4}>
            <BoxTitle title={widgetTitle} />
          </Col>

          {postStatistics ? (
            <Col xs={12} md={3}>
              <Select
                options={timeOptions}
                labelKey="label"
                valueKey="value"
                placeholder="Time"
                value={timeOption}
                searchable={false}
                onChange={onChangeTimeType}
              />
            </Col>
          ) : null}

          <Col xs={12} md={3} className="select-year">
            <div>
              <DateRangePicker onChange={onChangeDateRange} value={dateRange} />
            </div>
          </Col>
        </Row>
      </BoxTitleWrapper>

      <BoxContent style={{ display: "block" }}>
        <Chart
          type={"area"}
          options={options.options}
          series={options.series}
          height="350"
          width="97%"
        />
      </BoxContent>
    </Box>
  );
};

export default LineChart;
