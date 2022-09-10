import { closeModal } from "@redq/reuse-modal";
import { Input } from "components/forms/input";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { getCookie, setCookie } from "utils/session";
import {
  Button,
  Container,
  Heading,
  SubHeading,
  Wrapper,
} from "./authentication-form.style";
import { authentication } from "config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { PHONE_PREFIX } from "utils/constant";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function SignInModal() {
  const intl = useIntl();
  const router = useRouter();
  const { authDispatch } = useContext<any>(AuthContext);
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const ref = useRef(null);

  // async function phoneCallback(e) {
  //   // if (!(phone.match(/\d/g).length === 10)) {
  //   //   setError("error");
  //   // }
  //   setError("");
  //   const token = getCookie("access_token");
  //   if (!token || token.trim().length === 0) {
  //     router.push("/login");
  //   }

  //   if (typeof window !== "undefined") {
  //     setLoading(true);
  //     e.preventDefault();
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT}/me/phone-number/send-otp`,
  //       options
  //     );
  //     try {
  //       const data = await res.json();

  //       if (data && !data.success) {
  //         setLoading(false);
  //         setError(data.result);
  //         return;
  //       } else {
  //         setCookie("verify-phone", phone);
  //         router.push("/verify-phone");
  //         return;
  //       }
  //     } catch (err) {
  //       setLoading(false);
  //       return;
  //     }
  //   }
  // }
  const getCaptcha = () => {
    ref.current.innerHtml = "";
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
  };

  const phoneCallback = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const phoneNumber = PHONE_PREFIX + getCookie("userPhone").substring(1);
    getCaptcha();

    let appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        router.push("/verify-phone");
      })
      .catch((error) => {
        console.log(error);

        setError("Too many request. Try again later!");
      });
    setLoading(false);
  };

  return (
    <Wrapper>
      <Container className="updatePhone">
        <Heading>
          <FormattedMessage id="welcomeBack" defaultMessage="Welcome Back" />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="updatePhoneText"
            defaultMessage="Update phone number to create post !"
          />
        </SubHeading>
        <div onClick={phoneCallback}>
          <Button
            disabled={loading}
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            type="submit"
            loading={loading}
          >
            <FormattedMessage id="continueBtn" defaultMessage="Continue" />
          </Button>
          {error.length !== 0 && <i style={{ color: "red" }}>{error}</i>}
        </div>
        <div
          ref={ref}
          id="recaptcha-container"
          className="justify-center flex"
        ></div>
      </Container>
    </Wrapper>
  );
}
