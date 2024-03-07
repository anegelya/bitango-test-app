import api from "./api";

const resource = "/countries";

export default {
  getAll() {
    return api.get(`${resource}`);
  },
};
