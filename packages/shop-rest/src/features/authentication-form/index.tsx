import React, { useContext } from "react";
import SignInForm from "./login";
import SignOutForm from "./register";
import ForgotPassForm from "./forgot-password";
import ResetPassForm from "./reset-password";
import Phone from "./update-phone";
import VerifyMail from "./verify-mail";
import { AuthContext } from "contexts/auth/auth.context";

export default function AuthenticationForm() {
  const { authState } = useContext<any>(AuthContext);
  let RenderForm;

  if (authState.currentForm === "signIn") {
    RenderForm = SignInForm;
  }

  if (authState.currentForm === "signUp") {
    RenderForm = SignOutForm;
  }

  if (authState.currentForm === "forgotPass") {
    RenderForm = ForgotPassForm;
  }

  if (authState.currentForm === "reset") {
    RenderForm = ResetPassForm;
  }
  if (authState.currentForm === "updatePhone") {
    RenderForm = Phone;
  }
  if (authState.currentForm === "verifyMail") {
    RenderForm = VerifyMail;
  }
  return <RenderForm />;
}
