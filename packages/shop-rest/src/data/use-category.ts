import useSWR from 'swr';
import Cookie from "js-cookie";

const fetcher = (url) => fetch(url).then((res) => res.json());

interface CategoryProps {
  type: string;
}
export default function useCategory({ type }: CategoryProps) {
  const locale = Cookie.get('locale');
  const url = process.env.NEXT_PUBLIC_LARAVEL_API_URL + `/api/v1/categories/${type}?locale=${locale}`
  const { data, mutate, error } = useSWR(url, fetcher);

  const loading = !data && !error;

  return {
    loading,
    error,
    data: data,
    // loggedOut,
    // user: data,
    mutate,
  };
}
