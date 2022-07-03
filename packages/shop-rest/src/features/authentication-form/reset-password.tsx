import { openModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { AuthContext } from "contexts/auth/auth.context";
import SuccessModel from "features/on-success/success";
import { useRouter } from "next/router";
import React, { useContext } from "react";
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
  const [errorPass, setErrorPass] = React.useState("");
  const [errorField, setErrorField] = React.useState("");
  const [errorPassServe, setErrorPassServe] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const { query } = useRouter();

  async function resetCallback(e) {
    if (typeof window !== "undefined") {
      if (!password) {
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

      const configs = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX +
          `/auth/find/${query.token}`,
        configs
      );

      const resetPass = await response.json();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resetPass.email,
          password: password,
          token: resetPass.token,
        }),
      };

      const res = await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX + "/auth/reset",
        options
      );

      const data = await res.json();

      if (data && data.error) {
        setLoading(false);
        setConfirmPass("errorServePass");
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
          componentProps: { textId: "resConfirmEmailSuccessFul" },
        });
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
