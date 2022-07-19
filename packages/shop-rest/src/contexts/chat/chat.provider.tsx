import moment from "moment";
import React, { useReducer } from "react";
import { ChatContext } from "./chat.context";

type Action =
  | { type: "SET_CHAT_ID"; payload: any }
  | { type: "SET_CHAT_UUID"; payload: any }
  | { type: "SET_DATA_BROADCAST"; payload: any }
  | { type: "SET_DATA_UNREAD"; payload: any }
  | { type: "SET_DATA_MESSAGE"; payload: any }
  | { type: "READ_MESSAGE"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "SET_CHAT_ID":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        messages: [],
      };
    case "SET_CHAT_UUID":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        messages: [],
      };
    case "SET_DATA_BROADCAST":
      return {
        ...state,
        [action.payload.field]: [...state.messages, action.payload.value],
      };
    case "SET_DATA_UNREAD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case "READ_MESSAGE":
      const idx = state.messages.findIndex((m) => m.id == action.payload.value);
      const message = state.messages[idx];
      if (!message) {
        return {
          ...state,
        };
      }

      message.read_at = moment(new Date()).format("YYYY-MM-DD hh:mm:ss a");
      state.messages.splice(idx, 1, message);
      return {
        ...state,
        [action.payload.field]: [...state.messages],
      };
    case "SET_DATA_MESSAGE":
      return {
        ...state,
        [action.payload.field]: [
          ...new Map(
            state.messages
              .concat(action.payload.value)
              .map((item) => [item["id"], item])
          ).values(),
        ],
      };
    default:
      return state;
  }
}

type ChatProviderProps = {
  initData: any;
};

export const ChatProvider: React.FunctionComponent<ChatProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData });
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
