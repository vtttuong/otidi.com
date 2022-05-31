const baseUrl = process.env.REACT_APP_LARAVEL_API_URL;
const token = localStorage.getItem("secondhand_token");

export async function getTasks() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const tasks = await fetch(`${baseUrl}/api/admin/v1/tasks`, options);
  return tasks.json();
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
      `${baseUrl}/api/admin/v1/tasks?locale=${object.locale}&sort=created_at`,
      options
    );
    return voucher.json();
  }
  if (object.locale && !object.sort) {
    const voucher = await fetch(
      `${baseUrl}/api/admin/v1/tasks?locale=${object.locale}`,
      options
    );
    return voucher.json();
  }
  if (!object.locale && object.sort) {
    const voucher = await fetch(
      `${baseUrl}/api/admin/v1/tasks?sort=created_at`,
      options
    );
    return voucher.json();
  }

  return null;
}

export async function updateTask(id: number, vc: any) {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vc),
  };
  await fetch(`${baseUrl}/api/admin/v1/tasks/${id}`, options);
  // return await tasks.json();
}
