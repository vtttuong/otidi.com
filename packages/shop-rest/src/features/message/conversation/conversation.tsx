import { MessageItem } from "components/message-item/message-item";
import { Tabs } from "components/tabs/tabs";
import { ChatContext } from "contexts/chat/chat.context";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";

type ConversationProps = {
  chats: any;
  currentUserId: any;
  chatUuid?: string;
};

const Conversation: React.FC<ConversationProps> = ({
  chats,
  currentUserId,
  chatUuid,
}) => {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState(chatUuid);
  const { state, dispatch } = useContext(ChatContext);

  useEffect(() => {}, [chatUuid]);

  const on = (val) => {
    setActive(val);
    setSelected("0");
  };

  const onChangeConversation = (id: number, uuid: string) => {
    setSelected(uuid);
  };

  const onClickConversation = async (id: number, uuid: string) => {
    dispatch({
      type: "SET_CHAT_ID",
      payload: { value: id, field: "chatId" },
    });
    dispatch({
      type: "SET_CHAT_UUID",
      payload: { value: uuid, field: "chatUuid" },
    });
    Router.push(
      {
        pathname: "/message",
        query: { uuid: uuid },
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
                uuid={chat.uuid}
                user={
                  chat.sender.id != currentUserId ? chat.sender : chat.receiver
                }
                post={chat.post}
                createdAt={chat.created_at}
                onChange={() => onChangeConversation(chat.id, chat.uuid)}
                onClick={() => onClickConversation(chat.id, chat.uuid)}
                lastSeenAt={
                  chat.sender.id != currentUserId
                    ? chat.sender.last_seen_at
                    : chat.receiver.last_seen_at
                }
              />
            );
          })}
        </div>
      )}

      {active === "buy" && (
        <div id="style-1" className={"wrap-conversation-content"}>
          {chats.map((chat) => {
            if (chat.sender.id == currentUserId) {
              return (
                <MessageItem
                  key={chat.id}
                  selected={selected}
                  uuid={chat.uuid}
                  user={
                    chat.sender.id != currentUserId
                      ? chat.sender
                      : chat.receiver
                  }
                  post={chat.post}
                  createdAt={chat.created_at}
                  onChange={() => onChangeConversation(chat.id, chat.uuid)}
                  onClick={() => onClickConversation(chat.id, chat.uuid)}
                  isOnline={true}
                />
              );
            }
          })}
        </div>
      )}

      {active === "sell" && (
        <div id="style-1" className={"wrap-conversation-content"}>
          {chats.map((chat) => {
            if (chat.receiver.id == currentUserId) {
              return (
                <MessageItem
                  key={chat.id}
                  selected={selected}
                  uuid={chat.uuid}
                  user={
                    chat.sender.id != currentUserId
                      ? chat.sender
                      : chat.receiver
                  }
                  post={chat.post}
                  createdAt={chat.created_at}
                  onChange={() => onChangeConversation(chat.id, chat.uuid)}
                  onClick={() => onClickConversation(chat.id, chat.uuid)}
                  isOnline={true}
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
