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
}
// https://api.otodi.vn/api/index/v1/posts?count=10&page=1&order_by=id&dir=asc&q=ford
export default function usePosts(variables: Props) {
  let { page, count, dir, sort, text } = variables ?? {};
  count = count ? count : COUNT_PER_PAGE;

  let queryParams = {
    count: count,
    dir: dir ? dir : "asc",
    order_by: sort ? sort : "id",
    q: text,
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
  console.log(
    "🚀 ~ file: use-posts.ts ~ line 145 ~ useRecommendPosts ~ data",
    data
  );

  return {
    loading,
    error,
    data: data,
    // hasMore,
    mutate,
    // fetchMore,
  };
}

export function useTopPosts() {
  let url = "";

  url = `${baseUrl}/posts/3/recommends`;

  const { data, mutate, error } = useSWR(url, postFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  // const [formattedData, setFormattedData] = useState(false);
  let fake_data = [
    {
      id: 2,
      status: "active",
      name: "Ford Ranger Raptor - Cần bán xe gấp",
      slug: "can-ban-xe-gap",
      views: 0,
      price: 1500000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-11T23:53:58.000000Z",
      updated_at: "2022-04-11T23:53:58.000000Z",
      user: {
        id: 2,
        name: "Nguyen Van A",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/posts/2/2_N2nbGegJCmCQfmKK.jpg",
      },
      advertise: {
        id: 3,
        advertise_package_id: 1,
        post_id: 2,
        user_id: 2,
        status: 2,
        start_time: "2022-04-26 10:25:00",
        end_time: "2022-04-27 10:25:00",
        created_at: "2022-04-26T10:20:23+07:00",
        updated_at: "2022-04-26T10:25:06+07:00",
      },
      detail: {
        released_year: 2016,
        origin: "import",
        kilometers: 2000,
        status: "used",
      },
    },
    {
      id: 3,
      status: "active",
      name: "Mazda CX-2 - 807 triệu",
      slug: "807-trieu",
      views: 0,
      price: 807000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-25T04:25:07.000000Z",
      updated_at: "2022-04-25T10:13:35.000000Z",
      user: {
        id: 4,
        name: "Pham Truong An",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/posts/3/4_q5rnGVCQyalV2Ivq.jpg",
      },
      advertise: {
        id: 8,
        advertise_package_id: 1,
        post_id: 3,
        user_id: 4,
        status: 2,
        start_time: "2022-04-26 10:42:00",
        end_time: "2022-04-27 10:42:00",
        created_at: "2022-04-26T10:35:18+07:00",
        updated_at: "2022-04-26T10:42:04+07:00",
      },
      detail: {
        released_year: 2022,
        origin: "import",
        kilometers: 2000,
        status: "unused",
      },
    },
    {
      id: 4,
      status: "active",
      name: "Mazda MX 5 - Ahihi",
      slug: "ahihi",
      views: 20,
      price: 1500000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-25T04:52:13.000000Z",
      updated_at: "2022-04-25T10:13:51.000000Z",
      user: {
        id: 1,
        name: "Minh hihi",
        address: null,
        avatar:
          "https://otody.s3.ap-southeast-1.amazonaws.com/users/1/uVV8tReBaPFPuNQ1.jpg",
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 2,
        advertise_package_id: 1,
        post_id: 4,
        user_id: 1,
        status: 2,
        start_time: "2022-04-25 17:35:00",
        end_time: "2022-04-26 17:35:00",
        created_at: "2022-04-25T17:34:57+07:00",
        updated_at: "2022-04-25T17:42:10+07:00",
      },
      detail: {
        released_year: 2021,
        origin: "import",
        kilometers: 2000,
        status: "unused",
      },
    },
    {
      id: 6,
      status: "active",
      name: "Ford Escape - 648 triệu",
      slug: "can-ban-xe-gap",
      views: 99,
      price: 1500000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-11T23:53:58.000000Z",
      updated_at: "2022-04-11T23:53:58.000000Z",
      user: {
        id: 2,
        name: "Nguyen Van A",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 4,
        advertise_package_id: 1,
        post_id: 6,
        user_id: 2,
        status: 2,
        start_time: "2022-04-26 10:32:00",
        end_time: "2022-04-27 10:32:00",
        created_at: "2022-04-26T10:20:37+07:00",
        updated_at: "2022-04-26T10:32:04+07:00",
      },
      detail: {
        released_year: 2013,
        origin: "import",
        kilometers: 25000,
        status: "used",
      },
    },
    {
      id: 7,
      status: "active",
      name: "Mazda 6 - Mua bán trao đổi xe giá tốt nhất",
      slug: "807-trieu",
      views: 0,
      price: 807000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-25T04:25:07.000000Z",
      updated_at: "2022-04-25T10:13:35.000000Z",
      user: {
        id: 4,
        name: "Pham Truong An",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 9,
        advertise_package_id: 1,
        post_id: 7,
        user_id: 4,
        status: 2,
        start_time: "2022-04-26 10:45:00",
        end_time: "2022-04-27 10:45:00",
        created_at: "2022-04-26T10:35:23+07:00",
        updated_at: "2022-04-26T10:45:05+07:00",
      },
      detail: {
        released_year: 2014,
        origin: "import",
        kilometers: 40000,
        status: "used",
      },
    },
    {
      id: 8,
      status: "active",
      name: "Mazda CX-2 - Hoàn tiền nếu sai 5 tiêu chí vàng",
      slug: "ahihi",
      views: 36,
      price: 1500000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-25T04:52:13.000000Z",
      updated_at: "2022-04-25T10:13:51.000000Z",
      user: {
        id: 3,
        name: "DLOW",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 5,
        advertise_package_id: 1,
        post_id: 8,
        user_id: 3,
        status: 2,
        start_time: "2022-04-26 10:40:00",
        end_time: "2022-04-27 10:40:00",
        created_at: "2022-04-26T10:34:10+07:00",
        updated_at: "2022-04-26T10:40:04+07:00",
      },
      detail: {
        released_year: 2020,
        origin: "import",
        kilometers: 15000,
        status: "unused",
      },
    },
    {
      id: 9,
      status: "active",
      name: "Mazda 323 - 338 triệu",
      slug: "can-ban-xe-gap",
      views: 0,
      price: 1500000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-11T23:52:02.000000Z",
      updated_at: "2022-04-11T23:57:10.000000Z",
      user: {
        id: 3,
        name: "DLOW",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 6,
        advertise_package_id: 1,
        post_id: 9,
        user_id: 3,
        status: 2,
        start_time: "2022-04-26 10:40:00",
        end_time: "2022-04-27 10:40:00",
        created_at: "2022-04-26T10:34:19+07:00",
        updated_at: "2022-04-26T10:40:04+07:00",
      },
      detail: {
        released_year: 2012,
        origin: "inland",
        kilometers: 20000,
        status: "used",
      },
    },
    {
      id: 16,
      status: "active",
      name: "Leux GS 300 - Hoàn tiền nếu sai 5 tiêu chí vàng",
      slug: "ahihi",
      views: 0,
      price: 2000000000,
      latitude: null,
      longitude: null,
      created_at: "2022-04-25T04:52:13.000000Z",
      updated_at: "2022-04-25T10:13:51.000000Z",
      user: {
        id: 3,
        name: "DLOW",
        address: null,
        avatar: null,
        rating: 0,
      },
      main_image: {
        url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Grand_Central_Terminal_ceiling_view.jpg/1280px-Grand_Central_Terminal_ceiling_view.jpg",
      },
      advertise: {
        id: 7,
        advertise_package_id: 1,
        post_id: 16,
        user_id: 3,
        status: 2,
        start_time: "2022-04-26 10:40:00",
        end_time: "2022-04-27 10:40:00",
        created_at: "2022-04-26T10:34:40+07:00",
        updated_at: "2022-04-26T10:40:04+07:00",
      },
      detail: {
        released_year: 2020,
        origin: "import",
        kilometers: 15000,
        status: "unused",
      },
    },
  ];
  return {
    loading,
    error,
    data: fake_data,
    // hasMore,
    mutate,
    // fetchMore,
  };
}
