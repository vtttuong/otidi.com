import { SortAZ } from "assets/icons/SortAZ";
import { Star } from "assets/icons/Star";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Table from "react-bootstrap/Table";
import { FaStar } from "react-icons/fa";
import { Box } from "./manage-post.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
  currentId?: number;
};

const ManagePost: React.FC<ManagePostProps> = ({
  deviceType,
  data,
  currentId,
}) => {
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
              <th>Followed At </th>

              <th>Rating </th>
            </tr>
          </thead>
          <tbody>
            {data.length != 0
              ? data.map((d) => {
                  const user = d.user ? d.user : d.follower;

                  return (
                    <tr key={user.id}>
                      <td>
                        <Image
                          url={user.avatar}
                          className="avatar-in-table"
                          style={{ position: "relative" }}
                          alt={"star"}
                        />
                      </td>
                      <td
                        onClick={() => {
                          console.log(
                            "🚀 ~ file: manage-posts.tsx ~ line 68 ~ ?data.map ~ currentId",
                            currentId
                          );
                          if (currentId == user.id) {
                            router.push("/profile");
                          } else {
                            router.push("/profile/[id]", `/profile/${user.id}`);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {user.name}
                      </td>
                      <td>
                        {" "}
                        <p>
                          {moment(data.created_at).date() +
                            "/" +
                            moment(data.created_at).month() +
                            "/" +
                            moment(data.created_at).year()}
                        </p>
                      </td>

                      <td style={{ maxWidth: 500 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {user.rating}
                          <Star />
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      ) : (
        <p style={{ textAlign: "center" }}>No data</p>
      )}
    </Box>
  );
};

export default ManagePost;
