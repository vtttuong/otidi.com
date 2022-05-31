import useSWR from "swr";
const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const token = localStorage.getItem("secondhand_token");

const productFetcher = (url) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export default function useBanners(locale: string = "en") {
  let url = `${baseUrl}/api/admin/v1/banners?locale=${locale}`;

  const { data, mutate, error } = useSWR(url, productFetcher);
  return {
    error,
    data: data,
    mutate,
  };
}
