import { makeAutoObservable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Response } from 'utils/api-request';
import { Recipe } from 'domain/recipes';
import recipesApi, { FetchListParams } from 'services/api/recipes';
import { BaseDataProvider } from 'stores/types';
import Pagination from 'stores/pagination';

class RecipesStore implements BaseDataProvider {
  private _recipes: Recipe[] = [];
  private _loadingStatus: LoadingStatus = LoadingStatus.initial;
  private _pageCount: number | undefined = undefined;
  private _pagination: Pagination;
  private _lastFilters: FetchListParams['filters'];

  constructor(initialPage: number) {
    this._pagination = new Pagination(initialPage);
    makeAutoObservable(this);
  }

  get recipes() {
    return this._recipes;
  }

  get pagination() {
    return this._pagination;
  }

  get pageCount() {
    return this._pageCount;
  }

  async fetchRecipesList(filters?: FetchListParams['filters']) {
    let response: Response<Recipe[]>;

    if (this._lastFilters != null && this._lastFilters !== filters) {
      this._pagination.updateParams({ pageNumber: 1 });
    }

    try {
      response = await recipesApi.fetchRecipesList({
        page: this._pagination.pageNumber,
        pageSize: this._pagination.pageSize,
        filters,
      });
    } catch {
      this._loadingStatus = LoadingStatus.failed;
    }

    runInAction(() => {
      this._recipes = response.data;
      this._pageCount = response.meta.pagination.pageCount;
      this._loadingStatus = LoadingStatus.done;
      this._lastFilters = filters;
    });
  }

  get isLoading() {
    return this._loadingStatus === LoadingStatus.pending;
  }

  get isCompleted() {
    return this._loadingStatus === LoadingStatus.done;
  }

  destroy() {
    this._recipes = [];
    this._loadingStatus = LoadingStatus.initial;
  }
}

export default RecipesStore;
