const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;

const token = localStorage.getItem("secondhand_token");
const queryString = require("query-string");

export async function getRevenueStatisticsByYear(year, userId = null) {
  let queryParams = {
    year: year,
    user_id: userId,
  };

  let newParams = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(queryParams).map((key) => {
    // eslint-disable-next-line valid-typeof
    if (queryParams[key] !== null) {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    },
    { sort: false }
  );

  let url = `${baseUrl}/statistics/revenue?type=1y&` + parsed;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const resJson = await fetch(url, options).then((res) => res.json());
  if (!resJson.success) {
    return Array.from({ length: 12 }, (v, i) => 0);
  }
  return Object.values(resJson.data);
}

export async function getCategories() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/api/v1/categories/type?locale=en`,
    options
  );
  return Object.values(await res.json());
}

export async function getRevenueStatisticsDaily(from, to) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/revenue/by-day?from_date=${from}&to_date=${to}`,
    options
  );

  return await res.json();
}

export async function getRevenueStatisticsLast2Week() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/revenue/last-two-week`,
    options
  );
  return Object.values(await res.json());
}

export async function getPostStatisticsDailyByCategory(from, to) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/posts/daily/by-category?from_date=${from}&to_date=${to}`,
    options
  );
  return await res.json();
}

export async function getPostStatisticsByYear(
  year,
  isSold = null,
  isPriority = null
) {
  let queryParams = {
    type: "1y",
    year: year,
  };

  let newParams = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(queryParams).map((key) => {
    // eslint-disable-next-line valid-typeof
    if (typeof queryParams[key] !== null && queryParams[key] !== "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    },
    { sort: false }
  );

  let url = baseUrl + "/statistics/post?" + parsed;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const resJson = await fetch(url, options).then((res) => res.json());
  if (!resJson.success) {
    return Array.from({ length: 12 }, (v, i) => 0);
  }
  return Object.values(resJson.data);
}

export async function getPostStatisticsByTypeInYear(year, type) {
  let queryParams = {
    type: type || "1y",
    year: year,
  };

  let newParams = {};
  // eslint-disable-next-line array-callback-return
  Object.keys(queryParams).map((key) => {
    // eslint-disable-next-line valid-typeof
    if (typeof queryParams[key] !== null && queryParams[key] !== "") {
      newParams[key] = queryParams[key];
    }
  });

  const parsed = queryString.stringify(
    {
      ...newParams,
    },
    { sort: false }
  );

  let url = baseUrl + "/statistics/post?" + parsed;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(url, options);
  return Object.values(await res.json());
}

export async function getPostStatisticsDaily(category, from, to) {
  let queryParams = {
    from_date: from,
    to_date: to,
    category_type: category,
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

  let url = baseUrl + "/statistics/posts/daily?" + parsed;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, options);

  return Object.values(await res.json());
}

export async function getUserJoinStatisticsByYear(year) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/user-join/total?year=${year}`,
    options
  );
  return Object.values(await res.json());
}

export async function getUserJoinDaily(from, to) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/user-join/daily?from_date=${from}&to_date=${to}`,
    options
  );
  return await res.json();
}

export async function getUserStage(from, to) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${baseUrl}/statistics/user-phase?from_date=${from}&to_date=${to}`,
    options
  );
  return await res.json();
}

export async function getTopUser() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${baseUrl}/statistics/user-top`, options);
  return await res.json();
}

export async function getAdvertiseStatisticsByYear(year) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const resJson = await fetch(
    `${baseUrl}/statistics/advertise?type=1y?&year=${year}`,
    options
  ).then((res) => res.json());
  if (!resJson.success) {
    return Array.from({ length: 12 }, (v, i) => 0);
  }
  return Object.values(resJson.data);
}
