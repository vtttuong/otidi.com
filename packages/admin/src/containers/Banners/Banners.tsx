import {Plus} from "assets/icons/Plus";
import {styled, withStyle} from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import {Col as Column, Grid, Row as Rows} from "components/FlexBox/FlexBox";
import {InLineLoader} from "components/InlineLoader/InlineLoader";
import NoResult from "components/NoResult/NoResult";
import Select from "components/Select/Select";
import {Header, Heading, Wrapper} from "components/Wrapper.style";
import {useDrawerDispatch, useDrawerState} from "context/DrawerContext";
import React, {useCallback, useState} from "react";
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

const ImageWrapper = styled("div", ({$theme}) => ({
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

const FAKE_DATA = [
  {
    id: 1,
    url:
      "https://otody.s3.ap-southeast-1.amazonaws.com/banners/8VDdzPMsQqxgg6Qt.png",
    created_at: "2022-05-15T10:06:36.000000Z",
    updated_at: "2022-05-15T10:06:36.000000Z",
    title: "Banner 1",
    content: "Content 1",
  },
  {
    id: 2,
    url:
      "https://otody.s3.ap-southeast-1.amazonaws.com/banners/HRbiWH8QhRx80RqN.png",
    created_at: "2022-05-15T10:06:54.000000Z",
    updated_at: "2022-05-15T10:06:54.000000Z",
    title: "Banner 2",
    content: "Content 2",
  },
];
export default function BannersAll() {
  const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";

  const [datas, setDatas] = useState(FAKE_DATA);
  const [bannerDetail, setBannerDetail] = useState<any>({});
  const [checkedId, setCheckedId] = useState([]);
  const saveId = useDrawerState("saveId");
  const dispatch = useDrawerDispatch();
  const openDrawer = useCallback(
    () => dispatch({type: "OPEN_DRAWER", drawerComponent: "CREATEBANNER_FORM"}),
    [dispatch]
  );

  function handleCheckbox(event) {
    console.log(event.currentTarget);

    const name = parseInt(event.currentTarget.name);
    if (datas.length !== 0) {
      // eslint-disable-next-line array-callback-return
      datas.map((i) => {
        if (i.id === name) {
          setBannerDetail(i);
        }
      });
    }

    if (!checkedId.includes(name)) {
      setCheckedId((prevState) => [...prevState, name]);
    } else {
      setCheckedId((prevState) => prevState.filter((id) => id !== name));
    }
  }

  const onEdit = React.useCallback(() => {
    setCheckedId([]);
    dispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "UPDATEBANNER_FORM",
      data: bannerDetail,
    });
  }, [dispatch, bannerDetail]);

  var {data} = useBanners();
  // React.useEffect(() => {
  //   setDatas(data);
  //   dispatch({
  //     type: "SAVE_ID",
  //     data: null,
  //   });
  // }, [saveId, dispatch, data]);

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
                <Col md={9}></Col>
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
                    Create Banner
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}>
            <TableWrapper>
              <StyledTable $gridTemplateColumns="minmax(50px, 70px) minmax(70px, 70px) minmax(250px, 200px) minmax(200px, auto) minmax(150px, auto)">
                <StyledHeadCell>Check</StyledHeadCell>
                <StyledHeadCell>ID</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Title</StyledHeadCell>
                <StyledHeadCell>Content</StyledHeadCell>
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
                        <StyledBodyCell>{item.title}</StyledBodyCell>
                        <StyledBodyCell>{item.content}</StyledBodyCell>
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
              Update
            </Button>
          </Col>
        </Row>
      ) : null}
    </Grid>
  );
}
