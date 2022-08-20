import { Refund } from "assets/icons/Refund";
import { Revenue } from "assets/icons/Revenue";
import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import DonutChart from "components/Widgets/DonutChart/DonutChart";
import GraphChart from "components/Widgets/GraphChart/GraphChart";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "react-tabs/style/react-tabs.css";
import {
  getRevenueStatisticsByType,
  getRevenueStatisticsDaily,
} from "service/use-statistics";
import { Select } from "baseui/select";
import timeOptions from "feature/time-options";
import LineChart from "components/Widgets/LineChart/LineChart";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

const RevenueDay = () => {
  const isMountedRef = useIsMountedRef();

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
    isMountedRef.current = true;

    if (dateRange == null) {
      return;
    }

    const fetchData = async () => {
      const data = await getRevenueStatisticsDaily(
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

    if (isMountedRef.current) {
      fetchData();
    }
  }, [dateRange, isMountedRef]);


  useEffect(() => {
    isMountedRef.current = true;

    if (time == null) {
      return;
    }
    const fetchData = async () => {

      const data = await getRevenueStatisticsByType(time);

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

    if (isMountedRef.current) {
      fetchData();
    }
  }, [isMountedRef, time]);

  return (
    <Row>
      <Col md={12} lg={12} sm={12}>
        <LineChart
          widgetTitle="Revenue detail"
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

    /* <Col md={5} lg={4}>
      <DonutChart
        widgetTitle="Target"
        series={revenueLast2Week}
        labels={["Revenue this week", "Revenue last week"]}
        colors={["#03D3B5", "#666d92"]}
        helperText={["Weekly Targets", "Monthly Targets"]}
        icon={[<Revenue />, <Refund />]}
        prefix="$"
      />
    </Col> */
    // </Row>
  );
};

export default RevenueDay;
