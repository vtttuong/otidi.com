const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

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

export async function getTasks(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetch(`${baseUrl}/tasks`, options);
    const json = await data.json();
    return json.success ? json.data : [];
  } catch (err) {
    return [];
  }
}
