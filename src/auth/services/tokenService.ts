export const tokenService = {
  save(session: { token: string; user: any }) {
    sessionStorage.setItem("auth_session", JSON.stringify(session));
  },

  get() {
    const raw = sessionStorage.getItem("auth_session");
    if (!raw) return null;
    try {
      const session = JSON.parse(raw);
      return session.token;
    } catch {
      return null;
    }
  },

  clear() {
    sessionStorage.removeItem("auth_session");
  },
};
