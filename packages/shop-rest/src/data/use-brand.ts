import useSWR from "swr";
import Cookie from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetcher = (url) =>
  fetch(url, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  }).then((res) => res.json());

interface CategoryProps {
  type: string;
}
export default function useBrands() {
  const url = `${baseUrl}/brands`;

  const { data, mutate, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  const brand = data?.data;
  return {
    loading,
    error,
    data: brand,
    // loggedOut,
    // user: data,
    mutate,
  };
}
