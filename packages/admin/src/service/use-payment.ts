import useSWR from "swr";
const queryString = require("query-string");
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

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
  from?: string;
  to?: string;
  status?: string;
  sort?: string;
  sortBy?: string;
  page?: number;
  count?: number;
}
export default function usePayments(variables: Props) {
  const { from, to, status, sort, sortBy, page, count } = variables ?? {};

  let queryParams = {
    from: from,
    to: to,
    dir: sort ? sort : "",
    order_by: sortBy ? sortBy : "",
    status: status ? status : "",
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

  let url = baseUrl + "/payment-transactions?" + parsed;

  console.log(url);

  const { data, mutate, error } = useSWR(url, productFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration

  let payments = data && data.data;

  return {
    loading,
    error,
    data: payments,
    // hasMore,
    mutate,
    total: data?.total || 0,
    // fetchMore,
  };
}
