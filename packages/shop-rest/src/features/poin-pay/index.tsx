import { Option } from "components/option/option";
import { Next } from "components/next-button/next-button";
import { Router, useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ContainerOption, Text } from "./index.style";
import { ProfileContext } from "contexts/profile/profile.context";
import { ProfileProvider } from "contexts/profile/profile.provider";

var initData = {
  balances: [
    {
      id: 1,
      value: 50000,
      title: "50.000",
      type: "primary",
      source:
        "https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png",
    },
    {
      id: 2,
      value: 100000,
      title: "100.000",
      type: "secondary",
      source:
        "https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png",
    },
    {
      id: 3,
      title: "150.000",
      value: 150000,
      type: "three",
      source:
        "https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png",
    },
  ],
  amount: 50000,
}
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
    // dispatch({
    //   type: "SET_PRIMARY_BALANCE",
    //   payload: list.id.toString(),
    // });

    // dispatch({
    //   type: "SET_PAYMENT_INFO",
    //   payload: { value: list.value, field: "amount" },
    // });
  }

  function onNext() {
    router.push("/payment-request");
  }

  return (
    <>
      <ProfileProvider initData={initData}>
        <ContainerOption>
          <Text>{"Chon Menh Gia !"}</Text>

          {initData.balances?.map(function (list) {
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
