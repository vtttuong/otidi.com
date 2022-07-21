import { Plus } from "assets/icons/Plus";
import { Star } from "assets/icons/Star";
import { createThemedUseStyletron, styled, withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import NoResult from "components/NoResult/NoResult";
import Select from "components/Select/Select";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch } from "context/DrawerContext";
import { Consumer } from "context/updateContext";
import React, { useCallback, useState } from "react";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Users.style";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 992px)": {
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

const sortDirection = [
  { value: "asc", label: "Ascending", id: "1" },
  { value: "desc", label: "Descending", id: "2" },
];

const statusOptions = [
  { value: "active", label: "Active", id: "active" },
  { value: "inactive", label: "Inactive", id: "inactive" },
];

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
export default function Users() {
  const [useCss, theme] = themedUseStyletron();
  const success = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });
  const pedding = useCss({
    ":before": {
      content: '""',
      backgroundColor: "orange",
    },
  });
  const failed = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });
  const [dataUsers, setDataUsers] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedId, setCheckedId] = useState([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [search, setSearch] = useState("");
  const [sortTypeOption, setSortTypeOption] = useState([]);
  const [statusOption, setStatusOption] = useState([]);
  // const [status, setStatus] = useState("");
  const [sortDirOption, setSDirOption] = useState([]);

  const dispatch = useDrawerDispatch();
  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CREATEUSER_FORM" }),
    [dispatch]
  );

  function handleSortType({ value }, setStatus, getUser) {
    setSearch("");
    setStatusOption(value);
    if (value.length) {
      setStatus(value[0].value);
    } else {
      setStatus("");
    }
  }

  function handleSortDir({ value }, sortDir, getUser) {
    setSearch("");
    setSDirOption(value);
    if (value.length) {
      sortDir(value[0].value);
    } else {
      sortDir("");
    }
  }

  function handleSearch(event, searchName) {
    const value = event.currentTarget.value;
    searchName(value);
    setSearch(value);
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = dataUsers && dataUsers.map((coupon) => coupon.id);

      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  const onEdit = React.useCallback(() => {
    setCheckedId([]);
    dispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "USER_DETAIL_FORM",
      data: dataDetail,
    });
  }, [dispatch, dataDetail]);

  const onVerify = React.useCallback(() => {
    setCheckedId([]);
    dispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "USER_ID_FORM",
      data: dataDetail,
    });
  }, [dispatch, dataDetail]);

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);

    if (dataUsers.length !== 0) {
      // eslint-disable-next-line array-callback-return
      dataUsers.map((i) => {
        if (i.id === name) {
          setDataDetail(i);
        }
      });
    }
    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
  }

  return (
    <Consumer>
      {({ dataUsers, getUser, searchName, status, setStatus, page }) => {
        setDataUsers(dataUsers);
        return (
          <>
            <Grid fluid={true}>
              <Row>
                <Col lg={12}>
                  <Header
                    style={{
                      marginBottom: 30,
                      boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
                    }}
                  >
                    <Col lg={1}>
                      <Heading>Users</Heading>
                    </Col>

                    <Col lg={11}>
                      <Row>
                        <Col lg={3} style={{ marginLeft: "auto" }}>
                          <Input
                            value={search}
                            placeholder="Ex: Search By Name"
                            onChange={(event) =>
                              handleSearch(event, searchName)
                            }
                            clearable
                          />
                        </Col>

                        <Col lg={3}>
                          <Select
                            options={statusOptions}
                            labelKey="label"
                            // valueKey="value"
                            placeholder="Status"
                            value={statusOption}
                            searchable={false}
                            onChange={(value) =>
                              handleSortType(value, setStatus, getUser)
                            }
                          />
                        </Col>
                        {/* <Col lg={3}>
                          <Select
                            options={sortDirection}
                            labelKey="label"
                            // valueKey="value"
                            placeholder="Sort direction"
                            value={sortDirOption}
                            searchable={false}
                            onChange={(value) =>
                              handleSortDir(value, sortDir, getUser)
                            }
                          />
                        </Col> */}
                        {/* <Col lg={3}>
                          <Button
                            onClick={openDrawer}
                            startEnhancer={() => <Plus />}
                            overrides={{
                              BaseButton: {
                                style: ({ $theme, $size, $shape }) => {
                                  return {
                                    width: "100%",
                                    borderTopLeftRadius: "3px",
                                    borderTopRightRadius: "3px",
                                    borderBottomLeftRadius: "3px",
                                    borderBottomRightRadius: "3px",
                                  };
                                },
                              },
                            }}
                          >
                            Create User
                          </Button>
                        </Col> */}
                      </Row>
                    </Col>
                  </Header>

                  <Wrapper
                    style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}
                  >
                    <TableWrapper>
                      <StyledTable $gridTemplateColumns="minmax(50px, 70px) minmax(50px, 70px) minmax(70px, auto) minmax(100px, auto) minmax(150px, auto) minmax(100px, auto) minmax(130px, max-content) minmax(100px, auto) ">
                        <StyledHeadCell>
                          <Checkbox
                            type="checkbox"
                            value="checkAll"
                            checked={checked}
                            onChange={onAllCheck}
                            overrides={{
                              Checkmark: {
                                style: {
                                  borderTopWidth: "2px",
                                  borderRightWidth: "2px",
                                  borderBottomWidth: "2px",
                                  borderLeftWidth: "2px",
                                  borderTopLeftRadius: "4px",
                                  borderTopRightRadius: "4px",
                                  borderBottomRightRadius: "4px",
                                  borderBottomLeftRadius: "4px",
                                },
                              },
                            }}
                          />
                        </StyledHeadCell>

                        <StyledHeadCell>ID</StyledHeadCell>
                        <StyledHeadCell>Image</StyledHeadCell>
                        <StyledHeadCell>Name</StyledHeadCell>
                        <StyledHeadCell>Contacts</StyledHeadCell>
                        <StyledHeadCell>Rating</StyledHeadCell>
                        <StyledHeadCell>Verify</StyledHeadCell>
                        <StyledHeadCell>Status</StyledHeadCell>

                        {dataUsers ? (
                          dataUsers.length !== 0 ? (
                            dataUsers.map((item) => (
                              <React.Fragment key={item.id}>
                                <StyledBodyCell>
                                  <Checkbox
                                    name={item.id}
                                    checked={checkedId.includes(item.id)}
                                    onChange={handleCheckbox}
                                    overrides={{
                                      Checkmark: {
                                        style: {
                                          borderTopWidth: "2px",
                                          borderRightWidth: "2px",
                                          borderBottomWidth: "2px",
                                          borderLeftWidth: "2px",
                                          borderTopLeftRadius: "4px",
                                          borderTopRightRadius: "4px",
                                          borderBottomRightRadius: "4px",
                                          borderBottomLeftRadius: "4px",
                                        },
                                      },
                                    }}
                                  />
                                </StyledBodyCell>

                                <StyledBodyCell>{item.id}</StyledBodyCell>
                                <StyledBodyCell>
                                  <ImageWrapper>
                                    <Image
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                      }}
                                      src={item.avatar}
                                      alt={"avatar"}
                                    />
                                  </ImageWrapper>
                                </StyledBodyCell>
                                <StyledBodyCell>{item.name}</StyledBodyCell>
                                <StyledBodyCell>
                                  {item.phone_number}
                                </StyledBodyCell>
                                <StyledBodyCell>
                                  {
                                    <span
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      {item.rating === 0
                                        ? 0
                                        : parseFloat(item.rating).toFixed(1)}
                                      {"   "}
                                      <Star />
                                    </span>
                                  }
                                </StyledBodyCell>
                                <StyledBodyCell>
                                  <Status
                                    className={
                                      item.email_verified_at &&
                                      item.phone_verified_at &&
                                      item.identity_verified_at
                                        ? success
                                        : item.email_verified_at &&
                                          item.phone_verified_at &&
                                          !item.identity_verified_at
                                        ? pedding
                                        : failed
                                    }
                                  >
                                    {item.email_verified_at &&
                                    item.phone_verified_at &&
                                    item.identity_verified_at
                                      ? "Verified"
                                      : item.email_verified_at &&
                                        item.phone_verified_at &&
                                        !item.identity_verified_at
                                      ? "Pending"
                                      : "Not Verify"}
                                  </Status>
                                </StyledBodyCell>
                                <StyledBodyCell>
                                  <Status
                                    className={
                                      item.status === "inactive"
                                        ? failed
                                        : success
                                    }
                                  >
                                    {item.status === "inactive"
                                      ? "Blocked"
                                      : "Active"}
                                  </Status>
                                </StyledBodyCell>
                              </React.Fragment>
                            ))
                          ) : (
                            <NoResult
                              hideButton={false}
                              style={{
                                gridColumnStart: "1",
                                gridColumnEnd: "-1",
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
              {/* <UserDetailForm /> */}
              {checkedId.length !== 0 ? (
                <Row>
                  <Col md={2}>
                    <Button
                      onClick={onEdit}
                      startEnhancer={() => <Plus />}
                      overrides={{
                        BaseButton: {
                          style: ({ $theme, $size, $shape }) => {
                            return {
                              width: "100%",
                              borderTopLeftRadius: "3px",
                              borderTopRightRadius: "3px",
                              borderBottomLeftRadius: "3px",
                              borderBottomRightRadius: "3px",
                            };
                          },
                        },
                      }}
                    >
                      Detail
                    </Button>
                  </Col>
                  {dataDetail.identity_card ? (
                    <Col md={2}>
                      <Button
                        onClick={onVerify}
                        startEnhancer={() => <Plus />}
                        overrides={{
                          BaseButton: {
                            style: ({ $theme, $size, $shape }) => {
                              return {
                                width: "100%",
                                borderTopLeftRadius: "3px",
                                borderTopRightRadius: "3px",
                                borderBottomLeftRadius: "3px",
                                borderBottomRightRadius: "3px",
                              };
                            },
                          },
                        }}
                      >
                        Verify
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              ) : null}
            </Grid>
          </>
        );
      }}
    </Consumer>
  );
}
