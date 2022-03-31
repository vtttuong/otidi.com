import { getCookie } from "utils/session";

const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getAllProducts() {
  const posts = await fetch(`${baseUrl}/api/v1/posts`);
  return await posts.json();
}

export async function getProductBySlug(token, slug) {
  if (token !== undefined) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`${baseUrl}/api/client/v1/posts/${slug}`, options);
    return res.json();
  } else {
    const res = await fetch(`${baseUrl}/api/v1/posts/${slug}`);
    return res.json();
  }
  
}

export async function getUserLike(id) {
  const res = await fetch(`${baseUrl}/api/v1/posts/${id}/user-likes`);
  return res.json();
}
export async function getUserSave(id) {
  const res = await fetch(`${baseUrl}/api/v1/posts/${id}/user-saves`);
  return res.json();
}

export async function viewProduct(slug) {
  const options = {
    method: "POST",
  };
  const res = await fetch(`${baseUrl}/api/v1/posts/${slug}/view`, options);

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

  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/save`,
    options
  );
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

  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/like`,
    options
  );
  return data;
}

export async function onFollow(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(
    baseUrl + `/api/client/v1/users/${id}/follow`,
    options
  );
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

  const data = await fetch(
    baseUrl + `/api/client/v1/users/${id}/unfollow`,
    options
  );
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

  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/unlike`,
    options
  );
  return data;
}

export async function onUnSave(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/unsave`,
    options
  );
  return data;
}

export async function report(model: any) {
  const token = getCookie("access_token");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: model,
  };

  const data = await fetch(baseUrl + `/api/v1/posts/report`, options);
  return data;
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
  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/delete`,
    options
  );
  if (data.ok && data.status == 200) return { result: true };
}

export async function markPost(id: number) {
  const token = getCookie("access_token");
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(
    baseUrl + `/api/client/v1/posts/${id}/mark-sold`,
    options
  );

  if (data.ok && data.status == 200) return { result: true };
}
