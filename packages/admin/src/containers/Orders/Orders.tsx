import React, { useState, useEffect } from "react";
import { styled, withStyle, createThemedUseStyletron } from "baseui";
import dayjs from "dayjs";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import Input from "components/Input/Input";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import usePayments from "service/use-payment";
import NoResult from "components/NoResult/NoResult";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
} from "./Orders.style";

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const Status = styled("div", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textDark,
  display: "flex",
  alignItems: "center",
  lineHeight: "1",
  textTransform: "capitalize",

  ":before": {
    content: '""',
    width: "10px",
    height: "10px",
    display: "inline-block",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    backgroundColor: $theme.borders.borderE6,
    marginRight: "10px",
  },
}));

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}));

const statusSelectOptions = [
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
];
const limitSelectOptions = [
  { value: 7, label: "Last 7 orders" },
  { value: 15, label: "Last 15 orders" },
  { value: 30, label: "Last 30 orders" },
];

export default function Orders() {
  const [useCss, theme] = themedUseStyletron();
  const success = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const failed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const [statusOptions, setStatusOptions] = useState([]);
  const [dayAgoOptions, setDayAgoOptions] = useState([]);

  const [status, setStatus] = useState("");
  const [dayAgo, setDayAgo] = useState(30);
  const [search, setSearch] = useState("");

  const { data } = usePayments({
    limit: 50,
    status: status,
    dayAgo: dayAgo,
    text: search ? search : "",
  });

  useEffect(() => {}, [status, dayAgo]);

  function handleStatus({ value }) {
    setStatusOptions(value);
    if (value.length) {
      setStatus(value[0].value);
    } else {
      setStatus("");
    }
  }

  function handleLimit({ value }) {
    setDayAgoOptions(value);
    if (value.length) {
      setDayAgo(value[0].value);
    } else {
      setDayAgo(value);
    }
  }
  function handleSearch(event) {
    const { value } = event.currentTarget;
    setSearch(value);
    // refetch({ searchText: value });
  }

  const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";

  const ImageWrapper = styled("div", ({ $theme }) => ({
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

  const Image = styled("img", () => ({
    width: "100%",
    height: "auto",
  }));
  console.log(data);
  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
            }}
          >
            <Col md={3} xs={12}>
              <Heading>Payments</Heading>
            </Col>

            <Col md={9} xs={12}>
              <Row>
                <Col md={3} xs={12}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={statusOptions}
                    searchable={false}
                    onChange={handleStatus}
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Select
                    options={limitSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={dayAgoOptions}
                    placeholder="Limits"
                    searchable={false}
                    onChange={handleLimit}
                  />
                </Col>

                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By User"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Customer Name</StyledHeadCell>
                <StyledHeadCell>Time</StyledHeadCell>
                <StyledHeadCell>Delivery Address</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>Payment Method</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Message</StyledHeadCell>

                {data ? (
                  data.length !== 0 ? (
                    data.map((item) => (
                      <React.Fragment key={item.id}>
                        <StyledCell>{item.id}</StyledCell>
                        <StyledCell>
                          <ImageWrapper>
                            <Image
                              src={urlServer + item.user?.avatar_url}
                              alt={"avatar"}
                            />
                          </ImageWrapper>
                        </StyledCell>
                        <StyledCell>{item.user.name}</StyledCell>
                        <StyledCell>
                          {dayjs(item.created_at).format("DD MMM YYYY")}
                        </StyledCell>
                        <StyledCell>{item.order_info}</StyledCell>
                        <StyledCell>{item.amount}</StyledCell>
                        <StyledCell>{item.amount}</StyledCell>
                        <StyledCell>{item.order_info}</StyledCell>
                        <StyledCell style={{ justifyContent: "center" }}>
                          <Status
                            className={item.error_code === 0 ? success : failed}
                          >
                            {item.error_code === 0 ? "Success" : "Failed"}
                          </Status>
                        </StyledCell>
                        <StyledCell>
                          {item.message || "Error connect"}
                        </StyledCell>
                      </React.Fragment>
                    ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: "1",
                        gridColumnEnd: "one",
                      }}
                    />
                  )
                ) : (
                  <div className="box-relative-no">
                    <div className="load-wrapp">
                      <div className="load-1">
                        <InLineLoader />
                      </div>
                    </div>
                  </div>
                )}
              </StyledTable>
            </TableWrapper>
          </Wrapper>
        </Col>
      </Row>
    </Grid>
  );
}
