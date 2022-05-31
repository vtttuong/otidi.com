const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getUsers() {
  const posts = await fetch(`${baseUrl}/api/v1/users`);
  return await posts.json();
}
export async function getUserById(id) {
  const res = await fetch(`${baseUrl}/api/v1/users/${id}/profile`);
  return await res.json();
}
export async function getReviews(id, param) {
  const res = await fetch(
    `${baseUrl}/api/v1/users/reviews?user_id=${id}${param}`
  );
  return await res.json();
}
export async function deleteReview(token: string, id: number) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/users/review/${id}`,
    options
  );
  console.log(await data.json(), 77);
  // return await data.json();
}

export async function creatReviewChild(token: string, object: any) {
  console.log(object, 88);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  };

  const data = await fetch(`${baseUrl}/api/client/v1/users/review`, options);
  return await data.json();
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

  const data = await fetch(
    `${baseUrl}/api/client/v1/users/review/${id}`,
    options
  );
  return await data.json();
}
