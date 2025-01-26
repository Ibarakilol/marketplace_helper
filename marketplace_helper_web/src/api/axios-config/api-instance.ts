import baseAxios from 'axios';

import globalAppStore from '@/stores/global-app-store';

import { ApiMethod, ApiResponseStatus } from '@/constants';

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
  (response) => {
    if (globalAppStore.isInternalError) {
      globalAppStore.setIsInternalError(false);
    }

    return response;
  },
  (error) => {
    const {
      status,
      config: { method = '', url = '' } = {},
      data: { message = '' } = {},
    } = error?.response || {};

    const errorMethod = error?.config?.method;

    let title = `${status}: ${method.toUpperCase()} ${url}`;

    if (!status && !method && !url) {
      title = 'An unexpected error has occurred';
    }

    if (errorMethod === ApiMethod.GET) {
      throw new Error(`${title}\n${message}`);
    }

    if (status === ApiResponseStatus.UNAUTHORIZED) {
      globalAppStore.removeToken();
    }

    if (status === ApiResponseStatus.INTERNAL_ERROR) {
      globalAppStore.setIsInternalError(true);
    } else if (globalAppStore.isInternalError) {
      globalAppStore.setIsInternalError(false);
    }

    return Promise.reject(error);
  }
);

export default api;
