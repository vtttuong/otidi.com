import { Plus } from "assets/icons/PlusMinus";
import { withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import Input from "components/Input/Input";
import Select from "components/Select/Select";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import Fuse from "fuse.js";
import React, { useState } from "react";
import { getTasks, sortTasks } from "service/use-tasks";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Tasks.style";

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
  { value: "en", label: "En" },
  { value: "vi", label: "Vi" },
];

const options = {
  isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  includeScore: true,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ["type"],
};
export default function Tasks() {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [checked, setChecked] = useState(false);

  const saveId = useDrawerState("saveId");
  const [lang, setLang] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingEdit, setLoadingEdit] = useState(false);

  React.useEffect(() => {
    getTasksAll();
    setUpdate(false);
    dispatch({
      type: "SAVE_ID",
      data: null,
    });
  }, [update, saveId, dispatch]);

  const getTasksAll = async () => {
    setData(await getTasks());
    setDataSearch(await getTasks());
  };

  const onEdit = React.useCallback(
    () =>
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "TASK_UPDATE_FORM",
        data: dataDetail,
      }),
    [dispatch, dataDetail]
  );

  async function handleSelect({ value }) {
    setLang(value);
    if (value.length !== 0) {
      if (sort.length !== 0) {
        const object: any = {
          locale: value[0].value,
          sort: sort[0].value,
        };
        setData(await sortTasks(object));
      } else {
        const object: any = {
          locale: value[0].value,
        };
        setData(await sortTasks(object));
      }
    } else {
      getTasksAll();
    }
  }

  const searchN = (list, pattern) => {
    const fuse = new Fuse(list, options);
    return fuse.search(pattern).map((current) => current.item);
  };
  function handleSearch(event) {
    const value = event.currentTarget.value;

    setSearch(value);
    if (value.length === 0) getTasksAll();
    const results = searchN(dataSearch, value);
    setData(results);
    // refetch({
    //   status: status.length ? status[0].value : null,
    //   searchBy: value,
    // });
  }
  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.map((coupon) => coupon.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);
    if (data.length !== 0) {
      // eslint-disable-next-line array-callback-return
      data.map((i) => {
        if (i.id === name) {
          setDataDetail(i);
          // eslint-disable-next-line array-callback-return
          return;
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
              <Heading>Tasks</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col md={5}>
                  <Select
                    options={statusSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Locale"
                    value={lang}
                    searchable={false}
                    onChange={handleSelect}
                  />
                </Col>
                {/* <Col md={3}>
                  <Select
                    options={sortCreatedAt}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Sort"
                    value={sort}
                    searchable={false}
                    onChange={handleSort}
                  />
                </Col> */}

                <Col md={5}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(200px, auto) minmax(200px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
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
                <StyledHeadCell>Tasks Name</StyledHeadCell>
                <StyledHeadCell>Description</StyledHeadCell>
                <StyledHeadCell>Exchange point</StyledHeadCell>
                <StyledHeadCell> Max number excute</StyledHeadCell>
                <StyledHeadCell> Per unit</StyledHeadCell>
                <StyledHeadCell>Link</StyledHeadCell>

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
                            {item.translate.map((i) => (
                              <>
                                <span
                                  style={{
                                    color: i.locale === "vi" ? "#007e7f" : "",
                                  }}
                                >
                                  {i.name}
                                  <br />
                                </span>
                              </>
                            ))}
                          </StyledBodyCell>
                          <StyledBodyCell>
                            {item.translate.map((i) => (
                              <>
                                <span
                                  style={{
                                    color: i.locale === "vi" ? "#007e7f" : "",
                                  }}
                                >
                                  {i.description}
                                </span>{" "}
                                <br />
                              </>
                            ))}
                          </StyledBodyCell>
                          <StyledBodyCell>{item.exchange_point}</StyledBodyCell>
                          <StyledBodyCell>
                            {item.max_number_excute}
                          </StyledBodyCell>
                          <StyledBodyCell>{item.per_unit}</StyledBodyCell>
                          <StyledBodyCell>{item.redirect_link}</StyledBodyCell>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <div className="box-relative-no">
                      <div className="load-wrapp">
                        <div className="load-1">
                          <InLineLoader />
                        </div>
                      </div>
                    </div>
                  )
                ) : null}
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
        </Row>
      ) : null}
    </Grid>
  );
}
