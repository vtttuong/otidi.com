import useSWR from "swr";
import Fuse from "fuse.js";
// import { useState } from 'react';
const queryString = require("query-string");
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const options = {
  isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  minMatchCharLength: 2,
  keys: ["user.name"],
};
function search(list, pattern) {
  const fuse = new Fuse(list, options);

  return fuse.search(pattern).map((current) => current.item);
}
// import productFetcher from 'utils/api/product';
const token = localStorage.getItem("secondhand_token");
const productFetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
interface Props {
  limit?: number;
  status?: string;
  dayAgo?: number;
  text?: string;
}
export default function usePayments(variables: Props) {
  const { limit, status, dayAgo, text } = variables ?? {};

  let queryParams = {
    limit: limit,
    status: status,
    days_ago: dayAgo,
  };

  let newParams = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(queryParams).map((key) => {
    if (typeof queryParams[key] !== "undefined" && queryParams[key] !== "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    },
    { sort: false }
  );

  let url = baseUrl + "/api/admin/v1/payments?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration

  let payments = data;

  if (text) {
    payments = search(payments, text);
  }

  return {
    loading,
    error,
    data: payments,
    // hasMore,
    mutate,
    // fetchMore,
  };
}
