import queryString from "query-string";
import { formatRelativeTime } from "utils/formatRelativeTime";
const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

const NotificationType = {
  PostApproveSuccess: "post_approve_success",
  NewUserFollow: "new_user_follow",
  NewUserReview: "new_user_review",
  RecommendPost: "recommend_post",
  PushPostSuccess: "push_advertise_post_success",
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

  const data = await fetch(`${baseUrl}/notifications/${id}/read`, options);
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

  const data = await fetch(`${baseUrl}/notifications/read-all`, options);
  return await data.json();
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

export async function getHistoryPay(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/payment/history`, options);
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
      packages_id: packages_id,
      schedule: schedule,
    }),
  };

  await fetch(`${baseUrl}/posts/push`, options);
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
      pathName = `/posts/${data.post_slug}`;
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
        title: data.post_name,
      };
      type = "recommendPostTit";
      messageId = "newPost";
      pathName = `/posts/${data.post_slug}`;
      break;
    case NotificationType.PushPostSuccess:
      values = {
        title: data.post_name,
      };
      type = "pushPostSuccessTit";
      messageId = "pushPostSuccessMess";
      pathName = `/posts/${data.post_slug}`;
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

  const url = baseUrl + "/notifications?" + parsed;
  const data = await fetch(url, options);
  let notifications = [];

  if (!data.ok) {
    return null;
  }

  let responseJson = await data.json();

  // let notiList = responseJson.data;

  //FAKE NOTIFICATIONS
  let notiList = [
    {
      id: "14fa4b0f-f4fd-48b2-826c-dd1253aed7db",
      type: "App\\Notifications\\PushAdvertisePostSuccess",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"push_advertise_post_success","post_id":4,"post_slug":"ahihi","post_name":"Mazda CX-2 - Ahihi","created_at":"2022-04-25T11:52:13.000000Z"}',
      read_at: null,
      created_at: "2022-04-25T03:42:10.000000Z",
      updated_at: "2022-04-25T03:42:10.000000Z",
    },
    {
      id: "18035dcc-879f-47c9-a947-1c8f322bec7f",
      type: "App\\Notifications\\PostApproved",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"post_approve_success","post_id":1,"post_slug":"can-ban-xe-gap","title":"C\\u1ea7n b\\u00e1n xe g\\u1ea5p","created_at":"2022-04-12T06:57:10.000000Z"}',
      read_at: null,
      created_at: "2022-04-11T23:57:11.000000Z",
      updated_at: "2022-04-11T23:58:42.000000Z",
    },
    {
      id: "3d759e5a-eaa6-4ef8-be9c-533f4a85ee19",
      type: "App\\Notifications\\RecommendPost",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"recommend_post","keyword":{"id":1,"user_id":1,"keyword":"mazda","is_notify":1,"created_at":"2022-04-19T02:44:13+00:00","updated_at":"2022-04-19T02:44:13+00:00","user":{"id":1,"name":"Minh hihi","email":"miinhnguyen98@gmail.com","email_verified_at":null,"avatar":"https:\\/\\/otody.s3.ap-southeast-1.amazonaws.com\\/users\\/1\\/uVV8tReBaPFPuNQ1.jpg","deleted_at":null,"created_at":"2022-04-12T13:45:55.000000Z","updated_at":"2022-04-12T07:01:38.000000Z","facebook_token":null,"google_token":null,"address":null,"rating":0,"balance":0}},"post_id":1,"post_name":"Mazda CX-2 - C\\u1ea7n b\\u00e1n xe g\\u1ea5p","post_slug":"can-ban-xe-gap","created_at":"2022-04-12T06:52:02.000000Z"}',
      read_at: null,
      created_at: "2022-04-20T01:00:06.000000Z",
      updated_at: "2022-04-20T01:00:06.000000Z",
    },
    {
      id: "5fc78d84-e333-4a5b-babb-593e9ab781c4",
      type: "App\\Notifications\\PushAdvertisePostSuccess",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"push_advertise_post_success","post_id":1,"post_slug":"can-ban-xe-gap","post_name":"Mazda CX-2 - C\\u1ea7n b\\u00e1n xe g\\u1ea5p","created_at":"2022-04-11T23:52:02.000000Z"}',
      read_at: null,
      created_at: "2022-04-25T04:39:06.000000Z",
      updated_at: "2022-04-25T04:39:06.000000Z",
    },
    {
      id: "a26f5f45-b913-41be-8acc-9f802ca6dcc5",
      type: "App\\Notifications\\RecommendPost",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"recommend_post","keyword":{"id":1,"user_id":1,"keyword":"mazda","is_notify":1,"created_at":"2022-04-19T02:44:13+00:00","updated_at":"2022-04-19T02:44:13+00:00","user":{"id":1,"name":"Minh hihi","email":"miinhnguyen98@gmail.com","email_verified_at":null,"avatar":"https:\\/\\/otody.s3.ap-southeast-1.amazonaws.com\\/users\\/1\\/uVV8tReBaPFPuNQ1.jpg","deleted_at":null,"created_at":"2022-04-12T13:45:55.000000Z","updated_at":"2022-04-12T07:01:38.000000Z","facebook_token":null,"google_token":null,"address":null,"rating":0,"balance":0}},"post_id":1,"post_name":"Mazda CX-2 - C\\u1ea7n b\\u00e1n xe g\\u1ea5p","post_slug":"can-ban-xe-gap","created_at":"2022-04-12T06:52:02.000000Z"}',
      read_at: null,
      created_at: "2022-04-19T21:10:03.000000Z",
      updated_at: "2022-04-19T21:10:03.000000Z",
    },
    {
      id: "dfb97d1e-3f8a-4659-b64d-f7122155ae04",
      type: "App\\Notifications\\PostApproved",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"post_approve_success","post_id":4,"post_slug":"ahihi","title":"Ahihi","created_at":"2022-04-25T17:13:51.000000Z"}',
      read_at: null,
      created_at: "2022-04-25T03:13:53.000000Z",
      updated_at: "2022-04-25T03:13:53.000000Z",
    },
    {
      id: "f593454d-800a-4923-9b53-d56c3b213269",
      type: "App\\Notifications\\RecommendPost",
      notifiable_type: "App\\Models\\User",
      notifiable_id: 1,
      data:
        '{"type":"recommend_post","keyword":{"id":1,"user_id":1,"keyword":"mazda","is_notify":1,"created_at":"2022-04-19T02:44:13+00:00","updated_at":"2022-04-19T02:44:13+00:00","user":{"id":1,"name":"Minh hihi","email":"miinhnguyen98@gmail.com","email_verified_at":null,"avatar":"https:\\/\\/otody.s3.ap-southeast-1.amazonaws.com\\/users\\/1\\/uVV8tReBaPFPuNQ1.jpg","deleted_at":null,"created_at":"2022-04-12T13:45:55.000000Z","updated_at":"2022-04-12T07:01:38.000000Z","facebook_token":null,"google_token":null,"address":null,"rating":0,"balance":0}},"post_id":1,"post_name":"Mazda CX-2 - C\\u1ea7n b\\u00e1n xe g\\u1ea5p","post_slug":"can-ban-xe-gap","created_at":"2022-04-12T06:52:02.000000Z"}',
      read_at: null,
      created_at: "2022-04-19T21:09:06.000000Z",
      updated_at: "2022-04-19T21:09:06.000000Z",
    },
  ];

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

  const url = baseUrl + "/me";
  const data = await fetch(url, options);

  const dataJson = await data.json();

  return dataJson.data;
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
  const data = await fetch(url, options);

  const dataJson = await data.json();

  return dataJson?.data || [];
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
  const data = await fetch(url, options);
  console.log("Response from otp", data);

  return await data.json();
}
