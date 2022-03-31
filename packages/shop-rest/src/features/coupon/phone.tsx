import React, { useContext, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CouponBoxWrapper, Error } from "./coupon.style";
import { Input } from "components/forms/input";
import { ProfileContext } from "contexts/profile/profile.context";

type CouponProps = {
  disabled?: any;
  className?: string;
  style?: any;
  errorMsgFixed?: boolean;
};

const Coupon: React.FC<CouponProps> = ({
  disabled,
  className,
  style,
  errorMsgFixed = false,
  ...props
}) => {
  const intl = useIntl();
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(ProfileContext);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: 'SET_PAYMENT_INFO',
      payload: { value: e.target.value, field: "phone" },
    });
  };
  return (
    <>
      <CouponBoxWrapper
        className={className ? className : "boxedCoupon"}
        style={style}
      >
        <Input
          type="number"
          onChange={handleOnChange}
          value={state.phone}
          placeholder={intl.formatMessage({
            id: "phonePlacehlder",
            defaultMessage: "Enter Phone  Number",
          })}
          {...props}
        />
      </CouponBoxWrapper>
      {error && (
        <Error errorMsgFixed={errorMsgFixed}>
          <FormattedMessage id="couponError" defaultMessage={error} />
        </Error>
      )}
    </>
  );
};

export default Coupon;
