import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Response } from 'utils/api-request';
import { MealCategory } from 'domain/meal-categories';
import mealCategoriesApi from 'services/api/meal-categories';
import { BaseDataProvider } from 'stores/types';

class MealCategoriesStore implements BaseDataProvider {
  @observable.ref
  private _mealCategories: MealCategory[] = [];

  constructor() {
    makeObservable(this);
  }

  @computed
  get mealCategories() {
    return this._mealCategories;
  }

  @action.bound
  async fetchMealCategoriesList() {
    let response: Response<MealCategory[]>;

    try {
      response = await mealCategoriesApi.fetchMealCategoriesList();
    } catch {
      //
    }

    runInAction(() => {
      this._mealCategories = response.data;
    });
  }

  destroy() {
    this._mealCategories = [];
  }
}

export default MealCategoriesStore;
