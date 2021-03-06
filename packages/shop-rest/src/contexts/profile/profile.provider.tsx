import React, { useReducer } from "react";
import { v4 as uuidV4 } from "uuid";
import schedules from "features/checkouts/data";
import { ProfileContext } from "./profile.context";

type Action =
  | { type: "HANDLE_ON_INPUT_CHANGE"; payload: any }
  | { type: "ADD_OR_UPDATE_CONTACT"; payload: any }
  | { type: "DELETE_CONTACT"; payload: any }
  | { type: "ADD_OR_UPDATE_ADDRESS"; payload: any }
  | { type: "DELETE_ADDRESS"; payload: any }
  | { type: "ADD_CARD"; payload: any }
  | { type: "DELETE_CARD"; payload: any }
  | { type: "SET_PRIMARY_CONTACT"; payload: any }
  | { type: "SET_PRIMARY_ADDRESS"; payload: any }
  | { type: "SET_PRIMARY_SCHEDULE"; payload: any }
  | { type: "SET_PRIMARY_CARD"; payload: any }
  | { type: "SET_NOTI_UNREAD_COUNT"; payload: any }
  | { type: "SET_MESSAGE_UNREAD_COUNT"; payload: any }
  | { type: "SET_NOTI_DATA"; payload: any }
  | { type: "SET_NOTI_DATA_BROADCAST"; payload: any }
  | { type: "SET_PAYMENT_INFO"; payload: any }
  | { type: "SET_DISCOUNT_PAYMENT_INFO"; payload: any }
  | { type: "SET_PRIMARY_PAYMENT"; payload: any }
  | { type: "SET_PRIMARY_BALANCE"; payload: any }
  | { type: "RESET_NOTI_DATA"; payload: any }
  | { type: "MARK_AS_READ_NOTI"; payload: any }
  | { type: "MARK_AS_READ_ALL_NOTI"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "HANDLE_ON_INPUT_CHANGE":
      return { ...state, [action.payload.field]: action.payload.value };
    case "ADD_OR_UPDATE_CONTACT":
      if (action.payload.id) {
        return {
          ...state,
          contact: state.contact.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newContact = {
        ...action.payload,
        id: uuidV4(),
        type: state.contact.length === "0" ? "primary" : "secondary",
      };
      return {
        ...state,
        contact: [...state.contact, newContact],
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contact: state.contact.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case "ADD_OR_UPDATE_ADDRESS":
      if (action.payload.id) {
        return {
          ...state,
          address: state.address.map((item: any) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload }
              : item
          ),
        };
      }
      const newAdress = {
        ...action.payload,
        id: uuidV4(),
        type: state.address.length === "0" ? "primary" : "secondary",
      };
      return {
        ...state,
        address: [...state.address, newAdress],
      };
    case "DELETE_ADDRESS":
      return {
        ...state,
        address: state.address.filter(
          (item: any) => item.id !== action.payload
        ),
      };
    case "ADD_CARD":
      const newCard = {
        id: action.payload.id,
        type: state.card.length === "0" ? "primary" : "secondary",
        cardType: action.payload.brand.toLowerCase(),
        name: state.name,
        lastFourDigit: action.payload.last4,
      };
      return {
        ...state,
        card: [newCard, ...state.card],
      };
    case "DELETE_CARD":
      return {
        ...state,
        card: state.card.filter((item: any) => item.id !== action.payload),
      };
    case "SET_PRIMARY_CONTACT":
      return {
        ...state,
        contact: state.contact.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_ADDRESS":
      return {
        ...state,
        address: state.address.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_CARD":
      return {
        ...state,
        card: state.card.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_NOTI_UNREAD_COUNT":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_MESSAGE_UNREAD_COUNT":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_NOTI_DATA":
      return {
        ...state,
        [action.payload.field]: [
          ...new Map(
            state.dataNotify
              .concat(action.payload.value)
              .map((item) => [item["id"], item])
          ).values(),
        ],
      };

    case "MARK_AS_READ_NOTI":
      return {
        ...state,
        [action.payload.field]: [
          ...state.dataNotify.map((item) =>
            item.id == action.payload.id
              ? {
                  ...item,
                  readAt: new Date().toISOString(),
                }
              : { ...item }
          ),
        ],
      };

    case "MARK_AS_READ_ALL_NOTI":
      return {
        ...state,
        [action.payload.field]: [
          ...state.dataNotify.map((item) => ({
            ...item,
            readAt: new Date().toISOString(),
          })),
        ],
      };
    case "RESET_NOTI_DATA":
      return {
        ...state,
        [action.payload.field]: [],
      };
    case "SET_NOTI_DATA_BROADCAST":
      return {
        ...state,
        [action.payload.field]: [action.payload.value, ...state.dataNotify],
      };
    case "SET_PAYMENT_INFO":
      return { ...state, [action.payload.field]: action.payload.value };
    case "SET_DISCOUNT_PAYMENT_INFO":
      return { ...state, [action.payload.field]: action.payload.value };

    case "SET_PRIMARY_PAYMENT":
      return {
        ...state,
        amount: state.balances[0].value,
        voucher: "",
        phone: "",
        payments: state.payments.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
        balances: state.balances.map((item: any) =>
          item.id === "1"
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };
    case "SET_PRIMARY_BALANCE":
      return {
        ...state,
        balances: state.balances.map((item: any) =>
          item.id === action.payload
            ? { ...item, type: "primary" }
            : { ...item, type: "secondary" }
        ),
      };

    default:
      return state;
  }
}

type ProfileProviderProps = {
  initData?: any;
};

export const ProfileProvider: React.FunctionComponent<ProfileProviderProps> = ({
  children,
  initData,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initData, schedules });

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
