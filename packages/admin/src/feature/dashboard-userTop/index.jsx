import { Plus } from "assets/icons/PlusMinus";
import { Star } from "assets/icons/Star";
import { styled, withStyle } from "baseui";
import Button from "components/Button/Button";
import Checkbox from "components/CheckBox/CheckBox";
import { ANCHOR } from "components/Drawer/Drawer";
import { Col as Column, Row as Rows } from "components/FlexBox/FlexBox";
import { InLineLoader } from "components/InlineLoader/InlineLoader";
import { Wrapper } from "components/Wrapper.style";
import {
  StyledBodyCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper
} from "containers/Customers/Customers.style";
import { useDrawerDispatch } from "context/DrawerContext";
import React, { useCallback, useEffect, useState } from "react";
import { getTopUser } from "service/use-statistics";


const storageUrl = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";

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


const UserTop = ({ ...props }) => {
  const [users, setUsers] = useState([]);
  const [checkedId, setCheckedId] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  const dispatch = useDrawerDispatch();

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

  function handleCheckbox(event) {
    const name = parseInt(event.currentTarget.name);
    if (users.length !== 0) {
      // eslint-disable-next-line array-callback-return
      users.map((i) => {
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopUser();
      setUsers(data);
    };
    fetchData();
  }, []);

  const openDrawer = useCallback(
    () => {
      return dispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "REVENUE_USER_DETAIL",
        data: dataDetail.id,
        anchor: ANCHOR.top
      })
    },
    [dispatch, dataDetail]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  );

  return (
    <>
    <Row>
      <Wrapper
        style={{ width: "100%", padding: 10, backgroundColor: "transparent" }}
      >
        <TableWrapper>
          <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
            <StyledHeadCell>Check</StyledHeadCell>
            <StyledHeadCell>ID</StyledHeadCell>
            <StyledHeadCell>Image</StyledHeadCell>
            <StyledHeadCell>Name</StyledHeadCell>
            <StyledHeadCell>Total post</StyledHeadCell>
            <StyledHeadCell>Bought</StyledHeadCell>
            <StyledHeadCell>Rating</StyledHeadCell>
            <StyledHeadCell>Level</StyledHeadCell>

            {users.length !== 0 ? (
              users.map((item) => (
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
                        src={storageUrl + item.avatar_url}
                        alt={"avatar"}
                      />
                    </ImageWrapper>
                  </StyledBodyCell>
                  <StyledBodyCell>{item.name}</StyledBodyCell>
                  <StyledBodyCell>{item.total_post}</StyledBodyCell>
                  <StyledBodyCell>{item.sold_post}</StyledBodyCell>
                  <StyledBodyCell>
                    <span
                      style={{
                        marginRight: 10,
                        position: "relative",
                        top: -3.5,
                      }}
                    >
                      {parseInt(item.rating) === item.rating
                        ? item.rating
                        : parseFloat(item.rating).toFixed(1)}
                    </span>
                    <Star />
                  </StyledBodyCell>
                  <StyledBodyCell>{item.level.name}</StyledBodyCell>
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
    </Row>

    {checkedId.length !== 0 ? (
      <Row>
        <Col md={2}>
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
            Detail
          </Button>
        </Col>
      </Row>
    ) : null}
  </>
  );
};

export default UserTop;
