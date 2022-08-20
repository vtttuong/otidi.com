import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import LineChart from "components/Widgets/LineChart/LineChart";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getPostStatisticsByTimeType, getPostStatisticsDaily, getRevenueStatisticsDaily } from "service/use-statistics";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const PostsDay = () => {

  let from = new Date();
  from.setDate(from.getDate() - 6);
  const [dateRange, setDateRange] = useState([from, new Date()]);
  const [valueRange, setValueRange] = useState([]);
  const [dayRange, setDayRange] = useState([]);
  // const [revenueLast2Week, setRevenueLast2Week] = useState([100, 100]);
  const [time, setTime] = useState(null);
  const [timeOption, setTimeOption] = useState([]);


  const onChangeDateRange = (value) => {
    setDateRange(value);

    if (value) {
      setTime(null);
      setTimeOption(null);
    }
  };

  function handleTime({ value }) {
    setTimeOption(value);

    if (value.length === 0) {
      setTime(null);
    } else {
      setTime(value[0].value);
      setDateRange(null);
    }
  }

  useEffect(() => {

    if (dateRange == null) {
      return;
    }

    const fetchData = async () => {
      const data = await getPostStatisticsDaily(
        moment(dateRange[0]).format("YYYY-MM-DD"),
        moment(dateRange[1]).format("YYYY-MM-DD")
      );

      let sum = [];
      let days = [];

      // eslint-disable-next-line array-callback-return
      Object.keys(data).map((key) => {
        sum.push(data[key]);
        days.push(key);
      });

      setValueRange(sum);
      setDayRange(days);
    };

    fetchData();
  }, [dateRange]);


  useEffect(() => {
    if (time == null) {
      return;
    }
    const fetchData = async () => {

      const data = await getPostStatisticsByTimeType(time);

      let sum = [];
      let days = [];

      // eslint-disable-next-line array-callback-return
      Object.keys(data).map((key) => {
        sum.push(data[key]);
        days.push(key);
      });

      setValueRange(sum);
      setDayRange(days);
    };

    fetchData();
  }, [time]);

  if (valueRange.length === 0) {
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
    <Row>
      <Col md={12} lg={12} sm={12}>
        <LineChart
          widgetTitle="Total posts by days"
          color={["#03D3B5"]}
          categories={dayRange}
          seriesName="Total"
          series={valueRange}
          dateRange={dateRange}
          onChangeDateRange={onChangeDateRange}
          timeOption={timeOption}
          onChangeTimeType={handleTime}
          postStatistics={true}
        />
      </Col>
    </Row>
  );
};

export default PostsDay;
