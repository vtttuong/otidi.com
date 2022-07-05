import { AddPost } from "assets/icons/AddPost";
import * as categoryMenuIcons from "assets/icons/category-menu-icons";
import { MenuDown } from "assets/icons/MenuDown";
import NavLink from "components/nav-link/nav-link";
import Popover from "components/popover/popover";
import Logo from "layouts/logo/logo";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { POST_ITEM } from "site-settings/site-navigation";
import {
  Arrow,
  Icon,
  LogoWrapper,
  LeftMenuBox,
  MainMenu,
  MenuItem,
  SelectedItem,
  TextColor,
  SelectedItemName,
  IconLogo,
} from "./left-menu.style";
import { getCookie } from "utils/session";
import { AuthContext } from "contexts/auth/auth.context";

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const BrandMenu = (props: any) => {
  const handleOnClick = (item: any) => {
    if (item.dynamic) {
      Router.push("/[type]", `${item.name}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {props.brands &&
        props.brands.map((item) => (
          <MenuItem
            key={item.id}
            {...props}
            onClick={() => handleOnClick(item)}
          >
            <LogoWrapper>
              <IconLogo src={item.logo} />
            </LogoWrapper>
            <FormattedMessage id={item.id} defaultMessage={item.name} />
          </MenuItem>
        ))}
    </div>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  const router = useRouter();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  // const [activeMenu, setActiveMenu] = React.useState(initialMenu ?? brands[0]);

  const checkAuth = () => {
    let token = getCookie("access_token");
    let isVerifyPhone = getCookie("phone_verified_at");
    if (!token) {
      authDispatch({
        type: "SIGNIN",
      });
      // Router.push("/login");
      return;
    }
    if (token && isVerifyPhone?.length < 8) {
      Router.push("/update-phone");
      return;
    } else {
      Router.push(POST_ITEM.href);
    }
  };

  return (
    <LeftMenuBox>
      <Logo imageUrl={logo} alt={"Shop Logo"} />
      <TextColor onClick={() => checkAuth()}>
        <NavLink
          className="menu-item"
          href={POST_ITEM.href}
          label={POST_ITEM.defaultMessage}
          intlId={POST_ITEM.id}
          iconClass="menu-icon"
          icon={<AddPost />}
          number={""}
        />
      </TextColor>
    </LeftMenuBox>
  );
};
