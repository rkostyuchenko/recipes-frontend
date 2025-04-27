import { makeObservable, action, computed, observable, keys } from 'mobx';

import FieldStore from './field';

type Filters<T> = {
  [K in keyof T]: FieldStore<T[K]>;
};

export class FiltersStore<T> {
  @observable
  private readonly _filters: Filters<T>;

  constructor(filters: Filters<T>) {
    this._filters = filters;
    makeObservable(this);
  }

  @computed
  get filters() {
    return this._filters;
  }

  @computed
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
