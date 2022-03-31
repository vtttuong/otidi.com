const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const token = localStorage.getItem("secondhand_token");

export async function getFaqs(locate: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const faqs = await fetch(
    `${baseUrl}/api/admin/v1/faqs?locale=${locate}`,
    options
  );

  return await faqs.json();
}

export async function deleteFaq(id: number, lang: string) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const result = await fetch(
    `${baseUrl}/api/admin/v1/faqs/${id}/${lang}`,
    options
  );
  return result;
}

export async function updateFaq(id: number, faq: any) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(faq),
  };
  const result = await fetch(
    `${baseUrl}/api/admin/v1/faqs/${id}/${faq.locale}`,
    options
  );
  return result;
}

export async function addFaq(vc: any) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vc),
  };
  const voucher = await fetch(`${baseUrl}/api/admin/v1/faqs`, options);
  if (voucher.status === 200) {
    return await voucher.json();
  }
  return null;
}
