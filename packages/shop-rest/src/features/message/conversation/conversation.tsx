import { MessageItem } from "components/message-item/message-item";
import { Tabs } from "components/tabs/tabs";
import { ChatContext } from "contexts/chat/chat.context";
import Router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ChatRole from "../chat-role";

type ConversationProps = {
  chats: any;
  currentUserId: any;
  chatId?: number;
};

const Conversation: React.FC<ConversationProps> = ({
  chats,
  currentUserId,
  chatId,
}) => {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(chatId);
  const { state, dispatch } = useContext(ChatContext);
  const router = useRouter();
  useEffect(() => {}, [chatId]);

  const on = (val) => {
    setActive(val);
    // setSelected(0);
  };

  const onChangeConversation = (id: number) => {
    setSelected(id);
  };

  const onClickConversation = async (id: number) => {
    if (id === state.chatId) {
      return;
    }

    dispatch({
      type: "SET_CHAT_ID",
      payload: { value: id, field: "chatId" },
    });
    dispatch({
      type: "SET_CHAT_UUID",
      payload: { value: id, field: "chatUuid" },
    });
    Router.push(
      {
        pathname: "/message",
        query: { id: id },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="wrap-conversation">
      <Tabs active={active} onChange={on} />
      {active === "all" && (
        <div id="style-1" className={"wrap-conversation-content"}>
          {chats.map((chat) => {
            return (
              <MessageItem
                key={chat.id}
                selected={selected}
                id={chat.id}
                user={chat.role == ChatRole.BUYER ? chat.seller : chat.buyer}
                post={chat.post}
                createdAt={chat.created_at}
                onChange={() => onChangeConversation(chat.id)}
                onClick={() => onClickConversation(chat.id)}
                lastMessageAt={chat.last_message?.created_at}
              />
            );
          })}
        </div>
      )}

      {active === "buy" && (
        <div id="style-1" className={"wrap-conversation-content"}>
          {chats.map((chat) => {
            if (chat.role == ChatRole.BUYER) {
              return (
                <MessageItem
                  key={chat.id}
                  selected={selected}
                  id={chat.id}
                  user={chat.seller}
                  post={chat.post}
                  createdAt={chat.created_at}
                  onChange={() => onChangeConversation(chat.id)}
                  onClick={() => onClickConversation(chat.id)}
                  isOnline={true}
                  lastMessageAt={chat.last_message?.created_at}
                />
              );
            }
          })}
        </div>
      )}

      {active === "sell" && (
        <div id="style-1" className={"wrap-conversation-content"}>
          {chats.map((chat) => {
            if (chat.role == ChatRole.SELLER) {
              return (
                <MessageItem
                  key={chat.id}
                  selected={selected}
                  id={chat.id}
                  user={chat.buyer}
                  post={chat.post}
                  createdAt={chat.created_at}
                  onChange={() => onChangeConversation(chat.id)}
                  onClick={() => onClickConversation(chat.id)}
                  isOnline={true}
                  lastMessageAt={chat.last_message?.created_at}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Conversation;
