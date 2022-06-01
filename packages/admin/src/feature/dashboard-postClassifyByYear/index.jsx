import { useStyletron, withStyle } from "baseui";
import { Col as Column, Row } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import ColumnChart from "components/Widgets/ColumnChart/StackedColumnChart";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import { getPostStatisticsByTypeInYear } from "service/use-statistics";

const Col = withStyle(Column, () => ({
    "@media only screen and (max-width: 574px)": {
        marginBottom: "30px",

        ":last-child": {
            marginBottom: 0,
        },
    },
}));

const PostClassifyByYear = ({ ...props }) => {
    const { year } = props;
    const [css] = useStyletron();
    const mb30 = css({
        "@media only screen and (max-width: 990px)": {
            marginBottom: "16px",
        },
    });

    const [sellPost, setSellPost] = useState([]);
    const [buyPost, setBuyPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const sellPost = await getPostStatisticsByTypeInYear(year, 'sell');
            const buyPost = await getPostStatisticsByTypeInYear(year, 'buy');
            setSellPost(sellPost);
            setBuyPost(buyPost);
        };
        fetchData();
    }, [year]);

    if (sellPost.length === 0) {
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
                <ColumnChart
                    widgetTitle={"Classified by type"}
                    colors={["#03D3B5"]}
                    series={[sellPost, buyPost]}
                    textCol={["Sell", "Buy"]}
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

export default PostClassifyByYear;
