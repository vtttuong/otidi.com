import Fuse from "fuse.js";
import useSWR from "swr";
// import { useState } from 'react';
const queryString = require("query-string");
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

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
  // minMatchCharLength: 2,
  keys: ["title"],
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
  status?: string;
  text?: any;
  brands?: any;
  count?: number;
  page?: number;
  sortBy?: string;
}
export default function usePosts(variables: Props) {
  const { status, brands, text, sortBy, page, count } = variables ?? {};

  let queryParams = {
    dir: sortBy ? (sortBy === "lasted" ? "desc" : "asc") : "",
    status: status,
    brand_ids: brands,
    page: page ? page : "",
    count: count ? count : "",
    order_by: sortBy ? "created_at" : "",
    q: text ? text : "",
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

  let url = baseUrl + "/posts?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);

  let posts = data?.data;

  return {
    loading,
    error,
    data: posts,
    // hasMore,
    mutate,
    // fetchMore,
    total: data?.total || 0,
  };
}

export const usePost = (postId: number) => {
  const url = `${baseUrl}/posts/${postId}`;
  const { data, error } = useSWR(url, productFetcher);
  const loading = !data && !error;

  return {
    postLoading: loading,
    error,
    post: data?.data,
  };
};

export const getReports = async (postId: number) => {
  const token = localStorage.getItem("secondhand_token");
  const url = `${baseUrl}/post-reports?post_id=${postId}&order_by=id&dir=asc`;

  const configs = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, configs);
    return await response.json();
  } catch (err) {
    return null;
  }
};
