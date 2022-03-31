import { Follow } from "assets/icons/Follow";
import Image from "components/image/image";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ActionButton, Container, Title, Wrapper } from "./form.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any[];
  error?: any;
  onFollowOther?: (e: number) => void;
  dataLike?: any[];
};
const Like: React.FC<ManagePostProps> = ({ onFollowOther, dataLike }) => {
  const router = useRouter();
  const [followed, setFollowed] = React.useState(false);
  return (
    <Wrapper>
      <Container>
        <form style={{ marginBottom: 30 }}>
          {dataLike.length != 0 ? (
            dataLike.map(function (list) {
              return (
                <div className="user-like" key={list.user_id}>
                  <p
                    onClick={() =>
                      router.push("/profile/[id]", `/profile/${list.user_id}`)
                    }
                  >
                    <Image
                      url={list.user?.avatar_img_url}
                      className="avatar-image"
                      style={{ position: "relative" }}
                      alt={list.id}
                    />
                    <span>{list.user.name}</span>
                  </p>
                  <ActionButton onClick={() => onFollowOther(list.user_id)}>
                    <Follow />
                    <>
                      <Title>
                        <FormattedMessage
                          id={followed ? "following" : "follow"}
                        />
                      </Title>
                    </>
                  </ActionButton>
                </div>
              );
            })
          ) : (
            <p style={{ color: "#009e7f", fontSize: 17, fontWeight: 600 }}>
              No data
            </p>
          )}
        </form>
      </Container>
    </Wrapper>
  );
};
export default Like;
