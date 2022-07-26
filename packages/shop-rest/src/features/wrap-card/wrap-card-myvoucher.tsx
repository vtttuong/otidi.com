import Spinner from "components/spinner";
import { useRouter } from "next/router";
import React from "react";
import { getAllVoucher, getMyVoucher } from "utils/api/voucher";
import VoucherMy from "../../components/post-card/post-card-four/voucher-my";
import { ItemCard } from "../user-profile/user-profile.style";
type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  token?: string;
  onExchange?: (id: number) => void;
};

const WrapMy: React.FC<Props> = ({ data, token, onExchange }) => {
  const router = useRouter();

  return (
    <div>
      {data ? (
        data.length != 0 ? (
          data.map((d) => (
            <ItemCard key={d.id} className={"voucher"}>
              <VoucherMy
                data={d}
                onClick={() => {
                  router.push("/[type]/[slug]", `/${1}/${2}`);
                }}
                onExchange={onExchange}
              />
            </ItemCard>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px 0" }}>No data</p>
        )
      ) : (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "20vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default WrapMy;
