import { Option } from "components/option/option";
import { Next } from "components/next-button/next-button";
import { Router, useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ContainerOption, Text } from "./index.style";
import { ProfileContext } from "contexts/profile/profile.context";
import { ProfileProvider } from "contexts/profile/profile.provider";
import { options } from "features/payment/amount-option";

function Point({ deviceType }) {
  const [choose, setChoose] = useState(false);
  const [foundIndex, setFoundIndex] = useState([]);
  const { query } = useRouter();
  const router = useRouter();
  const targetRef = React.useRef(null);
  const { state, dispatch } = useContext(ProfileContext);

  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: "smooth",
      });
    }
  }, [query, foundIndex]);

  function changeChoose(list) {
    let x = [];
    let index = foundIndex.indexOf(list.value);
    if (index < 0) {
      x.push(list.value);
      setFoundIndex(x);
      setChoose(!choose);
    } else {
      x.splice(index, 1);
      setFoundIndex(x);
    }

    console.log("🚀 ~ file: index.tsx ~ line 45 ~ Point ~ state", state);

    // dispatch({
    //   type: "SET_PRIMARY_BALANCE",
    //   payload: list.id.toString(),
    // });

    dispatch({
      type: "SET_PAYMENT_INFO",
      payload: { value: list.value, field: "amount" },
    });
  }

  function onNext() {
    router.push("/payment-request");
  }

  return (
    <>
      <ProfileProvider initData={options}>
        <ContainerOption>
          <Text>{"Chon Menh Gia !"}</Text>

          {options.balances?.map(function (list) {
            return (
              <Option
                key={list.id}
                source={list.source}
                title={list.title}
                onClick={() => changeChoose(list)}
                checked={list.value == foundIndex[0]}
              />
            );
          })}
          <Next
            title={"Nap Ngay"}
            onClick={() => onNext()}
            style={{ backgroundColor: "#009e7f", color: "white" }}
          />
        </ContainerOption>
      </ProfileProvider>
    </>
  );
}

export default Point;
