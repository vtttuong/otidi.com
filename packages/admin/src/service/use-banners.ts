import useSWR from "swr";
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

export default function useBanners() {
  let url = `${baseUrl}/banners`;

  const { data, mutate, error } = useSWR(url, productFetcher);

  return {
    error, // data: data?.data,
    data: data?.data,
    mutate,
  };
}
