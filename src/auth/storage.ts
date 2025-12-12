export const AUTH_TOKEN_KEY = "auth_token";

export const saveToken = (token: string) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getToken = () => {
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
};

export const clearToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};
