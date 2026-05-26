// URL backend
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

// Helper request
async function request(
  endpoint,
  method = "GET",
  body = null
) {

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // kalau ada body
  if (body) {
    options.body = JSON.stringify(body);
  }

  // request ke backend
  const res = await fetch(
    `${BASE_URL}${endpoint}`,
    options
  );

  const data = await res.json();

  // kalau error
  if (!res.ok) {

    throw new Error(
      data.detail || "Terjadi kesalahan pada server"
    );
  }

  return data;
}

// LOGIN
export const loginUser = (
  username,
  password
) =>
  request("/login", "POST", {
    username,
    password,
  });

// REGISTER
export const registerUser = (
  username,
  password
) =>
  request("/register", "POST", {
    username,
    password,
  });

// CHECK BACKEND
export const checkHealth = () =>
  request("/");