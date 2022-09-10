import Notice from "components/notice/notice";
import Router, { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import OtpInput from "react-otp-input";
import { sendOtp } from "utils/api/profile";
import { getCookie, setCookie } from "utils/session";
import { Button, Container, Wrapper } from "./index.style";

type Props = {
  token?: string;
};
const OTPInput: React.FC<Props> = ({ token }) => {
  const [values, setValue] = React.useState("");
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorContent, setErrorC] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loadingClear, setLoadingClear] = React.useState(false);

  // const onSubmit = async () => {
  //   if (!values || values.trim().length === 0) {
  //     setError(true);
  //     setErrorC("Vui lòng nhập OTP");
  //     return;
  //   }
  //   setLoadingSubmit(true);
  //   if (values.length === 6) {
  //     const object = {
  //       verify_code: values,
  //     };
  //     const data = await sendOtp(object, token);

  //     if (data && data.success) {
  //       setSuccess(true);
  //       setLoadingSubmit(false);
  //       setCookie("phone_verified_at", new Date());
  //       setTimeout(() => {
  //         Router.push("/");
  //         return;
  //       }, 1000);
  //     } else {
  //       setErrorC("Invalid OTP");
  //       setError(true);
  //       setLoadingSubmit(false);
  //       setTimeout(() => {
  //         setError(false);
  //         return;
  //       }, 2000);
  //     }
  //   } else {
  //     setError(true);
  //     setLoadingSubmit(false);
  //     setTimeout(() => {
  //       setError(false);
  //       return;
  //     }, 2000);
  //   }
  // };
  const verifyOTP = async (otp) => {
    const object = {
      verify_code: otp,
    };
    const data = await sendOtp(object, token);
    if (data && data.success) {
      setSuccess(true);
      setLoadingSubmit(false);
      setCookie("phone_verified_at", new Date());
      setTimeout(() => {
        Router.push("/");
        return;
      }, 1000);
    } else {
      setErrorC("Invalid OTP");
      setError(true);
      setLoadingSubmit(false);
      setTimeout(() => {
        setError(false);
        return;
      }, 2000);
    }
  };

  const onSubmit = async () => {
    if (!values || values.trim().length === 0) {
      setError(true);
      setErrorC("Vui lòng nhập OTP");
      return;
    }
    setLoadingSubmit(true);
    if (values.length === 6) {
      await window.confirmationResult
        .confirm(values)
        .then((result) => {
          alert("OK");
          // verifyOTP(values);
        })
        .cath((error) => {
          setErrorC("Invalid OTP");
          setError(true);
          setLoadingSubmit(false);
          setTimeout(() => {
            setError(false);
            return;
          }, 2000);
        });
    } else {
      setError(true);
      setLoadingSubmit(false);
      setTimeout(() => {
        setError(false);
        return;
      }, 2000);
    }
    setLoadingSubmit(false);
  };

  setTimeout(() => {
    setValue("");
  }, 60000);
  const onClear = () => {
    setValue("");
  };
  return (
    <>
      <div className="box-otp">
        <OtpInput
          value={values}
          onChange={(otp) => setValue(otp)}
          numInputs={6}
          separator={<span>--</span>}
        />
        {error ? (
          <p style={{ color: "red", marginTop: 20 }}>
            {errorContent || " Vui lòng thử lại, có lỗi xảy ra !"}
          </p>
        ) : null}
      </div>
      <div className="box-button">
        <Button
          variant="primary"
          size="big"
          style={{ width: "30%" }}
          loading={loadingClear}
          onClick={() => onClear()}
        >
          <FormattedMessage id="clear" defaultMessage="Clear" />
        </Button>
        <Button
          variant="primary"
          size="big"
          style={{ width: "30%" }}
          loading={loadingSubmit}
          onClick={() => onSubmit()}
        >
          <FormattedMessage id="verify" defaultMessage="Verify" />
        </Button>
        {success ? (
          <Notice status="success" content="Verified success !" />
        ) : null}
      </div>
    </>
  );
};
export default OTPInput;
