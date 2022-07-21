import queryString from "query-string";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

// https://api.otodi.vn/api/admin/v1/users?count=10&page=1&order_by=id&dir=asc
interface PROPS {
  status?: string;
  page?: number;
  count?: number;
}

export async function getUsers(variables?: PROPS) {
  const { status, page, count } = variables ?? {};

  let queryParams = {
    page: page,
    count: count,
    status: status,
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
    { sort: false }
  );

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const users = await fetch(`${baseUrl}/users?${parsed}`, options);
    const usersJson = await users.json();
    return usersJson.success ? usersJson.data : null;
  } catch (err) {
    return null;
  }
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
  try {
    const usersResponse = await fetch(`${baseUrl}/users`, options);
    const users = await usersResponse.json();
    console.log(users);
    return await users.json();
  } catch (ex) {
    return {
      isError: true,
      message: ex.message,
    };
  }
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

export async function blockUser(id: number) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${baseUrl}/users/${id}/block`, options);
    const resJson = await res.json();
    return {
      result: resJson.success,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
  // return await users.json();
}
export async function unblockUser(id: number) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(`${baseUrl}/users/${id}/unblock`, options);
    const resJson = await res.json();
    return {
      result: resJson.success,
    };
  } catch (err) {
    return {
      result: false,
    };
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
    return { status: true };
  }
  // return await users.json();
}

export async function verifyId(id: number) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(
      `${baseUrl}/users/${id}/identity-card/verify`,
      options
    );
    const resJson = await res.json();
    return {
      result: resJson.success,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
}

export async function getUserById(id) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${baseUrl}/users/${id}`, options);
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    return null;
  }
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
