// post card for food
import Image from "components/image/image";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
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
  console.log(data, 888);
  var used = false;
  if (data.used_at || data?.deleted_at) {
    used = true;
  }
  return (
    <>
      {data ? (
        <FoodCardWrapper
          className={used ? "food-cart deactive" : "ood-cart active"}
        >
          <FoodImageWrapper>
            <Image
              url={baseUrl + data?.image}
              className="post-image"
              style={{ position: "relative" }}
            />
          </FoodImageWrapper>
          {/* Sử dụng:  */}
          <PostMeta
            className="voucher"
            style={{ marginTop: 30, marginBottom: 5 }}
          >
            <DeliveryOpt>
              <span className="name">{data.name}</span>

              {<br />}
              <span className="time">
                {"Hết hạn: "}
                {data.end_at}
              </span>
              {data.used_at ? (
                <span style={{ color: "#da3b26" }}>
                  <br />
                  Đã sử dụng
                </span>
              ) : null}
            </DeliveryOpt>

            <DeliveryOpt className="score">
              <Image
                url={
                  "https://www.flaticon.com/svg/static/icons/svg/550/550638.svg"
                }
                alt="coin"
              />
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
                </div>
              )}
            </DeliveryOpt>
          </PostMeta>
        </FoodCardWrapper>
      ) : null}
    </>
  );
};

export default VoucherCard;
