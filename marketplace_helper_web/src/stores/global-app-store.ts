import { makeAutoObservable } from 'mobx';

import { APP_LOCALSTORAGE_NAME, CONFIG_REQUIRED_PARAMS_MAPPED } from '@/constants';

class GlobalAppStore {
  init() {
    if (this.isConfigCorrect) {
      this.checkToken();
    }
  }

  isInternalError: boolean = false;
  token: string = localStorage.getItem(APP_LOCALSTORAGE_NAME) || '';

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
  }

  setIsInternalError(isError: boolean) {
    this.isInternalError = isError;
  }

  removeToken() {
    localStorage.removeItem(APP_LOCALSTORAGE_NAME);
    this.setToken('');
  }

  logout() {
    this.removeToken();
  }

  checkToken() {
    const TOKEN = import.meta.env.VITE_APP_TOKEN;

    if (TOKEN && this.token !== TOKEN) {
      localStorage.setItem(APP_LOCALSTORAGE_NAME, TOKEN);
      this.setToken(TOKEN);
    }
  }

  get isConfigCorrect() {
    return this.missingConfigVars.length === 0;
  }

  get missingConfigVars() {
    return CONFIG_REQUIRED_PARAMS_MAPPED.filter((item) => !item.value);
  }
}

export default new GlobalAppStore();
