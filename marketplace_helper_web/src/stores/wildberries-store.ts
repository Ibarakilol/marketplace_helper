import { makeAutoObservable } from 'mobx';

class WildberriesStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default new WildberriesStore();
