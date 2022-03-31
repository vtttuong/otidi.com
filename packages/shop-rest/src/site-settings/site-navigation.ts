export const HOME_PAGE = "/";
export const VEHICLE_PAGE = "/vehicle";
export const ANIMAL_PAGE = "/pets";
export const ELECTRONIC_PAGE = "/electronic";
export const FASHION_PAGE = "/fashion";
export const TECHNOLOGY_PAGE = "/technology";
export const SPORT_RELAX_PAGE = "/sport_relax";
export const FURNITURE_PAGE = "/furniture";
export const OFFICE_PAGE = "/office";
export const REQUEST_MEDICINE_PAGE = "/request-medicine";
export const CHECKOUT_PAGE = "/checkout";
export const PROFILE_PAGE = "/profile";
export const PROFILE_SETTING_PAGE = "/profile/setting-profile";
export const YOUR_ORDER_PAGE = "/order/history";
export const ORDER_RECEIVED_PAGE = "/order-received";
export const VOUCHER = "/voucher";
export const HELP_PAGE = "/help";
export const TERMS_AND_SERVICES_PAGE = "/terms";
export const PRIVACY_POLICY_PAGE = "/privacy";
export const HOTNEW_PAGE = "/hot-new";
export const POST_PAGE = "/post";
export const MESSAGE_PAGE = "/message";
export const HISTORY_SEARCH_PAGE = "/profile/history-search";
export const HISTORY_PAY_PAGE = "/payment-history";
export const PAYMENT_REQUEST = "/payment-request";
// Mobile Drawer Menus

export const PRIVACY_ITEM = {
  id: "nav.privacy_policy",
  defaultMessage: "Privacy",
  href: PRIVACY_POLICY_PAGE,
  icon: "Policy",
};
export const TERMS_ITEM = {
  id: "nav.terms_and_services",
  defaultMessage: "Messages",
  href: TERMS_AND_SERVICES_PAGE,
  icon: "Techonology",
};
export const MESSAGE_ITEM = {
  id: "nav.messageitem",
  defaultMessage: "Messages",
  href: MESSAGE_PAGE,
  icon: "Message",
};

export const NOTIFY_ITEM = {
  id: "nav.notifyitem",
  defaultMessage: "Notify",
  href: MESSAGE_PAGE,
  icon: "Techonology",
};

export const POST_ITEM = {
  id: "nav.createproduct",
  defaultMessage: "Create Product",
  href: POST_PAGE,
  icon: "Post",
};

export const HOTNEW_ITEM = {
  id: "nav.hotnew",
  defaultMessage: "Hot News",
  href: HOTNEW_PAGE,
  icon: "Techonology",
};

export const HOME_MENU_ITEM = {
  id: "nav.home",
  defaultMessage: "Home",
  href: HOME_PAGE,
  icon: "OtherVehicle",
};

export const HELP_MENU_ITEM = {
  id: "nav.help",
  defaultMessage: "Help",
  href: HELP_PAGE,
  icon: "Help",
};
export const VOUCHER_MENU_ITEM = {
  id: "voucher",
  defaultMessage: "Voucher",
  href: VOUCHER,
  icon: "Voucher",
};
export const ORDER_MENU_ITEM = {
  id: "nav.order",
  href: YOUR_ORDER_PAGE,
  defaultMessage: "Order",
};
export const REQUEST_MEDICINE_MENU_ITEM = {
  id: "nav.request_medicine",
  defaultMessage: "Request Medicine",
  href: REQUEST_MEDICINE_PAGE,
};
export const PROFILE_MENU_ITEM = {
  id: "nav.profile",
  defaultMessage: "Profile",
  href: PROFILE_PAGE,
  icon: "Profile",
};
export const PROFILE_SETTING_MENU_ITEM = {
  id: "nav.profile.setting",
  defaultMessage: "Setting",
  href: PROFILE_SETTING_PAGE,
  icon: "Setting",
};

export const PAYMENT_REQUEST_ITEM = {
  id: "nav.paymentItem",
  defaultMessage: "Upgrade account",
  href: PAYMENT_REQUEST,
  icon: "Payment",
};

export const HISTORY_SEARCH_ITEM = {
  id: "nav.historySearch",
  defaultMessage: "Searches history",
  href: HISTORY_SEARCH_PAGE,
  icon: "HistorySearch",
};
export const HISTORY_PAY_ITEM = {
  id: "nav.payment",
  defaultMessage: "Payment history",
  href: HISTORY_PAY_PAGE,
  icon: "Payment",
};

export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  PROFILE_SETTING_MENU_ITEM,
  PAYMENT_REQUEST_ITEM,
  HISTORY_SEARCH_ITEM,
  HISTORY_PAY_ITEM,
  VOUCHER_MENU_ITEM,
  HELP_MENU_ITEM,
  PRIVACY_ITEM,
];
// category menu items for header navigation
export const CATEGORY_MENU_ITEMS = [
  {
    id: "nav.vehicle",
    href: VEHICLE_PAGE,
    defaultMessage: "Vehicle",
    icon: "Vehicle",
    dynamic: true,
  },
  {
    id: "nav.electronic",
    defaultMessage: "Electronic",
    href: ELECTRONIC_PAGE,
    icon: "AccessoriesElec",
    dynamic: true,
  },
  {
    id: "nav.technology",
    defaultMessage: "Technology",
    href: TECHNOLOGY_PAGE,
    icon: "Techonology",
    dynamic: true,
  },
  {
    id: "nav.fashion",
    defaultMessage: "Fashion",
    href: FASHION_PAGE,
    icon: "Clother",
    dynamic: true,
  },
  {
    id: "nav.furniture",
    defaultMessage: "Furniture",
    href: FURNITURE_PAGE,
    icon: "Decoration",
    dynamic: true,
  },
  {
    id: "nav.sport_relax",
    defaultMessage: "Sport & Relax",
    href: SPORT_RELAX_PAGE,
    icon: "Sport",
    dynamic: true,
  },
  {
    id: "nav.office",
    defaultMessage: "Office",
    href: OFFICE_PAGE,
    icon: "OtherOffice",
    dynamic: true,
  },
  {
    id: "nav.animal",
    defaultMessage: "Animal",
    href: ANIMAL_PAGE,
    icon: "Animal",
    dynamic: true,
  },
];

export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  MESSAGE_ITEM,
  ...AUTHORIZED_MENU_ITEMS,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: "en",
    defaultMessage: "English",
    icon: "USFlag",
  },
  {
    id: "vi",
    defaultMessage: "Tiếng Việt",
    icon: "VIFlag",
  },
];
