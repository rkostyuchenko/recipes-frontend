import { makeAutoObservable, runInAction } from 'mobx';
import LoadingStatus from 'utils/enums/loading-status';
import { Response } from 'utils/api-request';
import { MealCategory } from 'domain/meal-categories';
import mealCategoriesApi from 'services/api/meal-categories';
import { BaseDataProvider } from 'stores/types';

class MealCategoriesStore implements BaseDataProvider {
  private _mealCategories: MealCategory[] = [];
  private _status: LoadingStatus = LoadingStatus.initial;

  constructor() {
    makeAutoObservable(this);
  }

  get mealCategories() {
    return this._mealCategories;
  }

  async fetchMealCategoriesList() {
    let response: Response<MealCategory[]>;

    try {
      response = await mealCategoriesApi.fetchMealCategoriesList();
    } catch {
      this._status = LoadingStatus.failed;
    }

    runInAction(() => {
      this._mealCategories = response.data;
      this._status = LoadingStatus.done;
    });
  }

  destroy() {
    this._mealCategories = [];
    this._status = LoadingStatus.initial;
  }
}

export default MealCategoriesStore;
