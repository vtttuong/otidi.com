const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getBrands() {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };

  const data = await fetch(baseUrl + `/brands`, options);
  const dataJson = await data.json();
  console.log(dataJson);

  return dataJson ? dataJson.data : [];
}

export async function findIndex(categories, categoryType) {
  return categories.findIndex((category) => category.type === categoryType);
}
