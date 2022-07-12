import data from "features/checkouts/data";

const baseUrlIndex = process.env.NEXT_PUBLIC_LARAVEL_API_URL_INDEX;
const baseUrlClient = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export async function getUsers() {
  const posts = await fetch(`${baseUrlIndex}/users`);
  return await posts.json();
}

export async function getUserById(id: number) {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  try {
    const res = await fetch(`${baseUrlIndex}/users/${id}`, options);
    const json = await res.json();

    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function deleteReview(token: string, id: number) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${baseUrlClient}/user-reviews/${id}`, options);
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

  // return await data.json();
}

export async function createReview(token: string, object: any) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  };

  try {
    const res = await fetch(`${baseUrlClient}/user-reviews`, options);
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

export async function editReview(token: string, id: number, object: any) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  };

  const data = await fetch(`${baseUrlClient}/users/review/${id}`, options);
  return await data.json();
}

export async function getFollowers(id: number) {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  try {
    const res = await fetch(`${baseUrlIndex}/users/${id}/followers`, options);
    const json = await res.json();
    console.log("🚀 ~ file: user.ts ~ line 103 ~ getFollowers ~ json", json);

    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function getReviews(id: number, param?: any) {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  try {
    const res = await fetch(
      `${baseUrlIndex}/users/${id}/reviews?${param}`,
      options
    );
    const json = await res.json();

    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export const getPostsForUser = async (id: number) => {
  const options = {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
    },
  };
  try {
    const res = await fetch(`${baseUrlIndex}/posts?user_id=${id}`, options);
    const json = await res.json();

    return json.success ? json.data : null;
  } catch {
    return null;
  }
};

export const follow = async (token: string, id: number) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${baseUrlClient}/users/${id}/follow`, options);
    const json = await res.json();

    return {
      result: json.success ? true : false,
    };
  } catch {
    return {
      result: false,
    };
  }
};

export const unfollow = async (token: string, id: number) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${baseUrlClient}/users/${id}/unfollow`, options);
    const json = await res.json();

    return {
      result: json.success ? true : false,
    };
  } catch {
    return {
      result: false,
    };
  }
};
