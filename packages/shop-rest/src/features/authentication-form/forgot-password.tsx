import React, { useContext, useRef } from "react";
import {
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  // Input,
  Button,
  LinkButton,
  Offer,
} from "./authentication-form.style";
import { FormattedMessage, useIntl } from "react-intl";
import SuccessModel from "features/on-success/success";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal, closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
export default function ForgotPasswordModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const ref = useRef(null);
  const intl = useIntl();

  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };

  const resetCallback = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      if (!email || email.trim().length === 0) {
        ref.current.focus();
        return;
      }
      setLoading(true);

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      };
      const res = await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX + "/auth/reset-password",
        options
      );
      if (res.ok) {
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
          componentProps: { textId: "forgotSuccess" },
        });
      }
    }
  };

  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>
          <FormattedMessage
            id="forgotPassText"
            defaultMessage="Forgot Password"
          />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="sendResetPassText"
            defaultMessage="We'll send you a link to reset your password"
          />
        </SubHeading>
        <form onSubmit={resetCallback}>
          <Input
            ref={ref}
            type="email"
            placeholder={intl.formatMessage({
              id: "emailAddressPlaceholder",
              defaultMessage: "Email Address.",
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />

          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            type="submit"
            loading={loading}
          >
            <FormattedMessage
              id="resetPasswordBtn"
              defaultMessage="Reset Password"
            />
          </Button>
        </form>
        <Offer style={{ padding: "20px 0 0" }}>
          <FormattedMessage id="backToSign" defaultMessage="Back to" />{" "}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
