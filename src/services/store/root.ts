import MealCategoriesStore from 'stores/meal-categories';
import UserStore from 'stores/user/user';

export class RootStore {
  mealCategories: MealCategoriesStore;
  userStore: UserStore;

  constructor() {
    this.mealCategories = new MealCategoriesStore();
    this.userStore = new UserStore();
  }
}

export default new RootStore();

export type GlobalStores = keyof RootStore;
