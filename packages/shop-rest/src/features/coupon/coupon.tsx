import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CouponBoxWrapper, Error, Success } from "./coupon.style";
import { Input } from "components/forms/input";
import { Button } from "components/button/button";
import { getMyVoucher, verifyVoucher } from "utils/api/voucher";
import { getCookie } from "utils/session";
import { ProfileContext } from "contexts/profile/profile.context";
import { min } from "moment";

type CouponProps = {
  disabled?: any;
  className?: string;
  style?: any;
  errorMsgFixed?: boolean;
  applyVoucherCode?: any;
};

const Coupon: React.FC<CouponProps> = ({
  disabled,
  className,
  style,
  errorMsgFixed = false,
  applyVoucherCode,
  ...props
}) => {
  const intl = useIntl();
  const { dispatch } = useContext(ProfileContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  const handleApplyCoupon = async () => {
    if (code.trim().length === 0) {
      return;
    }

    setLoading(true);
    let token = getCookie("access_token");

    const myVouchers = await getMyVoucher(token);
    const applyVoucher = myVouchers.find(
      (voucher) => voucher.name === code.trim()
    );

    // const res = await verifyVoucher(token, code);
    setLoading(false);
    setCode(code);
    // if (applyVoucher) {
    //   // const data = await res.json();

    //   if (applyVoucher) {
    //     setError("");
    //     dispatch({
    //       type: "SET_DISCOUNT_PAYMENT_INFO",
    //       payload: { value: applyVoucher.value, field: "discount" },
    //     });
    //     dispatch({
    //       type: "SET_DISCOUNT_PAYMENT_INFO",
    //       payload: { value: applyVoucher.id, field: "voucherId" },
    //     });
    //   } else {
    //     setError("couponUsed");
    //     dispatch({
    //       type: "SET_DISCOUNT_PAYMENT_INFO",
    //       payload: { value: 0, field: "discount" },
    //     });
    //     dispatch({
    //       type: "SET_DISCOUNT_PAYMENT_INFO",
    //       payload: { value: null, field: "voucherId" },
    //     });
    //   }
    // } else {
    //   setError("couponError");
    //   dispatch({
    //     type: "SET_DISCOUNT_PAYMENT_INFO",
    //     payload: { value: 0, field: "discount" },
    //   });
    //   dispatch({
    //     type: "SET_DISCOUNT_PAYMENT_INFO",
    //     payload: { value: null, field: "voucherId" },
    //   });
    // }

    if (applyVoucher) {
      setError("");
      setValid(true);

      dispatch({
        type: "SET_DISCOUNT_PAYMENT_INFO",
        payload: { value: applyVoucher.value, field: "discount" },
      });
      dispatch({
        type: "SET_DISCOUNT_PAYMENT_INFO",
        payload: { value: applyVoucher.id, field: "voucherId" },
      });
    } else {
      setValid(false);
      setError("couponError");
      dispatch({
        type: "SET_DISCOUNT_PAYMENT_INFO",
        payload: { value: 0, field: "discount" },
      });
      dispatch({
        type: "SET_DISCOUNT_PAYMENT_INFO",
        payload: { value: null, field: "voucherId" },
      });
    }
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setError("");
    setValid(false);
    dispatch({
      type: "SET_DISCOUNT_PAYMENT_INFO",
      payload: { value: 0, field: "discount" },
    });
    dispatch({
      type: "SET_DISCOUNT_PAYMENT_INFO",
      payload: { value: null, field: "voucherId" },
    });
    setCode(e.currentTarget.value);
  };
  return (
    <>
      <CouponBoxWrapper
        className={className ? className : "boxedCoupon"}
        style={style}
      >
        <Input
          onChange={handleOnChange}
          value={code}
          placeholder={intl.formatMessage({
            id: "couponPlaceholder",
            defaultMessage: "Enter Coupon Here",
          })}
          {...props}
        />
        <Button
          type="button"
          onClick={handleApplyCoupon}
          disabled={disabled}
          padding="0 30px"
          loading={loading}
        >
          {/* <FormattedMessage id="voucherApply" defaultMessage="Apply" /> */}
          {/* <FormattedMessage id="voucherApply" defaultMessage="Apply" /> */}
          Check
        </Button>
      </CouponBoxWrapper>
      {error && error.length !== 0 && (
        <Error errorMsgFixed={errorMsgFixed}>
          <FormattedMessage id={error} defaultMessage={error} />
        </Error>
      )}

      {valid && <Success>Valid Coupon</Success>}
    </>
  );
};

export default Coupon;
