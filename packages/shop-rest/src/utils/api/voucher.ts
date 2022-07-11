const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT;

export async function getAllVoucher(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetch(`${baseUrl}/vouchers`, options);
    const dataJson = await data.json();
    return dataJson.success ? dataJson.data : [];
  } catch (error) {
    return [];
  }
}

export async function getMyVoucher(token: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await fetch(`${baseUrl}/vouchers/me`, options);
    const dataJson = await data.json();
    return dataJson.success ? dataJson.data : [];
  } catch (error) {
    return [];
  }
}

export async function verifyVoucher(token: string, code: string) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = await fetch(`${baseUrl}/vouchers/check/${code}`, options);
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

  const data = await fetch(`${baseUrl}/vouchers/${id}/exchange`, options);
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

  const data = await fetch(`${baseUrl}/me/profile`, options);
  return await data.json();
}
