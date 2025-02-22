import { makeAutoObservable } from 'mobx';

import globalAppStore from '@/stores/global-app-store';

import { mapUserToApi } from '@/adapters/map-user-to-api';
import { fetchUserLogin, fetchUserProfile, fetchUserProfileUpdate, fetchUserRegister } from '@/api';
import type { IUser, IUserAuth, IUserUpdate } from '@/interfaces';

class UserStore {
  isLoading: boolean = false;
  isProcessing: boolean = false;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setIsProcessing(isProcessing: boolean) {
    this.isProcessing = isProcessing;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  logoutUser() {
    globalAppStore.removeToken();
  }

  async registerUser({ email, password }: IUserAuth) {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchUserRegister({ email, password });

    if (isSuccess) {
      globalAppStore.setToken(data.accessToken);
    }

    this.setIsLoading(false);
  }

  async loginUser({ email, password }: IUserAuth) {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchUserLogin({ email, password });

    if (isSuccess) {
      globalAppStore.setToken(data.accessToken);
    }

    this.setIsLoading(false);
  }

  async userProfile() {
    this.setIsLoading(true);

    const { isSuccess, data } = await fetchUserProfile();

    if (isSuccess) {
      this.setUser(data);
    }

    this.setIsLoading(false);
  }

  async updateUserProfile(payload: IUserUpdate) {
    if (!Object.values(payload).some((value) => value)) {
      return;
    }

    this.setIsProcessing(true);

    const { isSuccess, data } = await fetchUserProfileUpdate(mapUserToApi(payload));

    if (isSuccess) {
      this.setUser(data);
    }

    this.setIsProcessing(false);
    return isSuccess;
  }
}

export default new UserStore();
