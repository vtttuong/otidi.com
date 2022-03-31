import React from "react";
import { FormattedMessage } from "react-intl";
import NavLink from "components/nav-link/nav-link";
import { AUTHORIZED_MENU_ITEMS } from "site-settings/site-navigation";
import { Logout } from "assets/icons/menu-profile-icons";

type Props = {
  onLogout: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <NavLink
          number={""}
          key={idx}
          className="menu-item"
          href={item.href}
          label={item.defaultMessage}
          intlId={item.id}
          icon={item.icon}
        />
      ))}
      <div className="menu-item" onClick={onLogout}>
        <a style={{ margin: 7, borderTop: "1px solid" }}>
          <Logout style={{ marginRight: 7 }} />
          <span>
            <FormattedMessage id="nav.logout" defaultMessage="Logout" />
          </span>
        </a>
      </div>
    </>
  );
};
