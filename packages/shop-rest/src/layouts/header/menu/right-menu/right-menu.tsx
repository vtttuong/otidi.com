import { Message } from "assets/icons/Message";
import { Notify } from "assets/icons/Notify";
import { Button } from "components/button/button";
import PopoverNotify from "components/popover-notify/popover";
import { ProfileContext } from "contexts/profile/profile.context";
import moment from "moment";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";
import Pusher from "pusher-js";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import ScrollableFeed from "react-scrollable-feed";
import { MESSAGE_ITEM } from "site-settings/site-navigation";
import {
  getNotifications,
  markAsAllRead,
  markAsRead,
  parseNotiData,
} from "utils/api/profile";
import { formatRelativeTime } from "utils/formatRelativeTime";
import { getCookie } from "utils/session";
import LanguageSwitcher from "../language-switcher/language-switcher";
import {
  BoxItem,
  BoxItemTime,
  BoxItemTitle,
  BoxRemove,
  NavLinkDiv,
  NotificationWrapper,
  OutOfData,
  RightMenuBox,
} from "./right-menu.style";

const AuthMenu = dynamic(() => import("../auth-menu"), { ssr: false });

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
  isHome?: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
  isHome,
}) => {
  const { state, dispatch } = useContext(ProfileContext);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [notiPage, setNotiPage] = React.useState(1);
  const [outOfData, setOutOfData] = React.useState(false);
  const [dataNotiBroadCast, setDataNotiBroadCast] = React.useState({});
  const [dataMessageBroadCast, setDataMessageBroadCast] = React.useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      if (token !== undefined && token.length > 0) {
        const notiList = await getNotifications(token, notiPage, limit);

        if (notiList === null) {
          return;
        }
        if (notiList.length === 0) {
          setOutOfData(true);
        }

        dispatch({
          type: "SET_NOTI_DATA",
          payload: { value: notiList, field: "dataNotify" },
        });
        setLoading(false);
      }
      return;
    };

    fetchData();
  }, [notiPage]);

  useEffect(() => {
    if (
      Object.keys(dataNotiBroadCast).length === 0 &&
      dataNotiBroadCast.constructor === Object
    ) {
      return;
    }
    let notiUnRead = state.notiUnRead;

    dispatch({
      type: "SET_NOTI_UNREAD_COUNT",
      payload: { value: notiUnRead + 1, field: "notiUnRead" },
    });

    dispatch({
      type: "SET_NOTI_DATA_BROADCAST",
      payload: { value: dataNotiBroadCast, field: "dataNotify" },
    });
  }, [dataNotiBroadCast]);

  useEffect(() => {
    if (router.pathname === "/message") {
      return;
    }

    let messageUnread = state.messageUnread;
    dispatch({
      type: "SET_MESSAGE_UNREAD_COUNT",
      payload: { value: messageUnread + 1, field: "messageUnread" },
    });
  }, [dataMessageBroadCast]);

  useEffect(() => {
    let token = getCookie("access_token");
    if (token !== undefined && token.length > 0) {
      setToken(token);
      const fetchData = async () => {
        const data = await getNotifications(token, notiPage, limit);
        if (data !== null) {
          const notiUnRead = data.filter((item) => item.readAt === null).length;
          dispatch({
            type: "SET_NOTI_UNREAD_COUNT",
            payload: { value: notiUnRead, field: "notiUnRead" },
          });
          dispatch({
            type: "SET_NOTI_DATA",
            payload: { value: data, field: "dataNotify" },
          });
        }
      };
      fetchData();
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });
    let userId = getCookie("userId");

    const channelNoti = pusher.subscribe("privateChannel." + userId);

    channelNoti.bind(
      "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
      async function (data) {
        const notification = await parseNotiData(data);
        let formatTime = await formatRelativeTime(moment());

        notification["id"] = data.id;
        notification["time"] = formatTime.time;
        notification["unit"] = formatTime.unit;
        notification["readAt"] = null;

        setDataNotiBroadCast(notification);
      }
    );

    if (router.pathname === "/message") {
      dispatch({
        type: "SET_MESSAGE_UNREAD_COUNT",
        payload: { value: 0, field: "messageUnread" },
      });
    }

    const channelMessage = pusher.subscribe("myMessage." + userId);
    channelMessage.bind("NewMessage", async function (data) {
      setDataMessageBroadCast(!dataMessageBroadCast);
    });

    if (isAuthenticated == false) {
      dispatch({
        type: "SET_MESSAGE_UNREAD_COUNT",
        payload: { value: 0, field: "messageUnread" },
      });
      dispatch({
        type: "SET_NOTI_UNREAD_COUNT",
        payload: { value: 0, field: "notiUnRead" },
      });
    }
  }, [isAuthenticated]);

  const handler = (
    <NavLinkDiv className="menu-item">
      <Notify />
      {state.notiUnRead > 0 ? <span>{state.notiUnRead}</span> : null}
    </NavLinkDiv>
  );

  const onMarkAllAsRead = async () => {
    const data = await markAsAllRead(token);
    if (data) {
      const fetchData = async () => {
        if (token !== undefined && token.length > 0) {
          const notiList = await getNotifications(token, notiPage, limit);

          if (notiList === null) {
            return;
          }
          if (notiList.length === 0) {
            setOutOfData(true);
          }

          dispatch({
            type: "SET_NOTI_DATA",
            payload: { value: notiList, field: "dataNotify" },
          });
          setLoading(false);
        }
        return;
      };

      fetchData();
    }
  };

  const onFeedMore = () => {
    if (outOfData) return;
    setLoading(true);
    setNotiPage(notiPage + 1);
  };

  const onMessage = () => {
    let token = getCookie("access_token");
    if (!token) {
      Router.push("/login");
    } else {
      Router.push(MESSAGE_ITEM.href);
    }
  };

  const onMarkAsRead = async (id) => {
    let token = getCookie("access_token");
    const res = await markAsRead(token, id);

    if (res == true) {
      const notiUnRead = state.notiUnRead;
      dispatch({
        type: "SET_NOTI_UNREAD_COUNT",
        payload: { value: notiUnRead - 1, field: "notiUnRead" },
      });
      const fetchData = async () => {
        const data = await getNotifications(token, notiPage, limit);
        if (data !== null) {
          const notiUnRead = data.filter((item) => item.readAt === null).length;
          dispatch({
            type: "SET_NOTI_UNREAD_COUNT",
            payload: { value: notiUnRead, field: "notiUnRead" },
          });
          dispatch({
            type: "SET_NOTI_DATA",
            payload: { value: data, field: "dataNotify" },
          });
        }
      };
      fetchData();
    }
  };
  const content =
    state.dataNotify.length == 0 || !state.dataNotify ? (
      <>
        <h3>
          <FormattedMessage id="noNotifications" />
        </h3>
      </>
    ) : (
      <>
        <BoxItem className={"top"}>
          <BoxItemTitle className={"title"}>
            <FormattedMessage id="notification" />
          </BoxItemTitle>
          <BoxRemove onClick={onMarkAllAsRead}>
            <FormattedMessage id="markAllAsRead" />
          </BoxRemove>
        </BoxItem>

        <NotificationWrapper className={"notification-wrapper"}>
          <ScrollableFeed>
            {state.dataNotify &&
              state.dataNotify.map((d) => (
                <BoxItem
                  className={!d.readAt ? "contentDetail read" : "contentDetail"}
                  key={d.id}
                >
                  <BoxItem>
                    <BoxItemTitle>
                      <FormattedMessage id={d.type} />
                    </BoxItemTitle>

                    <BoxItemTime>
                      {d.time} <FormattedMessage id={d.unit} />
                    </BoxItemTime>
                  </BoxItem>
                  <BoxItemTime
                    className={"content"}
                    onClick={() => {
                      Router.push(d.href);
                    }}
                  >
                    <FormattedMessage id={d.messageId} values={d.values} />
                  </BoxItemTime>
                  {!d.readAt ? (
                    <BoxItemTime className={"more"}>
                      <span>...</span>
                      <b onClick={() => onMarkAsRead(d.id)}>
                        <FormattedMessage id="markAsRead" />
                      </b>
                    </BoxItemTime>
                  ) : null}
                </BoxItem>
              ))}
          </ScrollableFeed>
        </NotificationWrapper>
        {outOfData ? (
          <OutOfData>
            <FormattedMessage id="outOfNoti" />
          </OutOfData>
        ) : (
          <Button
            variant="primary"
            size="big"
            style={{
              fontWeight: 600,
              width: "100%",
              background: "#fff",
              color: "#009e7f",
            }}
            onClick={onFeedMore}
            loading={loading}
          >
            <FormattedMessage id="feedMore" />
          </Button>
        )}
      </>
    );
  return (
    <RightMenuBox>
      <NavLinkDiv
        className={
          state.messageUnread > 0 ? "menu-item have-noti" : "menu-item"
        }
        onClick={onMessage}
      >
        <Message />
        {state.messageUnread > 0 ? <span>{state.messageUnread}</span> : null}
      </NavLinkDiv>

      <PopoverNotify
        handler={handler}
        content={content}
        className={"notificationTab"}
        noti={state.dataNotify.length > 0 ? "have-noti" : ""}
      />
      <LanguageSwitcher isHomePage={isHome} />

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};
