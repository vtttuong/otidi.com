const baseUrl = process.env.REACT_APP_LARAVEL_API_URL_ADMIN;
const token = localStorage.getItem("secondhand_token");

export interface Task {
  name?: string;
  type?: string;
  description?: string;
  reward_point: number;
  max_number_excute: number;
  per_unit: string;
  redirect_link?: string;
}

export async function getTasks() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(`${baseUrl}/tasks`, options);
    const jsonData = await response.json();
    return jsonData.success ? jsonData.data : null;
  } catch (err) {
    return null;
  }
}

export async function sortTasks(object: any) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  if (object.locale && object.sort) {
    const voucher = await fetch(
      `${baseUrl}/tasks?locale=${object.locale}&sort=created_at`,
      options
    );
    return voucher.json();
  }
  if (object.locale && !object.sort) {
    const voucher = await fetch(
      `${baseUrl}/tasks?locale=${object.locale}`,
      options
    );
    return voucher.json();
  }
  if (!object.locale && object.sort) {
    const voucher = await fetch(`${baseUrl}/tasks?sort=created_at`, options);
    return voucher.json();
  }

  return null;
}

export async function updateTask(id: number, vc: Task) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vc),
  };
  try {
    const response = await fetch(`${baseUrl}/tasks/${id}`, options);
    return await response.json();
  } catch (err) {
    return null;
  }
  // return await tasks.json();
}
