import Fuse from "fuse.js";
import useSWR from "swr";
// import { useState } from 'react';
const queryString = require("query-string");
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

const FAKE_DATA = [
  {
    id: 25,
    title: "Cần bán xe gấp",
    status: "waiting",
    slug: "can-ban-xe-gap",
    views: 0,
    price: 1500000000,
    description:
      '<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Jean LEVIS 501</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Dáng Slim lên form chuẩn</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Chất jean co giãn, mặc siêu thoải mái</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Màu đẹp: trung và đậm</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Size:29-30-31-32-34</span></p>',
    user_id: 1,
    brand_id: 4,
    deleted_at: null,
    created_at: "2022-04-12T06:52:02+00:00",
    updated_at: "2022-04-12T06:52:02+00:00",
    brand_model_id: 6,
    latitude: null,
    longitude: null,
    main_image: [
      {
        id: 2,
        path: "products/1/1_OMUUycO3k4uppkHo.jpg",
        url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
        is_main: 1,
        position: 0,
      },
    ],
  },
  {
    id: 32,
    title: "Cần bán xe gấp",
    status: "waiting",
    slug: "can-ban-xe-gap",
    views: 0,
    price: 1500000000,
    description:
      '<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Jean LEVIS 501</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Dáng Slim lên form chuẩn</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Chất jean co giãn, mặc siêu thoải mái</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Màu đẹp: trung và đậm</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Size:29-30-31-32-34</span></p>',
    user_id: 1,
    brand_id: 4,
    deleted_at: null,
    created_at: "2022-04-12T06:52:02+00:00",
    updated_at: "2022-04-12T06:52:02+00:00",
    brand_model_id: 6,
    latitude: null,
    longitude: null,
    main_image: [
      {
        id: 2,
        path: "products/1/1_OMUUycO3k4uppkHo.jpg",
        url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
        is_main: 1,
        position: 0,
      },
    ],
  },
  {
    id: 36,
    title: "Bán xe giá rẻ",
    status: "waiting",
    slug: "can-ban-xe-gap",
    views: 0,
    price: 1500000000,
    description:
      '<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Jean LEVIS 501</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Dáng Slim lên form chuẩn</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Chất jean co giãn, mặc siêu thoải mái</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Màu đẹp: trung và đậm</span></p>\n<p style="text-align:start;"><span style="color: rgb(5,5,5);background-color: rgb(255,255,255);font-size: 15px;font-family: Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;">Size:29-30-31-32-34</span></p>',
    user_id: 1,
    brand_id: 4,
    deleted_at: null,
    created_at: "2022-04-12T06:52:02+00:00",
    updated_at: "2022-04-12T06:52:02+00:00",
    brand_model_id: 6,
    latitude: null,
    longitude: null,
    main_image: [
      {
        id: 2,
        path: "products/1/1_OMUUycO3k4uppkHo.jpg",
        url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
        is_main: 1,
        position: 0,
      },
    ],
  },
];

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
  brand?: any;
  count?: number;
  page?: any;
  sortBy?: string;
}
export default function usePosts(variables: Props) {
  const { status, brand, text, sortBy, page, count } = variables ?? {};

  let queryParams = {
    dir: sortBy ? (sortBy === "lasted" ? "desc" : "asc") : "",
    status: status,
    brand: brand,
    page: page ? page : "",
    count: count ? count : "",
    order_by: sortBy ? "created_at" : "",
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

  let posts = data?.data || FAKE_DATA;

  if (text && data) {
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
