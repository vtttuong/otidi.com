import queryString from "query-string";
import { formatRelativeTime } from "utils/formatRelativeTime";
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

const NotificationType = {
  PostApproveSuccess: "post_approve_success",
  NewUserFollow: "user_follow",
  NewUserReview: "user_review",
  RecommendPost: "recommend_post",
  PushPostSuccess: "push_advertise_post_success",
  UserLevelUp: "user_level_up",
  NewVoucher: "new_voucher",
  ConfirmationIdentity: "verify_user_identity_success",
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

  try {
    const data = await fetch(`${baseUrl}/notifications/${id}/read`, options);
    const json = await data.json();

    if (json.success) {
      return {
        result: true,
      };
    }
    return {
      result: false,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
}

export async function markAsAllRead(token: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetch(`${baseUrl}/notifications/read-all`, options);
    const json = await data.json();

    if (json.success) {
      return {
        result: true,
      };
    }
    return {
      result: false,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
}

export async function updatePass(
  token: string,
  oldPass: string,
  newPass: string,
  confirmPass: string
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password: oldPass,
      new_password: newPass,
      new_password_confirmation: confirmPass,
    }),
  };

  const data = await fetch(`${baseUrl}/me/change-password`, options);
  if (data.status === 200 || data.status === 201) {
    const dataJson = await data.json();
    return dataJson;
  } else {
    return {
      error: true,
    };
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

  const data = await fetch(`${baseUrl}/me`, options);
  const dataJson = await data.json();
  return dataJson.data;
}

export async function logout(token: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/me/logout`, options);
}

export async function getHistoryPay(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetch(`${baseUrl}/payment/history`, options);
    const json = await data.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function getPackage(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/advertises/packages`, options);
  const dataJson = await data.json();
  return dataJson.data || [];
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
      advertise_package_id: packages_id,
      start_time: schedule,
    }),
  };

  try {
    const res = await fetch(`${baseUrl}/advertises`, options);
    const json = await res.json();

    return {
      result: json.success ? true : false,
      advertise: json.success ? json.data : null,
    };
  } catch (err) {
    return { result: false };
  }
}

export async function updatePushPackage(
  token: string,
  package_id: number,
  schedule: string
) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      start_time: schedule,
    }),
  };

  try {
    const res = await fetch(`${baseUrl}/advertises/${package_id}`, options);
    const json = await res.json();

    return {
      result: json.success ? true : false,
      advertise: json.success ? json.data : null,
    };
  } catch (err) {
    return { result: false };
  }
}

export async function getSettingProfile(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/me`, options);
  const dataJson = await data.json();
  return dataJson.data;
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
        title: data.post_name || data.title,
      };
      type = "postApprovedSucess";
      messageId = "postSuccessMess";
      pathName = `/posts/${data.post_id}`;
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
        title: data.post_name || data.title,
      };
      type = "recommendPostTit";
      messageId = "newPost";
      pathName = `/posts/${data.post_id}`;
      break;
    case NotificationType.PushPostSuccess:
      values = {
        title: data.post_name || data.title,
      };
      type = "pushPostSuccessTit";
      messageId = "pushPostSuccessMess";
      pathName = `/posts/${data.post_id}`;
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
    count: limit,
    order_by: "created_at",
    dir: "desc",
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

  try {
    const url = baseUrl + "/notifications?" + parsed;
    const data = await fetch(url, options);
    let notifications = [];
    let responseJson = await data.json();

    if (!responseJson.success) {
      return notifications;
    }

    let notiList = responseJson.data;

    await notiList.map(async function (noti) {
      const notification = await handleMapperNotification(noti);
      notifications.push(notification);
    });

    console.log(
      "🚀 ~ file: profile.ts ~ line 302 ~ notifications",
      notifications
    );

    return notifications;
  } catch (err) {
    return [];
  }
}
export async function getMyprofile(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = baseUrl + "/me";
  try {
    const data = await fetch(url, options);

    const dataJson = await data.json();
    return dataJson.success ? dataJson.data : null;
  } catch (err) {
    return null;
  }
}

export async function getMyPosts(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = baseUrl + "/posts";
  const data = await fetch(url, options);

  const dataJson = await data.json();

  return dataJson.data;
}

export async function getMyText(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = baseUrl + "/keywords";
  try {
    const data = await fetch(url, options);

    const dataJson = await data.json();

    return dataJson?.data || [];
  } catch (err) {
    return [];
  }
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

  const url = baseUrl + "/me/phone-number/confirm-otp";
  try {
    const data = await fetch(url, options);
    return await data.json();
  } catch (err) {
    return null;
  }
}
