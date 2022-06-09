import queryString from "query-string";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

// https://api.otodi.vn/api/admin/v1/users?count=10&page=1&order_by=id&dir=asc
interface PROPS {
  sortType?: string;
  sortDir?: string;
  page?: number;
  count?: number;
}

export async function getUsers(variables?: PROPS) {
  const {sortType, sortDir, page, count} = variables ?? {};

  let queryParams = {
    page: page,
    count: count,
    order_by: sortType,
    dir: sortDir,
  };

  let newParams = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(queryParams).map((key) => {
    if (typeof queryParams[key] !== "undefined" && queryParams[key] !== "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    },
    {sort: false}
  );

  console.log(parsed);

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/users?${parsed}`, options);

  return await users.json();
}

export async function createUser(email, name, password) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  };
  const users = await fetch(`${baseUrl}/users`, options);

  return await users.json();
}

export async function getUsersType(id) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/users?level=${id}`, options);

  return await users.json();
}

export async function deleteUser(id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/users/block/${id}`, options);
  if (users.status === 200) {
    return {status: true};
  }
  // return await users.json();
}
export async function unDeleteUser(id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/users/unblock/${id}`, options);
  if (users.status === 200) {
    return {status: true};
  }
  // return await users.json();
}

export async function verifyId(id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const users = await fetch(`${baseUrl}/users/identify/confirm/${id}`, options);
  console.log(users);
  return users;
}

export async function getUserById(id) {
  const res = await fetch(`${baseUrl}/api/v1/users/${id}/profile`);
  return res;
}
export async function createChat(postId: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
    }),
  };

  const response = await fetch(baseUrl + `/api/client/v1/chats`, options);

  return await response;
}
