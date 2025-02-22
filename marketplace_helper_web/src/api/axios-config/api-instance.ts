import baseAxios, { type InternalAxiosRequestConfig } from 'axios';

import globalAppStore from '@/stores/global-app-store';

import { ApiMethod, ApiResponseStatus } from '@/constants';
import { getMockedApiResponse } from '@/mocks/api';

const api = baseAxios.create({
  baseURL: window.API_URL,
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
      data: { detail = '' } = {},
    } = error?.response || error;

    let title = `${status}: ${method.toUpperCase()} ${url}`;

    if (!status && !method && !url) {
      title = 'An unexpected error has occurred';
    }

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

    if (method === ApiMethod.GET) {
      throw new Error(`${title}\n${detail}`);
    }

    if (status === ApiResponseStatus.UNAUTHORIZED) {
      globalAppStore.removeToken();
    }

    return Promise.reject(error);
  }
);

export default api;
