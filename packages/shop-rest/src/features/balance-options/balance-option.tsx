import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/radio-group/radio-group";
import RadioCard from "components/radio-card/radio-card";

import { ProfileContext } from "contexts/profile/profile.context";
import { CardHeader } from "components/card-header/card-header";

interface Props {
  increment?: boolean;
}

const BalanceOption = ({ increment = false }: Props) => {
  const { state, dispatch } = useContext(ProfileContext);
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage id="balanceOptions" />
      </CardHeader>
      <RadioGroup
        items={state.balances}
        component={(item: any) => (
          <RadioCard
            id={item.id}
            key={item.id}
            value={item.value}
            name="schedule"
            checked={item.type === "primary"}
            withActionButtons={false}
            onChange={() => {
              dispatch({
                type: "SET_PRIMARY_BALANCE",
                payload: item.id.toString(),
              });

              dispatch({
                type: "SET_PAYMENT_INFO",
                payload: { value: item.value, field: "amount" },
              });
            }}
          />
        )}
      />
    </>
  );
};

export default BalanceOption;
