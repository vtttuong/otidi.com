import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import ColumnChart from "components/Widgets/ColumnChart/ColumnChart";
import React, { useState, useEffect } from "react";
import { getAdvertiseStatisticsByYear } from "service/use-statistics";
import Select from "components/Select/Select";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const AdvertiseYear = ({ ...props }) => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });

  const [yearOption, setYearOption] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [advertiseTotal, setAdvertiseTotal] = useState([]);

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
      const data = await getAdvertiseStatisticsByYear(year);
      if (isMounted) setAdvertiseTotal(data);
    };
    fetchData();
    return () => (isMounted = false);
  }, [year]);

  const years = [];

  for (let i = 2020; i <= new Date().getFullYear(); i++) {
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
          widgetTitle={`Total Advertise (${
            year === new Date().getFullYear() ? "This year" : year
          })`}
          colors={["#008ffb"]}
          totalValue={parseInt(
            advertiseTotal.reduce((a, b) => a + b, 0)
          ).toLocaleString()}
          series={advertiseTotal}
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

export default AdvertiseYear;
