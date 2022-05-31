import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import ColumnChart from "components/Widgets/ColumnChart/ColumnChart";
import React, { useState, useEffect } from "react";
import { getUserJoinStatisticsByYear } from "service/use-statistics";
import Select from "components/Select/Select";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const UserYear = ({ ...props }) => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });

  const [yearOption, setYearOption] = useState([]);
  const [year, setYear] = useState(2020);
  const [userTotal, setUserTotal] = useState([]);

  function handleYear({ value }) {
    setYearOption(value);
    if (value.length === 0) {
      setYear(2020);
    } else {
      setYear(value[0].value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserJoinStatisticsByYear(year);
      setUserTotal(data);
    };
    fetchData();
  }, [year]);

  const years = [];

  for (let i = 2010; i <= 2021; i++) {
    years.push({ value: i, label: i.toString() });
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
          widgetTitle="Total Member (this year )"
          colors={["#008ffb"]}
          totalValue={parseInt(
            userTotal.reduce((a, b) => a + b, 0)
          ).toLocaleString()}
          series={userTotal}
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

export default UserYear;
