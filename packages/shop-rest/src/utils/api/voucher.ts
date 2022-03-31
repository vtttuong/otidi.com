const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export async function getAllVoucher(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/vouchers`, options);
  return data.json();
}

export async function getMyVoucher(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/api/client/v1/vouchers/me`, options);
  return data.json();
}

export async function verifyVoucher(token: string, code: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/vouchers/check/${code}`,
    options
  );
  return data;
}

export async function exchange(token: string, id: number) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(
    `${baseUrl}/api/client/v1/vouchers/${id}/exchange`,
    options
  );
  return data;
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