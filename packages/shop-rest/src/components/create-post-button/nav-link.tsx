import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
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

  return (
    <div className={className ? className : ""}>
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
        </div>
      </div>
    </div>
  );
};

export default CreatePostButton;
