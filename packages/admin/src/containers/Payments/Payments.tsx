import React, { useState, useEffect } from "react";
import { withStyle } from "baseui";
import dayjs from "dayjs";
import { Grid, Row as Rows, Col as Column } from "components/FlexBox/FlexBox";
import Select from "components/Select/Select";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import usePayments from "service/use-payment";
import NoResult from "components/NoResult/NoResult";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "react-tabs/style/react-tabs.css";

import {
  TableWrapper,
  StyledTable,
  StyledHeadCell,
  StyledCell,
  DateRangePickerWrapper,
} from "./Payments.style";
import { getUsers } from "service/use-users";
import { numberWithCommas } from "utils/format-number";
import { getVoucher } from "service/use-vouchers";
import Pagination from "components/Pagination/Pagination";

// type CustomThemeT = {red400: string; textNormal: string; colors: any};

// const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

// const Status = styled("div", ({$theme}) => ({
//   ...$theme.typography.fontBold14,
//   color: $theme.colors.textDark,
//   display: "flex",
//   alignItems: "center",
//   lineHeight: "1",
//   textTransform: "capitalize",

//   ":before": {
//     content: '""',
//     width: "10px",
//     height: "10px",
//     display: "inline-block",
//     borderTopLeftRadius: "10px",
//     borderTopRightRadius: "10px",
//     borderBottomRightRadius: "10px",
//     borderBottomLeftRadius: "10px",
//     backgroundColor: $theme.borders.borderE6,
//     marginRight: "10px",
//   },
// }));

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
  { value: "authorized", label: "Authorized" },
  { value: "captured", label: "Captured" },
];

const sortSelectOptions = [
  { value: "asc", label: "Amount ascending" },
  { value: "desc", label: "Amount descending" },
];

export default function Payments() {
  // const [useCss, theme] = themedUseStyletron();
  // const success = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.primary,
  //   },
  // });
  // const failed = useCss({
  //   ":before": {
  //     content: '""',
  //     backgroundColor: theme.colors.red400,
  //   },
  // });
  const [users, setUsers] = useState([]);
  const [voucher, setVouchers] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);

  const [dateRange, setDateRange] = useState(null);

  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const COUNT = 10;
  const [totalPages, setTotalPages] = useState(0);

  const { data, total } = usePayments({
    from: dateRange ? moment(dateRange[0]).format("YYYY-MM-DD") : "",
    to: dateRange ? moment(dateRange[1]).format("YYYY-MM-DD") : "",
    status: status,
    sort: sort,
    sortBy: "amount",
    page: page,
    count: COUNT,
  });

  React.useEffect(() => {
    setTotalPages(Math.ceil(total / COUNT));
  }, [total]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {}, [status, sort]);

  function handleStatus({ value }) {
    setStatusOptions(value);
    if (value.length) {
      setStatus(value[0].value);
    } else {
      setStatus("");
    }
  }

  function handleSort({ value }) {
    setSortOptions(value);
    if (value.length) {
      setSort(value[0].value);
    } else {
      setSort("");
    }
  }
  const onDateChange = (value) => {
    setDateRange(value);
  };

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
            <Col md={2} xs={12}>
              <Heading>Payments</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row
                style={{
                  rowGap: "10px",
                }}
              >
                <Col lg={3} xs={12}>
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

                <Col lg={3} xs={12}>
                  <Select
                    options={sortSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    value={sortOptions}
                    placeholder="Sort by amount"
                    searchable={false}
                    onChange={handleSort}
                  />
                </Col>

                <Col lg={6} xs={12} className="style-select-absolute">
                  <div className="style-select-absolute-child select-year">
                    <DateRangePickerWrapper>
                      <DateRangePicker
                        onChange={onDateChange}
                        value={dateRange}
                      />
                    </DateRangePickerWrapper>
                  </div>
                </Col>
              </Row>
            </Col>
          </Header>
          {totalPages !== 0 && (
            <Pagination page={page} setPage={setPage} total={totalPages} />
          )}

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(150px, 200px) minmax(150px, 1fr) minmax(200px, 1fr) minmax(150px, max-content) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr)">
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>User name</StyledHeadCell>
                <StyledHeadCell>Order ID</StyledHeadCell>
                <StyledHeadCell>Order Info</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>
                <StyledHeadCell>Amount</StyledHeadCell>
                <StyledHeadCell>VoucherID</StyledHeadCell>
                <StyledHeadCell>Created At</StyledHeadCell>
                <StyledHeadCell>Updated At</StyledHeadCell>
                <StyledHeadCell>Contact</StyledHeadCell>

                {data ? (
                  data.length !== 0 ? (
                    data.map((item) => (
                      <React.Fragment key={item.id}>
                        <StyledCell>{item.id}</StyledCell>
                        <StyledCell>
                          {users.find((u) => u.id === item["user_id"])?.name}
                        </StyledCell>
                        <StyledCell>{item["order_id"]}</StyledCell>
                        <StyledCell>{item["order_info"]}</StyledCell>
                        <StyledCell>{item["status"]}</StyledCell>
                        <StyledCell>
                          {numberWithCommas(item["amount"])}
                        </StyledCell>
                        <StyledCell>{item["voucher_id"]}</StyledCell>
                        <StyledCell>
                          {dayjs(item["created_at"]).format("DD MMM YYYY")}
                        </StyledCell>
                        <StyledCell>
                          {dayjs(item["updated_at"]).format("DD MMM YYYY")}
                        </StyledCell>
                        <StyledCell>
                          {users.find((u) => u.id === item["user_id"])
                            ?.phone_number || ""}
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
