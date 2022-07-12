const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getFields(locale: string) {
  const options = {
    method: "GET",
    "Content-Type": "application/json",
  };

  const data = await fetch(
    baseUrl + `/api/v1/categories?locale=${locale}`,
    options
  );
  return await data.json();
}

export async function findIndex(categories, categoryType) {
  return categories.findIndex((category) => category.type === categoryType);
}
