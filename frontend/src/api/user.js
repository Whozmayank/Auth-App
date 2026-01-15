import { getAuthHeader } from "../utils/auth";

const BASE_URL = "http://localhost:3000"; // backend port

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/user`, {
    headers: {
      ...getAuthHeader(),
    },
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });

  // 1. Check if the HTTP status is outside 200-299
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({})); // Try to get error details from server
    throw new Error(errorData.message || `Error: ${res.status}`);
  }

  // 2. Handle 204 No Content (common for DELETE)
  if (res.status === 204) {
    return { success: true };
  }

  return res.json();
};

export const updateUserName = async (id, name) => {
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ name }),
  });

  // 1. Check for HTTP errors (4xx or 5xx)
  if (!res.ok) {
    // Attempt to parse server error message, fallback to generic status text
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Update failed: ${res.status} ${res.statusText}`
    );
  }

  // 2. Handle empty responses (if server returns 204 No Content)
  if (res.status === 204) {
    return { name }; // Return the name we sent, or a success flag
  }

  // 3. Return the updated user object
  return res.json();
};
