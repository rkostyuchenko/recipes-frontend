import { makeAutoObservable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Response } from 'utils/api-request';
import { RecipeDetails, RecipeId } from 'domain/recipes';
import recipesApi from 'services/api/recipes';
import { BaseDataProvider } from 'stores/types';

class RecipeStore implements BaseDataProvider {
  private _recipe: RecipeDetails | null = null;
  private _loadingStatus: LoadingStatus = LoadingStatus.initial;

  constructor() {
    makeAutoObservable(this);
  }

  get recipe() {
    return this._recipe;
  }

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

  get isLoading() {
    return this._loadingStatus === LoadingStatus.pending;
  }

  get isCompleted() {
    return this._loadingStatus === LoadingStatus.done;
  }

  destroy() {
    this._recipe = null;
    this._loadingStatus = LoadingStatus.initial;
  }
}

export default RecipeStore;
