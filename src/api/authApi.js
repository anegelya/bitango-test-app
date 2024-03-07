import api from "./api";

export default {
  register(payload) {
    return api.post("register", payload);
  },
};
