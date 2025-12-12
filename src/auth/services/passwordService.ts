// const API_URL = "https://reqres.in/api";

const MOCK_URL = "https://password-mock.free.beeceptor.com";

export const passwordService = {
  async requestReset(email: string) {
    return fetch(`${MOCK_URL}/auth/password/request-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(data: { token: string; newPassword: string }) {
    return fetch(`${MOCK_URL}/auth/password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
};
