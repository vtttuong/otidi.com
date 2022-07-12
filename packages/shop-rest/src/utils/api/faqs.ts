const baseUrlIndex = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const baseUrlClient = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getFaqs = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${baseUrlIndex}/faqs`, options);
  try {
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    return [];
  }
};
