import useSWR from "swr";

// import postFetcher from 'utils/api/post';
const postFetcher = (url) => fetch(url).then((res) => res.json());
interface Props {
  slug: string;
}
export default function usePost({ slug }: Props) {
  const { data, mutate, error } = useSWR("/api/posts.json", postFetcher);

  const loading = !data && !error;
  // need to remove when you using real API integration
  let post = data?.filter((current) => current.slug === slug);

  return {
    loading,
    error,
    data: post,
    // user: data,
    mutate,
  };
}
