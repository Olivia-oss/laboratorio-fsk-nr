import api from "../api";

export const AuthRequest = {
  postSign: async (data) => {
    const response = await api.post("/auth", data);

    if (response.status === 201) {
      return true;
    }
    return false;
  },

  postLogin: async (data) => {
    const response = await api.post("/auth/login", data);

    if (response.status === 201) {
      return true;
    }
    return false;
  },
};
