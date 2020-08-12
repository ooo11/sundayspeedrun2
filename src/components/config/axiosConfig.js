import axios from "axios";

import { store } from "../store";

const instance = axios.create({
  baseURL: `http://localhost:4200/api/v1/users/`,
});

instance.interceptors.request.use((config) => {
  const mutatedConfig = { ...config };
  const { token } = store.getState();
  if (token) {
    mutatedConfig.headers.Authorization = `Bearer ${token}`;
  }
  return mutatedConfig;
});

export default instance;
