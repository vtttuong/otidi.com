import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Refund } from "assets/icons/Refund";
import { Revenue } from "assets/icons/Revenue";
import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import DonutChart from "components/Widgets/DonutChart/DonutChart";
import GraphChart from "components/Widgets/GraphChart/GraphChart";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import "react-tabs/style/react-tabs.css";
import {
  getRevenueStatisticsDaily,
  getRevenueStatisticsLast2Week,
} from "service/use-statistics";

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
  const [revenueLast2Week, setRevenueLast2Week] = useState([100, 100]);
  const onChange = (value) => {
    setDateRange(value);
  };

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
      const dataLast2Week = await getRevenueStatisticsLast2Week();
      setRevenueLast2Week(dataLast2Week);
      let sum = [];
      let days = [];

      // eslint-disable-next-line array-callback-return
      Object.values(data).map((val) => {
        sum.push(val.sum);
        days.push(val.date);
      });

      setValueRange(sum);
      setDayRange(days);
    };

    if (isMountedRef.current) {
      fetchData();
    }
  }, [dateRange, isMountedRef]);

  return (
    <Row>
      <Col md={7} lg={8} className="style-select-absolute">
        <div className="style-select-absolute-child select-year">
          <div>
            <DateRangePicker onChange={onChange} value={dateRange} />
          </div>
        </div>
        <GraphChart
          widgetTitle="Revenue detail this week"
          colors={["#03D3B5"]}
          series={valueRange}
          labels={dayRange}
        />
      </Col>

      <Col md={5} lg={4}>
        <DonutChart
          widgetTitle="Target"
          series={revenueLast2Week}
          labels={["Revenue this week", "Revenue last week"]}
          colors={["#03D3B5", "#666d92"]}
          helperText={["Weekly Targets", "Monthly Targets"]}
          icon={[<Revenue />, <Refund />]}
          prefix="$"
        />
      </Col>
    </Row>
  );
};

export default RevenueDay;
