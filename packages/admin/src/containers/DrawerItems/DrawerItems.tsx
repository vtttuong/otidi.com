import React, { useCallback } from "react";
import { styled } from "baseui";
import Drawer from "components/Drawer/Drawer";
import { CloseIcon } from "assets/icons/CloseIcon";
import { useDrawerState, useDrawerDispatch } from "context/DrawerContext";

import CampaingForm from "../CampaingForm/CampaingForm";
import CampaingUpdateForm from "../CampaingForm/CampaingUpdateForm";
import TaskUpdateForm from "../TaskForm/TaskUpdateForm";
import UserDetailForm from "../DetailUserForm";
import UserIdForm from "../DetailIdForm";
import CreateUserForm from "../CreateUser/CreateUser";
import CreateFaqForm from "../CreateFaq/CreateFaq";
import UpdateFaqForm from "../UpdateFaq/UpdateFaq";
import CreateBannerForm from "../CreateBanner/CreateBanner";
import UpdateBannerForm from "../BannerDetail/BannerDetail";
// import CategoryForm from "../CategoryForm/CategoryForm";
import BrandForm from "containers/BrandForm/BrandForm";
import StaffMemberForm from "../StaffMemberForm/StaffMemberForm";
import Sidebar from "../Layout/Sidebar/Sidebar";
import RevenueByUser from "../StatisticRevenueUser/StatisticRevenueUser";
import AddPostForm from "containers/PostForm/PostForm";
import UpdatePostForm from "containers/PostForm/PostUpdateForm";
/** Components Name Constants */
const DRAWER_COMPONENTS = {
  POST_FORM: AddPostForm,
  POST_UPDATE_FORM: UpdatePostForm,
  CAMPAING_FORM: CampaingForm,
  CAMPAING_UPDATE_FORM: CampaingUpdateForm,
  TASK_UPDATE_FORM: TaskUpdateForm,
  USER_DETAIL_FORM: UserDetailForm,
  USER_ID_FORM: UserIdForm,
  CREATEUSER_FORM: CreateUserForm,
  CREATEFAQ_FORM: CreateFaqForm,
  UPDATEFAQ_FORM: UpdateFaqForm,
  CREATEBANNER_FORM: CreateBannerForm,
  UPDATEBANNER_FORM: UpdateBannerForm,
  BRAND_FORM: BrandForm,
  STAFF_MEMBER_FORM: StaffMemberForm,
  SIDEBAR: Sidebar,
  REVENUE_USER_DETAIL: RevenueByUser,
};

const CloseButton = styled("button", ({ $theme }) => ({
  ...$theme.typography.fontBold14,
  color: $theme.colors.textNormal,
  lineHeight: 1.2,
  outline: "0",
  border: "none",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "10px",
  left: "-30px",
  right: "auto",
  cursor: "pointer",
  backgroundColor: "#ffffff",
  width: "20px",
  height: "20px",
  borderRadius: "50%",

  "@media only screen and (max-width: 767px)": {
    left: "auto",
    right: "30px",
    top: "29px",
  },
}));

export default function DrawerItems() {
  const isOpen = useDrawerState("isOpen");
  const anchor = useDrawerState("anchor");
  const drawerComponent = useDrawerState("drawerComponent");
  const data = useDrawerState("data");
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);
  if (!drawerComponent) {
    return null;
  }

  const SpecificContent = DRAWER_COMPONENTS[drawerComponent];

  return (
    <Drawer
      isOpen={isOpen}
      anchor={anchor}
      onClose={closeDrawer}
      overrides={{
        Root: {
          style: {
            zIndex:
              DRAWER_COMPONENTS[drawerComponent] ===
              DRAWER_COMPONENTS.STAFF_MEMBER_FORM
                ? 0
                : 2,
          },
        },
        DrawerBody: {
          style: {
            marginTop: "80px",
            marginLeft: "60px",
            marginRight: "60px",
            marginBottom: "30px",
            "@media only screen and (max-width: 767px)": {
              marginTop: "80px",
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "30px",
            },
          },
        },
        DrawerContainer: {
          style: {
            height:
              drawerComponent === "REVENUE_USER_DETAIL" ? "85vh" : "100vh",
            width: drawerComponent === "REVENUE_USER_DETAIL" ? "100vw" : "70vw",
            backgroundColor: "#f7f7f7",
            "@media only screen and (max-width: 767px)": {
              width: "100%",
            },
          },
        },
        Close: {
          component: () => (
            <CloseButton onClick={closeDrawer}>
              <CloseIcon width="6px" height="6px" />
            </CloseButton>
          ),
        },
      }}
    >
      <SpecificContent onClose={closeDrawer} data={data} />
    </Drawer>
  );
}
