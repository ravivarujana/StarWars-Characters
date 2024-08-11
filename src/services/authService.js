import { jwtDecode } from "jwt-decode";

const FAKE_USER = {
  username: "user",
  password: "password",
  token: "fake-jwt-token",
};

export const login = async (username, password) => {
  if (username === FAKE_USER.username && password === FAKE_USER.password) {
    const token = FAKE_USER.token;
    localStorage.setItem("token", token);
    return token;
  } else {
    throw new Error("Invalid username or password");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  return decoded.exp < Date.now() / 1000;
};

export const refreshToken = async () => {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    return token;
  } else {
    // Mock refreshing the token
    const newToken = "fake-new-jwt-token";
    localStorage.setItem("token", newToken);
    return newToken;
  }
};
