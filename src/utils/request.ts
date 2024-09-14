import axios, { AxiosRequestConfig } from "axios";

const axiosServices = axios.create({
  baseURL: process.env.BASE_URL,
});

axiosServices.interceptors.request.use(
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
  const data = await axiosServices({
    ...config,
    // url: (process.env.BASE_URL || "") + config.url,
  });
  return data.data.data as R;
};
export default request;
