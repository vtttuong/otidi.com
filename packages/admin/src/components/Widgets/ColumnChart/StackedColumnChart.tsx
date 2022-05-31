import { ArrowDown } from "assets/icons/ArrowDown";
import { ArrowUp } from "assets/icons/ArrowUp";
import { Box, BoxContent, BoxTitle, BoxTitleWrapper } from "components/Box/Box";
import Chart from "components/Charts/Chart";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import React from "react";
import {
    Content,
    ContentWrapper,
    LabelText,
    SeriesText,
} from "./ColumnChart.style";
const BarChart = ({
    widgetTitle,
    series,
    colors,
    prefix,
    totalValue,
    text,
    position,
    percentage,
    categories,
    textCol,
}: any) => {
    const options = {
        series: [{
            name: textCol[0],
            data: series[0]
        }, {
            name: textCol[1],
            data: series[1]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                },
            },
            xaxis: {
                type: 'string',
                categories: categories,
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        },
    };

    if (series.length === 0) {
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
        <Box>
            <BoxTitleWrapper>
                <ContentWrapper className="header-revenue-year select-cat">
                    <BoxTitle title={widgetTitle} />

                    <Content>
                        <SeriesText>
                            {prefix}
                            {totalValue}
                        </SeriesText>
                        <LabelText>
                            {position === "up" ? (
                                <span style={{ color: "#00C58D" }}>
                                    <ArrowUp />
                                </span>
                            ) : position === "down" ? (
                                <span style={{ color: "#fc4a71" }}>
                                    {" "}
                                    <ArrowDown />
                                </span>
                            ) : (
                                        ""
                                    )}
                            <span style={{ marginLeft: 5 }}>
                                <span style={{ color: "#00C58D" }}>{percentage}</span>
                &nbsp;
                {text}
                            </span>
                        </LabelText>
                    </Content>
                </ContentWrapper>
            </BoxTitleWrapper>

            <BoxContent style={{ display: "block" }}>
                <Chart
                    options={options.options}
                    series={options.series}
                    height="350"
                    width="100%"
                    type="bar"
                />
            </BoxContent>
        </Box>
    );
};

export default BarChart;
