import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Recipe } from 'domain/recipes';
import recipesApi from 'services/api/recipes';
import { BaseDataProvider } from 'stores/types';

class RecipeSuggestStore implements BaseDataProvider {
  @observable.ref
  private _recipeSuggest: Recipe | null = null;
  @observable
  private _loadingStatus: LoadingStatus = LoadingStatus.initial;

  constructor() {
    makeObservable(this);
  }

  @computed
  get recipeSuggest() {
    return this._recipeSuggest;
  }

  @action.bound
  async fetchRecipeSuggest() {
    runInAction(() => {
      this._loadingStatus = LoadingStatus.pending;
    });

    let response: Recipe;

    try {
      response = await recipesApi.fetchRandomRecipe();
    } catch {
      this._loadingStatus = LoadingStatus.failed;
    }

    runInAction(() => {
      this._loadingStatus = LoadingStatus.done;
      this._recipeSuggest = response;
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
    this._recipeSuggest = null;
    this._loadingStatus = LoadingStatus.initial;
  }
}

export default RecipeSuggestStore;
