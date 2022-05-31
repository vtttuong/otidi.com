import { closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { setCookie } from "utils/session";
import {
  Button,
  Container,
  Heading,
  SubHeading,
  Wrapper,
} from "./authentication-form.style";

export default function SignInModal() {
  const intl = useIntl();
  const router = useRouter();
  const { authDispatch } = useContext<any>(AuthContext);
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function phoneCallback(e) {
    // if (!(phone.match(/\d/g).length === 10)) {
    //   setError("error");
    // }
    if (typeof window !== "undefined") {
      setLoading(true);
      e.preventDefault();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
        }),
      };
      const res = await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL +
          "/api/client/v1/verify/request",
        options
      );
      const data = await res.json();
      if (data && data.error) {
        setError(data.error);
        setLoading(false);
        return;
      } else {
        setCookie("verify-phone", phone);
        router.push("/verify-phone");
        return;
      }
    }
  }

  return (
    <Wrapper>
      <Container className="updatePhone">
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="updatePhoneText"
            defaultMessage="Update phone number to create product !"
          />
        </SubHeading>
        <form onSubmit={phoneCallback}>
          <Input
            type="number"
            placeholder={intl.formatMessage({
              id: "phonePlaceholder",
              defaultMessage: "Phone number (10 characters)",
            })}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            height="48px"
            backgroundColor="#F7F7F7"
            mb="10px"
          />
          {error ? (
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
                id="errorPhoneForm"
                defaultMessage="Error phone number"
              />
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
      </Container>
    </Wrapper>
  );
}
