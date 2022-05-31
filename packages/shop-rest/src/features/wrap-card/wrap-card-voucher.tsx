import { useRouter } from "next/router";
import React from "react";
import { getAllVoucher } from "utils/api/voucher";
import VoucherCard from "../../components/product-card/product-card-four/voucher-card";
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
  const [datas, setDatas] = React.useState([]);
  const getVouchers = async () => {
    setDatas(await getAllVoucher(token));
  };
  React.useEffect(() => {
    getVouchers();
  }, []);

  return (
    <div>
      {datas && datas.length != 0 ? (
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
        <p>No data</p>
      )}
    </div>
  );
};

export default WrapCard;
