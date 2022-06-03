import {EditIcon} from "assets/icons/EditIcon";
import {Plus} from "assets/icons/Plus";
import {TrashIcon} from "assets/icons/TrashIcon";
import {withStyle} from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import {Col as Column, Grid, Row as Rows} from "components/FlexBox/FlexBox";
import {InLineLoader} from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import NoResult from "components/NoResult/NoResult";
import Select from "components/Select/Select";
import {Header, Heading, Wrapper} from "components/Wrapper.style";
import {useDrawerDispatch, useDrawerState} from "context/DrawerContext";
import React, {useCallback, useEffect, useState} from "react";
import useBrands, {getBrands} from "service/use-brands";

import {
  ActionButton,
  ActionWrapper,
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
    justifyContent: "flex-end",
  },
}));

export default function Brand() {
  const [search, setSearch] = useState("");
  const dispatch = useDrawerDispatch();
  const savedBrand = useDrawerState("savedBrand");

  const {data, mutate} = useBrands({
    text: search ? search : "",
  });
  useEffect(() => {
    if (savedBrand) {
      mutate();
    }
  }, [savedBrand]);

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
                    Add Category
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns=" minmax(70px, 70px) minmax(70px, 200px) minmax(100px, auto) minmax(80px, 150px) ">
                <StyledHeadCell>Id</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Actions</StyledHeadCell>

                {data ? (
                  data.length ? (
                    data.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <StyledCell>{item.id}</StyledCell>
                        <StyledCell>
                          <ImageWrapper>
                            <Image src={item.logo} />
                          </ImageWrapper>
                        </StyledCell>
                        <StyledCell>{item.name}</StyledCell>
                        <StyledCell>
                          <ActionWrapper>
                            <ActionButton onClick={() => handleUpdate(item.id)}>
                              <EditIcon />
                            </ActionButton>
                            <ActionButton>
                              <TrashIcon />
                            </ActionButton>
                          </ActionWrapper>
                        </StyledCell>
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
    </Grid>
  );
}
