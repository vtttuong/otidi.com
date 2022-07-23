import { getCookie } from "utils/session";

const baseUrlIndex = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const baseUrlClient = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getAllPosts() {
  const posts = await fetch(`${baseUrlIndex}/posts`);
  return await posts.json();
}

export async function getPostBySlug(token, slug) {
  if (token !== undefined) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`${baseUrlIndex}/posts/${slug}`, options);
    return res.json();
  } else {
    const res = await fetch(`${baseUrlIndex}/posts/${slug}`);
    return res.json();
  }
}

export async function getPost(id: number) {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  const res = await fetch(`${baseUrlIndex}/posts/${id}`, options);

  if (res.status === 200) {
    const resJson = await res.json();
    return resJson.success ? resJson.data : null;
  }
  return null;
}

export async function getUserLike(id: number) {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };

  try {
    const res = await fetch(`${baseUrlIndex}/posts/${id}/users/like`, options);

    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    return [];
  }
}
export async function getUserSave(id) {
  const res = await fetch(`${baseUrlIndex}/posts/${id}/user-saves`);
  return res.json();
}

export async function viewPost(slug) {
  const options = {
    method: "POST",
  };
  const res = await fetch(`${baseUrlIndex}/posts/${slug}/view`, options);

  if (res.ok && res.status == 200) return { result: true };
}

export async function onSave(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrlClient + `/posts/${id}/save`, options);
  return data;
}

export async function onLike(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(baseUrlClient + `/posts/${id}/like`, options);
    const json = await res.json();
    return {
      result: json.success ? true : false,
      error: json.result,
    };
  } catch (err) {
    return {
      result: false,
      error: err.message || "Failed to create review",
    };
  }
}

export async function onFollow(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrlClient + `/users/${id}/follow`, options);
  return data;
}

export async function onUnFollow(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrlClient + `/users/${id}/unfollow`, options);
  return data;
}

export async function onUnLike(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(baseUrlClient + `/posts/${id}/unlike`, options);
    const json = await res.json();
    return {
      result: json.success ? true : false,
      error: json.result,
    };
  } catch (err) {
    return {
      result: false,
      error: err.message || "Failed to create review",
    };
  }
}

export async function onUnSave(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrlClient + `/posts/${id}/unsave`, options);
  return data;
}

export async function report(id: number, model: any) {
  var formdata = new FormData();
  formdata.append("type", model.type);
  formdata.append("phone_number", model.phone_number);

  const options = {
    method: "POST",
    headers: {
      "X-API-KEY": API_KEY,
    },
    body: formdata,
  };

  try {
    const res = await fetch(baseUrlIndex + `/posts/${id}/report`, options);
    const json = await res.json();
    return {
      result: json.success ? true : false,
      error: json.result,
    };
  } catch (err) {
    return {
      result: false,
      error: err.message || "Failed to create review",
    };
  }
}

export async function deletePost(id: number) {
  const token = getCookie("access_token");
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const data = await fetch(baseUrlClient + `/posts/${id}`, options);
  const dataJson = await data.json();

  if (data.ok && data.status == 200 && dataJson.success) {
    return { result: true };
  } else {
    return { result: false };
  }
}

export async function markPost(id: number) {
  const token = getCookie("access_token");
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const data = await fetch(baseUrlClient + `/posts/${id}`, options);
    const json = await data.json();
    return { result: json.success ? true : false };
  } catch (err) {
    return {
      result: false,
    };
  }
}

export const getTopPosts = async (top: number, orderBy: string) => {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  const posts = await fetch(
    `${baseUrlIndex}/posts?page=1&count=${top}&order_by=${orderBy}&dir=desc`,
    options
  );
  return await posts.json();
};
