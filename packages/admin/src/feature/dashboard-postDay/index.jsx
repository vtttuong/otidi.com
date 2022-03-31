import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import LineChart from "components/Widgets/LineChart/LineChart";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getPostStatisticsDaily } from "service/use-statistics";

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
  const [category, setCategory] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);

  const [valueRange, setValueRange] = useState([]);
  const [dayRange, setDayRange] = useState([]);

  const onChangeDateRange = (value) => {
    setDateRange(value);
  };

  function onChangeCategory({ value }) {
    setCategoryOption(value);
    if (value.length) {
      setCategory(value[0].value);
    } else {
      setCategory("");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (dateRange == null) {
        return;
      }
      const data = await getPostStatisticsDaily(
        category,
        moment(dateRange[0]).format("YYYY-MM-DD"),
        moment(dateRange[1]).format("YYYY-MM-DD")
      );

      let sum = [];
      let days = [];

      // eslint-disable-next-line array-callback-return
      Object.values(data).map((val) => {
        sum.push(val.count);
        days.push(val.date.substr(8, 2) + "-" + val.date.substr(5, 2));
      });

      setValueRange(sum);
      setDayRange(days);
    };
    fetchData();
  }, [dateRange, category]);

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
          categoryOption={categoryOption}
          onChangeCategory={onChangeCategory}
          postStatistics={true}
        />
      </Col>
    </Row>
  );
};

export default PostsDay;
