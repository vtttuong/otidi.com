import useSWR from "swr";
import Cookie from "js-cookie";
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

const fetcher = (url) => fetch(url).then((res) => res.json());

interface CategoryProps {
  type: string;
}
export default function useBanner({ type }: CategoryProps) {
  const locale = Cookie.get("locale");

  const url = `${baseUrl}/banners/${type}?locale=${locale}`;
  const { data, mutate, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    data: data,
    mutate,
  };
}
