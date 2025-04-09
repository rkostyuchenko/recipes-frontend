import { makeAutoObservable } from 'mobx';
import MealCategoriesStore from 'stores/meal-categories';

export class RootStore {
  mealCategories: MealCategoriesStore;

  constructor() {
    makeAutoObservable(this);
    this.mealCategories = new MealCategoriesStore();
  }
}

export default new RootStore();

export type GlobalStores = keyof RootStore;
