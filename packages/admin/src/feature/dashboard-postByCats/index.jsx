import { withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import MixedColumnChart from "components/Widgets/ColumnChart/MixedColumnChart";
import React, { useState, useEffect } from "react";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { getPostStatisticsDailyByCategory } from "service/use-statistics";
import { InLineLoader } from "components/InlineLoader/InlineLoader";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const PostByCats = () => {
  let from = new Date();
  from.setDate(from.getDate() - 6);

  let month = from.getMonth() + 1,
    year = from.getFullYear();

  let firstDay = new Date(year, month - 2, 1);
  let lastDay = new Date(year, month - 1, 0);

  const [dateRange, setDateRange] = useState([firstDay, lastDay]);
  const [postCountRange, setPostCountRange] = useState([]);
  const [categories, setCategories] = useState([]);
  const [viewRange, setViewRange] = useState([]);
  const onChange = (value) => {
    setDateRange(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (dateRange == null) {
        return;
      }

      const data = await getPostStatisticsDailyByCategory(
        moment(dateRange[0]).format("YYYY-MM-DD"),
        moment(dateRange[1]).format("YYYY-MM-DD")
      );

      setCategories(data.map((item) => item.title));
      setPostCountRange(
        data.map((item) =>
          item.posts_count !== undefined ? item.posts_count : 0
        )
      );
      setViewRange(
        data.map((item) =>
          item.total_view !== undefined ? item.total_view : 0
        )
      );
    };
    fetchData();
  }, [dateRange]);

  if (categories.length === 0) {
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
      <Col md={12} lg={12} className="style-select-absolute">
        <Col className="style-select-absolute-child2 select-cats">
          <div>
            <DateRangePicker onChange={onChange} value={dateRange} />
          </div>
        </Col>

        <MixedColumnChart
          widgetTitle={"Posts Statistics"}
          colors={["#03D3B5"]}
          series={[postCountRange, viewRange]}
          textCol={["Total Post", "Total views"]}
          categories={categories}
        />
      </Col>
    </Row>
  );
};

export default PostByCats;
