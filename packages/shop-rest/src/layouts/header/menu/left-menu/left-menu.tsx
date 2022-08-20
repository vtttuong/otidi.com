import { AddPost } from "assets/icons/AddPost";
import * as categoryMenuIcons from "assets/icons/category-menu-icons";
import { MenuDown } from "assets/icons/MenuDown";
import NavLink from "components/nav-link/nav-link";
import Popover from "components/popover/popover";
import Logo from "layouts/logo/logo";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import {
  POST_ITEM,
  PROFILE_SETTING_PAGE,
  UPDATE_PHONE,
  VERIFY_EMAIL,
} from "site-settings/site-navigation";
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
import CreatePostButton from "components/create-post-button/nav-link";
import { getMyprofile } from "utils/api/profile";

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

  const checkAuth = async () => {
    let token = getCookie("access_token");
    // let phoneNumber = getCookie("userPhone");
    // console.log(
    //   "🚀 ~ file: left-menu.tsx ~ line 83 ~ checkAuth ~ phoneNumber",
    //   phoneNumber
    // );
    // let isVerifyPhone = getCookie("phone_verified_at");
    // console.log(
    //   "🚀 ~ file: left-menu.tsx ~ line 85 ~ checkAuth ~ isVerifyPhone",
    //   isVerifyPhone
    // );
    // let isVerifyEmail = getCookie("email_verified_at");
    // console.log(
    //   "🚀 ~ file: left-menu.tsx ~ line 87 ~ checkAuth ~ isVerifyEmail",
    //   isVerifyEmail
    // );
    // let isVerifyAddress = getCookie("userAddress");
    // console.log(
    //   "🚀 ~ file: left-menu.tsx ~ line 89 ~ checkAuth ~ isVerifyAddress",
    //   isVerifyAddress
    // );

    if (!token) {
      authDispatch({
        type: "SIGNIN",
      });
      router.push("/login");
      return;
    }

    const myProfile = await getMyprofile(token);
    console.log(
      "🚀 ~ file: left-menu.tsx ~ line 113 ~ checkAuth ~ myProfile",
      myProfile
    );

    if (!myProfile.phone_number || myProfile.phone_number?.length < 8) {
      router.push(PROFILE_SETTING_PAGE);
      return;
    }
    if (!myProfile.phone_verified_at) {
      router.push(UPDATE_PHONE);
      return;
    }
    if (!myProfile.email_verified_at) {
      router.push(VERIFY_EMAIL);
      return;
    }
    if (!myProfile.address) {
      router.push(PROFILE_SETTING_PAGE);
      return;
    }
    router.push(POST_ITEM.href);
  };

  return (
    <LeftMenuBox>
      <Logo imageUrl={logo} alt={"Shop Logo"} />
      <TextColor onClick={() => checkAuth()}>
        <CreatePostButton
          className="menu-item"
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
