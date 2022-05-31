import queryString from "query-string";
import { formatRelativeTime } from "utils/formatRelativeTime";
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

const NotificationType = {
  PostApproveSuccess: "post_approve_success",
  NewUserFollow: "new_user_follow",
  NewUserReview: "new_user_review",
  RecommendPost: "recommend_post",
  PushPostSuccess: "push_post_success",
  UserLevelUp: "user_level_up",
  NewVoucher: "new_voucher",
  ConfirmationIdentity: "confirm_user_identify",
};

export function uniqueBy(arr, prop) {
  return arr.reduce((a, d) => {
    if (!a.includes(d[prop])) {
      a.push(d);
    }
    return a;
  }, []);
}

export async function markAsRead(token: string, id: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/notifications/read/${id}`,
    options
  );
  return await data.json();
}

export async function markAsAllRead(token: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/notifications/read-all`,
    options
  );
  return await data.json();
}

export async function updatePass(
  token: string,
  oldPass: string,
  newPass: string
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password: oldPass, new_password: newPass }),
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/me/change-password`,
    options
  );
  if (data.status == 200 && data.ok) {
    return await data.json();
  } else {
    return data;
  }
}

export async function getProfile(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/me/profile`, options);
  return await data.json();
}

export async function getHistoryPay(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/payment/history`, options);
  return data.json();
}

export async function getPackage(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/packages`, options);
  return await data.json();
}

export async function pushPost(token: string, post_id, packages_id, schedule) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post_id: post_id,
      packages_id: packages_id,
      schedule: schedule,
    }),
  };

  await fetch(`${baseUrl}/api/client/v1/posts/push`, options);
  return;
}

export async function getSettingProfile(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/me/my-profile`, options);
  return data.json();
}

export async function parseNotiData(data) {
  const locationHref = window.location.origin;
  let pathName = "";
  let messageId = "";
  let type = "";
  let values = {};
  switch (data.type) {
    case NotificationType.PostApproveSuccess:
      values = {
        title: data.title,
      };
      type = "postApprovedSucess";
      messageId = "postSuccessMess";
      pathName = `/${data.category_type}/${data.post_slug}`;
      break;
    case NotificationType.NewUserFollow:
      values = {
        name: data.follower_name,
      };
      type = "newUserFollowTit";
      messageId = "newUserFollow";
      pathName = `/profile/${data.follower_id}`;
      break;
    case NotificationType.NewUserReview:
      values = {
        name: data.reviewer_name,
        star: data.star,
      };
      type = "newUserReviewTit";
      messageId = "newUserReview";
      pathName = `/profile/${data.reviewer_id}`;
      break;
    case NotificationType.RecommendPost:
      values = {
        title: data.title,
      };
      type = "recommendPostTit";
      messageId = "newPost";
      pathName = `/${data.category_type}/${data.post_slug}`;
      break;
    case NotificationType.PushPostSuccess:
      values = {
        title: data.title,
      };
      type = "pushPostSuccessTit";
      messageId = "pushPostSuccessMess";
      pathName = `/${data.category_type}/${data.post_slug}`;
      break;
    case NotificationType.UserLevelUp:
      values = {
        level: data.level,
      };
      type = "userLevelUpTit";
      messageId = "userLevelUpMess";
      pathName = `/profile`;
      break;
    case NotificationType.NewVoucher:
      values = {
        name: data.name,
        expired: data.expired,
        discount: data.discount,
      };
      type = "newVoucherTit";
      messageId = "newVoucherMess";
      pathName = `/voucher`;
      break;
    case NotificationType.ConfirmationIdentity:
      if (data.full_authen) {
        type = "confirmIdentityTitle";
        messageId = "confirmIdentityFull";
        pathName = `/profile`;
      } else {
        type = "confirmIdentityTitle";
        messageId = "confirmIdentityNotFull";
        pathName = `/profile/setting-profile`;
      }

      break;
  }

  let notification = {
    type: type,
    messageId: messageId,
    values: values,
    href: locationHref + pathName,
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

export async function getNotifications(
  token: string,
  page: number,
  limit: number
) {
  let queryParams = {
    page: page,
    limit: limit,
  };

  const parsed = queryString.stringify(
    {
      ...queryParams,
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

  const url = baseUrl + "/api/client/v1/notifications?" + parsed;
  const data = await fetch(url, options);
  let notifications = [];

  if (!data.ok) {
    return null;
  }

  let notiList = await data.json();

  await notiList.map(async function (noti) {
    const notification = await handleMapperNotification(noti);
    notifications.push(notification);
  });

  return notifications;
}
export async function getMyprofile(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = baseUrl + "/api/client/v1/me/profile";
  const data = await fetch(url, options);

  return data.json();
}

export async function getMyText(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = baseUrl + "/api/client/v1/searches";
  const data = await fetch(url, options);

  return data.json();
}

export async function sendOtp(object: any, token: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(object),
  };

  const url = baseUrl + "/api/client/v1/verify/capture";
  const data = await fetch(url, options);

  return data.json();
}
