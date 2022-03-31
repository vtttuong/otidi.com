import { AlertDotIcon } from "assets/icons/AlertDotIcon";
import { ArrowLeftRound } from "assets/icons/ArrowLeftRound";
import { MenuIcon } from "assets/icons/MenuIcon";
import { NotificationIcon } from "assets/icons/NotificationIcon";
import Logoimage from "assets/image/logo.png";
import UserImage from "assets/image/user.jpg";
import Drawer, { ANCHOR } from "components/Drawer/Drawer";
import Notification from "components/Notification/Notification";
import Popover, { PLACEMENT } from "components/Popover/Popover";
import { AuthContext } from "context/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getNotifications,
  markAsAllRead,
  markAsRead,
} from "service/use-notification";
import { STAFF_MEMBERS } from "settings/constants";
import Sidebar from "../Sidebar/Sidebar";
import {
  AlertDot,
  CloseButton,
  DrawerIcon,
  DrawerWrapper,
  Image,
  Logo,
  LogoImage,
  LogoutBtn,
  NavLink,
  NotificationIconWrapper,
  ProfileImg,
  TopbarRightSide,
  TopbarWrapper,
  UserDropdowItem,
} from "./Topbar.style";

const Topbar = ({ refs }: any) => {
  const { signout } = React.useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [outOfData, setOutOfData] = React.useState(false);
  const [notiUnRead, setNotiUnRead] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getNotifications(page, 10);

      if (newData && newData.length === 0) {
        setOutOfData(true);
      }

      if (data && newData) {
        setData(data.concat(newData));
        const unReadCount = newData.filter((item) => item.readAt === null)
          .length;

        setNotiUnRead(notiUnRead + unReadCount);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const feedBtnClick = () => {
    if (outOfData) return;
    setLoading(true);
    setPage(page + 1);
  };

  const read = async (id) => {
    markAsRead(id);
  };

  const readAll = async () => {
    setNotiUnRead(0);
    markAsAllRead();
  };

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <Link to="/">
          <LogoImage src={Logoimage} alt="secondhandshop-admin" />
        </Link>
      </Logo>

      <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: "1",
              },
            },
            DrawerBody: {
              style: {
                marginRight: "0",
                marginLeft: "0",
                "@media only screen and (max-width: 767px)": {
                  marginLeft: "30px",
                },
              },
            },
            DrawerContainer: {
              style: {
                width: "270px",
                "@media only screen and (max-width: 767px)": {
                  width: "80%",
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper>

      <TopbarRightSide>
        {/* <Button onClick={openDrawer}>Add Products</Button> */}

        <Popover
          content={() => (
            <Notification
              data={data}
              read={read}
              readAll={readAll}
              feedBtnClick={feedBtnClick}
              loading={loading}
            />
          )}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: "330px",
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            {notiUnRead > 0 && (
              <AlertDot>
                <AlertDotIcon />
              </AlertDot>
            )}
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink to={STAFF_MEMBERS} exact={false} onClick={close}>
                Staff
              </NavLink>
              {/*<NavLink to={SETTINGS} exact={false} onClick={close}>*/}
              {/*  Settings*/}
              {/*</NavLink>*/}
              <LogoutBtn
                onClick={() => {
                  signout();
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={"tooltip"}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: "220px",
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: "#ffffff",
              },
            },
          }}
        >
          <ProfileImg>
            <Image src={UserImage} alt="user" />
          </ProfileImg>
        </Popover>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
