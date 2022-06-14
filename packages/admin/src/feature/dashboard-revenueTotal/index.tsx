import {CoinIcon} from "assets/icons/CoinIcon";
import {DeliveryIcon} from "assets/icons/DeliveryIcon";
import {UserIcon} from "assets/icons/UserIcon";
import {styled, useStyletron, withStyle} from "baseui";
import {Col as Column, Row} from "components/FlexBox/FlexBox";
import StickerCard from "components/Widgets/StickerCard/StickerCard";
import React from "react";

const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";
const ImageWrapper = styled("div", ({$theme}) => ({
  width: "38px",
  height: "38px",
  overflow: "hidden",
  display: "inline-block",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  borderBottomLeftRadius: "20px",
  backgroundColor: $theme.colors.backgroundF7,
}));

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 574px)": {
    marginBottom: "30px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const RevenueTotal = () => {
  const [css] = useStyletron();
  const mb30 = css({
    "@media only screen and (max-width: 990px)": {
      marginBottom: "16px",
    },
  });
  return (
    <Row>
      <Col lg={3} sm={6} xs={12} className={mb30}>
        <StickerCard
          title="Total Revenue"
          subtitle="(Last 30 Days)"
          icon={<CoinIcon />}
          price="$711.66"
          indicator="up"
          indicatorText="Revenue up"
          note="(previous 30 days)"
          // link="#"
          // linkText="Full Details"
        />
      </Col>
      <Col lg={3} sm={6} xs={12} className={mb30}>
        <StickerCard
          title="Money spent"
          subtitle="(Last 30 Days)"
          icon={<CoinIcon />}
          price="88,568"
          indicator="up"
          indicatorText="Order down"
          note="(previous 30 days)"
          // link="#"
          // linkText="Full Details"
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title="New Customer"
          subtitle="(Last 30 Days)"
          icon={<UserIcon />}
          price="5,678"
          indicator="up"
          indicatorText="Customer up"
          note="(previous 30 days)"
          // link="#"
          // linkText="Full Details"
        />
      </Col>
      <Col lg={3} sm={6} xs={12}>
        <StickerCard
          title="Total Post"
          subtitle="(Last 30 Days)"
          icon={<DeliveryIcon />}
          price="7.800"
          indicator="up"
          indicatorText="Posts up"
          note="(previous 30 days)"
          // link="#"
          // linkText="Full Details"
        />
      </Col>
    </Row>
  );
};

export default RevenueTotal;
