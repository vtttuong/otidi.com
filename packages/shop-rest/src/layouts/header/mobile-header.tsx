import React from "react";
import Router, { useRouter } from "next/router";
import { openModal, closeModal } from "@redq/reuse-modal";
import MobileDrawer from "./mobile-drawer";
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
  TextColor,
} from "./header.style";
import Search from "features/search/search";
import LogoImage from "assets/images/logo.png";

import { SearchIcon } from "assets/icons/SearchIcon";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import Logo from "layouts/logo/logo";
import LanguageSwitcher from "./menu/language-switcher/language-switcher";
import { isCategoryPage } from "../is-home-page";
import useDimensions from "utils/useComponentSize";
import NavLink from "components/nav-link/nav-link";
import { AddProduct } from "assets/icons/AddProduct";
import { POST_ITEM } from "site-settings/site-navigation";
import { getCookie } from "utils/session";
type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
};

const SearchModal: React.FC<{}> = () => {
  const onSubmit = () => {
    closeModal();
  };
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={onSubmit}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const { pathname, query } = useRouter();

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "search-modal-mobile",
        width: "100%",
        height: "100%",
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };
  const type = pathname === "/restaurant" ? "restaurant" : query.type;

  const isHomePage = isCategoryPage(type);

  const checkAuth = () => {
    const token = getCookie("access_token");
    if (!token) {
      Router.push("/login");
    } else {
      Router.push(POST_ITEM.href);
    }
  };

  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <DrawerWrapper>
          <MobileDrawer />
        </DrawerWrapper>

        <LogoWrapper>
          <Logo imageUrl={LogoImage} alt="shop logo" />
          <TextColor onClick={() => checkAuth()}>
            <NavLink
              className="menu-item"
              href={"/post"}
              label={POST_ITEM.defaultMessage}
              intlId={POST_ITEM.id}
              iconClass="menu-icon"
              icon={<AddProduct />}
              number={""}
            />
          </TextColor>
        </LogoWrapper>

        <LanguageSwitcher />

        {isHomePage ? (
          <SearchWrapper
            onClick={handleSearchModal}
            className="searchIconWrapper"
          >
            <SearchIcon />
          </SearchWrapper>
        ) : null}
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
