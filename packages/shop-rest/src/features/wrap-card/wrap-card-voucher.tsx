import Spinner from "components/spinner";
import { useRouter } from "next/router";
import React from "react";
import { getAllVoucher } from "utils/api/voucher";
import VoucherCard from "../../components/post-card/post-card-four/voucher-card";
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

const WrapCard: React.FC<Props> = ({ data, token, onExchange }) => {
  const router = useRouter();
  const [datas, setDatas] = React.useState(null);
  const getVouchers = async () => {
    const vouchers = await getAllVoucher(token);
    setDatas(vouchers);
  };
  React.useEffect(() => {
    getVouchers();
  }, []);

  return (
    <div>
      {datas ? (
        datas.length != 0 ? (
          datas.map((d) => (
            <ItemCard key={d.id} className={"voucher"}>
              <VoucherCard
                data={d}
                onClick={() => {
                  router.push("/[type]/[slug]", `/${1}/${2}`);
                }}
                onExchange={onExchange}
              />
            </ItemCard>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No data</p>
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

export default WrapCard;
