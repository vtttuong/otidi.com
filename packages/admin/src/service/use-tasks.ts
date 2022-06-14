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
  const response = await fetch(`${baseUrl}/tasks`, options);
  const jsonData = await response.json();
  if (response.status === 200) {
    return jsonData.data;
  } else {
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
  console.log(vc);

  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vc),
  };
  const response = await fetch(`${baseUrl}/tasks/${id}`, options);
  if (response.status === 200) {
    return await response.json();
  } else {
    return null;
  }
  // return await tasks.json();
}
