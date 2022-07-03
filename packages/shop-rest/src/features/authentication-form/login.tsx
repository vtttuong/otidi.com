import React, { useContext } from "react";
import {
  Button,
  Container,
  Divider,
  Heading,
  LinkButton,
  Offer,
  OfferSection,
  SubHeading,
  Wrapper,
} from "./authentication-form.style";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage, useIntl } from "react-intl";
import { closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { useRouter } from "next/router";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { setCookie } from "utils/session";
import { Facebook } from "assets/icons/Facebook";
import { FaFacebookSquare } from "react-icons/fa";

export default function SignInModal() {
  const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const API_BASE_URL = process.env.NEXT_PUBLIC_LARAVEL_API_BASE_URL;

  const intl = useIntl();
  const router = useRouter();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const toggleSignUpForm = () => {
    authDispatch({
      type: "SIGNUP",
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: "FORGOTPASS",
    });
  };

  const responseFacebook = async (response) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "social",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        provider: "facebook",
        access_token: response.accessToken,
      }),
    };
    const res = await fetch(`${API_BASE_URL}/oauth/token`, options);
    const data = await res.json();

    if (data && data.error) {
      setError(data.error);
      setLoading(false);
      authDispatch({ type: "SIGNIN_FAILED" });
    }

    if (data && data.access_token) {
      setCookie("access_token", data.access_token);
      authDispatch({ type: "SIGNIN_SUCCESS" });
      if (router.pathname == "/login") {
        router.back();
      } else {
        closeModal();
      }
    }
  };
  const responseFaildGoogle = (response) => {
    console.log(response);
  };
  const responseGoogle = async (response) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "social",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        provider: "google",
        access_token: response.accessToken,
      }),
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_LARAVEL_API_URL + "/oauth/token",
      options
    );
    const data = await res.json();

    if (data && data.error) {
      setError(data.error);
      setLoading(false);
      authDispatch({ type: "SIGNIN_FAILED" });
    }

    if (data && data.access_token) {
      setCookie("access_token", data.access_token);
      authDispatch({ type: "SIGNIN_SUCCESS" });
      if (router.pathname == "/login") {
        router.back();
      } else {
        closeModal();
      }
    }
  };

  async function loginCallback(e) {
    if (typeof window !== "undefined") {
      setLoading(true);

      e.preventDefault();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
          grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          provider: process.env.NEXT_PUBLIC_PROVIDER,
        }),
      };
      const res = await fetch(`${API_BASE_URL}/oauth/token`, options);

      const data = await res.json();
      console.log(data);
      if (data && data.error) {
        setError(data.error);
        setLoading(false);
        authDispatch({ type: "SIGNIN_FAILED" });
        return;
      }

      if (data && data.access_token) {
        setCookie("access_token", data.access_token);
        authDispatch({ type: "SIGNIN_SUCCESS" });
        if (router.pathname == "/login") {
          router.back();
        } else {
          closeModal();
        }
      }
    }
  }

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="loginText"
            defaultMessage="Login with your email &amp; password"
          />
        </SubHeading>
        <form onSubmit={loginCallback}>
          <Input
            type="email"
            placeholder={intl.formatMessage({
              id: "emailAddressPlaceholder",
              defaultMessage: "Email Address.",
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
          {error && error.length > 0 ? (
            <span
              style={{
                padding: 5,
                marginBottom: 10,
                color: "red",
                display: "block",
                textAlign: "left",
              }}
            >
              <FormattedMessage id="errorLogin" defaultMessage="Error login" />
            </span>
          ) : null}
          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            type="submit"
            loading={loading}
          >
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
        </form>
        <Divider>
          <span>
            <FormattedMessage id="orText" defaultMessage="or" />
          </span>
        </Divider>
        <div className="social">
          <FacebookLogin
            cssClass="facebook-login-button"
            appId={FACEBOOK_APP_ID}
            fields="name,email,picture"
            callback={responseFacebook}
            icon={<Facebook />}
            textButton={"Continue with Facebook"}
          />

          <GoogleLogin
            className="google-login-button"
            clientId={GOOGLE_CLIENT_ID}
            buttonText={"Continue with Google"}
            onSuccess={responseGoogle}
            onFailure={responseFaildGoogle}
            autoLoad={false}
          />
        </div>

        <Offer style={{ padding: "20px 0" }}>
          <FormattedMessage
            id="dontHaveAccount"
            defaultMessage="Don't have any account?"
          />{" "}
          <LinkButton onClick={toggleSignUpForm}>
            <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id="forgotPasswordText"
            defaultMessage="Forgot your password?"
          />{" "}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id="resetText" defaultMessage="Reset It" />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}
