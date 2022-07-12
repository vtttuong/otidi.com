import React from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Container,
  Heading,
  SubHeading,
  Wrapper,
  ResponseMessage,
} from "./authentication-form.style";
import { getCookie } from "utils/session";

export default function SignInModal() {
  const [responseMessage, setResponseMessage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;
  let token = getCookie("access_token");

  async function sendVerifyMail() {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${baseUrl}/me/verify-mail/send`;
    const res = await fetch(url, options);

    setResponseMessage(true);

    setLoading(false);
  }

  return (
    <Wrapper>
      <Container className="updatePhone">
        <Heading>
          <FormattedMessage id="verifyYourEmail" />
        </Heading>

        <SubHeading>
          <FormattedMessage id="verifyYourEmailMessage" />
        </SubHeading>
        <Button
          variant="primary"
          size="big"
          style={{ width: "100%" }}
          type="submit"
          loading={loading}
          onClick={sendVerifyMail}
        >
          <FormattedMessage id="verifyEmailButton" defaultMessage="Continue" />
        </Button>

        {responseMessage && (
          <ResponseMessage>
            <FormattedMessage id="responseVerifyMessage" />
            <span onClick={sendVerifyMail}>Resend email</span>
          </ResponseMessage>
        )}
      </Container>
    </Wrapper>
  );
}
