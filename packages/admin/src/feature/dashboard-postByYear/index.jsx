import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import Select from "components/Select/Select";
import ColumnChart from "components/Widgets/ColumnChart/MultipleColumnChart";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getPostStatisticsByYear } from "service/use-statistics";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const PostByYear = ({ ...props }) => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });

  const [postTotal, setPostTotal] = useState([]);
  const [postSold, setPostSold] = useState([]);
  const [postPriority, setPostPriority] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  function handleYear({ value }) {
    setYearOption(value);
    if (value.length === 0) {
      setYear(new Date().getFullYear());
    } else {
      setYear(value[0].value);
    }
  }

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const postTotal = await getPostStatisticsByYear(year, 0, 0);
      const postSold = await getPostStatisticsByYear(year, 1, 0);
      const postPriority = await getPostStatisticsByYear(year, 0, 1);
      if (isMounted) {
        setPostTotal(postTotal);
        setPostSold(postSold);
        setPostPriority(postPriority);
      }
    };
    fetchData();
    return () => isMounted = false;
  }, [year]);

  const years = [];

  for (let i = 2020; i <= new Date().getFullYear(); i++) {
    years.push({ value: i, label: i.toString() });
  }

  if (postTotal.length === 0) {
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
    <Row
      style={{ marginTop: 20, marginBottom: 20 }}
      className="style-select-absolute"
    >
      <Col md={12} lg={12} className={mb30}>
        <div className="style-select-absolute-child">
          <Select
            options={years}
            labelKey="label"
            valueKey="value"
            placeholder="Year"
            value={yearOption}
            searchable={false}
            onChange={handleYear}
          />
        </div>

        <ColumnChart
          widgetTitle={`Total Post (${year === new Date().getFullYear() ? "This year" : year})`}
          colors={["#03D3B5"]}
          series={[postTotal, postSold, postPriority]}
          textCol={["Total", "Sold", "Priority"]}
          categories={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
      </Col>
    </Row>
  );
};

export default PostByYear;
