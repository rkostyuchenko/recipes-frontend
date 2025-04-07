import { makeAutoObservable, keys, action } from 'mobx';

import FieldStore from './field';

type Filters<T> = {
  [K in keyof T]: FieldStore<T[K]>;
};

export class FiltersStore<T> {
  private readonly _filters: Filters<T>;

  constructor(filters: Filters<T>) {
    this._filters = filters;
    makeAutoObservable(this);
  }

  get filters() {
    return this._filters;
  }

  get filterValues() {
    const mapped: T = {} as T;

    keys(this._filters).forEach((key) => {
      const objectKey = key as keyof T;

      mapped[objectKey] = this._filters[objectKey].value;
    });

    return mapped;
  }

  @action.bound
  clearFilters() {
    (Object.values(this._filters) as Filters<T>[keyof T][]).forEach((field) => field.resetValue());
  }
}
