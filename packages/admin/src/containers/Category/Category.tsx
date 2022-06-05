import {Plus} from "assets/icons/Plus";
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
import useCategories, {
  useCategoriesRoot,
  usePlanCategories,
} from "service/use-category";
import {
  StyledCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Category.style";

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

const localeOptions = [
  {value: "en", label: "EN"},
  {value: "vi", label: "VI"},
];

export default function Category() {
  const [categoryOption, setCategoryOption] = useState([]);
  const [localeOption, setLocaleOption] = useState([]);
  const [parentId, setParentId] = useState("");
  const [locale, setLocale] = useState("en");
  const [search, setSearch] = useState("");
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const {dataRoot} = useCategoriesRoot({
    locale: locale,
  });

  const {data, maxId} = usePlanCategories({
    locale: locale,
    parent_id: parentId !== "" ? parentId : null,
    text: search ? search : "",
  });

  const {dataTree} = useCategories({
    locale: "en",
  });

  const openDrawer = useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "CATEGORY_FORM",
        data: dataTree,
        maxId: maxId,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataTree, dispatch]
  );

  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function handleFilterCategory({value}) {
    setCategoryOption(value);

    if (value.length) {
      setParentId(value[0].id);
    } else {
      setParentId("");
    }
  }

  function handleFilterLocale({value}) {
    setLocaleOption(value);

    if (value.length) {
      setLocale(value[0].value);
    } else {
      setLocale("en");
    }
  }

  function handleCheckbox(event) {
    const {name} = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
  }

  // const Icon = ({ name }) => {
  //   const TagName = icons[name];
  //   return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
  // };

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
              <Heading>Category</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={2} lg={2}>
                  <Select
                    options={dataRoot}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Category Type"
                    value={categoryOption}
                    searchable={false}
                    onChange={handleFilterCategory}
                  />
                </Col>

                <Col md={2} lg={2}>
                  <Select
                    options={localeOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Locale"
                    value={localeOption}
                    searchable={false}
                    onChange={handleFilterLocale}
                  />
                </Col>

                <Col md={4} lg={4}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3} lg={3}>
                  <Button
                    onClick={openDrawer}
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
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(80px, 80px) minmax(150px, auto) minmax(150px, auto) ">
                <StyledHeadCell>Check</StyledHeadCell>
                <StyledHeadCell>Id</StyledHeadCell>
                {/* <StyledHeadCell>Image</StyledHeadCell> */}
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Slug</StyledHeadCell>

                {data ? (
                  data.length ? (
                    data.map((item, index) => (
                      <React.Fragment key={item.value}>
                        <StyledCell>
                          <Checkbox
                            name={item.value}
                            checked={checkedId.includes(item.value)}
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
                        <StyledCell>{index + 1}</StyledCell>
                        {/* <StyledCell>
                          <ImageWrapper>
                            <Icon name={item.icon} />
                          </ImageWrapper>
                        </StyledCell> */}
                        <StyledCell>{item.translates[0].title}</StyledCell>
                        <StyledCell>{item.value}</StyledCell>
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
