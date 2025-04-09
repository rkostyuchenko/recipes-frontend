import { action, makeAutoObservable } from 'mobx';

const DEFAULT_PAGE_SIZE = 9;

type UpdateParams = {
  pageNumber?: number;
};

class Pagination {
  private _pageSize: number;
  private _pageNumber: number;
  private _pageCount: number | null = null;

  constructor(initialPage: number = 1, pageSize = DEFAULT_PAGE_SIZE) {
    this._pageSize = pageSize;
    this._pageNumber = initialPage;
    makeAutoObservable(this);
  }

  get pageSize() {
    return this._pageSize;
  }

  get pageNumber() {
    return this._pageNumber;
  }

  get pageCount() {
    return this._pageCount;
  }

  @action.bound
  updateParams({ pageNumber = this._pageNumber }: UpdateParams) {
    this._pageNumber = pageNumber;
  }
}

export default Pagination;
