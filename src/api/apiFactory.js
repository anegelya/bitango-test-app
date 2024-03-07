import authApi from "./authApi";
import countriesApi from "./countriesApi";

const apis = {
  auth: authApi,
  countries: countriesApi,
};

export const apiFactory = {
  get: (name) => apis[name],
};
