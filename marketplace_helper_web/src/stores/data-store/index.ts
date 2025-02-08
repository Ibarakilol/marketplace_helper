import { action, computed, makeObservable, observable } from 'mobx';

import { doGet } from 'src/api';
import { ApiResponseStatus } from 'src/constants';

type TFilters = Record<string, any>;

export interface IDataStoreConfig<T, F> {
  data?: T;
  filters?: F;
  loadOnCreate?: boolean;
  url?: string;
}

class DataStore<T extends {}, F extends TFilters = TFilters> {
  init(config: IDataStoreConfig<T, F>) {
    if (config.loadOnCreate) {
      void this.load();
    }
  }

  data: T | {} = {};
  url = '';
  filters: F;
  isLoading = false;

  constructor(config: IDataStoreConfig<T, F> = {}) {
    this.data = config.data ?? {};
    this.url = config.url ?? '';
    this.filters = config.filters || ({} as F);

    makeObservable(this, {
      data: observable,
      filters: observable,
      getData: computed,
      isLoading: observable,
      setData: action,
      setFilters: action,
      setLoading: action,
      setUrl: action,
    });

    this.init(config);
  }

  get getData() {
    return this.data as T;
  }

  setData(data: T) {
    this.data = data;
  }

  setUrl(url: string) {
    this.url = url;
  }

  setFilters(filters: F, skipLoad = false) {
    this.filters = filters;

    if (!skipLoad) {
      void this.load();
    }
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  addFilter<K extends keyof F>(filterName: K, value: F[K], skipLoad = false) {
    const filters = { ...this.filters, [filterName]: value };
    this.setFilters(filters, skipLoad);
  }

  getQueryParams() {
    return {
      ...(Object.keys(this.filters).length && { filter: JSON.stringify(this.filters) }),
    };
  }

  async load() {
    if (!this.url) {
      return;
    }

    this.setLoading(true);

    const params = this.getQueryParams();

    try {
      const result = await doGet(this.url, { params });
      this.setData(result.status === ApiResponseStatus.SUCCESS ? result.data : []);
    } catch (e: any) {
      console.log('e', e);
    } finally {
      this.setLoading(false);
    }
  }
}

export default DataStore;
