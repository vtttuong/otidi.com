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
  // minMatchCharLength: 2,
  keys: ["label", "name"],
};
function search(list, pattern) {
  const fuse = new Fuse(list, options);

  return fuse.search(pattern).map((current) => current.item);
}
// import productFetcher from 'utils/api/product';
const token = localStorage.getItem("secondhand_token");
const productFetcher = async (url) =>
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
interface Props {
  locale?: string;
  text?: string;
  page?: number;
  count?: number;
}

export default function useBrands(variables: Props) {
  const { text, page, count } = variables ?? {};

  let queryParams = {
    page: page,
    count: count,
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

  let url = baseUrl + "/brands?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;

  let brands = data && data.data;

  if (text && text.trim().length !== 0) {
    brands = search(brands, text.trim());
  }

  return {
    loading,
    error,
    data: brands,
    mutate,
    total: data?.total || 0,
  };
}

interface Brand {
  name: string;
  logo: Array<File>;
  models: Array<any>;
}

export async function addBrand(brand: Brand) {
  console.log(brand);

  var formdata = new FormData();
  formdata.append("name", brand.name);
  formdata.append("logo", brand.logo[0]);
  brand.models.forEach((model, idx) => {
    formdata.append(`models[${idx}][name]`, model.name);
  });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  };
  const response = await fetch(`${baseUrl}/brands`, options);
  const json = await response.json();
  console.log(json);

  return json;
}

export async function updateBrand(brand) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  };
  const cats = await fetch(`${baseUrl}/brands/${brand.id}`, options);
  return cats.json();
}

export async function getBrands() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const brands = await fetch(`${baseUrl}/brands`, options);
  const brandsJson = await brands.json();

  return brandsJson?.data;
}
