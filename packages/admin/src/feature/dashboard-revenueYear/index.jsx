import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import ColumnChart from "components/Widgets/ColumnChart/ColumnChart";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getRevenueStatisticsByYear } from "service/use-statistics";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const RevenueYear = ({ ...props }) => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });

  const [revenueTotal, setRevenueTotal] = useState([]);
  const [yearOption, setYearOption] = useState([]);
  const [year, setYear] = useState(2020);

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
      const data = await getRevenueStatisticsByYear(year);
      setRevenueTotal(data);
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
          widgetTitle={
            props.type === "post"
              ? "Total Posts (this year )"
              : "Total Revenue (this year )"
          }
          colors={["#03D3B5"]}
          totalValue={parseInt(
            revenueTotal.reduce((a, b) => a + b, 0)
          ).toLocaleString()}
          series={revenueTotal || []}
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

export default RevenueYear;
