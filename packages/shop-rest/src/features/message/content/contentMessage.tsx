import { Camera } from "assets/icons/camera";
import { CircleFill } from "assets/icons/CircleFill";
import { CursorFill } from "assets/icons/CursorFill";
import { FileEarmarkfill } from "assets/icons/FileEarmarkFill";
import { TelephoneFill } from "assets/icons/TelephoneFill";
import { ThreeDotsVertical } from "assets/icons/ThreeDotsVertical";
import { Avatar } from "components/avatar/avatar";
import { MessageText } from "components/message-text/message-text";
import { ChatContext } from "contexts/chat/chat.context";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import Loader from "react-loader-spinner";
import { getMessages, sendMessage, readMessage } from "utils/api/chat";
import { numberWithCommas } from "utils/formatNumber";
import { formatRelativeTime } from "utils/formatRelativeTime";
import { formatCreatedAtTime } from "utils/formatTime";

type ContentMessageProp = {
  currentUserId?: number;
  token: string;
  chats: any;
};
const ContentMessage: React.FC<ContentMessageProp> = ({
  token,
  currentUserId,
  chats,
}) => {
  const { state, dispatch } = useContext(ChatContext);
  const router = useRouter();
  const scrollRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [valueImg, setValueImg] = useState("");

  const chat = chats.find((chat) => chat.id == state.chatId);
  const client = chat.sender_id != currentUserId ? chat.sender : chat.receiver;

  for (let i = 0; i < state.messages?.length; i++) {
    if (state.messages[i]?.user_id != state.messages[i + 1]?.user_id)
      state.messages[i].isAvata = true;
    else state.messages[i].isAvata = false;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(token, state.chatId);
      dispatch({
        type: "SET_DATA_MESSAGE",
        payload: { value: data, field: "messages" },
      });
    };

    fetchData();
  }, [state.chatId]);

  useEffect(() => {
    if (token !== undefined && token.length > 0) {
      const fetchData = async () => {
        const data = await getMessages(token, state.chatId);

        dispatch({
          type: "SET_DATA_MESSAGE",
          payload: { value: data, field: "messages" },
        });
      };
      fetchData();
    }

    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });
    const channel = pusher.subscribe("myMessage." + currentUserId);

    channel.bind("NewMessage", async function (data) {
      let message = {
        chat_id: state.chatId,
        content: data.content,
        isAvata: true,
        user_id: data.user.id,
        id: data.id,
      };

      dispatch({
        type: "SET_DATA_BROADCAST",
        payload: { value: message, field: "messages" },
      });

      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  useLayoutEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  const myFunction = (val) => {
    setShowDropdown(val);
  };
  
  const onMouseDown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  };

  const onMouse = async () => {
    const res = await readMessage(token, state.chatId);
  };

  const onClickSuggest = (val: string) => {
    setValueInput(val);
  };

  const onUpImage = () => {
    document.getElementById("imgupload").click();
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      onSendMessage(event.target.value);
      setValueInput("");
    }
  };

  const onSendMessage = async (content: string) => {
    let message = {
      chat_id: state.chatId,
      content: JSON.stringify({ content: content }),
      isAvata: false,
      user_id: currentUserId,
      id: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10),
      refEndMessage: true,
    };
    dispatch({
      type: "SET_DATA_BROADCAST",
      payload: { value: message, field: "messages" },
    });
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    const data = await sendMessage(token, content, state.chatId);
  };

  if (state.messages === undefined) {
    return (
      <>
        <Loader type="TailSpin" color="#009F7F" height={50} width={50} />
      </>
    );
  }

  const messagesHandle = () => {
    if (state.messages.length == 0) {
      return (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Loader
            type="TailSpin"
            color="#009F7F"
            height={50}
            width={50}
            timeout={3000}
          />
        </div>
      );
    } else {
      return state.messages.map((message, index) => (
        <MessageText
          position="top"
          isRight={message.user_id == currentUserId ? true : false}
          data={JSON.parse(message.content).content}
          endMessage={false}
          key={message.id}
          user_id={message.user_id}
          src={
            message.isAvata == true && message.user_id != currentUserId
              ? client.avatar_img_url
              : ""
          }
          clickAvatar={() =>
            router.push("/profile/[id]", `/profile/${message.user_id}`)
          }
          refEndMessage={
            message.refEndMessage
              ? scrollRef
              : index == state.messages.length - 1
              ? scrollRef
              : null
          }
        />
      ));
    }
  };

  if (client.last_seen_at) {
    var relativeTime = formatRelativeTime(client.last_seen_at);
    console.log(relativeTime);
  }

  return (
    <>
      <div onMouseDown={onMouseDown} className="wrap-contentmessage container">
        <div className="header-content">
          <div style={{ display: "flex" }}>
            <div className="header-avatar">
              <Avatar
                width={30}
                height={30}
                radius="25px"
                src={client?.avatar_img_url}
                type={"user"}
                clientId={client.id}
              />
            </div>
            <div className="header-infor">
              <div className="name">{client?.name}</div>
              <div style={{ color: "#9e9e9e", display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {client.last_seen_at ? (
                    <CircleFill width={8} color="#9e9e9e" />
                  ) : (
                    <CircleFill width={8} color="#008000" />
                  )}
                </div>
                &nbsp;
                {client.last_seen_at ? (
                  <div>
                    Online {relativeTime["time"]}
                    <FormattedMessage id={relativeTime["unit"]} />
                  </div>
                ) : (
                  <div>Online</div>
                )}
              </div>
            </div>
          </div>
          <div className="header-action">
            <div className="call">
              <a
                href={`tel:${client?.phone_number}`}
                style={{ color: "#009e7f" }}
              >
                <TelephoneFill width={18} />
                &nbsp; &nbsp;
                <FormattedMessage id="call" defaultMessage="Call" />
              </a>
            </div>
            <div className="dropdown">
              <span
                onClick={() => myFunction(!showDropdown)}
                style={{ padding: 5, cursor: "pointer" }}
              >
                <ThreeDotsVertical width={20} />
              </span>

              {showDropdown && (
                <div id="thuthuat" className="dropdown-content">
                  <span>
                    <div className="action-icon">
                      <i className="fas fa-ban"></i> &nbsp;
                    </div>
                    <div>
                      <div style={{ fontWeight: 550 }}>
                        <FormattedMessage
                          id="block-title"
                          defaultMessage="Ban this person"
                        />
                      </div>
                      <div className="description">
                        <FormattedMessage id="block" defaultMessage="Block" />{" "}
                      </div>
                    </div>
                  </span>
                  <span>
                    <div className="action-icon">
                      <i className="fas fa-flag"></i> &nbsp;
                    </div>
                    <div>
                      <div style={{ fontWeight: 550 }}>
                        <FormattedMessage
                          id="report-title"
                          defaultMessage="Ban this person"
                        />
                      </div>
                      <div className="description">
                        <FormattedMessage id="report" defaultMessage="Report" />
                      </div>
                    </div>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="header-receive">
          <div style={{ display: "flex" }}>
            <div className="header-avatar ">
              <Avatar
                radius="5px"
                src={chat.post.main_img_url}
                type={"post"}
                post={chat.post}
              />
            </div>
            <div className="header-infor">
              <div className="name">{chat.post.title}</div>
              <div className="money">
                {numberWithCommas(chat.post.price)}
                {"   "}
                {chat.post.unit}
              </div>
            </div>
          </div>
        </div>

        <div id="style-1" className="content" onMouseEnter={onMouse}>
          <div className="time-space">
            {formatCreatedAtTime(chat.created_at)}
          </div>
          {messagesHandle()}
        </div>

        <div className="footer-chat">
          <div id="style-1" className="wrap-suggest">
            <span
              className="text-suggest"
              onClick={() => onClickSuggest("Cảm ơn bạn")}
            >
              Cảm ơn bạn
            </span>
            <span
              className="text-suggest"
              onClick={() => onClickSuggest("Tôi sẽ suy nghĩ thêm")}
            >
              Tôi sẽ suy nghĩ thêm
            </span>
            <span
              className="text-suggest"
              onClick={() => onClickSuggest("Hẹn gặp lại bạn")}
            >
              Hẹn gặp lại bạn
            </span>
            <span
              className="text-suggest"
              onClick={() => onClickSuggest("Tôi đồng ý")}
            >
              Tôi đồng ý
            </span>
            <span
              className="text-suggest"
              onClick={() => onClickSuggest("Mình xin địa chỉ")}
            >
              Mình xin địa chỉ
            </span>
          </div>

          <div className="wrap-enter-chat">
            <div>
              <span onClick={onUpImage} className="icon">
                <Camera width={16} />
              </span>
            </div>
            <div>
              <span onClick={onUpImage} className="icon">
                <FileEarmarkfill width={16} />
              </span>
            </div>
            <div className="wrap-input-chat">
              <div>
                <input
                  type="file"
                  id="imgupload"
                  onChange={(e) => setValueImg(e.target.value)}
                  value={valueImg}
                  style={{ display: "none" }}
                />
                <input
                  onChange={(e) => setValueInput(e.target.value)}
                  value={valueInput}
                  type="text"
                  id="input-text"
                  placeholder="Viết tin nhắn..."
                  className="input-chat"
                  onKeyDown={(e) => handleKeyDown(e)}
                ></input>
                <span
                  onClick={() => {
                    onSendMessage(valueInput);
                    setValueInput("");
                  }}
                  className="btn-send"
                >
                  <CursorFill width={20} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentMessage;
