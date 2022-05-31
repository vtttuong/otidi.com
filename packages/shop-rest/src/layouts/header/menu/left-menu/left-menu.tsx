import { AddProduct } from "assets/icons/AddProduct";
import * as categoryMenuIcons from "assets/icons/category-menu-icons";
import { MenuDown } from "assets/icons/MenuDown";
import NavLink from "components/nav-link/nav-link";
import Popover from "components/popover/popover";
import Logo from "layouts/logo/logo";
import Router, { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CATEGORY_MENU_ITEMS, POST_ITEM } from "site-settings/site-navigation";
import {
  Arrow,
  Icon,
  IconWrapper,
  LeftMenuBox,
  MainMenu,
  MenuItem,
  SelectedItem,
  TextColor,
} from "./left-menu.style";
import { getCookie } from "utils/session";

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryMenu = (props: any) => {
  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push("/[type]", `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <IconWrapper>
            <CategoryIcon name={item.icon} />
          </IconWrapper>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
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
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );

  const checkAuth = () => {
    let token = getCookie("access_token");
    let isVerifyPhone = getCookie("phone_verified_at");
    console.log(isVerifyPhone);
    if (!token) {
      Router.push("/login");
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
      <Logo
        imageUrl={logo}
        alt={"Shop Logo"}
        onClick={() => setActiveMenu(CATEGORY_MENU_ITEMS[0])}
      />

      <MainMenu>
        <Popover
          className="right"
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <CategoryIcon name={activeMenu?.icon} />
                </Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.id}
                    defaultMessage={activeMenu?.defaultMessage}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu>
      <TextColor onClick={() => checkAuth()}>
        <NavLink
          className="menu-item"
          href={"/loading"}
          label={POST_ITEM.defaultMessage}
          intlId={POST_ITEM.id}
          iconClass="menu-icon"
          icon={<AddProduct />}
          number={""}
        />
      </TextColor>
    </LeftMenuBox>
  );
};
