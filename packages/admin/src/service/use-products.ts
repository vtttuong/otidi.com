import Fuse from "fuse.js";
import useSWR from "swr";
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
  type?: string;
  postType?: string;
  status?: string;
  categoryType?: string;
  text?: any;
  category?: any;
  offset?: number;
  page?: any;
  limit?: number;
  dir?: string;
  isSold?: boolean;
  isPriority?: boolean;
  isExpired?: boolean;
}
export default function useProducts(variables: Props) {
  const {
    postType,
    status,
    categoryType,
    text,
    dir,
    isSold,
    isPriority,
    isExpired,
  } = variables ?? {};

  let queryParams = {
    dir: dir,
    status: status,
    category_type: categoryType,
    type: postType,
    is_sold: isSold ? 1 : 0,
    is_priority: isPriority ? 1 : 0,
    is_expired: isExpired ? 1 : 0,
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

  let url = baseUrl + "/api/admin/v1/posts?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);

  let posts = data;

  if (text) {
    posts = search(posts, text);
  }

  // let localOffset = offset;
  // let localLimit = limit;
  // const fetchMore = async (os, lmt) => {
  //   localOffset = os;
  //   localLimit = lmt;
  //   setFormattedData(true);
  // };
  // console.log('object');
  // data: [
  //   ...state.data,
  //   ...state.total.slice(
  //     state.data.length,
  //     state.data.length + state.limit
  //   ),
  // ],
  // need to implement fetchMore
  // const hasMore = posts?.length > localOffset + localLimit;
  return {
    loading,
    error,
    data: posts,
    // hasMore,
    mutate,
    // fetchMore,
  };
}
