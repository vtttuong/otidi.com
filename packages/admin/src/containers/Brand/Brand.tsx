import { EditIcon } from "assets/icons/EditIcon";
import { Plus } from "assets/icons/Plus";
import { TrashIcon } from "assets/icons/TrashIcon";
import { withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import NoResult from "components/NoResult/NoResult";
import Pagination from "components/Pagination/Pagination";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useEffect, useState } from "react";
import useBrands from "service/use-brands";

import {
  Image,
  ImageWrapper,
  LoadingWrapper,
  StyledCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Brand.style";

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

export default function Brand() {
  const [search, setSearch] = useState("");
  const dispatch = useDrawerDispatch();
  const savedBrand = useDrawerState("savedBrand");
  const [checkedId, setCheckedId] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);

  const { data, mutate } = useBrands({
    text: search ? search : "",
  });

  useEffect(() => {
    if (savedBrand) {
      mutate();
    }
  }, [savedBrand, mutate]);

  const openDrawer = (type, brand = undefined) => {
    if (type === "add") {
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "BRAND_FORM",
      });
    } else if (type === "update") {
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "BRAND_FORM",
        data: brand,
      });
    }
  };

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function handleUpdate(id) {
    const updatedBrand = data.find((item) => item.id === +id);
    openDrawer("update", updatedBrand);
  }

  const onDelete = () => {};
  const onEdit = () => {
    setLoadingEdit(true);
    let updatedBrand = data
      ? data.filter((i) => i.id === checkedId.slice(-1)[0])[0]
      : null;

    if (updatedBrand) {
      openDrawer("update", updatedBrand);
      setCheckedId([]);
      setCheckedAll(false);
    }

    setLoadingEdit(false);
  };

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data ? data.map((voucher) => voucher.id) : [];
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
              <Heading>Brands</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={4} lg={4}></Col>
                <Col md={4} lg={4}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
                <Col md={4} lg={4}>
                  <Button
                    onClick={() => openDrawer("add")}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: "100%",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                          borderBottomLeftRadius: "3px",
                          borderBottomRightRadius: "3px",
                        }),
                      },
                    }}
                  >
                    Add Brand
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns=" minmax(70px, 70px) minmax(70px, 70px) minmax(100px, 200px) minmax(100px, auto) ">
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
                <StyledHeadCell>Id</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>

                {data ? (
                  data.length ? (
                    data.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <StyledCell>
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
                        </StyledCell>
                        <StyledCell>{item.id}</StyledCell>
                        <StyledCell>
                          <ImageWrapper>
                            <Image src={item.logo} />
                          </ImageWrapper>
                        </StyledCell>
                        <StyledCell>{item.name}</StyledCell>
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
                  <LoadingWrapper>
                    <div className="load-1">
                      <InLineLoader />
                    </div>
                  </LoadingWrapper>
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
