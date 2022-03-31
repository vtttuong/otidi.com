import {
  HOME_PAGE,
  VEHICLE_PAGE,
  FASHION_PAGE,
  ELECTRONIC_PAGE,
  TECHNOLOGY_PAGE,
  FURNITURE_PAGE,
  SPORT_RELAX_PAGE,
  OFFICE_PAGE,
  HISTORY_SEARCH_PAGE,
} from "site-settings/site-navigation";
const arr = [
  HOME_PAGE,
  VEHICLE_PAGE,
  FASHION_PAGE,
  ELECTRONIC_PAGE,
  TECHNOLOGY_PAGE,
  FURNITURE_PAGE,
  SPORT_RELAX_PAGE,
  OFFICE_PAGE,
  HISTORY_SEARCH_PAGE,
];
export function isCategoryPage(pathname) {
  return arr.includes(`/${pathname}`);
}
