import {CheckMark} from "assets/icons/CheckMark";
import {CouponIcon} from "assets/icons/CouponIcon";
import {CustomerIcon} from "assets/icons/CustomerIcon";
import {DashboardIcon} from "assets/icons/DashboardIcon";
import {HelpIcon} from "assets/icons/HelpIcon";
import {LogoutIcon} from "assets/icons/LogoutIcon";
import {OrderIcon} from "assets/icons/OrderIcon";
import {Plus} from "assets/icons/Plus";
import {ProductIcon} from "assets/icons/ProductIcon";
import {SidebarCategoryIcon} from "assets/icons/SidebarCategoryIcon";
import {AuthContext} from "context/auth";
import React, {useContext} from "react";
import {withRouter} from "react-router-dom";
import {
  BANNERS,
  BRANDS,
  COUPONS,
  DASHBOARD,
  FAQS,
  ORDERS,
  POSTS,
  TASKS,
  USERS,
} from "settings/constants";
import {
  LogoutBtn,
  MenuWrapper,
  NavLink,
  SidebarWrapper,
  Svg,
} from "./Sidebar.style";

const sidebarMenus = [
  {
    name: "Dashboard",
    path: DASHBOARD,
    exact: true,
    icon: <DashboardIcon />,
  },
  {
    name: "Posts",
    path: POSTS,
    exact: false,
    icon: <ProductIcon />,
  },
  {
    name: "Brands",
    path: BRANDS,
    exact: false,
    icon: <SidebarCategoryIcon />,
  },
  {
    name: "Payments",
    path: ORDERS,
    exact: false,
    icon: <OrderIcon />,
  },
  {
    name: "Users",
    path: USERS,
    exact: false,
    icon: <CustomerIcon />,
  },
  {
    name: "Faqs",
    path: FAQS,
    exact: false,
    icon: <HelpIcon />,
  },
  {
    name: "Banners",
    path: BANNERS,
    exact: false,
    icon: <Plus />,
  },
  {
    name: "Vouchers",
    path: COUPONS,
    exact: false,
    icon: <CouponIcon />,
  },

  {
    name: "Tasks",
    path: TASKS,
    exact: false,
    icon: <CheckMark />,
  },

  // {
  //   name: "Settings",
  //   path: SETTINGS,
  //   exact: false,
  //   icon: <SettingIcon />,
  // },
];

export default withRouter(function Sidebar({
  refs,
  style,
  onMenuItemClick,
}: any) {
  const {signout} = useContext(AuthContext);
  return (
    <SidebarWrapper ref={refs} style={style}>
      <MenuWrapper className="left-menu-wrapper">
        {sidebarMenus.map((menu: any, index: number) => (
          <NavLink
            to={menu.path}
            key={index}
            exact={menu.exact}
            activeStyle={{
              color: "#00C58D",
              backgroundColor: "#f7f7f7",
              borderRadius: "50px 0 0 50px",
            }}
            onClick={onMenuItemClick}
          >
            {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
            {menu.name}
          </NavLink>
        ))}
      </MenuWrapper>

      <LogoutBtn
        onClick={() => {
          signout();
        }}
      >
        <Svg>
          <LogoutIcon />
        </Svg>
        Logout
      </LogoutBtn>
    </SidebarWrapper>
  );
});
