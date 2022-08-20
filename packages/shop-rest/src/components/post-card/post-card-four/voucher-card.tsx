// post card for food
import { CoinIcon } from "assets/icons/CoinIcon";
import Image from "components/image/image";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Loader from "react-loader-spinner";
import {
  DeliveryOpt,
  FoodCardWrapper,
  FoodImageWrapper,
  PostMeta,
} from "../post-card.style";

type CardProps = {
  data?: any;
  id?: number;

  onClick?: (e: any) => void;
  onExchange?: (id: number) => void;
};
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL + "/storage/";
const VoucherCard: React.FC<CardProps> = ({
  data,
  id,
  onClick,
  onExchange,
  ...props
}) => {
  const router = useRouter();
  const [loadding, setLoadding] = React.useState(0);
  setTimeout(() => {
    setLoadding(0);
  }, 2000);

  return (
    <FoodCardWrapper
      className={"food-card " + data.deleted_at == null ? "deactive" : "active"}
    >
      <FoodImageWrapper>
        <Image
          url={data.image}
          className="post-image"
          style={{ position: "relative" }}
        />
      </FoodImageWrapper>
      {/* Sử dụng:  */}
      <PostMeta className="voucher" style={{ marginTop: 40, marginBottom: 18 }}>
        <DeliveryOpt>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="name">{data.name}</p>
            <span
              className={data.type == "personal" ? "label-persion" : "label"}
            >
              {data.type == "personal"
                ? data.levels.map((i) => (
                    <span className="person">
                      <FormattedMessage id={i.name} />
                    </span>
                  ))
                : "+" + data.value + " %"}
            </span>
          </div>

          {<br />}
          <span className="time">
            {"Hết hạn: "}
            {data.end_at}
          </span>
          <br />
          <span className="using">
            {" "}
            Sử dụng: {data.used}
            {"/"}
            {data.total}
          </span>
        </DeliveryOpt>
        <DeliveryOpt className="score">
          <CoinIcon height="17px" width="17px" />
          {data.type == "personal" ? (
            <>
              {"+ "}
              {data.value}
              {" % "}
            </>
          ) : (
            <div>
              <span>
                {" "}
                Đổi {data.reward_point}{" "}
                <FormattedMessage id="score" defaultMessage="Score" />
              </span>
              {data.used < data.total ? (
                <span
                  className="doingay"
                  onClick={() => {
                    setLoadding(data.id);

                    onExchange(data.id);
                  }}
                >
                  {loadding === data.id ? (
                    <Loader
                      type="TailSpin"
                      color="#fff"
                      height={20}
                      width={20}
                    />
                  ) : (
                    <b>Đổi ngay</b>
                  )}
                </span>
              ) : (
                <span className="doingay dadoi">
                  <b>Hét</b>
                </span>
              )}
            </div>
          )}
        </DeliveryOpt>
      </PostMeta>
    </FoodCardWrapper>
  );
};

export default VoucherCard;
