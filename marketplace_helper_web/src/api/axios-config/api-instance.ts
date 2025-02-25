import baseAxios, { type InternalAxiosRequestConfig } from 'axios';

import globalAppStore from '@/stores/global-app-store';

import { ApiResponseStatus } from '@/constants';
import { getMockedApiResponse } from '@/mocks/api';

const api = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (options) => {
    const token = globalAppStore.token;

    if (token) {
      if (!options.headers) {
        // @ts-expect-error AxiosRequestHeaders
        options.headers = {};
      }

      options.headers.Authorization = `Bearer ${token}`;
    }

    return options;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      status = ApiResponseStatus.INTERNAL_ERROR,
      config: { method = '', url = '', data = '', params = {} } = {},
    } = error?.response || error;

    if (status === ApiResponseStatus.NOT_FOUND || status === ApiResponseStatus.INTERNAL_ERROR) {
      return Promise.resolve(
        getMockedApiResponse({
          method,
          url,
          data,
          params,
        } as Required<InternalAxiosRequestConfig>)
      );
    }

    if (status === ApiResponseStatus.UNAUTHORIZED) {
      globalAppStore.removeToken();
    }

    return Promise.reject(error);
  }
);

export default api;
