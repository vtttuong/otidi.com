import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import { AuthContext } from "contexts/auth/auth.context";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper, {
  BtnRemove,
  BoxSave,
  SearchSaveItem,
  SearchSave,
} from "./header.style";
import { openModal } from "@redq/reuse-modal";
import LogoImage from "assets/images/logo.png";
import { Saved } from "assets/icons/Saved";
import Search from "features/search/search";
import { setCookie, getCookie, removeCookie } from "utils/session";
import Pusher from "pusher-js";
import { ProfileProvider } from "contexts/profile/profile.provider";
import { FormattedMessage } from "react-intl";
import { getMyprofile, getMyText, logout } from "utils/api/profile";
import AuthenticationForm from "features/authentication-form";
import ProgressBox from "components/progress-routing/progress-bar";
import { useAppDispatch } from "contexts/app/app.provider";
import { POSTS } from "site-settings/site-navigation";

type Props = {
  className?: string;
  data?: any;
  texts?: any;
  closeSearch?: any;
  isHome?: boolean;
};

const Header: React.FC<Props> = ({ className, isHome }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  let initialData = {
    messageUnread: 0,
    notiUnRead: 0,
    dataNotify: [],
  };
  const [token, setToken] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [texts, setTexts] = React.useState([]);

  useEffect(() => {
    // Always do navigations after the first render
    getData();
    getSearchText();
  }, [isAuthenticated, update]);

  const getData = async () => {
    const token = getCookie("access_token");
    setToken(token);

    if (token != null) {
      const data = await getMyprofile(token);

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      });
      pusher.subscribe("privateChannel." + data.id);

      setAvatar(data.avatar);
      setCookie("userId", data.id);
      setCookie("userAvatar", data.avatar);
      setCookie("userName", data.name);
      setCookie("userEmail", data.email);
      setCookie("userAddress", data.address);
      setCookie("userPhone", data.phone_number);
      setCookie("phone_verified_at", data.phone_verified_at);
      setCookie("email_verified_at", data.email_verified_at);
      setCookie("identity_verified_at", data.identity_verified_at);
      setCookie("balance", data.balance);
      setCookie(
        "userFrontId",
        data.identity_card ? data.identity_card.img_front_url : null
      );
      setCookie(
        "userBackId",
        data.identity_card ? data.identity_card.img_back_url : null
      );
    }
  };

  const getSearchText = async () => {
    const token = getCookie("access_token");

    if (token != null) {
      const text = await getMyText(token);

      setTexts(text);
    }
  };

  const handleLogout = async () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 500);
    await logout(token);

    if (typeof window !== "undefined") {
      removeCookie("access_token");
      removeCookie("userId");
      removeCookie("userAvatar");
      removeCookie("userPhone");
      removeCookie("balance");
      removeCookie("userEmail");
      removeCookie("phone_verified_at");
      removeCookie("hasVerifiedPhone");
      authDispatch({ type: "SIGN_OUT" });
      Router.push("/");
    }
  };

  const handleJoin = () => {
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
        minWidth: 458,
        height: "auto",
      },
    });
    // Router.push("/login");
  };

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const closeSearch = () => {
    setIsComponentVisible(false);
  };

  const onGetText = (text) => {
    if (text.length > 2) {
      setUpdate(!update);
      return;
    }
  };

  return (
    <ProfileProvider initData={initialData}>
      <HeaderWrapper className={className} id="layout-header">
        <LeftMenu logo={LogoImage} />
        <BoxSave ref={ref}>
          <Search
            onGetText={onGetText}
            minimal={true}
            token={token}
            className="headerSearch"
            onClick={() => setIsComponentVisible(true)}
            onSubmit={() => setIsComponentVisible(false)}
          />
          {isComponentVisible && (
            <ShowHistory
              texts={texts}
              closeSearch={closeSearch}
              isAuthenticated={isAuthenticated}
              getSearchText={getSearchText}
            />
          )}
        </BoxSave>
        <RightMenu
          isAuthenticated={isAuthenticated}
          onJoin={handleJoin}
          onLogout={handleLogout}
          avatar={avatar}
          isHome={isHome}
        />
      </HeaderWrapper>
    </ProfileProvider>
  );
};

export default Header;

function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

type ShowHistoryProps = {
  className?: string;
  data?: any;
  texts?: any;
  closeSearch?: any;
  getSearchText: () => void;
  isAuthenticated?: boolean;
};

const ShowHistory: React.FC<ShowHistoryProps> = ({
  texts,
  closeSearch,
  isAuthenticated,
  getSearchText,
}) => {
  const [token, setToken] = useState("");
  const [togle, setToggle] = useState(false);
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setToken(getCookie("access_token"));
  });

  useEffect(() => {
    getSearchText();
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  const handleSearch = (text) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: text });
    closeSearch();
    let queryParams = {
      text: text,
    };

    router.push({
      pathname: POSTS,
      query: {
        ...queryParams,
      },
    });
  };

  return (
    <>
      <BoxSave className={togle ? "toggle save" : "save"}>
        {token ? (
          <SearchSave className={"first"}>
            <BoxSave className={"title saved"}>
              <Saved />
              <FormattedMessage id="searchSaved" />
              <BtnRemove
                onClick={() => {
                  Router.push(`/profile/history-search`);
                  setToggle(true);
                }}
              >
                <FormattedMessage id="searchSetting" />
              </BtnRemove>
            </BoxSave>
            {texts.length != 0 ? (
              texts.map((item) => {
                return (
                  <SearchSaveItem
                    key={item.id}
                    onClick={() => handleSearch(item.keyword)}
                  >
                    {item.keyword}
                  </SearchSaveItem>
                );
              })
            ) : (
              <p
                style={{
                  color: "#009e7f",
                  margin: "20px auto",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                <FormattedMessage id="noData" defaultMessage={"No data"} />
              </p>
            )}
          </SearchSave>
        ) : null}
      </BoxSave>
    </>
  );
};
