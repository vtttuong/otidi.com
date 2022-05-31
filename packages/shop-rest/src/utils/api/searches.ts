const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getUsers() {
  const posts = await fetch(`${baseUrl}/api/v1/users`);
  return await posts.json();
}

export async function deleteSearchText(token: string, id: number) {
  if (token != null && token != undefined) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(
      `${baseUrl}/api/client/v1/searches/${id}/delete`,
      options
    );
    return await res.json();
  }
}

export async function getSearchText(token: string) {
  if (token != null && token != undefined) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await fetch(baseUrl + "/api/client/v1/searches", options);
    return await data.json();
  }
}

export async function markIsNotification(token: string, id: number) {
  if (token != null && token != undefined) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await fetch(baseUrl + `/api/client/v1/searches/${id}/mark`, options);
    return await data.json();
  }
}

export async function markIsNotNotification(token: string, id: number) {
  if (token != null && token != undefined) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await fetch(baseUrl + `/api/client/v1/searches/${id}/unmark`, options);
    return await data.json();
  }
}
export async function saveTextSearch(token: string, text: string) {
  const dataSend = { "text": text }
  if (token != null && token != undefined) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataSend)
    };

    const data = await fetch(baseUrl + `/api/client/v1/searches`, options);
    if (data.ok == false) {
      return { result: false }
    }
    return await data.json();
  }
}