const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function markAsRead(token: string, id: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/notifications/read/${id}`,
    options
  );
  return await data.json();
}

export async function getTasks(token: string, lang: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/tasks?locale=${lang}`,
    options
  );
  return await data.json();
}
