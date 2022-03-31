import OtpInput from "react-otp-input";
import React from "react";
import { Button, Container, Heading, SubHeading, Wrapper } from "./index.style";
import { FormattedMessage } from "react-intl";
import { sendOtp } from "utils/api/profile";
import { getCookie } from "utils/session";
import Notice from "components/notice/notice";
import Router from "next/router";
import Countdown from "react-countdown";
import OTPInput from "./input";

type Props = {
  token?: string;
};
const OTP: React.FC<Props> = ({ token }) => {
  const [loadingClear, setLoadingClear] = React.useState(false);
  const Completionist = () => {
    return <p style={{ color: "red" }}>{"( 00 )"}</p>;
  };

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <p style={{ color: "red" }}>{"( " + seconds + " s )"}</p>;
    }
  };

  return (
    <Wrapper>
      <Container className="updatePhone">
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id="verifyPhoneText"
            defaultMessage="Update phone number to create product !"
          />
          <Countdown date={Date.now() + 60000} renderer={renderer} />
        </SubHeading>
        <OTPInput token={token} />
      </Container>
    </Wrapper>
  );
};
export default OTP;
