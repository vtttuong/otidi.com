import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import Image from "components/image/image";
import * as Icons from "assets/icons/menu-profile-icons";

type NavLinkProps = {
  number?: string;
  router?: any;
  href?: string;
  label: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  dynamic?: boolean;
  onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NavLink({
  href,
  number,
  label,
  intlId,
  router,
  icon,
  className,
  onClick,
  iconClass,
  dynamic,
}: any) {
  const IconProfile = Icons[icon] || Icons["CreatePost"];
  const isCurrentPath = router.pathname === href || router.asPath === href;
  return (
    <div onClick={onClick} className={className ? className : ""}>
      {dynamic ? (
        <Link href={"/[type]"} as={href}>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ""}
            <span className="label">{intlId ? "" : label}</span>
          </a>
        </Link>
      ) : (
        <Link href={href ? href : "/"}>
          <a
            className={isCurrentPath ? " current-page" : ""}
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
              {intlId ? (
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
          </a>
        </Link>
      )}
    </div>
  );
}

export default withRouter(NavLink);
