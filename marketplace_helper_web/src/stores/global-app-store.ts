import { makeAutoObservable } from 'mobx';

import { APP_LOCALSTORAGE_JWT, CONFIG_REQUIRED_PARAMS_MAPPED } from '@/constants';

class GlobalAppStore {
  init() {
    if (this.isConfigCorrect) {
      this.checkToken();
    }
  }

  token: string = localStorage.getItem(APP_LOCALSTORAGE_JWT) || '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setToken(token: string) {
    this.token = token;

    if (token) {
      localStorage.setItem(APP_LOCALSTORAGE_JWT, token);
    }
  }

  removeToken() {
    localStorage.removeItem(APP_LOCALSTORAGE_JWT);
    this.setToken('');
  }

  checkToken() {
    const TOKEN = import.meta.env.VITE_APP_TOKEN;

    if (TOKEN && this.token !== TOKEN) {
      localStorage.setItem(APP_LOCALSTORAGE_JWT, TOKEN);
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
