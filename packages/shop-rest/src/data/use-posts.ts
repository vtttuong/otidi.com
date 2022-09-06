import useSWR, { useSWRInfinite } from "swr";
import queryString from "query-string";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const COUNT_PER_PAGE = 8;

var sortBy = (function () {
  var toString = Object.prototype.toString,
    // default parser function
    parse = function (x) {
      return x;
    },
    // gets the item to be sorted
    getItem = function (x) {
      var isObject = x != null && typeof x === "object";
      var isProp = isObject && this.prop in x;
      return this.parser(isProp ? x[this.prop] : x);
    };

  /**
   * Sorts an array of elements.
   *
   * @param {Array} array: the collection to sort
   * @param {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby(array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
})();

const postFetcher = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  }).then((res) => res.json());

const postFetcherLoadmore = (url: string) =>
  fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  })
    .then((res) => res.json())
    .then((json) => json.data);

interface Props {
  page?: number;
  count?: number;
  sort?: string | string[];
  dir?: string | string[];
  text?: string | string[];
  brandId: string | string[];
  modelId: string | string[];
}
// https://api.otodi.vn/api/index/v1/posts?count=10&page=1&order_by=id&dir=asc&q=ford
export default function usePosts(variables: Props) {
  let { page, count, dir, sort, text, brandId, modelId } = variables ?? {};
  count = count ? count : COUNT_PER_PAGE;

  let queryParams = {
    count: count,
    dir: dir ? dir : "asc",
    order_by: sort ? sort : "id",
    q: text,
    brand_ids: brandId,
    brand_model_ids: modelId,
  };

  let newParams = {};
  Object.keys(queryParams).map((key) => {
    if (typeof queryParams[key] !== "undefined" && queryParams[key] != "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    }
    // { sort: false }
  );

  let url = baseUrl + "/posts?";

  // const { data, mutate, error } = useSWR(url, postFetcher);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${url}&page=${index + 1}&${parsed}`,
    postFetcherLoadmore
  );

  let posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < count);

  // if (sort === "views") {
  //   posts = sortBy(posts, { prop: "views", desc: true });
  // }

  return {
    posts,
    error,
    isLoadingMore,
    isLoadingInitialData,
    size,
    setSize,
    isReachingEnd,
  };
}

export function useRecommendPosts(id: number) {
  let url = "";

  url = `${baseUrl}/posts/${id}/recommends`;

  const { data, mutate, error } = useSWR(url, postFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);

  return {
    loading,
    error,
    data: data,
    // hasMore,
    mutate,
    // fetchMore,
  };
}

export function useTopPosts(top: number, orderBy: string) {
  let queryParams = {
    count: top,
    dir: "desc",
    order_by: orderBy ? orderBy : "views",
    page: 1,
  };

  let newParams = {};
  Object.keys(queryParams).map((key) => {
    if (typeof queryParams[key] !== "undefined" && queryParams[key] != "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    }
    // { sort: false }
  );

  let url = "";

  url = `${baseUrl}/posts?${parsed}`;

  const { data, mutate, error } = useSWR(url, postFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);

  return {
    loading,
    error,
    data: data?.data || null,
    // hasMore,
    mutate,
    // fetchMore,
  };
}
