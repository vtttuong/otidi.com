import React, { useContext } from "react";
import Link from "next/link";
import { Input } from "components/forms/input";
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
} from "./authentication-form.style";
import { Facebook } from "assets/icons/Facebook";
import { Google } from "assets/icons/Google";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { closeModal } from "@redq/reuse-modal";
import { fail } from "assert";
import SuccessModel from "features/on-success/success";
import { openModal } from "@redq/reuse-modal";
import { setCookie } from "utils/session";
export default function SignOutModal() {
  const intl = useIntl();
  const router = useRouter();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [numberPhone, setNumberPhone] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [errorPass, setErrorPass] = React.useState("");
  const [errorField, setErrorField] = React.useState("");
  const [errorEmailServe, setErrorEmailServe] = React.useState("");
  const [errorPassServe, setErrorPassServe] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  async function registerCallback(e) {
    if (typeof window !== "undefined") {
      if (!userName || !numberPhone || !email || !password) {
        setErrorField("errorField");
        return;
      }
      setErrorField("");
      if (password != confirmPass) {
        setErrorPass("errorConfirmPass");
        return;
      }
      setErrorPass("");
      setLoading(true);

      e.preventDefault();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          phone_number: numberPhone,
          email: email,
          password: password,
          password_confirmation: confirmPass,
        }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX}/auth/register`,
        options
      );
      const data = await res.json();

      if (data && data.error) {
        setLoading(false);
        setErrorEmailServe(data.error.email[0] ? data.error.email[0] : "");
        setErrorPassServe(data.error.password ? data.error.password[0] : "");
        authDispatch({ type: "SIGNUP_FAILED" });
      }

      if (res.ok) {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: false,
          component: SuccessModel,
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: "500px",
            height: "auto",
          },
          componentProps: { textId: "registerSuccess" },
        });
        // setCookie("email", data);
        authDispatch({ type: "SIGNUP_SUCCESS" });
        router.push("/verify-mail");
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id="signUpText"
            defaultMessage="Every fill is required in sign up"
          />
        </SubHeading>
        <Input
          type="text"
          placeholder={intl.formatMessage({
            id: "namePlaceholder",
            defaultMessage: "User name",
          })}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />

        <Input
          type="number"
          placeholder={intl.formatMessage({
            id: "phonePlaceholder",
            defaultMessage: "Contact No.",
          })}
          value={numberPhone}
          onChange={(e) => setNumberPhone(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />

        <Input
          type="email"
          placeholder={intl.formatMessage({
            id: "emailAddressPlaceholder",
            defaultMessage: "Email Address",
          })}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />
        <Input
          type="password"
          placeholder={intl.formatMessage({
            id: "passwordPlaceholder",
            defaultMessage: "Password (min 6 characters)",
          })}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />

        <Input
          type="password"
          placeholder={intl.formatMessage({
            id: "passwordConfirmPlaceholder",
            defaultMessage: "Confirm Password",
          })}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />

        {errorPass && errorPass.length > 0 ? (
          <span
            style={{
              padding: 5,
              marginBottom: 10,
              color: "red",
              display: "block",
              textAlign: "left",
            }}
          >
            <FormattedMessage
              id="errorConfirmPass"
              defaultMessage="Error confirm password"
            />
          </span>
        ) : null}

        {errorField && errorField.length > 0 ? (
          <span
            style={{
              padding: 5,
              marginBottom: 10,
              color: "red",
              display: "block",
              textAlign: "left",
            }}
          >
            <FormattedMessage
              id="errorRegisterField"
              defaultMessage="Check all field required !"
            />
          </span>
        ) : null}

        {errorEmailServe && errorEmailServe.length > 0 ? (
          <span
            style={{
              padding: 5,
              marginBottom: 10,
              color: "red",
              display: "block",
              textAlign: "left",
            }}
          >
            <FormattedMessage
              id="errorRegister"
              defaultMessage={errorEmailServe}
            />
          </span>
        ) : null}
        {errorPassServe && errorPassServe.length > 0 ? (
          <span
            style={{
              padding: 5,
              marginBottom: 10,
              color: "red",
              display: "block",
              textAlign: "left",
            }}
          >
            <FormattedMessage
              id="errorRegister"
              defaultMessage={errorPassServe}
            />
          </span>
        ) : null}
        <HelperText style={{ padding: "20px 0 30px" }}>
          <FormattedMessage
            id="signUpText"
            defaultMessage="By signing up, you agree to 2hands"
          />
          &nbsp;
          <Link href="/">
            <a>
              <FormattedMessage
                id="termsConditionText"
                defaultMessage="Terms &amp; Condition"
              />
            </a>
          </Link>
        </HelperText>
        <Button
          variant="primary"
          size="big"
          width="100%"
          type="submit"
          loading={loading}
          onClick={registerCallback}
        >
          <FormattedMessage id="continueBtn" defaultMessage="Continue" />
        </Button>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>

        <Offer style={{ padding: "20px 0" }}>
          <FormattedMessage
            id="alreadyHaveAccount"
            defaultMessage="Already have an account?"
          />{" "}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
