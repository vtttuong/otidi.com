import useSWR from "swr";
const queryString = require("query-string");
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

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

// import postFetcher from 'utils/api/post';
const postFetcher = (url) => fetch(url).then((res) => res.json());
interface Props {
  type?: string;
  text?: any;
  category?: any;
  sort?: any;
  post_type?: any;
  radius?: any;
  latitude?: number;
  longitude?: number;
  days_ago?: any;
  offset?: number;
  page?: any;
  limit?: number;
  isPriority?: number;
}
export default function usePosts(variables: Props) {
  const {
    type,
    text,
    category,
    sort,
    post_type,
    radius,
    latitude,
    longitude,
    days_ago,
    offset = 0,
    page,
    limit,
    isPriority,
  } = variables ?? {};

  let queryParams = {
    category_slug: text ? "" : category,
    category_type: text ? "" : type,
    sort: sort === "created_at" ? sort : "",
    dir: sort ? "desc" : "",
    post_type: post_type,
    radius: radius,
    latitude: latitude,
    longitude: longitude,
    days_ago: days_ago,
    q: text,
    is_priority: isPriority,
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
    },
    { sort: false }
  );

  let url = baseUrl + "/api/v1/posts?" + parsed;
  const { data, mutate, error } = useSWR(url, postFetcher);
  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);
  if (data === undefined) {
    return {
      loading,
      error,
      data: undefined,
      mutate,
    };
  }

  // let posts = data;
  // if (!text) {
  //   posts = data?.filter((current) => current.category_type === type);
  // }
  // console.log(posts);
  let posts = data;

  if (sort === "like") {
    posts = sortBy(posts, { prop: "likes_count", desc: true });
  }

  return {
    loading,
    error,
    data: posts?.slice(offset, offset + limit),
    // hasMore,
    mutate,
    // fetchMore,
  };
}

export async function useRecommendPosts(postSlug, token = null) {
  let url = "";

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (token) {
    url = `${baseUrl}/api/client/v1/posts/data/recommends`;
  } else {
    url = `${baseUrl}/api/v1/posts/${postSlug}/relations`;
  }
  const data = await fetch(url, options);

  return data.json();
}
