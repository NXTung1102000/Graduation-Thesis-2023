import { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { API_BASE_URL } from '../config';
import { getAccessToken } from '../util/localStorage';

const axiosAPI: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300 * 1000,
});

axiosAPI.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken && accessToken !== 'null') {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      } as AxiosRequestHeaders;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosAPI.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      // if (error.response.status === 400) {
      // store.dispatch(setError(error.response.data));
      // } else if (error.response.status === 401) {
      // } else if (error.response.status === 404) {
      // } else if (error.response.status === 500) {
      // store.dispatch(setError({ code: "SERVER_ERROR" }));
      // }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      console.log(error.toJSON());
      return Promise.reject(error);
    }
  },
);

export { axiosAPI };
