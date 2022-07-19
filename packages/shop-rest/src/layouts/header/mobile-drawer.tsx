import React, { useContext, useEffect, useState } from "react";
import { openModal } from "@redq/reuse-modal";
import Router from "next/router";
import { FormattedMessage } from "react-intl";
import { Scrollbar } from "components/scrollbar/scrollbar";
import Drawer from "components/drawer/drawer";
import { Button } from "components/button/button";
import NavLink from "components/nav-link/nav-link";
import { CloseIcon } from "assets/icons/CloseIcon";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import Pusher from "pusher-js";
import {
  DrawerBody,
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from "./header.style";
import UserImage from "assets/images/user.jpg";
import {
  MOBILE_DRAWER_MENU,
  PROFILE_PAGE,
} from "site-settings/site-navigation";
import { useAppState, useAppDispatch } from "contexts/app/app.provider";
import { getCookie, removeCookie, setCookie } from "utils/session";
import { getMyprofile } from "utils/api/profile";

const MobileDrawer: React.FunctionComponent = () => {
  const isDrawerOpen = useAppState("isDrawerOpen");
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  useEffect(() => {
    // Always do navigations after the first render
    getData();
  }, [isAuthenticated]);

  const getData = async () => {
    const token = getCookie("access_token");
    // setToken(token);

    if (token != null) {
      const data = await getMyprofile(token);

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      });
      pusher.subscribe("privateChannel." + data.id);

      setAvatar(data.avatar);
      setName(data.name);
      setPhoneNumber(data.phone_number);
      setCookie("userId", data.id);
      setCookie("userAvatar", data.avatar);
      setCookie("userName", data.name);
      setCookie("userEmail", data.email);
      setCookie("userPhone", data.phone_number);
      setCookie("phone_verified_at", data.phone_verified_at);
      setCookie("balance", data.balance);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      removeCookie("access_token");
      removeCookie("userId");
      removeCookie("userAvatar");
      removeCookie("userPhone");
      removeCookie("balance");
      removeCookie("userEmail");
      removeCookie("phone_verified_at");
      authDispatch({ type: "SIGN_OUT" });
      Router.push("/");
    }
  };

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });

    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  return (
    <Drawer
      width="380px"
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <DrawerBody>
        <Scrollbar className="drawer-scrollbar">
          <DrawerContentWrapper>
            <DrawerProfile>
              {isAuthenticated ? (
                <>
                  <LoginView>
                    <UserAvatar>
                      <img src={avatar} alt="user_avatar" />
                    </UserAvatar>
                    <UserDetails>
                      <h3>{name}</h3>
                      <span>{phoneNumber}</span>
                    </UserDetails>
                  </LoginView>
                  <DrawerMenu>
                    {MOBILE_DRAWER_MENU.map((item) => (
                      <DrawerMenuItem key={item.id}>
                        <NavLink
                          onClick={toggleHandler}
                          href={item.href}
                          label={item.defaultMessage}
                          intlId={item.id}
                          className="drawer_menu_item"
                        />
                      </DrawerMenuItem>
                    ))}
                  </DrawerMenu>
                </>
              ) : (
                <LogoutView>
                  <Button variant="primary" onClick={signInOutForm}>
                    <FormattedMessage
                      id="mobileSignInButtonText"
                      defaultMessage="join"
                    />
                  </Button>
                </LogoutView>
              )}
            </DrawerProfile>

            {isAuthenticated && (
              <UserOptionMenu>
                <DrawerMenuItem>
                  <div onClick={handleLogout} className="drawer_menu_item">
                    <span className="logoutBtn">
                      <FormattedMessage
                        id="nav.logout"
                        defaultMessage="Logout"
                      />
                    </span>
                  </div>
                </DrawerMenuItem>
              </UserOptionMenu>
            )}
          </DrawerContentWrapper>
        </Scrollbar>
      </DrawerBody>
    </Drawer>
  );
};

export default MobileDrawer;
