import { Plus } from "assets/icons/PlusMinus";
import { createThemedUseStyletron, styled, withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import ProgressBar from "components/ProgressBar/ProgressBar";
import Select from "components/Select/Select";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import dayjs from "dayjs";
import React, { useCallback, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import useVouchers, { delVoucher } from "service/use-vouchers";
import {
  ProgressText,
  ProgressWrapper,
  Status,
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Coupon.style";
import NoResult from "components/NoResult/NoResult";

type CustomThemeT = { red400: string; textNormal: string; colors: any };
const themedUseStyletron = createThemedUseStyletron<CustomThemeT>();

const ImageWrapper = styled("div", ({ $theme }) => ({
  width: "200px",
  height: "100px",
  overflow: "hidden",
  display: "inline-block",
  backgroundColor: $theme.colors.backgroundF7,
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
  { value: "active", label: "Active" },
  { value: "expired", label: "Expired" },
];

const typeSelectOptions = [
  { value: "exchangeable", label: "Exchangeable" },
  { value: "personal", label: "Personal" },
];

const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";

export default function Coupons() {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  const openDrawer = useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "CAMPAING_FORM",
        data: maxId,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );
  const [statusOption, setStatusOptions] = useState([]);
  const [typeOption, setTypeOptions] = useState([]);
  const [text, setText] = useState("");

  const [loadingDel, setLoadingDel] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const alert = useAlert();
  const [useCss, theme] = themedUseStyletron();

  const deletedVoucherIds = useDrawerState("deletedVoucherIds");
  const createdVoucher = useDrawerState("createdVoucher");
  const updatedVoucher = useDrawerState("updatedVoucher");

  const active = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.primary,
    },
  });

  const revoked = useCss({
    ":before": {
      content: '""',
      backgroundColor: theme.colors.red400,
    },
  });

  const { data, maxId } = useVouchers({ status, type, text });

  const Image = styled("img", () => ({
    width: "100%",
    height: "auto",
  }));

  useEffect(() => {
    data?.unshift(createdVoucher);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdVoucher]);

  useEffect(() => {
    if (updatedVoucher) {
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        if (item.id === updatedVoucher.id) {
          if (item.type === "exchangeable") {
            item.name = updatedVoucher.name;
            item.type = updatedVoucher.type;
            item.discount = updatedVoucher.discount;
            item.using = updatedVoucher.using;
            item.total = updatedVoucher.total;
            item.expired = updatedVoucher.expired;
            item.image = updatedVoucher.image;
            item.exchange_point = updatedVoucher.exchange_point;
          } else {
            item.name = updatedVoucher.name;
            item.type = updatedVoucher.type;
            item.discount = updatedVoucher.discount;
            item.using = updatedVoucher.using;
            item.total = updatedVoucher.total;
            item.expired = updatedVoucher.expired;
            item.image = updatedVoucher.image;
            item.levels = updatedVoucher.levels;
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedVoucher]);

  useEffect(() => {
    if (deletedVoucherIds != null) {
      // eslint-disable-next-line array-callback-return
      deletedVoucherIds.map((id) => {
        const index = data.findIndex((item) => item.id === id);
        data.splice(index, 1);
      });

      dispatch({
        type: "SAVE_DELETED_ID",
        data: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedVoucherIds]);

  const onDelete = async () => {
    setLoadingDel(true);

    if (checkedId.length > 0) {
      await checkedId.map(async (item) => {
        await delVoucher(item);
        alert.success("Deleted success!");
      });

      setLoadingDel(false);
    }

    dispatch({
      type: "SAVE_DELETED_ID",
      data: checkedId,
    });
  };

  const onEdit = React.useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "CAMPAING_UPDATE_FORM",
        data: dataDetail,
      }),
    [dispatch, dataDetail]
  );

  function handleSelectStatus({ value }) {
    setStatusOptions(value);
    if (value.length) {
      setStatus(value[0].value);
    } else {
      setStatus("");
    }
  }

  function handleSelectType({ value }) {
    setTypeOptions(value);
    if (value.length) {
      setType(value[0].value);
    } else {
      setType("");
    }
  }

  function handleSearch(event) {
    const { value } = event.currentTarget;
    setText(value);
  }

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);
    if (data.length !== 0) {
      // eslint-disable-next-line array-callback-return
      data.map((i) => {
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

  const numberToPercent = (num, total) => {
    return (num * 100) / total;
  };

  return (
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
              <Heading>Vouchers</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={2}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Status"
                    value={statusOption}
                    searchable={false}
                    onChange={handleSelectStatus}
                  />
                </Col>

                <Col md={2}>
                  <Select
                    options={typeSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Type"
                    value={typeOption}
                    searchable={false}
                    onChange={handleSelectType}
                  />
                </Col>

                <Col md={4}>
                  <Input
                    value={text}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4}>
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
                    Create Voucher
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(250px, 100px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
                <StyledHeadCell>Check</StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Vouchers Name</StyledHeadCell>
                <StyledHeadCell>Code</StyledHeadCell>
                <StyledHeadCell>Remaining coupon</StyledHeadCell>
                <StyledHeadCell>Expiration Date</StyledHeadCell>
                <StyledHeadCell>Creation Date</StyledHeadCell>
                <StyledHeadCell>Status</StyledHeadCell>

                {data ? (
                  data.length ? (
                    data.map((item) => {
                      return (
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
                                src={urlServer + item.image}
                                alt={"avatar"}
                              />
                            </ImageWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>{item.name}</StyledBodyCell>
                          <StyledBodyCell>{item.name}</StyledBodyCell>
                          <StyledBodyCell>
                            <ProgressWrapper>
                              <ProgressBar
                                value={numberToPercent(item.using, item.total)}
                                successValue={100}
                                overrides={{
                                  Bar: {
                                    style: () => {
                                      return {
                                        backgroundColor: "#F2F2F2",
                                        marginLeft: "0px",
                                        marginRight: "0px",
                                        height: "4px",
                                        borderTopLeftRadius: "5px",
                                        borderTopRightRadius: "5px",
                                        borderBottomLeftRadius: "5px",
                                        borderBottomRightRadius: "5px",
                                        position: "relative",
                                      };
                                    },
                                  },
                                  BarProgress: {
                                    style: ({ $theme }) => {
                                      return {
                                        backgroundColor: $theme.colors.primary,
                                        borderTopLeftRadius: "5px",
                                        borderTopRightRadius: "5px",
                                        borderBottomLeftRadius: "5px",
                                        borderBottomRightRadius: "5px",
                                      };
                                    },
                                  },
                                }}
                              />

                              <ProgressText>{`${
                                item.using ? item.using : 0
                              } of ${
                                item.total
                              } codes remaining`}</ProgressText>
                            </ProgressWrapper>
                          </StyledBodyCell>
                          <StyledBodyCell>
                            {dayjs(item.expired).format("DD MMM YYYY")}
                          </StyledBodyCell>
                          <StyledBodyCell>
                            {dayjs(item.created_at).format("DD MMM YYYY")}
                          </StyledBodyCell>
                          <StyledBodyCell>
                            <Status
                              className={item.deleted_at ? revoked : active}
                            >
                              {item.deleted_at ? "Expired" : "active"}
                            </Status>
                          </StyledBodyCell>
                        </React.Fragment>
                      );
                    })
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
      {checkedId.length !== 0 ? (
        <Row>
          <Col md={2}>
            <Button
              onClick={onEdit}
              isLoading={loadingEdit}
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
              Edit
            </Button>
          </Col>
          <Col md={2}>
            <Button
              onClick={onDelete}
              isLoading={loadingDel}
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
              Delete
            </Button>
          </Col>
        </Row>
      ) : null}
    </Grid>
  );
}
