import { SortAZ } from "assets/icons/SortAZ";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Table from "react-bootstrap/Table";
import { Box } from "./manage-post.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
};

const ManagePost: React.FC<ManagePostProps> = ({ deviceType, data }) => {
  const router = useRouter();

  return (
    <Box>
      {data && data.length != 0 ? (
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>
                Name{" "}
                <SortAZ
                  style={{
                    marginRight: "0px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                />
              </th>
              <th>Join At </th>

              <th>Address </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0
              ? data.map((d) => {
                  const user = d.user ? d.user : d.follower;

                  return (
                    <tr>
                      <td>
                        <Image
                          url={user.avatar_img_url}
                          className="avatar-in-table"
                          style={{ position: "relative" }}
                          alt={"star"}
                        />
                      </td>
                      <td
                        onClick={() => {
                          router.push("/profile/[id]", `/profile/${user.id}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {user.name}
                      </td>
                      <td>
                        {" "}
                        <p>
                          {moment(user.created_at, [
                            "YYYY",
                            moment.ISO_8601,
                          ]).date() +
                            "/" +
                            moment(user.created_at, [
                              "YYYY",
                              moment.ISO_8601,
                            ]).month() +
                            "/" +
                            moment(user.created_at, [
                              "YYYY",
                              moment.ISO_8601,
                            ]).year()}
                        </p>
                      </td>

                      <td style={{ maxWidth: 500 }}>
                        {user.address?.length > 3
                          ? user.address
                              .replace(
                                user.address.substring(
                                  0,
                                  user.address.indexOf(",")
                                ),
                                ""
                              )
                              .replace(",", "")
                          : ""}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      ) : (
        <span>No data</span>
      )}
    </Box>
  );
};

export default ManagePost;
