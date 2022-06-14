import { Plus } from "assets/icons/Plus";
import { withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { Col as Column, Grid, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import NoResult from "components/NoResult/NoResult";
import Select from "components/Select/Select";
import { Header, Heading, Wrapper } from "components/Wrapper.style";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { deleteFaq, getFaqs } from "service/use-faqs";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "./Faqs.style";

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

const userType = [
  { value: "en", label: "En" },
  { value: "vi", label: "Vi" },
];

export default function Faqs() {
  const dispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [dataFaqs, setDataFaqs] = useState(null);
  const [locale, setLocale] = useState("en");
  const [stock, setStock] = useState([]);
  const [checked, setChecked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [loadingDel, setLoadingDel] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingEdit, setLoadingEdit] = useState(false);

  const openDrawer = useCallback(
    () => dispatch({ type: "OPEN_DRAWER", drawerComponent: "CREATEFAQ_FORM" }),
    [dispatch]
  );
  const saveId = useDrawerState("saveId");
  const alert = useAlert();

  React.useEffect(() => {
    getF(locale);
    dispatch({
      type: "SAVE_ID",
      data: null,
    });
  }, [saveId, dispatch, locale, update]);

  const getF = async (language) => {
    const faqs = await getFaqs(language);
    setDataFaqs(faqs);
  };

  const onDelete = () => {
    setLoadingDel(true);
    checkedId.length !== 0 &&
      checkedId.map(async (item) => {
        await deleteFaq(item);
      });
    setUpdate(!update);

    setTimeout(() => {
      setCheckedId([]);
      alert.success("Deleted success!");
      setLoadingDel(false);
      getF("en");
    }, 500);
  };

  const onEdit = () => {
    const updatedFaq = dataFaqs
      ? dataFaqs.filter((f) => f.id === checkedId.slice(-1)[0])[0]
      : null;

    if (updatedFaq) {
      dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "UPDATEFAQ_FORM",
        data: updatedFaq,
      });
      setCheckedId([]);
      setChecked(false);
    }
  };

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = dataFaqs && dataFaqs.map((coupon) => coupon.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);

    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
      setChecked(false);
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
              <Heading>Faqs</Heading>
            </Col>

            <Col md={10}>
              <Row>
                <Col style={{ marginLeft: "auto" }} md={3}>
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
                    Create Faq
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px)  minmax(50px, 70px) minmax(300px, 300px)  minmax(500px, auto) ">
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
                <StyledHeadCell>Title</StyledHeadCell>
                <StyledHeadCell>Content</StyledHeadCell>

                {dataFaqs ? (
                  dataFaqs.length !== 0 ? (
                    dataFaqs.map((item) => (
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
                        <StyledBodyCell>{item.title}</StyledBodyCell>
                        <StyledBodyCell>{item.content}</StyledBodyCell>
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
