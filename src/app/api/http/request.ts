import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = async <R = unknown, D = unknown>(
  config: AxiosRequestConfig<D>
) => {
  const data = await axios(config);
  return data.data as R;
};
export default request;
