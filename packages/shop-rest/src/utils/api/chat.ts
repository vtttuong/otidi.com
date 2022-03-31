const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getChats(token: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(baseUrl + `/api/client/v1/chats`, options);
  return await data.json();
}

export async function getChat(token: string, id: number) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const data = await fetch(
    baseUrl + `/api/client/v1/chats/${id}`,
    options
  );
  
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

  const data = await fetch(
    baseUrl + `/api/client/v1/chats/${id}/messages`,
    options
  );
  return await data.json();
}


export async function createChat(token: string, postId: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: postId,
    })
  };

  const response = await fetch(
    baseUrl + `/api/client/v1/chats`,
    options
  );

  return await response;
}


export async function sendMessage(token: string, content: any, id: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
    })
  };
  const data = await fetch(
    baseUrl + `/api/client/v1/chats/${id}/messages/send`,
    options
  );
  return await data.json();
}

export async function readMessage(token: string, chatId: number) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  await fetch(
    baseUrl + `/api/client/v1/chats/messages/${chatId}/read`,
    options
  );
}