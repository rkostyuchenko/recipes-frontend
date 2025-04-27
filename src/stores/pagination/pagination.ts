import { action, computed, makeObservable, observable } from 'mobx';

const DEFAULT_PAGE_SIZE = 9;

type UpdateParams = {
  pageNumber?: number;
};

class Pagination {
  @observable
  private _pageSize: number;
  @observable
  private _pageNumber: number;
  @observable
  private _pageCount: number | null = null;

  constructor(initialPage: number = 1, pageSize = DEFAULT_PAGE_SIZE) {
    this._pageSize = pageSize;
    this._pageNumber = initialPage;
    makeObservable(this);
  }

  @computed
  get pageSize() {
    return this._pageSize;
  }

  @computed
  get pageNumber() {
    return this._pageNumber;
  }

  @computed
  get pageCount() {
    return this._pageCount;
  }

  @action.bound
  updateParams({ pageNumber = this._pageNumber }: UpdateParams) {
    this._pageNumber = pageNumber;
  }
}

export default Pagination;
