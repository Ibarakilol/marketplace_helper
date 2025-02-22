import { doGet, doPatch, doPost } from './axios-config';

import { mapApiToToken, mapApiToUser } from '@/adapters';
import { ApiRoute } from '@/constants';
import type {
  IApiToken,
  IApiUser,
  IApiUserUpdate,
  IToken,
  IUser,
  IUserAuth,
  TApiResponse,
} from '@/interfaces';

export const fetchUserRegister = async ({
  email,
  password,
}: IUserAuth): Promise<TApiResponse<IToken>> => {
  try {
    const { data } = await doPost<IApiToken>(ApiRoute.USERS_REGISTER, { email, password });

    return { isSuccess: true, data: mapApiToToken(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchUserLogin = async ({
  email,
  password,
}: IUserAuth): Promise<TApiResponse<IToken>> => {
  try {
    const { data } = await doPost<IApiToken>(
      ApiRoute.USERS_LOGIN,
      { username: email, password },
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    );

    return { isSuccess: true, data: mapApiToToken(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchUserProfile = async (): Promise<TApiResponse<IUser>> => {
  try {
    const { data } = await doGet<IApiUser>(ApiRoute.USERS_PROFILE);

    return { isSuccess: true, data: mapApiToUser(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};

export const fetchUserProfileUpdate = async (
  payload: IApiUserUpdate
): Promise<TApiResponse<IUser>> => {
  try {
    const { data } = await doPatch<IApiUser>(ApiRoute.USERS_PROFILE, payload);

    return { isSuccess: true, data: mapApiToUser(data) };
  } catch (err: any) {
    console.log(err);
    return { isSuccess: false, error: err.response?.data?.detail };
  }
};
