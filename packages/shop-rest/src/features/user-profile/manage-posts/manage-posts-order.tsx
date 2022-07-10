import { SortAZ } from "assets/icons/SortAZ";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Table from "react-bootstrap/Table";
import { FormattedMessage } from "react-intl";
import { getHistoryPay } from "utils/api/profile";
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
              Price{" "}
              <SortAZ
                style={{
                  marginRight: "0px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              />
            </th>
            <th>Created At </th>

            <th>Subcription Type </th>
            <th>Post </th>
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
                      style={{ cursor: "pointer", color: "#009e7f" }}
                    >
                      {d.type == "pushPostPayment" ? (
                        <b>- {d.old_balance - d.balance}</b>
                      ) : (
                        <b>+ {d.balance - d.old_balance}</b>
                      )}
                      {d.price}
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
                    <td>
                      {d.post ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignSelf: "center",
                          }}
                          onClick={
                            d.post.deleted_at != null
                              ? null
                              : () =>
                                  router.push(
                                    "/posts/[id]",
                                    `/posts/${d.post.id}`
                                  )
                          }
                        >
                          <Image
                            style={{ width: 50, height: 50 }}
                            url={d.post.main_image.url}
                          />
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              marginLeft: 10,
                            }}
                          >
                            {d.post.title}
                            <br />
                            {d.post.deleted_at != null ? (
                              <p style={{ color: "red" }}>Tin bị xoá</p>
                            ) : null}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{d.extra.status}</td>
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
