import {Plus} from "assets/icons/Plus";
import {Star} from "assets/icons/Star";
import {createThemedUseStyletron, styled, withStyle} from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import {Col as Column, Grid, Row as Rows} from "components/FlexBox/FlexBox";
import {InLineLoader} from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import {Header, Heading, Wrapper} from "components/Wrapper.style";
import {useDrawerDispatch} from "context/DrawerContext";
import {Consumer} from "context/updateContext";
import React, {useCallback, useState} from "react";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Users.style";

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

const Image = styled("img", () => ({
  width: "100%",
  height: "auto",
}));

const userType = [
  {value: "1", label: "Normal", id: "1"},
  {value: "2", label: "Copper", id: "2"},
  {value: "3", label: "Silver", id: "3"},
  {value: "4", label: "Gold", id: "4"},
];
type CustomThemeT = {red400: string; textNormal: string; colors: any};
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();
const Status = styled("div", ({$theme}) => ({
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
  const [stock, setStock] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checkedId, setCheckedId] = useState([]);
  const [dataDetail, setDataDetail] = useState<any>({});
  const [search, setSearch] = useState("");
  const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";

  const dispatch = useDrawerDispatch();
  const openDrawer = useCallback(
    () => dispatch({type: "OPEN_DRAWER", drawerComponent: "CREATEUSER_FORM"}),
    [dispatch]
  );

  function handleSort({value}, searchType, getUser) {
    setStock(value);
    if (value.length) {
      searchType(value[0].value);
    } else {
      getUser();
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

  const onVerify = React.useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "USER_ID_FORM",
        data: dataDetail,
      }),
    [dispatch, dataDetail]
  );

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
      {({dataUsers, searchName, searchType, getUser}) => {
        setDataUsers(dataUsers);
        return (
          <>
            <Grid fluid={true}>
              <Row>
                <Col md={12}>
                  <Header
                    style={{
                      marginBottom: 30,
                      boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
                    }}
                  >
                    <Col md={2}>
                      <Heading>Users</Heading>
                    </Col>

                    <Col md={10}>
                      <Row>
                        <Col md={5}>
                          <Input
                            value={search}
                            placeholder="Ex: Search By Name"
                            onChange={(event) =>
                              handleSearch(event, searchName)
                            }
                            clearable
                          />
                        </Col>
                        <Col md={3}>
                          <Select
                            options={userType}
                            labelKey="label"
                            // valueKey="value"
                            placeholder="Users Type"
                            value={stock}
                            searchable={false}
                            onChange={(value) =>
                              handleSort(value, searchType, getUser)
                            }
                          />
                        </Col>
                        <Col md={3}>
                          <Button
                            onClick={openDrawer}
                            startEnhancer={() => <Plus />}
                            overrides={{
                              BaseButton: {
                                style: ({$theme, $size, $shape}) => {
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
                        </Col>
                      </Row>
                    </Col>
                  </Header>

                  <Wrapper style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}>
                    <TableWrapper>
                      <StyledTable $gridTemplateColumns="minmax(50px, 70px) minmax(30px, 70px) minmax(70px, auto) minmax(70px, auto) minmax(70px, auto) minmax(150px, auto) minmax(150px, max-content) minmax(150px, auto) ">
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

                        {dataUsers.length !== 0 ? (
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
                                    src={urlServer + item.avatar_url}
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
                                  <span>
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
                                    item.identify?.identified_at
                                      ? success
                                      : item.email_verified_at &&
                                        item.phone_verified_at &&
                                        !item.identify?.identified_at
                                      ? pedding
                                      : failed
                                  }
                                >
                                  {item.email_verified_at &&
                                  item.phone_verified_at &&
                                  item.identify?.identified_at
                                    ? "Verified"
                                    : item.email_verified_at &&
                                      item.phone_verified_at &&
                                      !item.identify?.identified_at
                                    ? "Pending"
                                    : "Not Verify"}
                                </Status>
                              </StyledBodyCell>
                              <StyledBodyCell>
                                <Status
                                  className={item.deleted_at ? failed : success}
                                >
                                  {item.deleted_at ? "Blocked" : "Active"}
                                </Status>
                              </StyledBodyCell>
                            </React.Fragment>
                          ))
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
                          style: ({$theme, $size, $shape}) => {
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
                  {dataDetail.identify ? (
                    <Col md={2}>
                      <Button
                        onClick={onVerify}
                        startEnhancer={() => <Plus />}
                        overrides={{
                          BaseButton: {
                            style: ({$theme, $size, $shape}) => {
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
