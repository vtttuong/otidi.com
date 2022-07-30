const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

export async function getChats(token: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await fetch(`${baseUrl}/channels`, options);
    const json = await res.json();
    return {
      result: json.success ? json.data : null,
    };
  } catch (err) {
    return {
      result: null,
    };
  }
}

export async function getChat(token: string, id: number) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrl + `/channels/${id}`, options);

  return await data.json();
}

export async function getMessages(token: string, id: number) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const data = await fetch(
      baseUrl + `/channels/${id}/messages?order_by=created_at&dir=asc`,
      options
    );
    const json = await data.json();
    return json.success ? json.data : null;
  } catch (err) {
    return null;
  }
}

export async function createChat(token: string, postId: any) {
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

  try {
    const response = await fetch(baseUrl + `/channels`, options);
    const json = await response.json();
    return {
      result: json.success ? true : false,
      chanelData: json.success ? json.data : null,
    };
  } catch (err) {
    return { result: false, data: null };
  }
}
export async function sendBargin(
  token: string,
  message: string,
  postId: number
) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
      message: message,
    }),
  };

  try {
    const response = await fetch(
      baseUrl + `/channels/send-message/bargain`,
      options
    );
    const json = await response.json();
    console.log("🚀 ~ file: chat.ts ~ line 104 ~ json", json);
    return {
      result: json.success ? true : false,
      chanelData: json.success ? json.data : null,
    };
  } catch (err) {
    return { result: false, data: null };
  }
}

export async function sendMessage(token: string, content: any, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: content,
    }),
  };
  try {
    const data = await fetch(baseUrl + `/channels/${id}/messages`, options);
    const json = await data.json();
    if (json.success) {
      return {
        result: true,
        data: json.data,
      };
    } else {
      return {
        result: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      result: false,
      data: null,
    };
  }
}

export async function readMessage(token: string, chatId: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await fetch(
      baseUrl + `/channels/messages/${chatId}/read`,
      options
    );
    const jsonData = await res.json();
    return {
      result: jsonData.success ? true : false,
    };
  } catch (err) {
    return {
      result: false,
    };
  }
}
