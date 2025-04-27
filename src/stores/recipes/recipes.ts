import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Response } from 'utils/api-request';
import { Recipe } from 'domain/recipes';
import recipesApi, { FetchListParams } from 'services/api/recipes';
import { BaseDataProvider } from 'stores/types';
import Pagination from 'stores/pagination';

class RecipesStore implements BaseDataProvider {
  @observable.ref
  private _recipes: Recipe[] = [];
  @observable
  private _loadingStatus: LoadingStatus = LoadingStatus.initial;
  @observable
  private _pageCount: number | undefined = undefined;
  @observable
  private _pagination: Pagination;

  constructor(initialPage: number) {
    this._pagination = new Pagination(initialPage);
    makeObservable(this);
  }

  @computed
  get recipes() {
    return this._recipes;
  }

  @computed
  get pagination() {
    return this._pagination;
  }

  @computed
  get pageCount() {
    return this._pageCount;
  }

  @action.bound
  async fetchRecipesList(filters?: FetchListParams['filters']) {
    this._loadingStatus = LoadingStatus.pending;

    let response: Response<Recipe[]>;

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
    });
  }

  @computed
  get isLoading() {
    return this._loadingStatus === LoadingStatus.pending;
  }

  @computed
  get isCompleted() {
    return this._loadingStatus === LoadingStatus.done;
  }

  destroy() {
    this._recipes = [];
    this._loadingStatus = LoadingStatus.initial;
  }
}

export default RecipesStore;
