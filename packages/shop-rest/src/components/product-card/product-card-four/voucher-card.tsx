// product card for food
import Image from "components/image/image";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import Loader from "react-loader-spinner";
import {
  DeliveryOpt,
  FoodCardWrapper,
  FoodImageWrapper,
  ProductMeta,
} from "../product-card.style";

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
          url={baseUrl + data.image}
          className="product-image"
          style={{ position: "relative" }}
        />
        <span className={data.type == "personal" ? "label-persion" : "label"}>
          {data.type == "personal"
            ? data.levels.map((i) => (
                <span className="persion">
                  <FormattedMessage id={i.name} />
                </span>
              ))
            : "+" + data.discount + " %"}
        </span>
      </FoodImageWrapper>
      {/* Sử dụng:  */}
      <ProductMeta
        className="voucher"
        style={{ marginTop: 30, marginBottom: 18 }}
      >
        <DeliveryOpt>
          <span className="name">{data.name}</span>

          {<br />}
          <span className="time">
            {"Hết hạn: "}
            {data.expired}
          </span>
          <br />
          <span className="using">
            {" "}
            Sử dụng: {data.using}
            {"/"}
            {data.total}
          </span>
        </DeliveryOpt>
        <DeliveryOpt className="score">
          <Image
            url={"https://www.flaticon.com/svg/static/icons/svg/550/550638.svg"}
            alt="coin"
          />
          {data.type == "personal" ? (
            <>
              {"+ "}
              {data.discount}
              {" % "}
            </>
          ) : (
            <div>
              <span>
                {" "}
                Đổi {data.exchange_point}{" "}
                <FormattedMessage id="score" defaultMessage="Score" />
              </span>
              {data.user_voucher.length == 0 ? (
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
                  <b>Đã đổi</b>
                </span>
              )}
            </div>
          )}
        </DeliveryOpt>
      </ProductMeta>
    </FoodCardWrapper>
  );
};

export default VoucherCard;
