export const tokenService = {
  saveTokens(access: string, refresh: string) {
    sessionStorage.setItem("access_token", access);
    sessionStorage.setItem("refresh_token", refresh);
  },

  getAccess() {
    return sessionStorage.getItem("access_token");
  },

  getRefresh() {
    return sessionStorage.getItem("refresh_token");
  },

  clear() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  }
};
