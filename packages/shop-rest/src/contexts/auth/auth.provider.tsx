import React, { useReducer } from "react";
import { AuthContext } from "./auth.context";
import { getCookie } from "../../utils/session";
const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!getCookie("access_token"),
  currentForm: "signIn",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        currentForm: "signIn",
      };
    case "RESETPASSWORD":
      return {
        ...state,
        currentForm: "reset",
      };
    case "UPDATEPHONE":
      return {
        ...state,
        currentForm: "updatePhone",
      };
    case "VERIFYEMAIL":
      return {
        ...state,
        currentForm: "verifyMail",
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SIGNIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "SIGNUP":
      return {
        ...state,
        currentForm: "signUp",
      };
    case "FORGOTPASS":
      return {
        ...state,
        currentForm: "forgotPass",
      };
    default:
      return state;
  }
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
