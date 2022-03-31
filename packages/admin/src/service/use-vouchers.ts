import axios from "axios";
import useSWR from "swr";
import Fuse from "fuse.js";
import queryString from "query-string";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const token = localStorage.getItem("secondhand_token");

const options = {
  isCaseSensitive: false,
  shouldSort: true,
  threshold: 0.3,
  minMatchCharLength: 2,
  keys: ["name"],
};

function search(list, pattern) {
  const fuse = new Fuse(list, options);
  return fuse.search(pattern).map((current) => current.item);
}

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
  text?: string;
  type?: string;
}

export default function useVouchers(variables: Props) {
  const { status, type, text } = variables ?? {};

  let queryParams = {
    status: status,
    type: type,
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

  let url = baseUrl + "/api/admin/v1/vouchers?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration

  let vouchers = data;

  if (text) {
    vouchers = search(vouchers, text);
  }

  return {
    loading,
    error,
    data: vouchers,
    maxId: vouchers ? vouchers[0]?.id : null,
    mutate,
  };
}

export function addVoucher(formData: any) {
  const configs = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": `multipart/form-data;`,
    },
  };

  axios
    .post(baseUrl + `/api/admin/v1/vouchers`, formData, configs)
    .then((response) => {
      if (response.status === 200 && response.data.error) {
        return response.data.error;
      } else {
        return { error: "" };
      }
    });
}

export async function delVoucher(id: number) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/api/admin/v1/vouchers/${id}`, options);
  if (users.status === 200) {
    return { status: true };
  }
  // return await users.json();
}
export async function updateVoucher(id: number, vc: any) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vc),
  };
  const users = await fetch(`${baseUrl}/api/admin/v1/vouchers/${id}`, options);

  if (users.status === 200) {
    return await users.json();
  }
  return null;
}
