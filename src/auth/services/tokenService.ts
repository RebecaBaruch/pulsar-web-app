export const tokenService = {
  save(session: {
    token: string;
    user: any;
  }) {
    sessionStorage.setItem("auth_session", JSON.stringify(session));
  },

  get() {
    const raw = sessionStorage.getItem("auth_session");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  clear() {
    sessionStorage.removeItem("auth_session");
  },
};
