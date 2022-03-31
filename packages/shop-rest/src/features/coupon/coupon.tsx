import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CouponBoxWrapper, Error } from "./coupon.style";
import { Input } from "components/forms/input";
import { Button } from "components/button/button";
import { verifyVoucher } from "utils/api/voucher";
import { getCookie } from "utils/session";
import { ProfileContext } from "contexts/profile/profile.context";

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

  const handleApplyCoupon = async () => {
    setLoading(true);
    let token = getCookie("access_token");
    const res = await verifyVoucher(token, code);
    setLoading(false);
    setCode(code);
    if (res.ok) {
      const data = await res.json();

      if (data) {
        setError("");
        dispatch({
          type: "SET_DISCOUNT_PAYMENT_INFO",
          payload: { value: data.discount, field: "discount" },
        });
        dispatch({
          type: "SET_DISCOUNT_PAYMENT_INFO",
          payload: { value: data.id, field: "voucherId" },
        });
      } else {
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
    } else {
      setError("couponUsed");
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
          <FormattedMessage id="voucherApply" defaultMessage="Apply" />
        </Button>
      </CouponBoxWrapper>
      {error && (
        <Error errorMsgFixed={errorMsgFixed}>
          <FormattedMessage id={error} defaultMessage={error} />
        </Error>
      )}
    </>
  );
};

export default Coupon;
