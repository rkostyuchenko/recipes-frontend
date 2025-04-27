import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Response } from 'utils/api-request';
import { RecipeDetails, RecipeId } from 'domain/recipes';
import recipesApi from 'services/api/recipes';
import { BaseDataProvider } from 'stores/types';

class RecipeStore implements BaseDataProvider {
  @observable.ref
  private _recipe: RecipeDetails | null = null;
  @observable
  private _loadingStatus: LoadingStatus = LoadingStatus.initial;

  constructor() {
    makeObservable(this);
  }

  @computed
  get recipe() {
    return this._recipe;
  }

  @action
  async fetchRecipe(id: RecipeId) {
    let response: Response<RecipeDetails>;

    try {
      response = await recipesApi.fetchRecipe(id);
    } catch {
      this._loadingStatus = LoadingStatus.failed;
    }

    runInAction(() => {
      this._recipe = response.data;
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
    this._recipe = null;
    this._loadingStatus = LoadingStatus.initial;
  }
}

export default RecipeStore;
