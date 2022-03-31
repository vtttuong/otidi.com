import UpdateAddress from "components/address-card/address-card";
import { ButtonGroup } from "components/button-group/button-group";
import { CardHeader } from "components/card-header/card-header";
import RadioCard from "components/radio-card/radio-card";
import RadioGroup from "components/radio-group/radio-group";
import { ProfileContext } from "contexts/profile/profile.context";
import useUser from "data/use-user";
import { handleModal } from "features/checkouts/checkout-modal";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

const types = [
  { id: "1", type: "buy", name: "Need Buy", info: "27 Street, 2569 " },
  { id: "2", type: "sale", name: "Need Sale", info: "27 Street, 2569 H" },
];
interface Props {
  increment?: boolean;
  icon?: boolean;
  buttonProps?: any;
  flexStart?: boolean;
}

const TypePost = ({ increment = false, flexStart = false }: Props) => {
  const { deleteAddress } = useUser();

  const {
    state: { address },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async (item) => {
    // debugger;
    dispatch({ type: "DELETE_ADDRESS", payload: item.id });
    await deleteAddress(item.id);
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage id="Type Post" defaultMessage="Type Post" />
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={types}
          component={(item: any) => (
            <RadioCard
              id={item.id}
              key={item.id}
              content={item.name}
              name="address"
              checked={item.type === "buy"}
              onChange={() => {}}
              onEdit={() => handleModal(UpdateAddress, item)}
              onDelete={() => handleOnDelete(item)}
            />
          )}
        />
      </ButtonGroup>
    </>
  );
};

export default TypePost;
