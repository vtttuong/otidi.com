const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

export async function getFaqs(page?: number) {
  const COUNT = 10;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const faqsResponse = await fetch(
    `${baseUrl}/faqs?page=${page ? page : 1}&count=${COUNT}`,
    options
  );
  const faqs = await faqsResponse.json();
  return faqs.data;
}

export async function deleteFaq(id: number) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${baseUrl}/faqs/${id}`, options);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
}

export async function updateFaq(id: number, faq: FaqItem) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faq),
  };
  const response = await fetch(`${baseUrl}/faqs/${id}/`, options);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
}

interface FaqItem {
  title: string;
  content: string;
}
export async function addFaq(fItem: FaqItem) {
  var formdata = new FormData();
  formdata.append("title", fItem.title);
  formdata.append("content", fItem.content);
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formdata,
  };
  const response = await fetch(`${baseUrl}/faqs`, options);
  if (response.status === 200) {
    return await response.json();
  }
  return null;
}
