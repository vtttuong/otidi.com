import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import LineChart from "components/Widgets/LineChart/LineChart";
import RadialBarChart from "components/Widgets/RadialBarChart/RadialBarChart";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getUserJoinDaily, getUserStage } from "service/use-statistics";

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

const UserPhase = ({ ...props }) => {
  const isMountedRef = useIsMountedRef();

  
  let from = new Date();
  from.setDate(from.getDate() - 6);
  

  const [dayRange, setDayRange] = useState([]);

  let month = from.getMonth() + 1,
    year = from.getFullYear();

  let firstDay = new Date(year, month - 2, 1);
  let lastDay = new Date(year, month - 1, 0);

  const [dateRange, setDateRange] = useState([firstDay, lastDay]);
  const [valueRange, setValueRange] = useState([]);
  const [valueRangeRadial, setValueRangeRadial] = useState([]);

  const onChangeDateRange = (value) => {
    setDateRange(value);
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (dateRange == null) {
      return;
    }
    const fetchData = async () => {
      const data = await getUserJoinDaily(
        moment(dateRange[0]).format("YYYY-MM-DD"),
        moment(dateRange[1]).format("YYYY-MM-DD")
      );
      let vals = [];
      let days = [];

      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        vals.push(item.count);
        days.push(item.date.substr(8, 2) + "-" + item.date.substr(5, 2));
      });

      setValueRange(vals);
      setDayRange(days);
    };

    if (isMountedRef.current) {
      fetchData();
    }
  }, [dateRange, isMountedRef]);

  useEffect(() => {
    isMountedRef.current = true;
    if (dateRange == null) {
      return;
    }
    const fetchData = async () => {
      const data = await getUserStage(
        moment(dateRange[0]).format("YYYY-MM-DD"),
        moment(dateRange[1]).format("YYYY-MM-DD")
      );

      setValueRangeRadial(Object.values(data));
    };

    if (isMountedRef.current) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, isMountedRef]);

  return (
    <Row>
      <Col md={7} lg={8} className="style-select-absolute">
        <LineChart
          widgetTitle="Total user join daily"
          color={["#03D3B5"]}
          categories={dayRange}
          seriesName="Total"
          series={valueRange}
          dateRange={dateRange}
          onChangeDateRange={onChangeDateRange}
        />
      </Col>

      <Col md={5} lg={4} sm={6}>
        <RadialBarChart
          widgetTitle="User stage"
          series={valueRangeRadial}
          colors={["#1ab7ea", "#0084ff", "#39539E"]}
          labels={["Total", "Posted", "Paid"]}
        />
      </Col>
    </Row>
  );
};

export default UserPhase;
