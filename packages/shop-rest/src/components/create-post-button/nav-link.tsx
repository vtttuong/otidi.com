import React, { useState } from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import * as Icons from "assets/icons/menu-profile-icons";
import { getCookie } from "utils/session";
import { useRouter } from "next/router";
import { getMyprofile } from "utils/api/profile";
import {
  POST_ITEM,
  PROFILE_SETTING_PAGE,
  UPDATE_PHONE,
  VERIFY_EMAIL,
} from "site-settings/site-navigation";
import { AuthContext } from "contexts/auth/auth.context";
import Loading from "components/loading";
type NavLinkProps = {
  number?: string;
  router?: any;
  href?: string;
  label: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreatePostButton: React.FC<NavLinkProps> = ({
  number,
  label,
  intlId,
  icon,
  className,
  iconClass,
}: any) => {
  const IconProfile = Icons[icon] || Icons["CreatePost"];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const checkAuth = async () => {
    setLoading(true);
    let token = getCookie("access_token");

    if (!token) {
      authDispatch({
        type: "SIGNIN",
      });
      router.push("/login");
      return;
    }

    const myProfile = await getMyprofile(token);

    if (
      !myProfile.phone_number ||
      myProfile.phone_number?.length < 10 ||
      !myProfile.address
    ) {
      router.push(PROFILE_SETTING_PAGE);
    } else if (!myProfile.phone_verified_at) {
      router.push(UPDATE_PHONE);
    } else if (!myProfile.email_verified_at) {
      router.push(VERIFY_EMAIL);
    } else {
      router.push(POST_ITEM.href);
    }
    setLoading(false);
  };

  return (
    <div className={className ? className : ""} onClick={checkAuth}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 7,
            color: "#009E7F",
            position: "relative",
          }}
        >
          {icon ? (
            <Icon className={iconClass}>
              <IconProfile />
            </Icon>
          ) : (
            ""
          )}

          <span className="label">
            {" "}
            {loading ? (
              <Loading color="rgb(0, 158, 127)" />
            ) : intlId ? (
              <FormattedMessage
                id={intlId ? intlId : "defaultNavLinkId"}
                defaultMessage={label}
              />
            ) : (
              label
            )}
          </span>
          {number ? (
            <span
              className="number-notify"
              style={{
                position: "absolute",
                top: "-6px",
                right: 0,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "red",
                color: "#fff",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                fontSize: "12px",
              }}
            >
              {number}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreatePostButton;
