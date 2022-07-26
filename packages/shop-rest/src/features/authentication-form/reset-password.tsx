import { openModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { AuthContext } from "contexts/auth/auth.context";
import SuccessModel from "features/on-success/success";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  Container,
  // Input,
  Divider,
  Heading,
  LinkButton,
  Offer,
  SubHeading,
  Wrapper,
} from "./authentication-form.style";

export default function ResetModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [confirmPass, setConfirmPass] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = useState({
    length: null,
    field: null,
    token: null,
    confirmPass: null,
  });

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const { query } = useRouter();

  async function resetCallback(e) {
    setError({
      length: null,
      field: null,
      token: null,
      confirmPass: null,
    });

    if (typeof window !== "undefined") {
      if (!password) {
        setError((prev) => ({ ...prev, field: "errorField" }));
        return;
      }

      if (password.length < 6) {
        setError((prev) => ({ ...prev, length: "errorPassLength" }));
        return;
      }
      if (password != confirmPass) {
        setError((prev) => ({ ...prev, confirmPass: "errorConfirmPass" }));
        return;
      }

      setLoading(true);
      e.preventDefault();

      const configs = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
      };
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX +
            `/auth/find/${query.token}`,
          configs
        );

        const resetPass = await response.json();

        if (!resetPass.success) {
          setLoading(false);
          setError((prev) => ({ ...prev, token: "invalidToken" }));
          return;
        }

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            email: resetPass.data.email,
            password: password,
            password_confirmation: confirmPass,
            token: resetPass.data.token,
          }),
        };

        const res = await fetch(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX + "/auth/reset",
          options
        );

        const resetResult = await res.json();

        if (!resetResult.success) {
          setLoading(false);
          setConfirmPass("errorServePass");
          setError((prev) => ({ ...prev, token: "invalidToken" }));
        }

        if (resetResult.success) {
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
            componentProps: {
              textId: "resetPasswordSuccessfully",
              btnId: "loginBtnText",
              href: "/login",
            },
          });
        }
      } catch (err) {
        setLoading(false);
        setError((prev) => ({ ...prev, token: "invalidToken" }));
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage
            id="resetPasswordBtn"
            defaultMessage="Reset Password"
          />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id="resetTextLong"
            defaultMessage="Every fill is required in sign up"
          />
        </SubHeading>

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
            id: "confirmPasswordPlaceholder",
            defaultMessage: "Confirm Password",
          })}
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
          height="48px"
          backgroundColor="#F7F7F7"
          mb="10px"
        />

        {error && error.length ? (
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
              id={error.length}
              defaultMessage="Password must be at least 6 characters"
            />
          </span>
        ) : null}

        {error && error.field ? (
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
              id={error.field}
              defaultMessage="Check all field required !"
            />
          </span>
        ) : null}

        {error && error.confirmPass ? (
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
              id={error.confirmPass}
              defaultMessage="Password and confirm password doesn't match"
            />
          </span>
        ) : null}

        {error && error.token ? (
          <span
            style={{
              padding: 5,
              marginBottom: 10,
              color: "red",
              display: "block",
              textAlign: "left",
            }}
          >
            <FormattedMessage id={error.token} defaultMessage="Invalid token" />
          </span>
        ) : null}

        <Button
          variant="primary"
          size="big"
          width="100%"
          type="submit"
          loading={loading}
          onClick={resetCallback}
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
