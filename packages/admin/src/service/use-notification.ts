import queryString from "query-string";
import { formatRelativeTime } from "utils/format-relative-time";

const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

interface Props {
  limit?: number;
  page?: number;
}

const NotificationType = {
  PostCreated: "post_created",
  PostReported: "post_reported",
  UserIdentifyCreated: "user_identify_created",
};

export async function parseNotiData(data) {
  let title = "";
  let message = "";
  switch (data.type) {
    case NotificationType.PostCreated:
      title = "New post created";
      message = `New post: "${data.title}" has already been created. Let approve now !`;
      break;
    case NotificationType.PostReported:
      title = "New report";
      message = `The post: "${data.post_title}" has already been reported. Let process now !`;
      break;
    case NotificationType.UserIdentifyCreated:
      title = "New identity confirmation required";
      message = `The user: ${data.user_name} has already sent identity request. Let process now !`;
      break;
  }

  let notification = {
    title: title,
    message: message,
  };

  return notification;
}

export async function handleMapperNotification(noti) {
  let formatTime = formatRelativeTime(noti.created_at);

  const data = JSON.parse(noti.data);

  const notification = await parseNotiData(data);

  notification["id"] = noti.id;
  notification["time"] = formatTime.time;
  notification["unit"] = formatTime.unit;
  notification["readAt"] = noti.read_at;

  return notification;
}

export async function getNotifications(page, count) {
  let queryParams = {
    count: count,
    page: page,
    order_by: "created_at",
    dir: "desc",
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  let url = baseUrl + "/notifications?" + parsed;

  const res = await fetch(url, options);

  let notifications = [];

  try {
    let responseJson = await res.json();
    if (!responseJson.success) {
      return notifications;
    }

    const notis = responseJson.data;

    const mappingNotification = async () =>
      notis.forEach(async function (noti) {
        const notification = await handleMapperNotification(noti);

        notifications.push(notification);
      });

    await mappingNotification();

    return notifications;
  } catch (err) {
    return notifications;
  }
}

export async function markAsRead(id: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/notifications/${id}/read`, options);

  return await data.json();
}

export async function markAsUnread(id: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/notifications/${id}/unread`, options);

  return await data.json();
}

export async function markAsAllRead() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${baseUrl}/notifications/read-all`, options);

  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
}
