import { SortAZ } from "assets/icons/SortAZ";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Table from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";
import { getHistoryPay } from "utils/api/profile";
import { numberWithCommas } from "utils/formatNumber";
import { Box } from "./manage-post.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
  token?: string;
};

const ManagePostOrder: React.FC<ManagePostProps> = ({ token }) => {
  const [datas, setDatas] = React.useState([]);
  const router = useRouter();

  const getHistoryPayment = async () => {
    setDatas(await getHistoryPay(token));
  };
  React.useEffect(() => {
    getHistoryPayment();
  }, []);
  return (
    <Box>
      <Table style={{ minWidth: "500px" }} responsive="sm">
        <thead>
          <tr>
            <th>
              Coin Change{" "}
              <SortAZ
                style={{
                  marginRight: "0px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </th>
            <th>Amount </th>
            <th>Created At </th>

            <th>Subcription Type </th>
            <th>Status </th>
          </tr>
        </thead>
        <tbody>
          {datas && datas.length != 0
            ? datas.map((d) => {
                return (
                  <tr key={d.id}>
                    <td
                      onClick={() => {}}
                      style={{
                        cursor: "pointer",
                        color: "#009e7f",
                        textAlign: "start",
                      }}
                    >
                      {d.type == "advertisePostPayment" ? (
                        <b>- {d.old_balance - d.balance}</b>
                      ) : (
                        <b>+ {d.balance - d.old_balance}</b>
                      )}
                      {/* {d.price} */}
                    </td>
                    <td>
                      <p>{numberWithCommas(d.extra.amount)}</p>
                    </td>
                    <td>
                      <p>{moment(d.created_at).format("YYYY-MM-DD")}</p>
                    </td>
                    <td>
                      <FormattedMessage
                        id={d.type}
                        defaultMessage="Thanh toán MOMO"
                      />
                    </td>

                    <td>{d.extra.message}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </Box>
  );
};

export default ManagePostOrder;
