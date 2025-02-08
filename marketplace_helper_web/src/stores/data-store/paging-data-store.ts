import axios, { type CancelTokenSource } from 'axios';
import { action, makeObservable, observable, override } from 'mobx';

import DataStore, { IDataStoreConfig } from 'src/stores/data-store';

import { doGet } from 'src/api';
import { ApiResponseStatus, RESPONSE_HEADERS_TOTAL_COUNT } from 'src/constants';

interface IPagingProps {
  limit?: number;
  offset?: number;
}

type TFilters = Record<string, any>;

interface IPagingDataStoreConfig<T, F, OB> extends IDataStoreConfig<T[], F> {
  data?: T[];
  pagingProps?: IPagingProps;
  pagingType?: string;
  orderBy?: OB;
}

class PagingDataStore<T = any, F extends TFilters = TFilters, OB = never> extends DataStore<
  T[],
  F
> {
  init(config: IPagingDataStoreConfig<T, F, OB>) {
    if (config.loadOnCreate && this.currentPage) {
      this.loadPage(this.currentPage);
    }
  }

  data: T[];
  pagingProps: IPagingProps;
  pagingType = '';
  currentPage = 1;
  total = 0;
  orderBy: OB;
  cancelTokenSource: CancelTokenSource;

  constructor(config: IPagingDataStoreConfig<T, F, OB> = {}) {
    super(config);

    this.data = config.data ?? [];
    this.pagingType = config.pagingType ?? '';

    this.pagingProps = config.pagingProps
      ? {
          limit: config.pagingProps.limit ?? 5,
          offset: config.pagingProps.offset ?? 0,
        }
      : {};

    if (config.orderBy) {
      this.orderBy = config.orderBy;
    }

    makeObservable(this, {
      currentPage: observable,
      data: override,
      filters: override,
      getData: override,
      loadPage: action.bound,
      pagingProps: observable,
      setCurrentPage: action,
      setData: override,
      setFilters: override,
      setLoading: override,
      setPagingProps: action,
      setTotal: action,
      setUrl: override,
      total: observable,
    });

    this.init(config);
  }

  get getData() {
    return this.data;
  }

  get isAllDataLoaded() {
    return this.data.length >= this.total;
  }

  setData(data: T[]) {
    this.data = data;
  }

  setPagingType(type: string) {
    this.pagingType = type;
  }

  setFilters(filters: F, skipLoad = false) {
    this.filters = filters;

    if (!skipLoad) {
      this.setPagingType('');
      this.loadPage(1);
    }
  }

  setOrderBy(orderBy: OB, skipLoad = false) {
    this.orderBy = orderBy;

    if (!skipLoad) {
      this.setPagingType('');
      this.loadPage(1);
    }
  }

  setTotal(total: number) {
    this.total = total;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setPagingProps(newPagingProps: IPagingProps) {
    this.pagingProps = {
      ...this.pagingProps,
      ...newPagingProps,
    };
  }

  addFilter<K extends keyof F>(filterName: K, value: F[K], skipLoad = false) {
    const filters = { ...this.filters, [filterName]: value };
    this.setFilters(filters, skipLoad);
  }

  loadNextPage() {
    this.setPagingType('endless');
    this.loadPage(this.currentPage + 1);
  }

  loadPage(page: number) {
    this.setCurrentPage(page);

    if (Object.keys(this.pagingProps).length) {
      this.setPagingProps({ offset: (page - 1) * (this.pagingProps?.limit ?? 5) });
    }

    void this.load();
  }

  getQueryParams(excludePagingProps: boolean = false) {
    return {
      ...(Object.keys(this.filters).length && { filter: JSON.stringify(this.filters) }),
      ...(this.orderBy && Object.keys(this.orderBy).length && { order_by: this.orderBy }),
      ...(excludePagingProps ? null : this.pagingProps),
    };
  }

  async load() {
    if (!this.url) {
      return;
    }

    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('Request canceled due to new request');
    }

    this.cancelTokenSource = axios.CancelToken.source();

    this.setLoading(true);
    const params = this.getQueryParams();

    try {
      let data: T[] = [];

      const result = await doGet<T[]>(this.url, {
        params,
        cancelToken: this.cancelTokenSource.token,
      });

      if (result.status === ApiResponseStatus.SUCCESS) {
        data = result.data;
        this.setTotal(Number(result.headers?.[RESPONSE_HEADERS_TOTAL_COUNT]) || 0);
      }
      if (this.pagingType === 'endless') {
        this.setData([...this.data, ...data]);
      } else {
        this.setData(data);
      }
    } catch (e: any) {
      if (e.name !== 'CanceledError') {
        console.log('e', e.message);
      }
      if (this.pagingType !== 'endless') {
        this.setData([]);
        this.setTotal(0);
      }
    } finally {
      this.setLoading(false);
    }
  }

  async reload() {
    this.setPagingType('');

    if (Object.keys(this.pagingProps).length) {
      this.setPagingProps({
        offset: 0,
        limit: this.pagingProps.limit ? this.pagingProps.limit * this.currentPage : 5,
      });
    }

    void this.load();
  }
}

export default PagingDataStore;
