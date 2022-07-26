import axios from "axios";
import useSWR from "swr";
import Fuse from "fuse.js";
import queryString from "query-string";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

const options = {
  isCaseSensitive: false,
  shouldSort: true,
  threshold: 0.3,
  // minMatchCharLength: 2,
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
  page?: number;
  count?: number;
}

export default function useVouchers(variables: Props) {
  const { status, type, text, page, count } = variables ?? {};

  let queryParams = {
    // status: status,
    type: type,
    page: page ? page : "",
    count: count ? count : "",
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

  let url = baseUrl + "/vouchers?" + parsed;

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration

  let vouchers = data?.data;

  if (status && vouchers) {
    vouchers = vouchers.filter((voucher) =>
      status === "active"
        ? voucher.is_available === true
        : voucher.is_available === false
    );
  }

  if (text && vouchers) {
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

  axios.post(baseUrl + `/vouchers`, formData, configs).then((response) => {
    if (response.status === 200) {
      return response.data.data;
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
  const response = await fetch(`${baseUrl}/vouchers/${id}`, options);
  if (response.status === 200) {
    return { status: true };
  }
  return null;
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
  const response = await fetch(`${baseUrl}/vouchers/${id}`, options);

  if (response.status === 200) {
    return await response.json();
  }
  return null;
}

export async function getVoucher(id: number) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}/vouchers/${id}`, options);

  if (response.status === 200) {
    const voucherJson = await response.json();
    return voucherJson.data;
  }
  return null;
}
