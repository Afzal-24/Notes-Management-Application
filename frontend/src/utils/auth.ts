import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getToken = () => Cookies.get(TOKEN_KEY);

export const getUser = () => {
  const user = Cookies.get(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const setToken = (token: string, user: any) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 1,
    path: "/",
  });

  Cookies.set(USER_KEY, JSON.stringify(user), {
    expires: 1,
    path: "/",
  });
};

export const clearToken = () => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  Cookies.remove(USER_KEY, { path: "/" });
};

export const isAuthenticated = () => {
  return !!getToken();
};
