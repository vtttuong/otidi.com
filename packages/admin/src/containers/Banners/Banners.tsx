import { Plus } from "assets/icons/Plus";
import axios from "axios";
import { styled, withStyle } from "baseui";
import Button, { KIND } from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import NoResult from "components/NoResult/NoResult";
import Select from "components/Select/Select";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import moment from "moment";
import React, { useCallback, useState } from "react";
import useBanners from "service/use-banners";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Banners.style";

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

const ImageWrapper = styled("div", ({ $theme }) => ({
  width: "200px",
  height: "100px",
  overflow: "hidden",
  display: "inline-block",
  // borderTopLeftRadius: "20px",
  // borderTopRightRadius: "20px",
  // borderBottomRightRadius: "20px",
  // borderBottomLeftRadius: "20px",
  backgroundColor: $theme.colors.backgroundF7,
}));

const Image = styled("img", () => ({
  width: "100%",
  height: "auto",
}));

const base_url = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

export default function BannersAll() {
  const [datas, setDatas] = useState(null);
  const [checkedAll, setCheckedAll] = useState(false);
  const [bannerDetail, setBannerDetail] = useState<any>({});
  const [checkedId, setCheckedId] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveId = useDrawerState("saveId");
  const dispatch = useDrawerDispatch();
  var { data, mutate } = useBanners();

  const openDrawer = useCallback(
    () =>
      dispatch({ type: "OPEN_DRAWER", drawerComponent: "CREATEBANNER_FORM" }),
    [dispatch]
  );

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = datas && datas.map((banner) => banner.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setCheckedAll(event.target.checked);
  }

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);

    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
      setCheckedAll(false);
    }
  }

  const onEdit = React.useCallback(() => {
    let updatedBanner = datas
      ? datas.filter((i) => i.id === checkedId.slice(-1)[0])[0]
      : null;

    if (updatedBanner) {
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "UPDATEBANNER_FORM",
        data: updatedBanner,
      });

      setCheckedId([]);
      setCheckedAll(false);
    }
  }, [dispatch, checkedId, datas]);

  const onDelete = React.useCallback(() => {
    const token = localStorage.getItem("secondhand_token");
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };
    checkedId.forEach(async (id) => {
      setLoading(true);
      await axios
        .delete(`${base_url}/banners/${id}`, configs)
        .then((res) => {});
      setLoading(false);
      setCheckedAll(false);
      mutate();
    });
  }, [dispatch, checkedId, datas]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      setDatas(data);
    }
    mutate();
    dispatch({
      type: "SAVE_ID",
      data: null,
    });

    return () => (mounted = false);
  }, [data, dispatch, saveId]);

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
              <Heading>Banners</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={7}></Col>
                <Col md={5}>
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
                    Create Banner
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(50px, 70px) minmax(70px, 70px) minmax(250px, auto) minmax(200px, auto)">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    checked={checkedAll}
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
                <StyledHeadCell>Created At</StyledHeadCell>
                {/* <StyledHeadCell>Content</StyledHeadCell> */}
                {/* <StyledHeadCell>Type</StyledHeadCell> */}

                {datas ? (
                  datas.length !== 0 ? (
                    datas.map((item) => (
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
                            <Image src={item.url} alt={"avatar"} />
                          </ImageWrapper>
                        </StyledBodyCell>
                        <StyledBodyCell>
                          {moment(item.created_at).format("YYYY-MM-DD hh:mm")}
                        </StyledBodyCell>
                        {/* <StyledBodyCell>{item.content}</StyledBodyCell> */}
                        {/* <StyledBodyCell>{item.content}</StyledBodyCell> */}
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

      {checkedId.length !== 0 ? (
        <Row>
          {/* <Col md={2}>
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
              Update
            </Button>
          </Col> */}
          <Col md={2}>
            <Button
              kind={KIND.secondary}
              onClick={onDelete}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    width: "50%",
                    borderTopLeftRadius: "3px",
                    borderTopRightRadius: "3px",
                    borderBottomRightRadius: "3px",
                    borderBottomLeftRadius: "3px",
                    marginRight: "15px",
                    color: $theme.colors.red400,
                  }),
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
