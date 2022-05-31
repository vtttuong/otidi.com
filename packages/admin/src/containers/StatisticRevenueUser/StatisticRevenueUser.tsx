import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import ColumnChart from "components/Widgets/ColumnChart/ColumnChart";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getRevenueStatisticsByYear } from "service/use-statistics";
import { useDrawerState } from "context/DrawerContext";

const Col = withStyle(Column, () => ({
    "@media only screen and (max-width: 574px)": {
        marginBottom: "30px",

        ":last-child": {
            marginBottom: 0,
        },
    },
}));

const RevenueByUser = ({ ...props }) => {
    const [css] = useStyletron();
    const mb30 = css({
        "@media only screen and (max-width: 990px)": {
            marginBottom: "16px",
        },
    });

    const years = [];

    for (let i = 2010; i <= 2021; i++) {
        years.push({ value: i, label: i.toString() });
    }

    const userId = useDrawerState("data"); console.log(userId);
    const [revenueTotal, setRevenueTotal] = useState([]);
    const [yearOption, setYearOption] = useState([]);
    const [year, setYear] = useState(2020);

    function handleYear({ value }) {
        console.log(year, yearOption);

        setYearOption(value);
        if (value.length === 0) {
            setYear(2020);
        } else {
            setYear(value[0].value);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getRevenueStatisticsByYear(year, userId);
            console.log(data);
            setRevenueTotal(data);
        };
        fetchData();
    }, [userId, year]);


    return (
        <Row
            style={{ marginTop: 20, marginBottom: 20, position: 'relative' }}
            className="style-select-absolute parent"
        >
            <Col md={12} lg={12} className={mb30}>
                <div style={{ zIndex:100, width:100, position: 'absolute', top: 20, right: 20 }} className="style-select-absolute-child revenue-by-user">
                    <Select
                        options={years}
                        labelKey="label"
                        valueKey="value"
                        placeholder="Year"
                        value={yearOption}
                        searchable={false}
                        onChange={handleYear}
                        overrides={{
                            Placeholder: {
                                style: ({ $theme }) => {
                                    return {
                                        ...$theme.typography.fontBold14,
                                        color: $theme.colors.textNormal,
                                    };
                                },
                            },
                            DropdownListItem: {
                                style: ({ $theme }) => {
                                    return {
                                        ...$theme.typography.fontBold14,
                                        color: $theme.colors.textNormal,
                                    };
                                },
                            },
                            Popover: {
                                props: {
                                    overrides: {
                                        Body: {
                                            style: { zIndex: 5 },
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </div>

                <ColumnChart
                    widgetTitle={"Total Amount"}
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

export default RevenueByUser;
