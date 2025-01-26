import type { AxiosRequestConfig } from 'axios';

import api from './api-instance';

export const doGet = <T = any>(url: string, options?: AxiosRequestConfig) =>
  api.get<T>(url, options);
export const doPost = <T = any, P = any>(url: string, data?: P, options?: AxiosRequestConfig) =>
  api.post<T>(url, data, options);
export const doPatch = <T = any, P = any>(url: string, data: P, options?: AxiosRequestConfig) =>
  api.patch<T>(url, data, options);
export const doPut = <T = any, P = any>(url: string, data?: P, options?: AxiosRequestConfig) =>
  api.put<T>(url, data, options);
export const doDelete = <T = any>(url: string, options?: AxiosRequestConfig) =>
  api.delete<T>(url, options);
