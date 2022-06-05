import useSWR from "swr";
import Fuse from "fuse.js";
import queryString from "query-string";

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
  minMatchCharLength: 2,
  keys: ["label", "slug"],
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
  locale?: string;
  type?: string;
  text?: string;
  parent_id?: any;
}

export function usePlanCategories(variables: Props) {
  const {locale, parent_id, text} = variables ?? {};

  let queryParams = {
    locale: locale,
    parent_id: parent_id,
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
    {sort: false}
  );

  let url = baseUrl + "/api/admin/v1/categories/plane/tree?" + parsed;

  const {data, mutate, error} = useSWR(url, productFetcher);

  const loading = !data && !error;

  let categories = data;

  if (text) {
    categories = search(categories, text);
  }

  return {
    loading,
    error,
    data: categories,
    maxId: categories ? categories[0]?.id : null,
    mutate,
  };
}

export function useCategoriesRoot(variables: Props) {
  const {locale} = variables ?? {};

  let queryParams = {
    locale: locale,
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
    {sort: false}
  );

  let url = baseUrl + "/api/admin/v1/categories?only_root=1&" + parsed;

  const {data, mutate, error} = useSWR(url, productFetcher);

  const loading = !data && !error;

  let categories = [];

  if (data) {
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      categories.push({
        value: item.value,
        label: item.label,
        id: item.id,
      });
    });
  }

  return {
    loading,
    error,
    dataRoot: categories,
    mutate,
  };
}

export default function useCategories(variables: Props) {
  const {locale} = variables ?? {};

  let queryParams = {
    locale: locale,
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
    {sort: false}
  );

  let url = baseUrl + "/api/admin/v1/categories?" + parsed;

  const {data, mutate, error} = useSWR(url, productFetcher);

  const loading = !data && !error;

  let categories = data;

  return {
    loading,
    error,
    dataTree: categories,
    mutate,
  };
}

export async function addCategory(data) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const cats = await fetch(`${baseUrl}/api/admin/v1/categories`, options);
  return cats.json();
}
