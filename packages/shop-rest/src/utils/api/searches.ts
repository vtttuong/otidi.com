import Id from "pages/post/edit/[id]";

const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

export async function getUsers() {
  const posts = await fetch(`${baseUrl}/api/v1/users`);
  return await posts.json();
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

    try {
      const data = await fetch(baseUrl + "/keywords", options);
      const dataJson = await data.json();
      if (dataJson.success) {
        return dataJson.data;
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
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

    const data = await fetch(baseUrl + `/searches/${id}/mark`, options);
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

    const data = await fetch(baseUrl + `/searches/${id}/unmark`, options);
    return await data.json();
  }
}

export async function saveTextSearch(token: string, text: string) {
  const dataSend = { keyword: text };
  if (token != null && token != undefined) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataSend),
    };

    const data = await fetch(baseUrl + `/keywords`, options);
    if (data.ok == false) {
      return { result: false };
    }

    const json = await data.json();
    if (!json.success) {
      return { result: false };
    } else {
      return {
        result: true,
      };
    }
  }
}
export async function removeTextSearch(token: string, id: number) {
  if (token != null && token != undefined) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await fetch(baseUrl + `/keywords/${id}`, options);
    if (data.ok == false) {
      return { result: false };
    }

    const json = await data.json();
    if (!json.success) {
      return { result: false };
    } else {
      return { result: true };
    }
  }
}
